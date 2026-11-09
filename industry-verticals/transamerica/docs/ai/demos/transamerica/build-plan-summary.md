# Transamerica — Build Plan

> **Source:** https://www.transamerica.com/  
> **Analyzed:** 2026-11-09  
> **Library:** Financial / SXA (Prospera stack in `industry-verticals/transamerica`)  
> **Sections:** 13 (11 API template, 2 context-only, 0 required custom — optional Phase 5.5 polish)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Utility links: Individuals / Employers / Pros / Newsroom / Log In / Contact_ | Eyebrow | Default | High | |
| 2 | _White bar: red pyramid logo + Insurance / Retirement / Investments / Life & Wealth_ | Header | WithLogoImage | High | Context-only |
| 3 | _Golf photo + navy diagonal: “Life is The Long Game” + Learn more_ | Hero | Default | Medium | Optional HeroDiagonalNavy |
| 4 | _“Go the distance…” + hexagonal mother/child garden photo_ | Promo CTA | Default | High | Optional hex crop |
| 5 | _Three product focuses: Retirement / Insurance / Investments_ | Three Column CTA | WithIcons | High | |
| 6 | _Couple in doorway: “Life insurance built into the things you love”_ | Promo CTA | WithBackgroundImage | High | 2nd Promo |
| 7 | _Sky-blue “We're with you” + hexagonal kitchen photo_ | CTA Banner | LargeImage | Medium | Theme secondary bg |
| 8 | _Featured resources — 4 icon tiles (Retirement, Estate, Investing, Calculators)_ | Four Column CTA | Default | High | |
| 9 | _Navy stats: $32B+ / 10.2M / $444.4B + hexagonal stretch photo_ | Stats Counter | Default | High | Optional hex+stats |
| 10 | _Skyline + “How we work” copy_ | Two Column CTA | Default | High | |
| 11 | _Five service icons (Retirement → Mutual Funds)_ | Five Column CTA | Default | High | |
| 12 | _Trustpilot 4.5 Excellent strip_ | Quote | Default | Medium | Stand-in widget |
| 13 | _Dark brown multi-column footer + social + legal_ | Footer | WithSocials | High | Context-only |

---

## Sections that need attention

> [!NOTE]
> All sections matched Financial templates. Optional Phase 5.5 can tighten diagonal/hex brand shapes.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Navy diagonal hero cut_ | Default Hero overlays text on image | Optional **HeroDiagonalNavy** |
| 4 / 7 / 9 | _Hexagonal image crops_ | Template media is rectangular | Optional **PromoHexImage** / **StatsWithHexImage** |
| 12 | _Trustpilot widget_ | No Trustpilot embed component | Quote stand-in, or skip |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 2 | Header | WithLogoImage | Solid white bar with logo |
| 5 | Three Column CTA | WithIcons | Icon + title + link columns |
| 6 | Promo CTA | WithBackgroundImage | Photo-forward intermediate banner |
| 7 | CTA Banner | LargeImage | Wide tinted band with supporting image |
| 13 | Footer | WithSocials | Social + multi-column links |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | Hero | Simple + golf hero photo |
| 4 | Promo CTA | Simple + garden hex photo |
| 5 | Three Column CTA | Simple (3 product focuses) |
| 6 | Promo CTA | Simple + doorway photo |
| 7 | CTA Banner | Simple + kitchen photo |
| 8 | Four Column CTA | Simple (4 resource icons) |
| 9 | Stats Counter | Simple (3–4 stats) + stretch photo |
| 10 | Two Column CTA | Simple + skyline |
| 11 | Five Column CTA | Simple (5 service icons) |
| 12 | Quote | Simple (Trustpilot stand-in) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial design | Logo + main nav |
| 13 | Footer | Footer partial design | Columns + social + legal |

### Custom components needed

None required — all sections matched template components. Optional Phase 5.5 variants listed above for pixel-perfect brand shapes.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Eyebrow
  2. Hero
  3. Promo CTA (Go the distance)
  4. Three Column CTA
  5. Promo CTA (Life insurance band)
  6. CTA Banner (We're with you)
  7. Four Column CTA (Featured resources)
  8. Stats Counter
  9. Two Column CTA (How we work)
  10. Five Column CTA
  11. Quote (Trustpilot stand-in)

Phase 2 — Apply theme (CSS variables + fonts)

Phase 3 — Optional custom variants (if approved)
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table against the homepage screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5: HeroDiagonalNavy, PromoHexImage, StatsWithHexImage) **or are the generic template variants sufficient?**

> Reply "approved" to proceed, and answer question 2 (custom variants vs generic).
