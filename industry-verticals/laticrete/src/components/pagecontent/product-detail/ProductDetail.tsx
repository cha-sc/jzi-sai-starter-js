'use client';

import { JSX, useState } from 'react';
import Head from 'next/head';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { hydroBanProduct } from './hydroBanProductData';

type ProductDetailShellProps = ComponentProps & {
  fields?: {
    Title?: { value?: string };
    Excerpt?: { value?: string };
    Thumbnail?: { value?: { src?: string } };
  };
};

const Chevron = ({ open }: { open: boolean }): JSX.Element => (
  <svg
    className={`laticrete-pdp__chevron${open ? ' is-open' : ''}`}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    aria-hidden="true"
  >
    <path
      d="M3 5l4 4 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <span className="laticrete-pdp__check" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 14 14">
      <path
        d="M3 7.2l2.6 2.6L11 4.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/**
 * Hardcoded HYDRO BAN product detail page (demo).
 * Used as ArticleDetails.ProductDetail variant so Article Partial Design
 * can keep Breadcrumb in page-navigation while replacing article chrome.
 */
export const ProductDetailView = (props: ProductDetailShellProps): JSX.Element => {
  const product = hydroBanProduct;
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState('');
  const [openGuide, setOpenGuide] = useState<number | null>(0);
  const id = props.params?.RenderingIdentifier;
  const ogTitle = props.fields?.Title?.value || product.title;
  const ogDescription = props.fields?.Excerpt?.value || product.shortDescription;
  const ogImage = props.fields?.Thumbnail?.value?.src || product.gallery[0]?.src;

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="product" />
      </Head>

      <div
        className={`component article-details laticrete-pdp ${props.params?.styles?.trimEnd() || ''}`}
        id={id ? id : undefined}
      >
        <div className="laticrete-pdp__crumbs">
          <div className="laticrete-pdp__container">
            <nav className="laticrete-pdp__breadcrumb" aria-label="Breadcrumb">
              <ol>
                {product.breadcrumbs.map((crumb, index) => {
                  const isLast = index === product.breadcrumbs.length - 1;
                  return (
                    <li key={crumb.label}>
                      {isLast ? (
                        <span aria-current="page">{crumb.label}</span>
                      ) : (
                        <>
                          <a href={crumb.href}>{crumb.label}</a>
                          <span className="laticrete-pdp__crumb-sep" aria-hidden="true">
                            /
                          </span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        <section className="laticrete-pdp__hero">
          <div className="laticrete-pdp__container laticrete-pdp__hero-grid">
            <div className="laticrete-pdp__gallery">
              <div className="laticrete-pdp__gallery-main">
                <img
                  src={product.gallery[activeImage]?.src}
                  alt={product.gallery[activeImage]?.alt}
                />
              </div>
              <div className="laticrete-pdp__thumbs" role="list">
                {product.gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    role="listitem"
                    className={`laticrete-pdp__thumb${index === activeImage ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={image.src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="laticrete-pdp__buybox">
              <h1 className="laticrete-pdp__title">{product.title}</h1>
              <p className="laticrete-pdp__lede">{product.shortDescription}</p>

              <label className="laticrete-pdp__field-label" htmlFor="laticrete-pdp-size">
                Size
              </label>
              <select
                id="laticrete-pdp-size"
                className="laticrete-pdp__select"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                <option value="">Please select...</option>
                {product.sizes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <a
                className="laticrete-pdp__cta"
                href={product.distributorCta.href}
                target="_blank"
                rel="noreferrer"
              >
                {product.distributorCta.label}
              </a>
            </div>
          </div>
        </section>

        <section className="laticrete-pdp__section">
          <div className="laticrete-pdp__container">
            <h2 className="laticrete-pdp__section-title">Product Overview</h2>
            <div className="laticrete-pdp__overview-grid">
              <div className="laticrete-pdp__overview-copy">
                {product.overview.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                <p className="laticrete-pdp__callout">
                  <strong>{product.overview.customSizeHeading}</strong>
                </p>
                <p>{product.overview.customSizeBody}</p>
                <div className="laticrete-pdp__badges">
                  {product.overview.badges.map((badge) => (
                    <img key={badge.alt} src={badge.src} alt={badge.alt} />
                  ))}
                </div>
              </div>

              <aside className="laticrete-pdp__guides" aria-label="Info and Guides">
                <h3 className="laticrete-pdp__guides-title">Info and Guides</h3>
                <ul className="laticrete-pdp__guides-list">
                  {product.guides.map((group, index) => {
                    const isOpen = openGuide === index;
                    return (
                      <li key={group.title} className={isOpen ? 'is-open' : undefined}>
                        <button
                          type="button"
                          className="laticrete-pdp__guides-trigger"
                          aria-expanded={isOpen}
                          onClick={() => setOpenGuide(isOpen ? null : index)}
                        >
                          <span>{group.title}</span>
                          <Chevron open={isOpen} />
                        </button>
                        {isOpen ? (
                          <ul className="laticrete-pdp__guides-links">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <a href={link.href} target="_blank" rel="noreferrer">
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="laticrete-pdp__section laticrete-pdp__section--muted">
          <div className="laticrete-pdp__container">
            <h2 className="laticrete-pdp__section-title">Features &amp; Benefits</h2>
            <ul className="laticrete-pdp__features">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="laticrete-pdp__footnote">{product.featuresFootnote}</p>
          </div>
        </section>

        <section className="laticrete-pdp__section">
          <div className="laticrete-pdp__container">
            <h2 className="laticrete-pdp__section-title">Product Specifications</h2>
            <div className="laticrete-pdp__specs-grid">
              <div>
                <h3 className="laticrete-pdp__subhead">Details</h3>
                <dl className="laticrete-pdp__spec-table">
                  {product.specs.map((row) => (
                    <div key={row.label} className="laticrete-pdp__spec-row">
                      <dt>{row.label}</dt>
                      <dd>
                        {row.html ? (
                          <div dangerouslySetInnerHTML={{ __html: row.value }} />
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="laticrete-pdp__subhead">Available Warranties</h3>
                <ul className="laticrete-pdp__warranties">
                  {product.warranties.map((warranty) => (
                    <li key={warranty.label}>
                      <a href={warranty.href} target="_blank" rel="noreferrer">
                        <span>{warranty.label}</span>
                        <CheckIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Keep nested placeholders for Partial Design leftovers (hidden via CSS when empty) */}
        {props.rendering ? (
          <div className="laticrete-pdp__hidden-ph">
            {/* Keep Partial Design placeholders mounted so Breadcrumb / Author / CTAs remain editable */}
            <Placeholder name="page-navigation" rendering={props.rendering} />
            <Placeholder name="article-meta" rendering={props.rendering} />
            <Placeholder name="background-page-content" rendering={props.rendering} />
            <Placeholder name="page-content" rendering={props.rendering} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export const Default = (props: ProductDetailShellProps): JSX.Element => (
  <ProductDetailView {...props} />
);
