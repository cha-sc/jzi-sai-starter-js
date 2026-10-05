# Manual Tasks — Renasant Bank Demo

## Deploy editing host (if not already)

Connect `industry-verticals/renasant-bank` in XM Cloud Deploy Portal so the editing host picks up theme CSS + new React variants.

## Variant selection (required)

See `variant-checklist.md`. Set SecurityBanner, HeroWithLoginPanel, ProductTabs, DualButtonRow, ArticleCarousel, and Heading CTA → Centered.

## Remove leftover Prospera sections (required)

Home still has starter components that cannot be removed via Marketer MCP. In Pages, delete or hide:

- Promo CTA (×3)
- Three Column CTA
- Article List
- Documents List

Ideal order after cleanup:

1. CTA Banner (security)
2. Hero
3. Heading CTA
4. Five Column CTA
5. Two Column CTA
6. App Promo
7. Carousel

(Carousel currently sits high on the page — drag it below App Promo after cleanup.)

## Context chrome (partial designs)

- Eyebrow / Header / Footer live in Page Design — update logo (`docs/ai/themes/renasant-bank/images/logo.png`) and nav labels (Personal, Business, Mortgage) in Content Editor if not already skinned.
- Do **not** wire a real login form; HeroWithLoginPanel uses demo CTAs only.

## Datasource note

Dedicated items under `/Data/Renasant Bank Demo/` were created. Page currently shows content via Home/Data + shared Promo folders (auto-datasources) because `set_component_datasource` to shared Demo folder items did not persist on Final layout for several components. Content values match Renasant copy either way.

## Preview

Editing/preview host: `https://xmc-3jyhrgh8zgi4noyeawnjrh-eh.sitecorecloud.io` (site `RenasantBank`)
