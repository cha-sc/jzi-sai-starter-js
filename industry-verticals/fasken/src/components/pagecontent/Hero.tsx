'use client';

import { JSX, useMemo, useState } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  useSitecore,
  Link,
  LinkField,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

export type AppPromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type DemoSlide = {
  tabLabel: string;
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  linkText: string;
  usesDatasource?: boolean;
};

const FASKEN_HERO_SLIDES: DemoSlide[] = [
  {
    tabLabel: 'Exit InSights: Emerging Tech Deal Study 2026',
    title: 'Exit InSights: Emerging Tech Deal Study 2026',
    text: 'Explore exit trends among VC-backed and high-growth tech companies across Canada in the inaugural edition of Fasken’s Exit InSights.',
    imageSrc:
      'https://cha-verticals-0914.sitecoresandbox.cloud/api/public/content/90654-cap-00?v=02e06a2e',
    imageAlt: 'Hero slide — tech deal study',
    href: 'https://www.fasken.com/en/knowledge/2026/01/tech-deal-study',
    linkText: 'Learn more',
  },
  {
    tabLabel: 'Named Global Mining Law Firm of the Year for the 18th Time',
    title: 'Named Global Mining Law Firm of the Year for the 18th Time',
    text: 'Our Global Mining Group has received this recognition more times than any other law firm in the world.',
    imageSrc:
      'https://cha-verticals-0914.sitecoresandbox.cloud/api/public/content/90649-cap-03?v=086cce33',
    imageAlt: 'Hero slide — mining recognition',
    href: 'https://www.fasken.com/en/news/2026/11/fasken-named-mining-law-firm-of-the-year',
    linkText: 'Learn more',
    usesDatasource: true,
  },
  {
    tabLabel: 'Fasken Featured in Chambers Canada 2027',
    title: 'Fasken Featured in Chambers Canada 2027',
    text: 'Fasken is recognized across practice areas in the latest Chambers Canada guide.',
    imageSrc:
      'https://cha-verticals-0914.sitecoresandbox.cloud/api/public/content/90659-cap-02?v=701e2f91',
    imageAlt: 'Hero slide — Chambers Canada',
    href: 'https://www.fasken.com/en/news/2026/09/fasken-featured-in-chambers-canada',
    linkText: 'Learn more',
  },
  {
    tabLabel: 'Canada-Trump Administration 2.0',
    title: 'Canada-Trump Administration 2.0',
    text: 'Guidance for Canadian businesses navigating cross-border policy and trade developments.',
    imageSrc:
      'https://cha-verticals-0914.sitecoresandbox.cloud/api/public/content/90670-cap-01?v=3fe01c58',
    imageAlt: 'Hero slide — Canada-US policy',
    href: 'https://www.fasken.com/en/knowledge/canada-trump-administration',
    linkText: 'Learn more',
  },
  {
    tabLabel: "Canada's New Retaliatory Tariffs on US Goods",
    title: "Canada's New Retaliatory Tariffs on US Goods",
    text: 'What Canadian importers and exporters need to know about new tariff measures.',
    imageSrc:
      'https://cha-verticals-0914.sitecoresandbox.cloud/api/public/content/90677-cap-04?v=bc2b7208',
    imageAlt: 'Hero slide — tariffs',
    href: 'https://www.fasken.com/en/knowledge',
    linkText: 'Learn more',
  },
];

export const Default = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component hero ${sxaStyles}`} id={id ? id : undefined}>
      <picture>
        <NextImage field={props.fields.Image} className="" width={1920} height={400}></NextImage>
      </picture>
      <div className="container content-container">
        <div className="top-layout">
          <div className="title">
            <Text field={props.fields.Title} />
          </div>
          <div className="subtitle">
            <RichText field={props.fields.Text} />
          </div>
        </div>
        <div className="bottom-layout">
          <div className="btn-array">
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="button button-main mt-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* *************************************************************** */
/* Fasken — split copy / image hero with numbered carousel tabs */
export const FaskenSplitHeroCarousel = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const [activeIndex, setActiveIndex] = useState(1);

  const slides = useMemo(() => {
    return FASKEN_HERO_SLIDES.map((slide) => {
      if (!slide.usesDatasource) return slide;
      const dsTitle = props.fields?.Title?.value;
      const dsText = props.fields?.Text?.value;
      const dsHref = props.fields?.Link?.value?.href;
      const dsLinkText = props.fields?.Link?.value?.text;
      const dsImage = props.fields?.Image?.value?.src;
      return {
        ...slide,
        title: typeof dsTitle === 'string' && dsTitle ? dsTitle : slide.title,
        text:
          typeof dsText === 'string' && dsText
            ? dsText.replace(/<[^>]+>/g, '')
            : slide.text,
        href: dsHref || slide.href,
        linkText: dsLinkText || slide.linkText,
        imageSrc: dsImage || slide.imageSrc,
        imageAlt: props.fields?.Image?.value?.alt || slide.imageAlt,
      };
    });
  }, [props.fields]);

  const active = slides[isPageEditing ? 1 : activeIndex] || slides[1];

  return (
    <section
      className={`component hero fasken-split-hero ${isPageEditing ? 'is-editing' : ''} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="fasken-split-hero__main">
        <div className="fasken-split-hero__copy">
          {isPageEditing ? (
            <>
              <h1 className="fasken-split-hero__title">
                <Text field={props.fields.Title} />
              </h1>
              <div className="fasken-split-hero__body">
                <RichText field={props.fields.Text} />
              </div>
              {(props.fields?.Link?.value?.href || isPageEditing) && (
                <Link field={props.fields.Link} className="fasken-split-hero__cta" />
              )}
            </>
          ) : (
            <>
              <h1 className="fasken-split-hero__title">{active.title}</h1>
              <p className="fasken-split-hero__body">{active.text}</p>
              <a className="fasken-split-hero__cta" href={active.href} target="_blank" rel="noreferrer">
                {active.linkText}
              </a>
            </>
          )}
        </div>
        <div className="fasken-split-hero__media">
          {isPageEditing ? (
            <NextImage field={props.fields.Image} className="fasken-split-hero__img" width={1200} height={800} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="fasken-split-hero__img" src={active.imageSrc} alt={active.imageAlt} />
          )}
        </div>
      </div>
      <div className="fasken-split-hero__tabs" role="tablist" aria-label="Hero slides">
        {slides.map((slide, index) => {
          const isActive = (isPageEditing ? 1 : activeIndex) === index;
          const num = String(index + 1).padStart(2, '0');
          return (
            <button
              key={slide.tabLabel}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`fasken-split-hero__tab${isActive ? ' is-active' : ''}`}
              onClick={() => !isPageEditing && setActiveIndex(index)}
            >
              <span className="fasken-split-hero__tab-label">{slide.tabLabel}</span>
              <span className="fasken-split-hero__tab-num">{num}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
