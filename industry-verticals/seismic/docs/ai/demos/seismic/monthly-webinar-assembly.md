# Monthly Webinar Landing Page — Assembly Checklist

Page: **Monthly Webinar** (`ef893c5b-370a-41fb-b57a-7d371a93b588`)  
Route: `/Landing-Pages/Monthly-Webinar`  
Reference: https://learn.seismic.com/webinar-seismic-monthly-live-product-demonstration.html

> **Blocked:** Marketer MCP `add_component_on_page` / `create_component_ds` currently fail with GraphQL `renderings` schema error. Datasources + Headless Variant Definition items were created via content APIs. Wire components in **Pages** (~10 min).

## Datasources (ready under `/Data/Seismic Demo/`)

| Order | Component | Datasource | Item ID | Variant |
|------:|-----------|------------|---------|---------|
| 1 | Hero | Webinar - Hero | `a174f3b2-ad9b-443d-a2ca-3cc87c4986e8` | **WebinarHero** (`77a08f4d-1fa5-4db2-b348-884f4c86b9f2`) |
| 2 | Promo CTA | Webinar - Why Attend | `07d0df60-9fb2-47ba-bc76-2388bfc0bcd7` | **WhyAttendRegister** (`b30b56a3-f4cd-40a9-8186-a1fc89ad7fcd`) |
| 3 | Four Column CTA | Webinar - Experience | `bce0db65-92d3-422d-a2ee-6712c3db202c` | **ExperienceStack** (`b99682cd-2126-458a-ac61-faea7e19af05`) |
| 4 | Promo CTA | Webinar - Meet Host | `2f2b63ef-e11d-49dc-a658-d2aff6edde25` | **MeetHost** (`89cb9d3d-ebbe-4f36-a4e1-31a8ab0627e1`) |
| 5 | Promo CTA | Webinar - Who Should Attend | `5af144ed-2f81-447c-af52-42e8823e171e` | **ChecklistSection** (`ad1be731-a712-41d1-8bae-d8e10edb8d04`) |
| 6 | Promo CTA | Webinar - What Youll Learn | `20746222-2cdd-4275-85a5-65244e83c37a` | **ChecklistSection** |
| 7 | Questions | Webinar - FAQ | `f031d369-89a8-4b17-863b-d3316aff5106` | **FaqPlain** (`8872fc22-ebbd-456f-81a6-b23149171a52`) |
| 8 | Three Column CTA | Webinar - Sessions | `a6fc7e74-7fe0-461c-af82-f6a88a3f9d37` | **SessionCards** (`e6ae0e29-3288-4208-bf60-9b6d3026684a`) |

## Rendering params to set in Pages

| Component | Param | Value |
|-----------|-------|-------|
| Experience (Four Column) | `SectionTitle` | `What You'll Experience` |
| Sessions (Three Column) | `SectionTitle` | `Reserve Your Spot` |
| Sessions (Three Column) | `SectionIntro` | `Join one of our monthly live demonstrations and discover how Seismic helps organisations deliver more effective customer engagement.` |
| FAQ (Questions) | `SectionTitle` | `FAQ` |
| Why Attend (optional) | `Sessions` | `Friday, 23 October\|Monday, 16 November\|Friday, 4 December` |

## Pages steps

1. Open Monthly Webinar in Pages.
2. Add each component to `headless-main` in the order above.
3. Assign the matching datasource.
4. Select the Headless Variant from the Design / variant dropdown (Agent API cannot set `FieldNames`).
5. Set rendering params listed above.
6. Preview against the Marketo reference URL.

## Frontend variants shipped

| Export | File | Styles |
|--------|------|--------|
| `WebinarHero` | `Hero.tsx` | `.seismic-webinar-hero` |
| `WhyAttendRegister` | `PromoCta.tsx` | `.seismic-why-attend` |
| `MeetHost` | `PromoCta.tsx` | `.seismic-meet-host` |
| `ChecklistSection` | `PromoCta.tsx` | `.seismic-checklist` |
| `ExperienceStack` | `FourColumnCta.tsx` / `FiveColumnCta.tsx` | `.seismic-experience` |
| `SessionCards` | `ThreeColumnCta.tsx` | `.seismic-sessions` |
| `FaqPlain` | `Questions.tsx` | `.seismic-faq` |

SCSS: `src/assets/sass/components/_seismic-demo.scss`

## Notes

- Registration form in `WhyAttendRegister` is a visual match (not Marketo-connected).
- Hero/host/experience images use live `learn.seismic.com` media URLs for pixel parity.
- Page metadata Title / OG fields were updated on the page item.
- Optional: add a 5th experience card (Interactive Q&A) via Five Column CTA + `ExperienceStack` when `add_component` is healthy again; Four Column covers the four primary cards.
