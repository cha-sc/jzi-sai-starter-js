# Heart and Stroke CA — Demo Build Summary

> **Client:** Heart and Stroke CA  
> **Source:** https://www.heartandstroke.ca/  
> **Built:** 2026-10-09  
> **Page:** `/sitecore/content/HeartAndStrokeCA/HeartAndStrokeCA/Home`  
> **Code:** `industry-verticals/heart-and-stroke-ca/`

---

## Build Overview

| Metric | Count |
|--------|-------|
| Template components used | 10 (+ Header/Footer context) |
| Custom components built | 0 |
| Custom variants created | 12 |
| Datasource items created | 10 |
| Images uploaded (Content Hub) | ~12 |

---

## Component Inventory

| # | Component | Variant (manual) | Datasource | Status |
|---|-----------|------------------|------------|--------|
| 1 | Header | HeaderDarkDonate | context / partial | ⚠️ Needs variant |
| 2 | Hero | HeroFullBleedPills | HeartAndStrokeCA - Hero | ⚠️ Needs variant |
| 3 | Three Column CTA | PrioritiesCarousel | Key Priorities | ⚠️ Needs variant |
| 4 | Promo CTA | StoryOverlayCard | Sharon Story | ⚠️ Needs variant |
| 5 | Two Column CTA | ResearchDualTiles | Research Stories | ⚠️ Needs variant |
| 6 | Documents List | InvolvedLinkList | Get Involved | ⚠️ Needs variant |
| 7 | Two Column CTA | GivingPromoTiles | Ways to Give | ⚠️ Needs variant |
| 8 | Three Column CTA | ArticlesFeatureStack | Latest Articles | ⚠️ Needs variant |
| 9 | Three Column CTA | RecipesCarousel | Recipes | ⚠️ Needs variant |
| 10 | Heading CTA | MottoBeat | Motto | ⚠️ Needs variant |
| 11 | Contact Form | NewsletterBand | Newsletter | ⚠️ Needs variant |
| 12 | Footer | FooterCharcoal | context / partial | ⚠️ Needs variant |

Datasources are wired. Select variants in Pages per [variant-checklist.md](./variant-checklist.md).

---

## Theme

| Property | Value |
|----------|-------|
| Primary | `#DD2211` |
| Charcoal | `#151212` |
| Delivery | CSS variables + `_hs-demo.scss` |

---

## Manual follow-ups

See [manual-tasks.md](./manual-tasks.md):

- Remove leftover Prospera components (Carousel, Five Column, extra Promos, Article List, App Promo)
- Set all 12 variants in Pages
- Header/Footer content polish on partial designs
- Deploy editing host so new exports resolve

---

## Editing host

- Environment ID: `7zQcetaNT2UAkmcX7EDuWI`
- Rendering host key: `heart-and-stroke-ca`
