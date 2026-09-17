# Manual Tasks — Superior Court of Fulton County

## 1. Set variants (required)

See [`variant-checklist.md`](./variant-checklist.md).

## 2. Remove County leftovers from Home

In Pages, remove or hide:
- **Two Column CTA** (District Finder)
- **Author List** (Board of Commissioners)
- **Documents List**
- Empty **Four Column CTA** in nested row placeholder (`row-1-7`) if unused

Suggested final `headless-main` order:
1. Hero (`SuperiorCourt`)
2. Four Column CTA (`SuperiorCourtQuickLinks`)
3. Four Column CTA (`SuperiorCourtTiles`)
4. Promo CTA (`SuperiorCourtAnnouncement`)
5. Article List (`SuperiorCourt`)

## 3. Header / Eyebrow / Footer partials

| Partial | Action |
|---------|--------|
| Eyebrow | Theme already orange-red; ensure Language Switcher shows “Select Language” |
| Header | Replace logo with court seal; set nav: About Us, How Do I…, Links, Calendar, Contact Us |
| Footer | Office of the Court Administrator — 136 Pryor Street SW, Suite J2-640, Atlanta, GA 30303; phone 404-612-4518; resource links + social |

## 4. Optional polish

- Rename datasources: `Fulton County - Hero` → `Superior Court - Hero`; `Fulton_Top_Services_*` → Quick Links / The Court
- Set Article List `NumberOfItems` = 4
- Publish site after variant selection
