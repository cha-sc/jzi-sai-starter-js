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

## Add Category Grid (API branch template missing)

`add_component_on_page` fails for Image Gallery (`Branches/Project/Verticals/Image Gallery` 404).

In Pages / Content Editor:

1. Create an Image Gallery datasource under `/sitecore/content/Laticrete/Laticrete/Data/LATICRETE Demo/` (or Home/Data) with **7 child items** (Image + Title/name):
   - Tile & Stone Installation Systems
   - Grout & Mastic / Small Pack Solutions
   - Concrete Maintenance & Repair
   - Shower Systems
   - Floor Heat
   - Profiles & Trim
   - Commercial Flooring
2. Add **Image Gallery** to `headless-main` **after Hero / before Forever Chemicals**.
3. Select variant **LaticreteCategoryGrid**.
4. Optional: set section title “View by Category” via Title field or Rendering Parameter `SectionTitle`.

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
