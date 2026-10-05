# Renasant Bank Demo Summary

**Source:** https://www.renasantbank.com/  
**Code:** `industry-verticals/renasant-bank/`  
**Content:** `/sitecore/content/RenasantBank/RenasantBank`  
**Quality:** Pixel-perfect (Phase 5.5)

## What shipped

| Phase | Status | Notes |
|-------|--------|-------|
| Theme | Done | Navy `#041645`, blue `#1B6BB8`, orange `#E85E25`; Outfit + Mulish |
| Content | Done | 15 CH images; demo folder + page-local datasources populated |
| Variants | Done | SecurityBanner, HeroWithLoginPanel, ProductTabs, DualButtonRow, ArticleCarousel |
| Assembly | Partial | Components on Home; leftover Prospera sections + variant picker are manual |

## Pixel-perfect variants

- `CtaBanner.SecurityBanner` — slim medium-blue security strip
- `Hero.HeroWithLoginPanel` — full-bleed hero + navy demo CTA panel (no credential form)
- `FiveColumnCta.ProductTabs` — icon tab row
- `TwoColumnCta.DualButtonRow` — outline + solid CTA pair
- `Carousel.ArticleCarousel` — peeking story cards with arrows

## SE follow-ups

1. Deploy EH / pull latest app code  
2. Set variants (`variant-checklist.md`)  
3. Remove leftover Promo/Article/Documents sections (`manual-tasks.md`)  
4. Confirm header logo + footer chrome  

## Demo folder (backup datasources)

`/sitecore/content/RenasantBank/RenasantBank/Data/Renasant Bank Demo` (`d2323f58-c4d1-49d7-a294-8f1dacb99b97`)
