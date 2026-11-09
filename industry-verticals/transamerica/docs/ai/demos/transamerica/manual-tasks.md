# Manual Tasks — Transamerica Demo

## Variant selection (required)

Open Home in Pages and set variants per `variant-checklist.md`:

| Component | Variant |
|-----------|---------|
| Hero | HeroDiagonalNavy |
| Promo CTA (Go the Distance) | PromoHexImage |
| Promo CTA (Life Insurers) | WithBackgroundImage |
| Stats Counter | StatsWithHexImage |

## Page cleanup (recommended)

Remove leftover Prospera starter components from Home (`headless-main`):

| Component | Instance ID | Reason |
|-----------|-------------|--------|
| Carousel | `124106de-fb02-4b43-a521-a309fc75a5bc` | Replaced by Hero |
| Four Column CTA (duplicate) | `0147a427-965d-42ea-9748-f5ff9c0bbfb6` | Duplicate of Featured Resources |
| Promo CTA 2 | `1a516b9b-cc7b-49c9-a8eb-5be281a98612` | Extra starter promo |
| Article List | `854de8ce-208f-494d-b7c8-c1162d00144f` | Not in Transamerica homepage |
| Documents List | `251b0936-4659-4127-9952-52ca5140d803` | Not in Transamerica homepage |
| App Promo | `7ebe6f29-1c6f-4138-8bf9-287acf0cd530` | Not in Transamerica homepage |

## Reorder (recommended)

Ideal order after cleanup:

1. Hero
2. Promo CTA (Go the Distance)
3. Three Column CTA (Product Focus)
4. Promo CTA (Life Insurers)
5. CTA Banner (We've Got You)
6. Four Column CTA (Featured Resources)
7. Stats Counter
8. Two Column CTA (How to Work With Us)
9. Five Column CTA (Service Icons)
10. Quote (Trustpilot)

Five Column is currently above Three Column — drag it down after Two Column.

## Header / Footer / Eyebrow

Context-only (partial designs). Update logo + nav labels in Pages Partial Designs:

- Nav: Insurance, Retirement, Investments, Life & Wealth
- Logo: Transamerica red pyramid mark (Content Hub asset if uploaded)

## Editing host

Connect GitHub repo / branch for editing host `7FfVZylAknVFI37OXGGc8a` (`transamerica`) in XM Cloud Deploy Portal if not already linked.

## Personalization (optional)

Create segment datasources under `/sitecore/content/Transamerica/Transamerica/Data/Transamerica Demo` using naming `<Client> - <Component> - <Segment>`, then Personalize in Pages.
