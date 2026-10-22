# Highspot Blog → Seismic — STAGED (local only)

**Status: FETCHED & STAGED LOCALLY — STOPPED. Nothing created in Sitecore. Nothing uploaded to Content Hub.**
Awaiting explicit go-ahead to (1) upload images to Content Hub, then (2) create Author + Article items via Marketer MCP.

Source: https://www.highspot.com/blog/ · Scraped: 2026-10-22 · Site: Seismic (`f6014c56-bb4f-4cc0-9cdf-0737140ee17d`, root `/sitecore/content/Seismic/Seismic/Home`)

## Selection — 10 posts, 10 distinct authors

Selected in blog-index order, maximising distinct authors. Excluded: `ai-for-gtm-go-to-market` — already in Sitecore as `/articles/ai-for-gtm-go-to-market` ("How to blend purpose-built and horizontal AI for GTM").

| # | Article (Sitecore slug under `/articles/`) | Author (under `/authors/`) | Published | Read | Category |
|---|---|---|---|---|---|---|
| 1 | `seismic-completes-highspot-merger` | Highspot by Seismic Team | 2026-08-18 | 3 min | Highspot News |
| 2 | `highspot-summer-launch-ai-deal-execution` | Chrissy Koskovich — Product Marketing Director | 2026-07-13 | 3 min | Highspot News |
| 3 | `highspot-chatgpt-turn-deal-context-into-action` | Bridgette Roberts — Product Marketing Manager | 2026-06-08 | 4 min | Sales Enablement Strategy |
| 4 | `highspot-gtm-agent-spring-launch-2026` | Lucas Welch — VP of Communications | 2026-05-04 | 5 min | Highspot News |
| 5 | `enterprise-ai-for-go-to-market` | Laura Valerio — Global Evangelist, GTM Performance | 2026-08-14 | 14 min | Sales Enablement Strategy |
| 6 | `revenue-ai-build-buy-partner` | Stuart Gammon — Chief Revenue Officer | 2026-08-12 | 13 min | Sales Enablement Strategy |
| 7 | `ai-tech-stack-for-go-to-market` | Jodi Sutton — VP of Revenue Operations | 2026-08-11 | 17 min | Sales Enablement Strategy |
| 8 | `best-sales-onboarding-software` | Brooke Holland — Revenue Enablement Manager | 2026-08-04 | 14 min | Sales Training, Coaching, and Onboarding |
| 9 | `sales-conversations` | Haley Katsman — VP, Global Strategic Accounts | 2026-07-13 | 12 min | Sales Training… |
| 10 | `habits-top-sellers-2026` | Brie Tobin — Sr. Director, SMB & Commercial Sales | 2026-07-13 | 4 min | Sales Training… |

Full extracted content (title, excerpt, hero, date, category, cleaned Rich-Text body in `<div class="ck-content">`, author name/title/bio/avatar): `articles.json`, `authors.json`. All 27 other scanned candidates: `scanned-candidates.json`.

## Sitecore mapping (verified live via Marketer MCP, read-only)

- **Articles parent:** `/sitecore/content/Seismic/Seismic/Home/articles` (`786d0f23-3c25-4272-90b6-4c520e65624b`) — only allowed child template: **Article Page** (`f83ccefd-fc41-4a60-9882-8f7ea5cf41a8`)
  Fields: `Title`, `Excerpt`, `Content` (rich text), `Thumbnail` + `BackgroundImage` (image — both set to hero, matching existing migrated article), `NavigationTitle`, `baseMetadata*`, `baseOg*`.
- **Authors parent:** `/sitecore/content/Seismic/Seismic/Home/authors` (`23922c3a-79f0-4f0c-9a01-ed6418261c0c`) — only allowed child template: **Author Page** (`aad350f5-9331-4d71-a942-e3643653c028`)
  Fields: `Name`, `Position`, `Bio` (rich text), `Photo` (image), `NavigationTitle`, `baseMetadata*`, `baseOg*`.
- **Article ↔ Author link:** Article template has **no author field**. Verified on existing articles (`ai-for-gtm-go-to-market`, `closing-the-wealth-gap`): an **Author Widget** (`9d7de58d-9da4-43d8-8371-3c728a582adc`, the only allowed component in `article-meta`) sits in placeholder `/headless-main/sxa-article-content/article-meta-0-1` with its **datasource = the Author Page item**. Plan per article: `create_page` → `add_component_on_page` (Author Widget) → `set_component_datasource` (new Author Page GUID). Exact payloads for all 20 items: `create-plan.json`.

## Content Hub (images)

20 images downloaded to `images/` (10 article heroes + 10 author avatars, 17 MB total) with `images/image-manifest.json` in the exact format `docs/ai/scripts/upload-to-content-hub.mjs` consumes (`status: downloaded`, `uploadStatus: pending`).

- Host: `https://cha-verticals-0914.sitecoresandbox.cloud/` · Config: `AssetUploadConfiguration` · Auth: simple, from `docs/ai/config/credentials.local.yaml` (gitignored ✓ — script loaded it, password never printed)
- **Dry-run verified: 20/20 uploadable. No upload performed.**
- On go-ahead: `node docs/ai/scripts/upload-to-content-hub.mjs --images-dir docs/ai/demos/highspot-blog/images` → approves each asset, creates public link, writes `imageFieldXml` back into the manifest → those XML strings fill `Thumbnail`/`BackgroundImage` (articles) and `Photo` (authors) in `create-plan.json` (currently `<<PENDING_CONTENT_HUB_UPLOAD:…>>` placeholders).
- ⚠️ `article-highspot-chatgpt-turn-deal-context-into-action.jpg` is 14.5 MB (original). Upload as-is unless you want it resized first.
- Inline body images (3 genuine in-text images in the Summer Launch post) stay hotlinked to highspot.com — only hero + avatar go to Content Hub, per the brief.

## Files

| File | Contents |
|---|---|
| `scrape-highspot.mjs` | Reproducible scraper (`node scrape-highspot.mjs --candidates 30 --select 10`) |
| `articles.json` / `authors.json` | Full extracted content for the selected 10 + 10 |
| `create-plan.json` | Exact Marketer MCP payloads (create_page ×20, Author Widget link ×10), gated |
| `images/` + `images/image-manifest.json` | Downloaded hero/avatar images, ready for Content Hub upload |
| `scanned-candidates.json` | The other scanned posts (metadata only) |

## Next steps (on your word)

1. Upload 20 images to Content Hub (script above), collect `imageFieldXml` per file.
2. Create 10 Author Pages under `/authors/` (`create_page`, Author Page template).
3. Create 10 Article Pages under `/articles/` (`create_page`, Article Page template) with Content Hub image XML.
4. Add Author Widget to each article and `set_component_datasource` to its author; verify each with `get_content_item_by_id` / `get_components_on_page`.
