# CPP — Build Plan

> **Source:** https://cpp.ca  
> **Analyzed:** 2026-10-06  
> **Library:** Financial / SXA (Prospera stack in `industry-verticals/cpp`)  
> **Sections:** 13 (11 API template, 2 context-only, 0 required custom — optional Phase 5.5 polish)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Maroon bar: phone, how-to, calculator, FR, social_ | Eyebrow | Default | High | |
| 2 | _White bar: CPP logo, insurance nav, teal Get a quote_ | Header | WithLogoImage | High | Context-only |
| 3 | _Cream/lavender split: “Life insurance… refreshingly simple!”, Get my quote, couple+dog photo_ | Hero | Default | Medium | Optional HeroSplitCream |
| 4 | _Soft yellow band: Simplified issue…, checkmark copy, yellow character_ | Promo CTA | Default | Medium | |
| 5 | _“Do I need life insurance?” centered intro_ | Heading CTA | Centered | High | |
| 6 | _Three product cards (Simplified / Preferred / Critical Illness)_ | Three Column CTA | Default | High | Optional carousel |
| 7 | _“Trusted by thousands of Canadians” — three quotes_ | Testimonials | Default | High | |
| 8 | _“You're not hard to insure” — couple photo + CTA_ | Promo CTA | Default | High | 2nd instance |
| 9 | _“Easy everything” — bullets, two CTAs, character on laptop_ | App Promo | Default | Medium | |
| 10 | _Three solid teal tiles: calculator / quote / advisor_ | Three Column CTA | WithIcons | High | |
| 11 | _FAQ accordion about life insurance in Canada_ | Accordion | Default | High | |
| 12 | _Closing “Ready to protect…” + quote / call buttons_ | CTA Banner | Default | High | |
| 13 | _Multi-column footer + social + Foresters legal_ | Footer | WithSocials | High | Context-only |

---

## Sections that need attention

> [!NOTE]
> All sections matched Financial templates. Optional Phase 5.5 can tighten a few layouts.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _True split hero (text left / photo right)_ | Default Hero tends to overlay on image | Optional **HeroSplitCream** |
| 6 | _Product cards with carousel arrows_ | Three Column CTA is a static row | Optional **ProductCardsCarousel** |
| 10 | _Solid teal icon tiles_ | WithIcons is close, not exact fill | Theme primary bg + optional tile variant |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 2 | Header | WithLogoImage | Solid white bar with logo |
| 5 | Heading CTA | Centered | Title + short intro, no split |
| 10 | Three Column CTA | WithIcons | Icon + title + link columns |
| 13 | Footer | WithSocials | Social + multi-column links |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | Hero | Simple + hero photo |
| 4 | Promo CTA | Simple + character art |
| 5 | Heading CTA | Simple |
| 6 | Three Column CTA | Simple (3 product cards) |
| 7 | Testimonials | List (3 quotes) |
| 8 | Promo CTA | Simple + couple photo |
| 9 | App Promo | Simple + character art |
| 10 | Three Column CTA | Simple (3 action tiles) |
| 11 | Accordion | List (FAQ items) |
| 12 | CTA Banner | Simple |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial design | CPP logo + nav + Get a quote |
| 13 | Footer | Footer partial design | Columns + social + IOF/Foresters legal |

### Custom components needed

None required — optional Phase 5.5 variants only (`HeroSplitCream`, `ProductCardsCarousel`).

---

## Build Order

```
Phase 3 — Sitecore content under /sitecore/content/IOF/CPP:
  Eyebrow → Hero → Promo CTA → Heading CTA
  → Three Column CTA (products) → Testimonials → Promo CTA (eligibility)
  → App Promo → Three Column CTA (actions) → Accordion → CTA Banner

Phase 4 — Apply theme (teal #007B88, purple #5E2750, yellow #F5C518, Open Sans)

Phase 5.5 — Pixel-perfect (if you opt in): HeroSplitCream, ProductCardsCarousel

Phase 6 — Assemble Home; Header/Footer via page designs
```

---

## Approval Questions

1. **Does the build plan look correct?** Approved to proceed?
2. **Do you want pixel-perfect custom variants** (Phase 5.5), or are the generic Financial template variants sufficient?

> Reply “approved” (and say 5.5 yes or no) to continue.
