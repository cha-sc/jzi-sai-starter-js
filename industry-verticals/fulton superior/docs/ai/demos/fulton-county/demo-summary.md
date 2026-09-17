# Fulton County Demo Summary

**Client:** Fulton County Government  
**Source:** https://www.fultoncountyga.gov/  
**Code:** `industry-verticals/fulton`  
**Content:** `/sitecore/content/fulton-county/fulton-county`  
**Completed:** 2026-09-17  

## What shipped

### Code (pixel-perfect variants)
- Theme tokens (navy `#002d53`, secondary `#174a7c`, accent `#e46e2b`, Oswald + Open Sans)
- React exports named **`FultonCounty`** on:
  - `Hero` — full-bleed search overlay
  - `FourColumnCta` — navy Top Services icon cards
  - `TwoColumnCta` — district finder layout
  - `ArticleList` — news section styling
  - `AuthorList` — Board of Commissioners cards

### Sitecore Headless Variants
Created under `…/Presentation/Headless Variants/*/FultonCounty` for Hero, Four Column CTA, Two Column CTA, Article List, Author List.

### Content Hub
42 images uploaded to `cha-verticals-0914.sitecoresandbox.cloud` (see `images/image-manifest.json`).

### Datasources populated
| Datasource | Purpose |
|------------|---------|
| `Fulton County - Hero` + local `FultonHero` | Search hero |
| Top Services Four Column ×2 (shared + local) | 8 service cards |
| District Finder Two Column (shared + local + wired `Two Column CTA 1`) | District section |
| Articles / Authors / About pages retitled | News + BOC + About |
| Five / Three Column + Promo CTAs on Home | Interim service + news content while layout API is blocked |

### Home page content updates (live on existing components)
- Title: **Fulton County Government**
- District Finder copy on existing Two Column CTA
- Top Services messaging on Five + Three Column CTAs
- News Promos + Articles/Authors/About titles
- Carousel slide 1 interim search messaging

## Blockers (manual finish required)

Agent API cannot complete layout assembly on this tenant:

- `add_component_on_page` → **500** (creates orphan local datasources under `Home/Data`, does not place rendering)
- `set_component_datasource` → **500** (“No saveItem”)
- `FieldNames` / headless variants cannot be set via MCP (known limitation)

**Follow the checklists:**
1. [`manual-assembly.md`](./manual-assembly.md) — place Hero + Two× Four Column CTA + Author List; remove finance leftovers
2. [`variant-checklist.md`](./variant-checklist.md) — set **FultonCounty** on each

## Suggested final Home order

1. Hero (`FultonCounty`) — Government Center + “I need help finding…”
2. Four Column CTA ×2 (`FultonCounty`) — Top Services
3. Two Column CTA (`FultonCounty`) — District Finder
4. Article List (`FultonCounty`) — News
5. Author List (`FultonCounty`) — Board of Commissioners
6. Optional: keep one Promo CTA news strip; remove Carousel, Documents List, App Promo, Comparison

## QA after Pages assembly

- [ ] Home first viewport matches search-first hero (not bank carousel)
- [ ] Eight Top Services cards, navy cards, orange accents
- [ ] District finder section with SEARCH CTA
- [ ] News + Commissioners sections use FultonCounty variants
- [ ] Header/footer brand colors from theme
- [ ] Preview / publish site

## Orphan cleanup (optional)

Under `Home/Data`, unused locals from failed adds: `Fulton_County_Hero`, `Fulton_Top_Services_*`, `Fulton_District_Finder`, `FultonHero` — keep until Pages wiring is done, then delete duplicates.
