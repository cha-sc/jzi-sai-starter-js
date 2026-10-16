# Variant Selection Checklist — Seismic

Sitecore **Variant Definition** items exist. Select them on Home in Pages (Agent API cannot set FieldNames).

Variant Definition template ID: `4d50cdae-c2d9-4de8-b080-8f992bfb1b55`

| # | Component | React export | Sitecore item ID | Path |
|---|-----------|--------------|------------------|------|
| 1 | Hero | `PurpleGradientSplit` | `64a7e913-6f28-4266-afd3-92a045e4c44c` | `/sitecore/content/Seismic/Seismic/Presentation/Headless Variants/Hero/PurpleGradientSplit` |
| 2 | Image Gallery | `LogoRow` | `be9c41f4-79dd-411a-a2e1-86dc2e597d2d` | `.../Image Gallery/LogoRow` |
| 3 | Promo CTA | `IndustryTabs` | `89dbf404-a6a6-43d4-a97d-0874cb3679b8` | `.../Promo CTA/IndustryTabs` |

## Pages selection

Open **Home** (`f7210946-630b-419e-946e-27240485d980`) → click each Seismic rendering → Design / variant dropdown:

1. Hero (Seismic - Hero) → **PurpleGradientSplit**
2. Image Gallery (after manual add) → **LogoRow** + rendering param `SectionTitle=Trusted by approximately 2,000 organizations worldwide` (Title field not on Image Gallery template)
3. Promo CTA (Industry Financial Services) → **IndustryTabs**

Estimated wiring time: ~5 minutes
