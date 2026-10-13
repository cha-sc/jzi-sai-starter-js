# Heart and Stroke CA — manual tasks

## Remove leftover Prospera components on Home

In Pages, delete or hide these `headless-main` instances (still present after demo assembly):

1. **Carousel** (after Hero)
2. **Five Column CTA** — Available Services
3. **Promo CTA** (extra #1 after Priorities — not Sharon)
4. **Promo CTA** (extra #2)
5. **Article List**
6. **App Promo**

Desired main order after cleanup:

1. Hero → Key Priorities → Sharon Story → Research → Get Involved → Ways to Give → Latest Articles → Recipes → Motto → Newsletter

## Header / Footer (context / partial designs)

- Apply `HeaderDarkDonate` on the Header partial
- Apply `FooterCharcoal` on the Footer partial
- Update logo, nav, Donate CTA, and footer columns to match heartandstroke.ca (content not API-wired)

## Variant selection

See [variant-checklist.md](./variant-checklist.md).

## Editing host

Deploy / point the editing host `heart-and-stroke-ca` at this app so Pages picks up the new named exports.
