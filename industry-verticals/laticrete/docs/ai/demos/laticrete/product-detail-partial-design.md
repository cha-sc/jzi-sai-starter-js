# Article → Product Detail reskin (HYDRO BAN demo)

Hardcoded PDP for **HYDRO BAN® Pre-Sloped Shower Pans**, wired through the existing Financial **Article** page stack.

## Code delivered

| Piece | Path |
|-------|------|
| Article Details variant | `ArticleDetails.ProductDetail` in `src/components/pagecontent/ArticleDetails.tsx` |
| PDP UI + data | `src/components/pagecontent/product-detail/` |
| Styles | `src/assets/sass/components/_laticrete-pdp.scss` |

Test route (after deploy + Sitecore wiring):  
`/articles/introducing-mobile-finance` on the Laticrete site.

---

## Sitecore changes (required)

### 1. Create Headless Variant

Path:

`/sitecore/content/Laticrete/Laticrete/Presentation/Headless Variants/Article Details/ProductDetail`

- Template: **Variant Definition** (`4d50cdae-c2d9-4de8-b080-8f992bfb1b55`)
- Name must be exactly **`ProductDetail`** (matches React export)
- **Already created:** item ID `2b8df2c8-3605-4fe2-bf2f-ffba55072152`

### 2. Point the test article at the variant

Item: `/sitecore/content/Laticrete/Laticrete/Home/articles/introducing-mobile-finance`

In **Pages**:

1. Open the article
2. Select **Article Details** on the canvas
3. Design / variant → **ProductDetail**

(That sets FieldNames on the Article Details rendering for this page only — preferred for a single demo product.)

### 3. Optional: clean chrome on that page

Still on the article Final Layout, remove or hide:

| Rendering | Why |
|-----------|-----|
| **Author Widget** (`article-meta`) | Author card is not on the LATICRETE PDP |
| **Four Column CTA** (`page-content`) | “Related articles” strip fights the PDP |

The ProductDetail variant already visually suppresses these via a hidden placeholder region; removing them keeps the Experience Editor cleaner.

### 4. Optional: rewrite article fields (listings / OG)

On `introducing-mobile-finance`:

| Field | PDP mapping | Page Builder |
|-------|-------------|--------------|
| Title | Buy-box H1 + document title + last breadcrumb crumb | Inline `<Text>` |
| Excerpt | Short description under the title | Inline `<Text>` |
| Content | Product Overview rich text | Inline `<RichText>` |
| Thumbnail | Main gallery image | `<NextImage>` (labeled in edit mode) |
| BackgroundImage | Optional second gallery image | `<NextImage>` (labeled in edit mode) |

In Pages edit mode, empty Title / Excerpt / Content / image fields still render so they stay clickable.
On the live site, empty image fields fall back to the hardcoded HYDRO BAN CDN gallery.

---

## Article Partial Design changes (site-wide article → PDP)

Only do this if **every** Laticrete article should look like a product page.

Partial Design:  
`/sitecore/content/Laticrete/Laticrete/Presentation/Partial Designs/Article Content`  
(cloned from ProsperaFinancial; signature `article-content`)

Current composition (Financial):

1. **Article Details** on `headless-main`
2. **Breadcrumb** on `/headless-main/page-navigation-{*}`
3. **Four Column CTA** on `/headless-main/page-content-{*}`

### Recommended Partial Design edits

| Action | Detail |
|--------|--------|
| **Keep** | Article Details on `headless-main` — set **default** FieldNames / variant to **ProductDetail** on the Partial Design rendering (or on Article Page `__Standard Values`) |
| **Remove** | Four Column CTA from `page-content` |
| **Remove** | Author Widget from Article Page standard values / `article-meta` (if present on Laticrete) |
| **Optional keep** | Breadcrumb in `page-navigation` — ProductDetail ships its own hardcoded crumbs for the HYDRO BAN path; either remove Breadcrumb from the PD or delete the hardcoded nav in `ProductDetail.tsx` and style the Sitecore Breadcrumb instead |

### Page Design

No change required if you keep:

`Article Page` = Header + Article Content + Footer

Header/Footer stay shared site chrome.

---

## Deploy

1. Deploy / rebuild editing host for `industry-verticals/laticrete` so `ProductDetail` is in the component map
2. Create the Headless Variant (step 1)
3. Set variant on `introducing-mobile-finance` (step 2)
4. Soft-reload Pages / publish the article

---

## Extending beyond hardcode

Article fields already drive Title / Excerpt / Content / Thumbnail / BackgroundImage.
Remaining demo chrome (sizes, guides, features, specs, warranties, CTA) lives in
`product-detail/hydroBanProductData.ts`. To CMS-manage later:

- Move gallery (3+), specs, guides into nested datasource items or a JSON field
- Keep the same layout sections in `ProductDetail.tsx`
