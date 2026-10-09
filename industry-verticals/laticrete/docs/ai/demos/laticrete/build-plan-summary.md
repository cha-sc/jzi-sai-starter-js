# LATICRETE — Build Plan

> **Source:** https://www.laticrete.com/en  
> **Analyzed:** 2026-10-09  
> **Sections:** 11 (11 template, 0 custom)  
> **Library:** Financial / SXA (Prospera stack)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _White logo/search bar + solid teal main nav_ | Header | Default | High | Context-only, manual |
| 2 | _Dark teal Blue Premier Rewards promo with product cans + LEARN MORE_ | Hero | Default | High | |
| 3 | _View by Category — 7 square image tiles with teal links_ | Image Gallery | Default | Medium | Optional CategoryGrid variant |
| 4 | _Forever Chemicals — text + green product bottles_ | Promo CTA | Default | High | |
| 5 | _Install Smarter — HYDRO BAN / MULTIMAX / SPECTRALOCK packs_ | Promo CTA | Default | High | |
| 6 | _Teal planning band with kitchen photo + PROJECT PLANNING / COLOR TOOLS_ | CTA Banner | WithImage | High | |
| 7 | _Sustainable Products — outdoor tile photo + dual CTAs_ | Two Column CTA | Default | High | |
| 8 | _70 Years heritage dark band + LATICRETE HISTORY_ | Promo CTA | Default | High | |
| 9 | _Find Products Near You on faint map + PRODUCT FINDER_ | Heading CTA | Centered | High | |
| 10 | _Teal Find a Distributor bar_ | CTA Banner | Minimal | High | |
| 11 | _About / Quick Links / Contact footer + socials_ | Footer | Default | High | Context-only, manual |

---

## Sections that need attention

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _7-tile category grid_ | Image Gallery is closest; not a perfect 7-up category link grid | Approve generic now, or request **CategoryGrid** in Phase 5.5 |

> [!NOTE]
> Everything else matched with medium/high confidence on the Financial/SXA library.

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 6 | CTA Banner | WithImage | Teal band + lifestyle photo + dual CTAs |
| 9 | Heading CTA | Centered | Centered title + single finder CTA |
| 10 | CTA Banner | Minimal | Full-width primary strip above footer |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero | Simple |
| 3 | Image Gallery | List (category tiles) |
| 4–5, 8 | Promo CTA (×3) | Simple each |
| 6, 10 | CTA Banner (×2) | Simple each |
| 7 | Two Column CTA | Simple |
| 9 | Heading CTA | Simple |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial | Assign logo/nav datasource |
| 11 | Footer | Footer partial | Assign columns + contact |

### Custom components needed

None required for a solid demo. Optional Phase 5.5: **CategoryGrid** on Image Gallery.

---

## Build Order

```
Theme (done) — LATICRETE CSS variables + Oswald/Lato on site-financial
Content — create datasources for Hero → Image Gallery → Promo CTAs → CTA Banners → Two Column → Heading CTA
Assembly — wire Home page; Header/Footer manual
Variants (optional) — CategoryGrid if you want pixel-perfect category tiles
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (Phase 5.5, e.g. CategoryGrid), or are generic Financial variants enough?

> Reply **approved** to proceed to content extraction, or describe changes.
