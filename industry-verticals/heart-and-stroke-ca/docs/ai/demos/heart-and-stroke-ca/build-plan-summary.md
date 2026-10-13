# Heart and Stroke CA — Build Plan

> **Source:** https://www.heartandstroke.ca/
> **Analyzed:** 2026-10-09
> **Sections:** 12 (12 template, 0 custom)
> **Library:** Financial / SXA (Prospera stack)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Dark header with Heart & Stroke logo, search, red Donate, and nav dropdowns_ | Header | WithLogoImage | High | Context-only / partial |
| 2 | _Full-bleed garden photo with white headline about Sharon & Carolyn and two CTAs_ | Hero | Default | High | Optional pill CTA variant later |
| 3 | _Our key priorities — three image cards (carousel on live site)_ | Three Column CTA | Default | High | Static row; carousel optional |
| 4 | _Sharon story on photo with white text card and Read her story_ | Promo CTA | WithBackgroundImage | High | |
| 5 | _Two research story tiles (Dr. Hill / Dr. West)_ | Two Column CTA | Default | High | |
| 6 | _Get involved link list with red arrows_ | Documents List | Default | Medium | Optional InvolvedLinkList variant |
| 7 | _Leave your legacy (grey) + Six ways to donate (red)_ | Two Column CTA | Default | High | Second instance |
| 8 | _Latest articles — large feature + three stacked teasers_ | Article List | Default | High | |
| 9 | _Heart-healthy recipes — three food cards_ | Three Column CTA | Default | High | Second instance |
| 10 | _Beat heart disease. Beat stroke. Beat as one._ | Heading CTA | Centered | High | Red emphasis on Beat |
| 11 | _Newsletter signup on grey band_ | Contact Form | Default | Medium | Closest form in this stack |
| 12 | _Dark multi-column footer with socials and Donate_ | Footer | WithSocials | High | Context-only / partial |

---

## Sections that need attention

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 6 | _Get involved arrow list_ | Documents List is file-oriented | Approve as-is, or request InvolvedLinkList in Phase 5.5 |
| 11 | _Newsletter form_ | No NewsletterSignup in Financial stack | Contact Form is closest; demo-only submit OK |

> All other sections matched with high confidence.

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | Logo + dark bar + Donate CTA |
| 2 | Hero | Default | Full-bleed photo with overlay text |
| 4 | Promo CTA | WithBackgroundImage | Story card over photography |
| 10 | Heading CTA | Centered | Motto display line |
| 12 | Footer | WithSocials | Social icons + columns |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero | Simple |
| 3 | Three Column CTA (priorities) | List (3 children) |
| 4 | Promo CTA | Simple |
| 5 | Two Column CTA (research) | Simple / dual fields |
| 6 | Documents List | List |
| 7 | Two Column CTA (giving) | Simple / dual fields |
| 8 | Article List | List |
| 9 | Three Column CTA (recipes) | List (3 children) |
| 10 | Heading CTA | Simple |
| 11 | Contact Form | Simple |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial design | Assign datasource in Content Editor |
| 12 | Footer | Footer partial design | Assign datasource in Content Editor |

### Custom components needed

None — all sections matched Financial/SXA template components. Optional Phase 5.5 variants only if you want a closer visual match.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Hero
  2. Three Column CTA (priorities)
  3. Promo CTA (Sharon)
  4. Two Column CTA (research)
  5. Documents List (get involved)
  6. Two Column CTA (legacy / donate)
  7. Article List
  8. Three Column CTA (recipes)
  9. Heading CTA (motto)
  10. Contact Form (newsletter)

Phase 2 — Apply theme (CSS variables + fonts)

Phase 3 — Custom components (none required)
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table to the homepage screenshot.
2. **Do you want pixel-perfect custom variants** (HeroFullBleedPills, PrioritiesCarousel, InvolvedLinkList) or are the generic template variants sufficient?

> Reply **approved** to proceed, or describe any changes needed.
