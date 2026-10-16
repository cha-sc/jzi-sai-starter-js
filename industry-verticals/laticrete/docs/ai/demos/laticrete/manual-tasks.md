# Manual Tasks — LATICRETE Demo

## Deploy editing host

Connect `industry-verticals/laticrete` in XM Cloud Deploy Portal so editing host `6QhtPte6S1ZkERnVu4RUo8` picks up theme CSS + pixel-perfect variants (`Laticrete`, `LaticreteCategoryGrid`, `LaticreteTeal`, `LaticreteCentered`).

## Variant selection (required)

Agent API cannot set FieldNames. In Pages on **Home**, set variants per `variant-checklist.md`:

| Component (on canvas) | Variant |
|-----------------------|---------|
| Hero (Blue Premier) | **Laticrete** |
| Promo CTA (Forever Chemicals) | **Laticrete** |
| Promo CTA (Install Smarter) | **Laticrete** + style **reverse** |
| CTA Banner (Project Planning) | **LaticreteTeal** |
| Promo CTA (Our Heritage) | **Laticrete** + style **saturated** |
| Heading CTA (Find Products) | **LaticreteCentered** |
| CTA Banner (Find Distributor) | **LaticreteTeal** |
| Image Gallery (after manual add) | **LaticreteCategoryGrid** |

## Category Grid (Image Gallery)

Datasource in use: `/sitecore/content/Laticrete/Laticrete/Data/LATICRETE Demo/LATICRETE - HP Gallery/LATICRETE - HP Image Gallery`  
Variant: **LaticreteCategoryGrid** (already selected).

### Why children were blank

The Media **Image Gallery** rendering had no **Rendering Contents Resolver**, so Layout Service never sent child items as `fields.items` (Carousel has Datasource Item Children Resolver; Image Gallery did not). That resolver is now set to `{2F5C334E-5615-423C-8281-9FC180191302}`.

### Child item template (correct)

Use Sitecore **Image** `{3720C1C9-5EF8-4BA1-828B-A4672503A1AE}` under the gallery datasource. Fields that matter:

| Field | Purpose |
|-------|---------|
| **Image** | Tile photo (must have a real media/DAM src) |
| **ImageCaption** | Teal label under the tile (not `Title`) |
| **TargetUrl** | Optional link href |

Parent field **title** = section heading (“View by Category”). Parent `image1`–`image4` are a fallback only if children are missing.

### Finish content

1. On each child `Image1`–`Image7`, set **Image** + **ImageCaption** (several still have placeholder media / “Image Caption Field”).
2. Soft-reload / republish Home so Edge picks up the new resolver + children.
3. Confirm EH build includes the updated `ImageGallery.tsx`.

## Remove leftover Prospera sections (required)

Home still has starter + duplicate components that cannot be removed via Marketer MCP. In Pages, delete or hide:

- Carousel
- All Prospera Promo CTAs / Five Column / Three Column / Two Column (loan calculator)
- Article List
- Documents List
- App Promo
- Duplicate Hero at bottom (`LATICRETE - Hero` shared DS)
- Duplicate CTA Banner at bottom (`LATICRETE - Find Distributor` shared DS)

Ideal order after cleanup:

1. Hero — Blue Premier (Laticrete)
2. Image Gallery — Category Grid *(manual add)*
3. Promo CTA — Forever Chemicals (Laticrete)
4. Promo CTA — Install Smarter (Laticrete + reverse)
5. CTA Banner — Project Planning (LaticreteTeal)
6. Two Column CTA — Sustainable Products
7. Promo CTA — Our Heritage (Laticrete + saturated)
8. Heading CTA — Find Products (LaticreteCentered)
9. CTA Banner — Find Distributor (LaticreteTeal)

## Media / Content Hub

Page-local datasources still use Prospera placeholder images. For pixel-perfect:

1. Upload Blue Premier hero, product pack shots, kitchen lifestyle, heritage anniversary graphic, category tile photos (see build-plan + screenshot assets).
2. Assign media to each `LAT_*` datasource Image / Image1 fields.
3. Optional: replace Header logo with LATICRETE mark from theme assets.

## Context chrome

- Header / Footer / Eyebrow live in Page Design — retarget nav labels (Products, Solutions, Support, WHERE TO BUY) and logo.
- Home `Title` set to **LATICRETE** (NavigationTitle may still say Financial — update in CE if needed).

## Preview

- Editing host env: `6QhtPte6S1ZkERnVu4RUo8`
- Site: `Laticrete` · Collection: `Laticrete`
- CM authoring: `3FrHA2dq9Q5HJqr9ry042u`
- Code root: `industry-verticals/laticrete/`
