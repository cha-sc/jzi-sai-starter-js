# PJM Next — Manual assembly tasks

Datasources and pixel-perfect variants are created. Home page layout APIs often fail on empty Page Design (same as prior PJM demo) — place components in **Pages** / Experience Editor.

## Datasources (`/sitecore/content/PJM/PJMNext/Data/PJM Next Demo`)


| Item                        | ID                                     | Component        | Variant                                       |
| --------------------------- | -------------------------------------- | ---------------- | --------------------------------------------- |
| PJM Next - Mission Band     | `3c019fa4-97ec-40ad-8c92-4b869a50ddc5` | Heading CTA      | **DarkMissionBand**                           |
| PJM Next - Ops Dashboard    | `81e1ca95-ff43-4efc-855a-99a4a90688ce` | Three Column CTA | **OpsDashboard**                              |
| PJM Next - Today Snapshot   | `e7e428b8-7543-4093-acb2-baae9be98441` | Stats Counter    | Default (+ `ops-snapshot` style if available) |
| PJM Next - Dashboard CTAs   | `37d06587-b82f-41d7-a7c4-0697b135ee2b` | Two Column CTA   | Default                                       |
| PJM Next - Featured         | `4b85e65c-758d-4f48-8acb-f5b8b8826ec5` | Documents List   | Default                                       |
| PJM Next - News Feed        | `7eac6c60-93bc-4313-87e8-79a5f6f00315` | Documents List   | Default                                       |
| PJM Next - Upcoming Events  | `80282eae-428a-49f8-9cfc-e6be541c2e31` | Documents List   | Default                                       |
| PJM Next - Most Popular     | `905545d8-0151-4975-a64f-4c1007b99a91` | Documents List   | Default                                       |
| PJM Next - Latest Published | `ef989766-5908-48d3-a3d2-3b304f70b3d0` | Documents List   | Default                                       |




## Suggested Home main placeholder order

1. Heading CTA → Mission Band / DarkMissionBand
2. Three Column CTA → Ops Dashboard / OpsDashboard
3. Stats Counter → Today Snapshot
4. Two Column CTA → Dashboard CTAs
5. Column splitter (3): Featured · News · Events  
   - Enable placeholders `1,2,3`  
   - Set **ColumnWidth1/2/3** to `col-12 col-md-4` (Sitecore often leaves bare `col-6`; the app now forces equal thirds for 3-column splitters + CSS override — redeploy EH after pull)
6. Column splitter (2): Most Popular · Latest Published  
   - Placeholders `1,2` with `col-12 col-md-6`

Header / Footer / Eyebrow via page design / partials — **PJM logo**, not ISO-NE.

## Sitecore variants created

- `/Presentation/Headless Variants/Heading CTA/DarkMissionBand` → `6028f4e0-0b6e-4a65-9324-717c229c0dfc`
- `/Presentation/Headless Variants/Three Column CTA/OpsDashboard` → `aeafcece-9088-493c-af49-7dd5c6b0d063`
- `/Presentation/Headless Variants/Features/DataDashboard` → `8db4e1bd-7b01-4abc-8fef-e03492e08be8`



## Code

- Theme tokens: `src/assets/sass/abstracts/vars/_colors.scss`
- Demo styles: `src/assets/sass/components/_pjm-next-demo.scss`
- Variants: `HeadingCta.DarkMissionBand`, `ThreeColumnCta.OpsDashboard`, `Features.DataDashboard`



## Still open

- [x] Upload dashboard crops (Content Hub was 503) — see `images-to-upload.md`
- [x] Wire images on Ops Dashboard datasource
- [x] Assemble Home page + assign Page Design
- [x] Editing host GitHub config for `pjm-next` in Deploy Portal