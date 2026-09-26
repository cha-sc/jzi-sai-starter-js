# PJM — Build Plan

> **Source:** https://www.pjm.com/
> **Analyzed:** 2026-09-26
> **Library:** Financial / SXA (not UIIM)
> **Sections:** 10 (8 template, 2 custom/partial attention)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Dark utility bar: Sign In, search, Communities, Calendar_ | Eyebrow | Default | High | |
| 2 | _White header with pjm logo + lowercase nav links_ | Header | Default | High | Context-only, manual |
| 3 | _Full-bleed control-room photo with “Working to perfect the flow of energy ®”_ | Hero | Default | High | |
| 4 | _Dark trending-topics box on hero with PDF/web links + “The Value of PJM” button_ | Promo CTA | Default | Medium | Overlay layout is partial match |
| 5 | _Left column “Meetings \| Training” date-grouped event list_ | Documents List | Default | Medium | Event list, not filings |
| 6 | _Right column LMP map, price table, fuel-mix donut, load forecast_ | **Custom DataDashboard** (or static Features + images) | — | Low | No SXA widget for live data |
| 7 | _News headlines with thumbnails + social icons_ | Article List | Default | High | |
| 8 | _Latest Filings & Orders list_ | Documents List | Default | High | Second instance |
| 9 | _Blue “Get the app! PJM Now” tile_ | App Promo | Default | High | |
| 10 | _Rainbow stripe + dark multi-column footer + copyright_ | Footer | Default | High | Context-only, manual |

---

## Sections that need attention

> [!WARNING]
> These sections have low confidence or need custom work. Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | _Trending topics overlay on hero_ | Promo CTA content fits; overlay-on-hero layout does not | Accept side-by-side composition, or Phase 5.5 `HeroOverlayPanel` |
| 6 | _Live LMP / fuel mix / load charts_ | No Financial component for interactive market widgets | Static screenshot images in Features/Three Column CTA, **or** custom `DataDashboard` |

---

## Variant Decisions

All planned variants are **Default** for Financial/SXA components. Overlay/dashboard polish is optional Phase 5.5 work, not a different stock variant.

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | Hero | Simple |
| 4 | Promo CTA | Simple |
| 5 | Documents List (Meetings) | List |
| 7 | Article List | List |
| 8 | Documents List (Filings) | List |
| 9 | App Promo | Simple |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial / page design | Wire logo + nav in Content Editor |
| 10 | Footer | Footer partial / page design | Wire columns + contact; rainbow stripe via theme CSS |

### Custom components needed

| # | What's on the page | Suggested approach | Fields needed |
|---|-------------------|-------------------|---------------|
| 6 | Market data dashboard | Prefer **static images** first (fastest demo). Optional custom `DataDashboard` if you want one component | Title, MapImage, FuelMixImage, LoadForecastImage, TableHtml |

---

## Build Order

```
Phase 3 — Sitecore content (datasources under /sitecore/content/PJM/PJM):
  1. Eyebrow
  2. Hero
  3. Promo CTA (Trending Topics)
  4. Documents List (Meetings)
  5. Features / images (Current Conditions snapshot) OR DataDashboard
  6. Article List (News)
  7. Documents List (Filings)
  8. App Promo

Phase 4 — Apply PJM theme (CSS variables + fonts)

Phase 5.5 — Optional custom variants (Hero overlay, DataDashboard)

Phase 6 — Assemble on Home; Header/Footer manual
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table to the screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5: hero overlay panel + data dashboard), or are **generic Financial/SXA variants + static chart images** sufficient?

> Reply **approved** to proceed, and answer question 2 (`custom variants` or `generic is fine`).
