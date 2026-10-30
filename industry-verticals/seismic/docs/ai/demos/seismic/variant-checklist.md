# Variant Selection Checklist — Seismic

Sitecore **Variant Definition** items exist. Select them on Home in Pages (Agent API cannot set FieldNames).

Variant Definition template ID: `4d50cdae-c2d9-4de8-b080-8f992bfb1b55`

| # | Component | React export | Sitecore item ID | Path |
|---|-----------|--------------|------------------|------|
| 1 | Hero | `PurpleGradientSplit` | `64a7e913-6f28-4266-afd3-92a045e4c44c` | `/sitecore/content/Seismic/Seismic/Presentation/Headless Variants/Hero/PurpleGradientSplit` |
| 2 | Image Gallery | `LogoRow` | `be9c41f4-79dd-411a-a2e1-86dc2e597d2d` | `.../Image Gallery/LogoRow` |
| 3 | Promo CTA | `IndustryTabs` | `89dbf404-a6a6-43d4-a97d-0874cb3679b8` | `.../Promo CTA/IndustryTabs` |
| 4 | Hero | `WebinarHero` | `77a08f4d-1fa5-4db2-b348-884f4c86b9f2` | `.../Hero/WebinarHero` |
| 5 | Promo CTA | `WhyAttendRegister` | `b30b56a3-f4cd-40a9-8186-a1fc89ad7fcd` | `.../Promo CTA/WhyAttendRegister` |
| 6 | Promo CTA | `MeetHost` | `89cb9d3d-ebbe-4f36-a4e1-31a8ab0627e1` | `.../Promo CTA/MeetHost` |
| 7 | Promo CTA | `ChecklistSection` | `ad1be731-a712-41d1-8bae-d8e10edb8d04` | `.../Promo CTA/ChecklistSection` |
| 8 | Four Column CTA | `ExperienceStack` | `b99682cd-2126-458a-ac61-faea7e19af05` | `.../Four Column CTA/ExperienceStack` |
| 9 | Three Column CTA | `SessionCards` | `e6ae0e29-3288-4208-bf60-9b6d3026684a` | `.../Three Column CTA/SessionCards` |
| 10 | Questions | `FaqPlain` | `8872fc22-ebbd-456f-81a6-b23149171a52` | `.../Questions/FaqPlain` |

See also `monthly-webinar-assembly.md` for the Monthly Webinar page wire-up.

## Pages selection

Open **Home** (`f7210946-630b-419e-946e-27240485d980`) → click each Seismic rendering → Design / variant dropdown:

1. Hero (Seismic - Hero) → **PurpleGradientSplit**
2. Image Gallery (after manual add) → **LogoRow** + rendering param `SectionTitle=Trusted by approximately 2,000 organizations worldwide` (Title field not on Image Gallery template)
3. Promo CTA (Industry Financial Services) → **IndustryTabs**

Estimated wiring time: ~5 minutes
