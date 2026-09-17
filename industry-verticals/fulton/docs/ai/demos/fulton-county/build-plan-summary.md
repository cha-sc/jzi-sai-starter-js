# Fulton County Government — Build Plan

> **Source:** https://www.fultoncountyga.gov/
> **Analyzed:** 2026-09-17
> **Sections:** 8 (6 existing PLAY components, 2 custom)
> **Content root:** `/sitecore/content/fulton-county/fulton-county`
> **Code root:** `industry-verticals/fulton`

---

## Environment notes

| Check | Result |
|-------|--------|
| Sitecore site | `fulton-county` at `/sitecore/content/fulton-county/fulton-county` |
| Path you gave (`…/Fulton County`) | Not found — using lowercase `fulton-county` site folder |
| Home page today | Still **PLAY! Financial** banking demo content |
| Theme | Already applied (navy `#002d53` / blue `#174a7c` / orange `#e46e2b`, Oswald + Open Sans) |
| Content Hub | Credentials verified |

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Thin navy utility bar with Elections, Jobs, Calendar, Payments, etc._ | Eyebrow | Default | High | Partial design — content update |
| 2 | _White bar: oak seal logo + FULTON/COUNTY + uppercase mega-nav_ | Header | Default | High | Partial design — logo + nav |
| 3 | _Full-bleed Government Center photo with centered “I need help finding…” search_ | Hero | **SearchOverlay** (new) | Medium | Custom variant |
| 4 | _Navy “TOP SERVICES” with 8 white icon cards (4×2)_ | **TopServices** (new) *or* 2× Four Column CTA | FourByTwo | Medium | Custom preferred |
| 5 | _“News & Information” cards with image, date, headline, Read More_ | Article List | Default | High | Replace finance articles |
| 6 | _“What is my District?” address form + map/district list_ | **DistrictFinder** (new) | Default | Low | Visual demo only (no live GIS) |
| 7 | _Board of Commissioners profiles (Chairman + districts)_ | Author List | Default | High | May need Fulton card styling |
| 8 | _Footer contact + helpful links + social + ©2026_ | Footer | Default | High | Partial design — content update |

---

## Sections that need attention

> [!WARNING]
> These need custom work or an explicit fallback choice.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Hero is search-first, not title/CTA_ | Current Hero expects headline + button | Add `SearchOverlay` variant to Hero |
| 4 | _8 icon cards on navy_ | Four Column CTA only holds 4 items | Custom `TopServices` **or** stack two Four Column CTAs |
| 6 | _Interactive district lookup_ | No GIS in this kit | Visual DistrictFinder (form chrome + map image); form can be non-functional for demo |

---

## Variant Decisions

| # | Component | Variant | Why |
|---|-----------|---------|-----|
| 3 | Hero | SearchOverlay | Live site has no hero headline — search bar is the primary UI |
| 4 | TopServices | FourByTwo | Matches navy section + 4×2 icon card grid |
| 7 | Author List | Default (+ style polish) | People grid maps to commissioners; orange district labels via theme |

---

## Components by type

### Will be added / rewired on Home (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 3 | Hero (SearchOverlay) | Simple — image + search placeholder |
| 4 | TopServices or dual Four Column CTA | 8 service cards |
| 5 | Article List | Existing articles folder → Fulton news |
| 6 | DistrictFinder (or Two Column CTA fallback) | Form copy + map image + district links |
| 7 | Author List | 6–7 commissioner people items |

### Must be updated in partials (manual / Content Editor)

| # | Component | Where | What to do |
|---|-----------|-------|------------|
| 1 | Eyebrow | Header partial | Fulton utility links |
| 2 | Header | Header partial | Logo + main nav labels |
| 8 | Footer | Footer partial | Contact + helpful links |

### Custom components needed

| # | What's on the page | Suggested approach | Fields |
|---|-------------------|-------------------|--------|
| 3 | Search hero | Hero variant `SearchOverlay` | Image, SearchPlaceholder, optional Title |
| 4 | Top Services grid | New `TopServices` **or** style two Four Column CTAs | Title, Eyebrow, 8× (Icon, Title, Link) |
| 6 | District finder | New `DistrictFinder` (visual) | Title, Description, Placeholder, MapImage, Districts |

### Remove from Home (PLAY finance leftovers)

Comparison, finance Carousel, Promo CTAs, App Promo, Documents List (if finance-specific).

---

## Build Order

```
Phase A — Partials: Eyebrow + Header logo/nav + Footer contact/links
Phase B — Home cleanup: remove PLAY finance components
Phase C — Hero SearchOverlay + Top Services
Phase D — Article List (Fulton news) + Author List (commissioners)
Phase E — DistrictFinder (custom) or Two Column CTA fallback
Phase F — Visual QA against screenshot
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table to the screenshot.
2. **Do you want pixel-perfect custom variants** (Hero SearchOverlay, TopServices 4×2, DistrictFinder), **or** are generic PLAY components enough (Hero Default + dual Four Column CTA + Two Column CTA for district)?

> Reply **approved** (and answer Q2) to proceed, or describe any changes needed.

**Note:** Content writes will target `/sitecore/content/fulton-county/fulton-county` (verified live). The path `…/Fulton County` does not exist in this environment.
