# Fasken — Build Plan

> **Source:** https://www.fasken.com/en  
> **Analyzed:** 2026-11-24  
> **Library:** Financial / SXA (Prospera stack in `industry-verticals/fasken`)  
> **Sections:** 9 (7 API template, 2 context-only, 0 required custom — optional Phase 5.5 polish)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Utility links: Careers / Offices / News / Events / Contact_ | Eyebrow | Default | High | |
| 2 | _White bar: FASKEN wordmark + People / Services / Experience / Knowledge / More +_ | Header | WithLogoImage | High | Context-only |
| 3 | _Split hero: Mining Law Firm of the Year + LEARN MORE + abstract metal image + numbered tabs 01–05_ | Hero | Default | Medium | Optional FaskenSplitHeroCarousel |
| 4 | _Three text insights (ESG study, Private M&A book, Mining achievement)_ | Three Column CTA | Default | High | |
| 5 | _Our proof is in our clients' success — 3 deal photo cards + ALL EXPERIENCE_ | Article List | ThreeColumn | High | |
| 6 | _In the News — 3 news cards + ALL NEWS_ | Article List | ThreeColumn | High | |
| 7 | _Knowledge — 3 bulletin cards + ALL KNOWLEDGE_ | Article List | ThreeColumn | High | |
| 8 | _Events — 3 upcoming events + ALL EVENTS_ | Article List | ThreeColumn | High | |
| 9 | _Social icons + multi-column links + dark legal bar_ | Footer | WithSocials | High | Context-only |

---

## Sections that need attention

> [!NOTE]
> All sections matched Financial templates. Optional Phase 5.5 can tighten the hero carousel and orange triangle section markers.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Left copy / right image + numbered slide tabs_ | Default Hero overlays text on image | Optional **FaskenSplitHeroCarousel** |
| 5–8 | _Orange triangle beside section titles_ | List Title is plain text | Optional heading accent in theme CSS, or small custom marker |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 2 | Header | WithLogoImage | Solid white bar with wordmark |
| 5–8 | Article List | ThreeColumn | Image + category + headline + excerpt card grids |
| 9 | Footer | WithSocials | Social row + multi-column sitemap |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | Hero | Simple + abstract metal hero image |
| 4 | Three Column CTA | Simple (3 insight columns) |
| 5 | Article List (Experience) | List (3 deal articles) |
| 6 | Article List (News) | List (3 news items) |
| 7 | Article List (Knowledge) | List (3 bulletins) |
| 8 | Article List (Events) | List (3 events) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial design | Logo + main nav labels |
| 9 | Footer | Footer partial design | Columns + social + legal |

### Custom components needed

None required — all sections matched template components. Optional Phase 5.5: **FaskenSplitHeroCarousel**.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Eyebrow
  2. Hero
  3. Three Column CTA (insights)
  4. Article List (Experience / proof)
  5. Article List (News)
  6. Article List (Knowledge)
  7. Article List (Events)

Phase 2 — Apply theme (CSS variables + fonts)

Phase 3 — Optional custom variants (if approved)
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table against the homepage screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5: FaskenSplitHeroCarousel) **or are the generic template variants sufficient?**

> Reply "approved" to proceed, and answer question 2 (custom variants vs generic).
