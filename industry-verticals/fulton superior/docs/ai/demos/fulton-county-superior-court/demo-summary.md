# Superior Court of Fulton County — Demo Summary

**Client:** Superior Court of Fulton County  
**Source:** https://www.fultoncourt.org/ (+ user mockup)  
**Code:** `industry-verticals/fulton superior`  
**Content:** `/sitecore/content/fulton-county/fulton-county-superior-court`  
**Completed:** 2026-09-17  

## What shipped

### Theme
- Tokens: accent `#c73e1d`, charcoal `#1a1a1a`, icon circle `#b5d0e3`, light footer `#f5f5f5`
- Fonts: Montserrat (headings) + Source Sans 3 (body) + Libre Baskerville (hero prompt)
- Eyebrow utility bar → orange-red; header → dark with white nav

### Pixel-perfect React variants (`SuperiorCourt*`)
| Component | Export | Sitecore Variant ID |
|-----------|--------|---------------------|
| Hero | `SuperiorCourt` | `{EB82F338-A697-4998-9F7F-E6B38EA4E1AF}` |
| Four Column CTA | `SuperiorCourtQuickLinks` | `{267471D5-4A3F-4378-AA87-2F1996329012}` |
| Four Column CTA | `SuperiorCourtTiles` | `{1BB029B9-059C-438D-8B30-F8A0E612B4EB}` |
| Promo CTA | `SuperiorCourtAnnouncement` | `{D0188AB8-76B0-4FD4-AB50-0580F0F27D3D}` |
| Article List | `SuperiorCourt` | `{BAE0407B-0903-44F9-A1CE-DF27ED7BC5AC}` |

### Content Hub
15 images uploaded to `cha-verticals-0914.sitecoresandbox.cloud` (see `images/image-manifest.json`).

### Datasources populated
| Item | Purpose |
|------|---------|
| `Fulton County - Hero` (`14df3650-…`) | Welcome + search + popular links + banner |
| `Fulton_Top_Services_1` | Quick Links (4 icons) |
| `Fulton_Top_Services_2` | The Court (4 tiles) |
| `Promo CTA 2` | Important Announcements featured card |
| Articles (4) | News and Events headlines + thumbs |
| Home title | Superior Court of Fulton County |

## Finish in Pages (~5 min)

1. [`variant-checklist.md`](./variant-checklist.md) — set all five variants  
2. [`manual-tasks.md`](./manual-tasks.md) — remove District Finder / BOC / Documents; update header/footer  

## Suggested Home order

1. Hero (`SuperiorCourt`)  
2. Four Column CTA (`SuperiorCourtQuickLinks`) — Quick Links  
3. Four Column CTA (`SuperiorCourtTiles`) — The Court  
4. Promo CTA (`SuperiorCourtAnnouncement`)  
5. Article List (`SuperiorCourt`)  

## QA

- [ ] First viewport: welcome title, search + Search button, popular links  
- [ ] Quick Links: 4 circular light-blue icons  
- [ ] The Court: 4 photo tiles with orange banners  
- [ ] Announcements: skyline + featured judge card + View All  
- [ ] News: 4-column grid with View All  
- [ ] Orange accent + dark header + light footer  
- [ ] Preview / publish  
