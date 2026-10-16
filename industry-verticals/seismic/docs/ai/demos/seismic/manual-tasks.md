# Manual Tasks — Seismic Demo

## Variant selection (Pages)

See `variant-checklist.md`. Agent API cannot set `FieldNames`.

| Component | Variant |
|-----------|---------|
| Hero | **PurpleGradientSplit** |
| Image Gallery (Logo Cloud) | **LogoRow** |
| Promo CTA (Industry) | **IndustryTabs** |

## Branch-template gaps (API 404)

`add_component_on_page` fails when the rendering’s branch template path is missing:

| Component | Branch path | Status |
|-----------|-------------|--------|
| Image Gallery | `Branches/Project/Verticals/Image Gallery` | Datasource + 8 logo children created under Data; **add rendering manually** |
| Testimonials | `Branches/Project/Verticals/Testimonials` | Datasource `bc83fcc8…` + Elastic child exist; **add rendering manually** |

### Image Gallery — Logo Cloud

Datasource already exists:

- Parent: `/sitecore/content/Seismic/Seismic/Data/Seismic Demo/Seismic - Logo Cloud` (`0251686c-d793-4cef-8776-95483e635043`)
- Children: Onesource, Aerogen, IBM, AllianceBernstein, Oracle, Expedia, Elastic, Experian

In Pages on **Home**:

1. Add **Image Gallery** to `headless-main` after Hero / before Industry Promo CTA.
2. Point datasource at **Seismic - Logo Cloud**.
3. Select variant **LogoRow**.
4. Set rendering param `SectionTitle` = `Trusted by approximately 2,000 organizations worldwide`.

### Testimonials

1. Add **Testimonials** after Industry / before Ask AI.
2. Point datasource at **Seismic - Customer Stories** (`bc83fcc8-b91d-4780-8035-e2c4207aa60a`).

## Reorder Closing CTA

Closing CTA currently sits above Stats. In Pages, move **Seismic - Closing CTA** to after Resources (last Seismic block before Prospera leftovers).

## Prospera leftovers cleanup

Remove (or hide) Prospera Carousel and remaining Prospera blocks below the Seismic stack once variants look correct. Confirm in Pages before deleting (Agent `remove_component_on_page` requires explicit confirmation).

Suggested keep order:

1. Hero (PurpleGradientSplit)
2. Image Gallery (LogoRow) — manual
3. Promo CTA Industry (IndustryTabs)
4. Testimonials — manual
5. CTA Banner Ask AI
6. Four Column CTA Outcomes
7. Stats Counter
8. Three Column CTA Resources
9. CTA Banner Closing

## Header / Footer

Context-only — update logo, nav labels, and orange **Get a Demo** CTA in Page Design.

## Hero media

Hero Image currently uses the Financial Services persona DAM asset as a stand-in. Replace with product UI / dashboard graphic when available.

## Editing host

Deploy Portal → connect GitHub for editing host `B2YJo8vPzwDTvskHQMF6H` if not already linked (non-blocking for content).
