#!/usr/bin/env node
/**
 * scrape-highspot.mjs — Stage ONLY (no Sitecore / Content Hub writes)
 * Fetches https://www.highspot.com/blog/ index, then candidate posts,
 * extracts title/excerpt/hero/author/body, downloads hero + author avatar,
 * and writes articles.json / authors.json / images/image-manifest.json
 * in the format upload-to-content-hub.mjs expects.
 * Usage: node scrape-highspot.mjs [--candidates 30] [--select 10]
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

const OUT = new URL('.', import.meta.url).pathname;
const IMG_DIR = join(OUT, 'images');
mkdirSync(IMG_DIR, { recursive: true });
mkdirSync(join(OUT, 'raw'), { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const args = process.argv.slice(2);
const getArg = (n, d) => { const i = args.indexOf(`--${n}`); return i !== -1 ? args[i+1] : d; };
const CANDIDATES = parseInt(getArg('candidates','30'),10);
const SELECT = parseInt(getArg('select','10'),10);
// Already in Sitecore (verified via Marketer MCP get_all_pages_by_site 2026-10-22)
const EXISTING_SLUGS = new Set(['ai-for-gtm-go-to-market']); // source slug; Sitecore slug differs but title duplicates
const EXISTING_TITLES = new Set(['how to blend purpose-built and horizontal ai for gtm']);

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}
async function fetchBin(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}
const decode = (s='') => s
  .replace(/&#039;|&#8217;|&rsquo;/g,"'").replace(/&#8220;|&ldquo;/g,'"').replace(/&#8221;|&rdquo;/g,'"')
  .replace(/&#8211;|&ndash;/g,'–').replace(/&#8212;|&mdash;/g,'—').replace(/&#038;|&amp;/g,'&')
  .replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).trim();
const stripTags = (s='') => decode(s.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
const meta = (h, prop) => {
  const m = h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']*)["']`,'i'))
        || h.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${prop}["']`,'i'));
  return m ? decode(m[1]) : '';
};
function extractBody(h) {
  const start = h.indexOf('entry-content');
  if (start === -1) return '';
  const gt = h.indexOf('>', start);
  let body = h.slice(gt + 1);
  const endMarkers = ['author-box', 'wp-block-highspot-author', 'author__name', '</main>', '<footer'];
  let end = body.length;
  for (const marker of endMarkers) {
    const idx = body.indexOf(marker);
    if (idx !== -1) end = Math.min(end, marker === '</main>' || marker === '<footer' ? idx : body.lastIndexOf('<', idx));
  }
  body = body.slice(0, end);
  // cut trailing author/share blocks if captured
  body = body.split('<div class="author__')[0].split('<div class="post-share')[0].split('<div class="share-')[0];
  // clean: strip class/id/style/data-*, scripts, iframes (keep structural html)
  body = body.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'')
    .replace(/\s(class|id|style|data-[a-z-]+|decoding|loading)="[^"]*"/gi,'')
    .replace(/\s+/g,' ').trim();
  // decode numeric entities for clean Rich Text (e.g. &#8217; -> ')
  body = body.replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/&amp;/g,'&');
  return `<div class="ck-content">${body}</div>`;
}
function parsePost(h, url) {
  const slug = url.replace(/\/$/,'').split('/').pop();
  const title = meta(h,'og:title') || stripTags((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]||'');
  const excerpt = meta(h,'og:description');
  const hero = meta(h,'og:image');
  let ld = {};
  for (const s of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const j = JSON.parse(s[1]); const art = (j['@graph']||[]).find(x=>x['@type']==='Article'); if (art) ld = art; } catch {}
  }
  const authorName = stripTags((h.match(/<div class="post-author__name">([\s\S]*?)<\/div>/)||[])[1]||'') || ld.author?.name || meta(h,'author');
  const authorTitle = stripTags((h.match(/<div class="post-author__title">([\s\S]*?)<\/div>/)||[])[1]||'');
  const avatar = ((h.match(/<div class="post-author__avatar"><img[^>]+src="([^"]+)"/)||[])[1]||'');
  const bioHtmlMatch = h.match(/<div class="author__bio[^"]*">([\s\S]*?)<\/div>\s*<div class="wp-block-highspot-buttons author__read-bio/);
  const bio = bioHtmlMatch ? `<div class="ck-content">${bioHtmlMatch[1].replace(/\s(class|id|style)="[^"]*"/gi,'').replace(/\s+/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/&amp;/g,'&').trim()}</div>` : '';
  const rawBioLink = ((h.slice(h.indexOf('author__read-bio')).match(/href="([^"]+)"/)||[])[1]||'');
  const authorPageUrl = rawBioLink.includes('/author/') ? rawBioLink : ''; // some read-bio links point to podcasts — only keep author archives
  const datePublished = ld.datePublished || '';
  const readTime = (h.match(/(\d+\s*min read)/)||[])[1]||'';
  const category = stripTags((h.match(/taxonomy-category[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/)||[])[1]||'') || (ld.articleSection||[])[0] || '';
  const featuredAlt = stripTags((h.match(/wp-block-post-featured-image"><img[^>]+alt="([^"]*)"/)||[])[1]||'');
  // Drop the trailing author-card figure (avatar) that leaks in after entry-content
  let contentHtml = extractBody(h);
  if (avatar) contentHtml = contentHtml.replace(new RegExp(`<div>\\s*<figure>\\s*<img src="${avatar.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^>]*>\\s*</figure></div>`,'i'),'');
  return { slug, sourceUrl: url, title, excerpt, heroImage: hero, heroAlt: featuredAlt || title,
    authorName, authorTitle, authorAvatar: avatar, authorBioHtml: bio, authorPageUrl,
    datePublished, readTime, category, contentHtml, wordCount: ld.wordCount||null };
}

console.log('Fetching index…');
const indexHtml = await fetchText('https://www.highspot.com/blog/');
writeFileSync(join(OUT,'raw/blog-index.html'), indexHtml);
const seen = new Set(); const urls = [];
for (const m of indexHtml.matchAll(/href="(https:\/\/www\.highspot\.com\/blog\/[^"]+\/)"/g)) {
  const u = m[1];
  if (u.includes('/category/') || u.includes('/page/') || u.includes('/author/') || seen.has(u)) continue;
  seen.add(u); urls.push(u);
}
console.log(`Index post URLs: ${urls.length}, scanning first ${CANDIDATES}`);

const scanned = [];
for (const url of urls.slice(0, CANDIDATES)) {
  if (EXISTING_SLUGS.has(url.replace(/\/$/,'').split('/').pop())) { console.log('SKIP existing', url); continue; }
  try {
    const h = await fetchText(url);
    const p = parsePost(h, url);
    if (EXISTING_TITLES.has(p.title.toLowerCase())) { console.log('SKIP existing title', p.title); continue; }
    if (!p.title || !p.contentHtml) { console.log('SKIP incomplete', url); continue; }
    scanned.push(p);
    console.log(`OK  ${p.slug} | ${p.authorName} | ${p.title.slice(0,70)}`);
  } catch (e) { console.log('FAIL', url, e.stack || e.message); }
  await sleep(1200);
}

// Select 10: maximise distinct authors first (in index order), then fill by recency/order
const selected = []; const usedAuthors = new Set();
for (const p of scanned) { if (selected.length>=SELECT) break; const k=p.authorName.toLowerCase(); if(!usedAuthors.has(k)){ selected.push(p); usedAuthors.add(k);} }
for (const p of scanned) { if (selected.length>=SELECT) break; if(!selected.includes(p)) selected.push(p); }
console.log(`\nSelected ${selected.length} (distinct authors: ${new Set(selected.map(p=>p.authorName)).size})`);

// Download images (dedupe by URL), flat files for upload-to-content-hub.mjs
const manifest = []; const byUrl = new Map(); let pos = 0;
async function download(src, kind, slug, alt) {
  if (!src) return null;
  if (byUrl.has(src)) return byUrl.get(src);
  const ext = (extname(new URL(src).pathname).replace('.','') || 'jpg').toLowerCase().split('?')[0];
  const localFile = `${kind}-${slug}.${ext}`;
  try {
    const buf = await fetchBin(src);
    writeFileSync(join(IMG_DIR, localFile), buf);
    const entry = { src, alt: alt||'', localFile, extension: ext, sectionPosition: ++pos,
      type:'img', kind, slug, fileSize: buf.length, status:'downloaded', uploadStatus:'pending' };
    manifest.push(entry); byUrl.set(src, entry);
    console.log(`IMG ${localFile} ${(buf.length/1024).toFixed(1)}KB`);
    return entry;
  } catch(e) {
    const entry = { src, alt: alt||'', localFile, extension: ext, sectionPosition: ++pos, type:'img', kind, slug, status:'failed', error:e.message };
    manifest.push(entry); byUrl.set(src, entry); console.log(`IMG FAIL ${src} ${e.message}`); return entry;
  }
}
for (const p of selected) {
  p.heroLocalFile = (await download(p.heroImage,'article',p.slug,p.heroAlt))?.localFile || null;
  await sleep(300);
}
const authorsMap = new Map();
for (const p of selected) {
  const key = p.authorName.toLowerCase();
  if (!authorsMap.has(key)) {
    const aSlug = p.authorName.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    authorsMap.set(key, { name:p.authorName, slug:aSlug, sitecoreItemName:p.authorName, position:p.authorTitle||'',
      bioHtml:p.authorBioHtml||'', sourceAuthorUrl:p.authorPageUrl||'', avatarSource:p.authorAvatar||'', avatarAlt:p.authorName, articles:[] });
  }
  authorsMap.get(key).articles.push(p.slug);
  if (!authorsMap.get(key).bioHtml && p.authorBioHtml) authorsMap.get(key).bioHtml = p.authorBioHtml;
  if (!authorsMap.get(key).position && p.authorTitle) authorsMap.get(key).position = p.authorTitle;
}
for (const a of authorsMap.values()) {
  a.avatarLocalFile = (await download(a.avatarSource,'author',a.slug,a.name))?.localFile || null;
  await sleep(300);
}

writeFileSync(join(OUT,'articles.json'), JSON.stringify(selected,null,2));
writeFileSync(join(OUT,'authors.json'), JSON.stringify([...authorsMap.values()],null,2));
writeFileSync(join(IMG_DIR,'image-manifest.json'), JSON.stringify(manifest,null,2));
writeFileSync(join(OUT,'scanned-candidates.json'), JSON.stringify(scanned.map(({contentHtml,...r})=>({...r,contentChars:contentHtml.length})),null,2));
console.log(`\nWrote articles.json (${selected.length}), authors.json (${authorsMap.size}), images/image-manifest.json (${manifest.length})`);
