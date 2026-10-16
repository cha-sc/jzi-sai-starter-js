# Seismic — Build Plan

> **Source:** https://www.seismic.com/  
> **Analyzed:** 2026-10-16  
> **Sections:** 11 (11 template, 0 custom)  
> **Library:** Financial / SXA (Prospera stack)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Dark purple nav with Seismic logo, Platform/Solutions links, orange Get a Demo_ | Header | Default | High | Context-only, manual |
| 2 | _Purple gradient hero — Move from preparation to GTM performance + product UI graphic_ | Hero | Default | High | Optional PurpleGradientSplit |
| 3 | _Trusted by ~2,000 orgs + grayscale logo row_ | Image Gallery | Default | Medium | Optional LogoRow |
| 4 | _Solutions by Industry tabs + FS copy/CTA + lifestyle photo_ | Promo CTA | Default | Medium | Optional IndustryTabs |
| 5 | _Customer story carousel (Elastic / video testimonials)_ | Testimonials | Default | High | |
| 6 | _Teal Ask AI prompt + Ask ChatGPT/Claude/Perplexity_ | CTA Banner | Minimal | Medium | Optional AskAIPrompt |
| 7 | _Four peach outcome cards (revenue, buyer exp, efficiency, costs)_ | Four Column CTA | Default | High | |
| 8 | _56% sales cycle reduction + Let's Chat lead capture_ | Stats Counter | Default | High | |
| 9 | _Three resource tiles — Report / Guide / Workbook_ | Three Column CTA | Default | High | |
| 10 | _Dark purple closing CTA — striking a chord + Get a Demo_ | CTA Banner | Minimal | High | |
| 11 | _Multi-column purple footer + socials_ | Footer | Default | High | Context-only, manual |

---

## Sections that need attention

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Partner logo strip_ | No LogoCloud in Financial library | Image Gallery now; **LogoRow** in Phase 5.5 if needed |
| 4 | _Industry tabs_ | Tabs not in Financial library | Promo CTA for FS panel; **IndustryTabs** in Phase 5.5 |
| 6 | _Ask AI search UI_ | Search input + triple LLM buttons | CTA Banner Minimal now; **AskAIPrompt** in Phase 5.5 |

> [!NOTE]
> All sections map to Financial/SXA components at medium/high confidence. No net-new custom components required for a solid demo.

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 6, 10 | CTA Banner | Minimal | Full-width brand bands (teal Ask AI + purple closing CTA) |
| 2 | Hero | Default | Purple gradient hero with headline + CTA + side media |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero | Simple |
| 3 | Image Gallery | List (logos) |
| 4 | Promo CTA | Simple |
| 5 | Testimonials | List |
| 6, 10 | CTA Banner (×2) | Simple each |
| 7 | Four Column CTA | Simple / multi-field |
| 8 | Stats Counter | Simple |
| 9 | Three Column CTA | Simple / multi-field |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial | Assign logo/nav/CTA datasource |
| 11 | Footer | Footer partial | Assign columns + socials |

### Custom components needed

None required. Optional Phase 5.5 variants: **PurpleGradientSplit**, **LogoRow**, **IndustryTabs**, **AskAIPrompt**.

---

## Build Order

```
Theme (approved) — seismic.theme.yaml CSS + Montserrat
Content — Hero → Image Gallery → Promo CTA → Testimonials → CTA Banners → Four Column → Stats → Three Column
Assembly — wire Home; Header/Footer manual
Variants (optional) — PurpleGradientSplit / LogoRow / IndustryTabs / AskAIPrompt
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (Phase 5.5), or are generic Financial variants enough?

> Reply **approved** (and whether you want Phase 5.5 variants) to proceed to content extraction, or describe changes.
