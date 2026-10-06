# Manual Tasks — CPP Demo

## Deploy editing host

Connect `industry-verticals/cpp` in XM Cloud Deploy Portal (GitHub) so editing host `29FaiivpZZkXlP4vYhIj7Y` picks up theme CSS + `HeroSplitCream` / `ProductCardsCarousel` / `WithIcons`.

## Variant selection (required)

See `variant-checklist.md`. Set Hero → HeroSplitCream, Product Cards → ProductCardsCarousel, Action Tiles → WithIcons.

## Add list components (API branch templates missing)

`add_component_on_page` fails for Testimonials / Accordion (`Branches/Project/Verticals/...` 404). In Pages, add and point datasources to:

| Component | Datasource path |
|-----------|-----------------|
| Testimonials | `/sitecore/content/IOF/CPP/Data/CPP Demo/CPP - Testimonials` |
| Accordion | `/sitecore/content/IOF/CPP/Data/CPP Demo/CPP - FAQ` |

Place Testimonials after Product Cards; Accordion after Action Tiles / before Closing CTA.

## Remove leftover Prospera sections (required)

Home still has starter components that cannot be removed via Marketer MCP. In Pages, delete or hide:

- Carousel
- Five Column CTA
- Promo CTA (extra — “Unlock checking…”)
- Two Column CTA
- Article List
- Documents List

Ideal order after cleanup:

1. Hero (HeroSplitCream)
2. Promo CTA (Simplified issue)
3. Heading CTA (Do I need life insurance?)
4. Three Column CTA (ProductCardsCarousel)
5. Testimonials *(manual add)*
6. Promo CTA (You're not hard to insure)
7. App Promo (Easy everything)
8. Three Column CTA (WithIcons action tiles)
9. Accordion FAQ *(manual add)*
10. CTA Banner (Closing)

## Context chrome (partial designs)

- Eyebrow / Header / Footer live in Page Design — update logo to CPP (`https://www.cpp.ca/wp-content/uploads/2025/10/CPP-Logo-RGB-ENG.svg` or CH upload) and nav labels in Content Editor.
- Home `Title` set to **Canada Protection Plan**.

## Preview

Editing host env: `29FaiivpZZkXlP4vYhIj7Y` · site `CPP` · collection `IOF`
