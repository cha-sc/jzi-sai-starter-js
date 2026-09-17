# Superior Court of Fulton County — Build Plan

> **Source:** User-provided homepage mockup (no live URL)
> **Analyzed:** 2026-09-17
> **Sections:** 8 (6 API-addable PLAY components + 2 partials)
> **Content root:** `/sitecore/content/fulton-county/fulton-county-superior-court`
> **Code root:** `industry-verticals/fulton superior`

---

## Environment notes

| Check | Result |
|-------|--------|
| Sitecore site | `fulton-county-superior-court` (verified) |
| Home page ID | `edaa5cd9-ee86-4628-9a12-7981e0531c8d` |
| Home today | County Government leftovers (Hero search, Top Services, District Finder, News, BOC, Documents) |
| Theme | Proposed from mockup — burnt red `#c73e1d`, charcoal, light-blue icon wells |
| Content Hub | Credentials verified (`cha-verticals-0914.sitecoresandbox.cloud`) |

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Thin orange-red bar with Select Language_ | Eyebrow | Default | High | Partial — accent utility bar |
| 2 | _White seal + SUPERIOR COURT… + uppercase nav over dark hero_ | Header | Default | High | Partial — logo + nav |
| 3 | _Full-bleed city photo, welcome title, search + popular links_ | Hero | **SuperiorCourt** (new) | High | Pixel-perfect variant |
| 4 | _QUICK LINKS + 4 circular icon CTAs_ | Four Column CTA | **SuperiorCourtQuickLinks** (new) | High | Rewire existing instance |
| 5 | _THE COURT + 4 photo tiles with orange banners_ | Four Column CTA | **SuperiorCourtTiles** (new) | High | Second Four Column CTA |
| 6 | _Night skyline + featured announcement card + View All_ | Promo CTA | **SuperiorCourtAnnouncement** (new) | Medium | Closest PLAY match |
| 7 | _NEWS AND EVENTS 4-card grid + View All_ | Article List | **SuperiorCourt** (new) | High | Retitle articles |
| 8 | _Light footer: Court Administrator + links + social_ | Footer | Default | High | Partial — light footer |

---

## Sections that need attention

> [!WARNING]
> These need custom variants or an explicit fallback choice.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Hero has title + search + popular searches_ | Existing `FultonCounty` hero is search-only (County style) | New `SuperiorCourt` Hero variant |
| 4–5 | _Two different Four Column layouts_ | Same component, two visual treatments | Two named variants on Four Column CTA |
| 6 | _Announcement band with featured card on skyline_ | Promo CTA Default ≠ this layout | `SuperiorCourtAnnouncement` variant (or Promo + background image) |

> [!NOTE]
> Remove County leftovers from Home: Two Column CTA (District Finder), Author List (BOC), Documents List.

---

## Variant Decisions

| # | Component | Variant | Why |
|---|-----------|---------|-----|
| 3 | Hero | SuperiorCourt | Welcome headline + search + popular searches on full-bleed photo |
| 4 | Four Column CTA | SuperiorCourtQuickLinks | Circular icon wells, not navy service cards |
| 5 | Four Column CTA | SuperiorCourtTiles | Photo tiles with orange bottom banners |
| 6 | Promo CTA | SuperiorCourtAnnouncement | Skyline band + featured card + View All |
| 7 | Article List | SuperiorCourt | News grid with caps headlines (court red accents, not County navy) |

---

## Components by type

### Will be added / rewired on Home (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 3 | Hero (SuperiorCourt) | Image + title + subtitle/popular searches |
| 4 | Four Column CTA (Quick Links) | 4 icon cards |
| 5 | Four Column CTA (The Court) | 4 image tiles |
| 6 | Promo CTA (Announcements) | Background + featured story + CTAs |
| 7 | Article List | Articles folder → court news |

### Must be updated in partials (manual / Content Editor)

| # | Component | Where | What to do |
|---|-----------|-------|------------|
| 1 | Eyebrow | Header partial | Orange utility bar + language |
| 2 | Header | Header partial | Court seal + nav labels |
| 8 | Footer | Footer partial | Court Administrator + links + social |

### Custom components needed

None — all sections map to existing PLAY components with new **SuperiorCourt\*** variants.

### Remove from Home (County leftovers)

Two Column CTA (District Finder), Author List (BOC), Documents List, unused empty Four Column CTA.

---

## Theme (proposed)

| Token | Value |
|-------|-------|
| Accent / CTA | `#c73e1d` |
| Charcoal / header | `#1a1a1a` |
| Icon circle | `#b5d0e3` |
| Footer / muted | `#f5f5f5` |
| Headings | Montserrat (uppercase) |
| Body | Source Sans 3 |
| Hero prompt | Libre Baskerville (serif) |
| Radius | 0 (sharp) |

---

## Build Order

```
Phase A — Theme: Superior Court tokens + fonts in fulton superior
Phase B — Variants: Hero, Quick Links, The Court tiles, Announcements, Article List
Phase C — Content: new Superior Court datasources + article titles (English)
Phase D — Home: rewire components; remove County leftovers
Phase E — Partials: Eyebrow / Header / Footer
Phase F — QA against mockup
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table to the screenshot.
2. **Do you want pixel-perfect custom variants** (`SuperiorCourt*` for Hero, Quick Links, The Court, Announcements, News), **or** are restyled generic PLAY variants enough?

> Reply **approved** (and answer Q2) to proceed, or describe any changes needed.

**Note:** Content writes will target `/sitecore/content/fulton-county/fulton-county-superior-court`. Code/style changes stay in `industry-verticals/fulton superior`.
