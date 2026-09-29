# PJM Next — Build Plan

> **Brand:** https://www.pjm.com/  
> **Layout:** https://www.iso-ne.com/ (screenshot)  
> **Analyzed:** 2026-09-29  
> **Library:** Financial / SXA  
> **Sections:** 11 (9 template, 1 custom dashboard, 2 context-only)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Light utility bar: Calendar, Library, Careers, Contact, Sign Up/In, Search_ | Eyebrow | Default | High | PJM utility styling |
| 2 | _Logo + dark primary nav (5 IA links)_ | Header | Default | High | Context-only; **PJM logo** |
| 3 | _Dark mission headline + “Our Mission” CTA_ | Heading CTA | Centered | High | Optional DarkMissionBand polish |
| 4 | _3-up ops dashboard: price map, fuel-mix donuts, demand chart_ | **Features → DataDashboard** | custom | Low | Port from prior PJM; static images |
| 5 | _NORMAL status + four MW snapshot stats_ | Stats Counter | Default | High | Lives in dark band |
| 6 | _“More Real-Time Data” + “Morning Report” buttons_ | Two Column CTA | Default | Medium | Or fold into dashboard |
| 7 | _FEATURED column with 2 image cards_ | Article List | Simplified | High | PJM featured stories |
| 8 | _NEWS FEED column with 2 article cards_ | Article List | Simplified | High | PJM news |
| 9 | _UPCOMING EVENTS tabbed meeting list_ | Documents List | Default | Medium | Tabs optional Phase 5.5 |
| 10 | _Most Popular (1–10) + Latest Published docs_ | Two Column CTA + 2× Documents List | Default | Medium | Composition |
| 11 | _Dark 4-column footer + logo + social_ | Footer | Default | High | Context-only |

---

## Sections that need attention

> [!WARNING]
> These sections have low confidence or need custom work. Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | _Live map + donuts + demand chart on dark band_ | No stock Financial widget for interactive ISO-style ops charts | **Features.DataDashboard** (static images) — same pattern as prior PJM demo |
| 9 | _Tabbed Upcoming Events / Today's Notices_ | Documents List has no tabs | Ship Default list first; optional `EventsTabs` later |
| 3–6 | _One continuous dark hero composition_ | Multiple components vs one band | Prefer consolidating CTAs into DataDashboard for pixel-perfect |

---

## Variant Decisions

| # | Component | Variant | Why |
|---|-----------|---------|-----|
| 3 | Heading CTA | Centered | Mission headline + single CTA on dark band |
| 4 | Features | **DataDashboard** (new/port) | ISO-NE three-widget ops layout |
| 7–8 | Article List | Simplified | Vertical card stacks in columns |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Eyebrow | Simple |
| 3 | Heading CTA | Simple |
| 4 | Features (DataDashboard) | Simple + images |
| 5 | Stats Counter | List |
| 6 | Two Column CTA | Simple |
| 7 | Article List (Featured) | List |
| 8 | Article List (News) | List |
| 9 | Documents List (Events) | List |
| 10 | Documents List ×2 (Popular + Latest) | List |

### Must be placed manually

| # | Component | Where | What to do |
|---|-----------|-------|------------|
| 2 | Header | Header partial | PJM logo + nav |
| 11 | Footer | Footer partial | 4 columns + social |

### Custom / Phase 5.5

| # | Need | Approach |
|---|------|----------|
| 4 | DataDashboard | Port `Features.DataDashboard` from `industry-verticals/pjm` into `pjm-next` |
| 3 | DarkMissionBand (optional) | Pattern background on Heading CTA |
| 9 | EventsTabs (optional) | Tabbed Documents List |

---

## Build Order

```
Phase 3 — content under /sitecore/content/PJM/PJMNext:
  Eyebrow → Heading CTA → Features/DataDashboard → Stats Counter
  → Article Lists (Featured, News) → Documents Lists (Events, Popular, Latest)

Phase 4 — apply pjm-next theme tokens (navy #005596, Trebuchet, etc.)

Phase 5.5 — port DataDashboard (+ optional mission/events polish); pixel-perfect

Phase 6 — assemble Home: dark band first, then 3-col, then 2-col, footer via page design
```

---

## Dual-input reminder

- **Look & feel:** PJM.com brand (logo, colors, fonts, photography)  
- **Structure:** ISO-NE homepage bands and component layout  
- **Do not** ship ISO-NE branding assets
