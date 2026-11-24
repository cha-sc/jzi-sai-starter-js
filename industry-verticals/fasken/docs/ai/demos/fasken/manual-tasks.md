# Manual Tasks — Fasken Demo

## Variant selection (required)

Open Home in Pages and set variants per `variant-checklist.md`:

| Component | Variant |
|-----------|---------|
| Hero | FaskenSplitHeroCarousel |
| Three Column CTA (insights strip) | FaskenInsightsStrip |
| Three Column CTA (Experience / News / Knowledge / Events) | FaskenImageCards |

## Page cleanup (required)

Remove leftover Prospera starter components from Home (`headless-main`):

| Component | Instance ID | Reason |
|-----------|-------------|--------|
| Carousel | `124106de-fb02-4b43-a521-a309fc75a5bc` | Replaced by Hero |
| Promo CTA | `d49a8931-f041-4988-9cc3-f2400e6422d0` | Prospera starter |
| Five Column CTA | `b882746c-c313-4283-8f58-b9402bcf9c6a` | Prospera starter |
| Promo CTA | `633506e7-54d0-4410-9051-72fb4c9fecb4` | Prospera starter |
| Promo CTA | `1a516b9b-cc7b-49c9-a8eb-5be281a98612` | Prospera starter |
| Two Column CTA | `0ed2d2c2-e9ef-4e40-b040-6289cb174e03` | Prospera starter |
| Article List | `854de8ce-208f-494d-b7c8-c1162d00144f` | Prospera starter |
| Documents List | `251b0936-4659-4127-9952-52ca5140d803` | Prospera starter |
| App Promo | `7ebe6f29-1c6f-4138-8bf9-287acf0cd530` | Prospera starter |

## Reorder (recommended)

Ideal order after cleanup:

1. Hero (FaskenSplitHeroCarousel)
2. Three Column CTA — Insights (FaskenInsightsStrip)
3. Three Column CTA — Experience (FaskenImageCards)
4. Three Column CTA — News (FaskenImageCards)
5. Three Column CTA — Knowledge (FaskenImageCards)
6. Three Column CTA — Events (FaskenImageCards)

## Header / Footer / Eyebrow

Context-only (partial designs). Update in Pages Partial Designs:

- Wordmark: **FASKEN** (+ Own tomorrow tagline if desired)
- Primary nav: People, Services, Experience, Knowledge, More
- Utility: Careers, Offices, News, Events, Contact
- Footer: social icons + multi-column sitemap + dark legal bar

## Section headings (optional polish)

Live site shows orange-triangle headings above card grids (“Our proof…”, “In the News”, “Knowledge”, “Events”). Add Title/Rich Text blocks above each Three Column CTA if you want pixel-perfect section chrome.

## Editing host

Connect GitHub repo / branch for editing host `4uaMhE1y7r6TWGU7Q8EVJ1` (`fasken`) in XM Cloud Deploy Portal if not already linked.

## Personalization (optional)

Create segment datasources under `/sitecore/content/Fasken/Fasken/Data/Fasken Demo` using naming `<Client> - <Component> - <Segment>`, then Personalize in Pages.
