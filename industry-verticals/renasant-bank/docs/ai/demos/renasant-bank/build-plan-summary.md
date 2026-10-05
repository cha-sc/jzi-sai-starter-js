# Renasant Bank — Build Plan

> **Source:** https://www.renasantbank.com/  
> **Analyzed:** 2026-10-05  
> **Library:** Financial / SXA (Prospera stack in `industry-verticals/renasant-bank`)  
> **Sections:** 10 (8 API template, 2 context-only, 1 custom overlay on Hero)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Thin FDIC bar: insured notice, Login, About, phone_ | Eyebrow | Default | High | |
| 2 | _White bar: Personal / Business / Mortgage, centered Renasant logo, Search_ | Header | WithLogoImage | High | Context-only |
| 3 | _Navy strip: “Renasant will never email, text or call you requesting personal information…”_ | CTA Banner | Default | Medium | Slimmer SecurityBanner later |
| 4 | _Blue football hero, “Pick 6.00% APY*”, orange CTA, navy side card_ | Hero | Default | Medium | Custom overlay for side card |
| 5 | _“Renasant offers the best banking solutions for you” plus checking copy_ | Heading CTA | Centered | High | |
| 6 | _Five icons: Checking, Savings, Loans, Mortgage, Wealth_ | Five Column CTA | Default | High | Tabs → static columns |
| 7 | _“See Checking Accounts” and “Recommend Products for Me”_ | Two Column CTA | Default | Medium | Button pair, not image columns |
| 8 | _Navy app band: illustration, five bullets, Enroll / Download App_ | App Promo | Default | High | |
| 9 | _Horizontal story cards with prev/next arrows_ | Article List | Simplified | High | Carousel later |
| 10 | _Navy 4-column footer + social + FDIC legal_ | Footer | WithSocials | High | Context-only |

---

## Sections that need attention

> [!WARNING]
> Review these before approving. We will **not** build a working bank login form.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | _Login card with User ID + Login on the hero_ | Real credential UI is the wrong thing to clone | **HeroWithLoginPanel**: navy card with Open an Account / Apply for a Loan / Enroll — no password field |
| 6 | _Product icons switch the paragraph_ | Five Column CTA is not a tab widget | Ship static columns; optional ProductTabs in Phase 5.5 |
| 9 | _Peeking card carousel_ | Article List is a static row | Optional ArticleCarousel in Phase 5.5 |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 2 | Header | WithLogoImage | Centered wordmark on a solid white bar |
| 5 | Heading CTA | Centered | Title + body, no left/right split |
| 9 | Article List | Simplified | Image cards with title, excerpt, link |
| 10 | Footer | WithSocials | Social row above legal |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | CTA Banner | Simple |
| 4 | Hero | Simple + football image |
| 5 | Heading CTA | Simple |
| 6 | Five Column CTA | Simple (5 icon slots) |
| 7 | Two Column CTA | Simple |
| 8 | App Promo | Simple + illustration |
| 9 | Article List | List (5 articles) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial design | Renasant logo + Personal / Business / Mortgage |
| 10 | Footer | Footer partial design | 4 columns + social + FDIC line |

### Custom components needed

| # | What's on the page | Suggested approach | Fields needed |
|---|-------------------|-------------------|---------------|
| 4 | Hero login-style card | Phase 5.5 **Hero.HeroWithLoginPanel** | Headline, image, primary CTA, 3 demo links. **No User ID / password.** |

---

## Build Order

```
Phase 3 — Sitecore content under /sitecore/content/RenasantBank/RenasantBank:
  Eyebrow → CTA Banner → Hero → Heading CTA
  → Five Column CTA → Two Column CTA → App Promo → Article List

Phase 4 — Apply theme (navy #041645, hero blue #1B6BB8, orange #E85E25, Outfit + Mulish)

Phase 5.5 — Pixel-perfect (if you opt in): HeroWithLoginPanel, ProductTabs, ArticleCarousel

Phase 6 — Assemble Home; Header/Footer via page designs
```

---

## Approval Questions

1. **Does the build plan look correct?** Approved to proceed?
2. **Do you want pixel-perfect custom variants** (Phase 5.5), or are the generic Financial template variants sufficient?

> Reply “approved” (and say 5.5 yes or no) to continue.
