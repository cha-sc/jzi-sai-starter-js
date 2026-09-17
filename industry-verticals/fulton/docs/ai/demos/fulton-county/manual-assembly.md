# Manual Assembly Notes — Fulton County Home

`add_component_on_page` and `set_component_datasource` are currently failing on this site (Agent API 500 / “No saveItem”). Datasources were created and populated; layout placement and FieldNames must be finished in Pages.

## Utility Navigation (eyebrow)

**Code:** `LinkList` with **`UtilityNav`** variant (`src/components/navigation/LinkList.tsx`)  
**Datasource:** `/sitecore/content/fulton-county/fulton-county/Data/Link Lists/Utility Nav` (`1727968c-0663-4a34-9ca1-89061c6a2c5b`)  
**Variant ID:** `{9EF93F5C-323F-4688-92F0-E392E9D35D24}`  
**Rendering:** Link List `4956263d-1195-4d6e-931b-800ea625ff6f`

### Pages steps
1. Open Partial Design **Header**
2. On **Eyebrow** → placeholder `eyebrow-left`, add **Link List**
3. Assign datasource **Utility Nav**
4. Design tab → variant **UtilityNav**
5. Save / publish

Optional: rename child item `Link 1` → `Elections` and confirm sort order matches the live site (Elections → … → Watch FGTV).


| Role | Item name | Item ID | Path |
|------|-----------|---------|------|
| Hero (search overlay) | Fulton County - Hero | `ac1d0065-5908-48bd-92c1-40a4c46970e3` | `/sitecore/content/fulton-county/fulton-county/Data/Fulton County - Hero` |
| Hero (local copy) | FultonHero | `3ab00c36-cc1a-4779-9a47-9e9dc4b33081` | `…/Home/Data/FultonHero` |
| Top Services row 1 | Four Column CTA_092a… | `19482599-07f2-4ebc-afe5-b9839176489e` | `…/Data/Promos/Four Column CTA_092a5ac9559a4f7eb3504dd94b4b1f4f` |
| Top Services row 1 (local) | Fulton_Top_Services_1 | `41c893c1-f7bf-48ad-a125-8873fb3423ef` | `…/Home/Data/Fulton_Top_Services_1` |
| Top Services row 2 | Four Column CTA_a0ad… | `e644f77b-2455-47e6-9b78-207228ae965a` | `…/Data/Promos/Four Column CTA_a0ad95ea50da42d5bd72190b5ed8114f` |
| Top Services row 2 (local) | Fulton_Top_Services_2 | `8bfec51d-ca54-43bb-bc30-6c6dea5d50c9` | `…/Home/Data/Fulton_Top_Services_2` |
| District Finder | Two Column CTA_04da… | `7838d74a-b0ef-48f8-9614-5d5885d0312d` | `…/Data/Promos/Two Column CTA_04da304c527843dca9a5b48875526f35` |

## Rendering IDs

| Component | Rendering ID |
|-----------|--------------|
| Hero | `b7cdf75e-716a-4c59-b9b1-cd970ae0a4ae` |
| Four Column CTA | `35075000-760e-4ff3-bd1c-f2eeba251dcb` |
| Two Column CTA | `3a9a9d22-c092-4b54-9511-eb202ceabe8d` |
| Article List | `52733592-6f5d-4fb4-8003-9b8223c5bc76` |
| Author List | `69e8a90f-59ca-4638-b53e-bdce65835230` |

## Pages steps (recommended order)

1. On **Home** `headless-main`, **add Hero** → assign datasource **Fulton County - Hero** (or **FultonHero**) → variant **FultonCounty**.
2. **Add Four Column CTA** ×2 → wire Top Services row 1 / row 2 datasources → variant **FultonCounty** each.
3. Existing **Two Column CTA** already has District Finder field values on `Two Column CTA 1` (`e6d1ae89-…`). Optionally re-point to shared `7838d74a-…`. Set variant **FultonCounty**.
4. Existing **Article List** stays on `articles` folder. Set variant **FultonCounty**.
5. **Add Author List** → datasource = `authors` page (`e0c5b1d4-…`) → variant **FultonCounty**.
6. Remove or hide leftover finance components: Carousel (after Hero is live), unused Promo CTA local instance, Documents List, App Promo, Comparison row, nested empty Four Column CTA.

## Already applied via MCP (no Pages action required for content)

- Home title → **Fulton County Government**
- Two Column CTA 1 → District Finder copy + DAM image
- Five Column “Available Services” → Top Services (5 cards)
- Three Column CTA 1 → remaining services
- Promo CTA 1 / 2 → News stories
- Articles page → News titles
- Authors page → Board of Commissioners
- Carousel Item 1 → interim “I need help finding…” copy
- About Us → Fulton County about copy
