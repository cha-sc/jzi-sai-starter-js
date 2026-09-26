# PJM — Manual assembly tasks

Page layout APIs returned 500 for Home (empty Page Design). Datasources and variants are ready; place components in Pages / Experience Editor.

## Home page

Path: `/sitecore/content/PJM/PJM/Home`  
ID: `5f048f46-a3db-42fd-b0ed-265661cd89de`

### Datasources (`/sitecore/content/PJM/PJM/Data/PJM Demo`)

| Item | ID | Rendering | Variant |
|---|---|---|---|
| PJM - Hero | `930ca713-31a5-4846-b73d-ac2ed03abd92` | Hero | Default |
| PJM - Trending Topics | `ef7cc5ea-f356-47a6-a6e7-cecee5154621` | Promo CTA | **HeroOverlayPanel** |
| PJM - Meetings Training | `b028cc3c-1e09-416c-8226-25119d6284f0` | Documents List | Default |
| PJM - Current Conditions | `d9192454-a8db-4521-b71e-defccab23372` | Features | **DataDashboard** |
| PJM - News Highlights | `7d6ae6c3-ebf9-4e1b-8fda-757de18eb75f` | Documents List | Default |
| PJM - Latest Filings | `fc9a2c71-2042-4941-9da3-22a4adab1c25` | Documents List | Default |
| PJM - App Promo | `aa76dee6-e0ac-442e-ac2d-d432ec22334f` | App Promo | Default |

### Rendering IDs (Financial)

| Component | Rendering ID |
|---|---|
| Hero | `b7cdf75e-716a-4c59-b9b1-cd970ae0a4ae` |
| Promo CTA | `1a375fac-6cc1-4a5a-a159-9bc6dbc66b80` |
| Documents List | `ccc3a815-5de9-4529-bad5-874548667d66` |
| Features | `b7efffdb-2f0c-4c5e-a8be-d9f8677f01da` |
| App Promo | `f9905f68-21e8-4c6f-8b89-56bb99020d31` |

### Suggested order on `headless-main` (or page body placeholder)

1. Hero (+ compose Trending Topics overlay nearby / after)
2. Meetings Training + Current Conditions (two-column if available)
3. News Highlights
4. Latest Filings
5. App Promo

### Context / partials (manual)

- Header / Navigation — update logo + lowercase nav labels
- Footer — ensure columns; rainbow stripe is in CSS (`_pjm-demo.scss`)
- Eyebrow utility bar — style via theme (dark charcoal)

### Variants created in Sitecore

- `/Presentation/Headless Variants/Promo CTA/HeroOverlayPanel` → `9b4affaf-1d0d-49f9-b7c2-cc82f6d164b0`
- `/Presentation/Headless Variants/Features/DataDashboard` → create confirmed under Features

### Local app

```bash
cd industry-verticals/pjm
npm install   # if needed
npm run dev
```

Ensure `NEXT_PUBLIC_DEFAULT_SITE_NAME=PJM` in `.env.local`.
