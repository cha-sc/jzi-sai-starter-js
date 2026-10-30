'use client';

import { JSX } from 'react';
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
/* SEISMIC — purple gradient split hero with product graphic */
export const PurpleGradientSplit = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component hero seismic-hero-purple ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-hero-purple__glow" aria-hidden="true" />
      <div className="seismic-hero-purple__inner">
        <div className="seismic-hero-purple__copy">
          <h1 className="seismic-hero-purple__title">
            <Text field={props.fields.Title} />
          </h1>
          <div className="seismic-hero-purple__subtitle">
            <RichText field={props.fields.Text} />
          </div>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="seismic-hero-purple__cta" />
          )}
        </div>
        <div className="seismic-hero-purple__media">
          <NextImage
            field={props.fields.Image}
            className="seismic-hero-purple__img"
            width={960}
            height={720}
          />
        </div>
      </div>
    </section>
  );
};

/* *************************************************************** */
/* SEISMIC — Monthly Webinar hero (wave bg, logo, eyebrow, split) */
export const WebinarHero = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const eyebrow = props.params?.Eyebrow || 'Webinar';

  return (
    <section
      className={`component hero seismic-webinar-hero ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-webinar-hero__wave" aria-hidden="true" />
      <div className="seismic-webinar-hero__inner">
        <div className="seismic-webinar-hero__copy">
          <div className="seismic-webinar-hero__logo" aria-hidden="true">
            <svg width="170" height="32" viewBox="0 0 170 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="4" y="2" fill="#FE5000" />
              <path d="M8 10h12v3.2H11.8V14H18v3H11.8v1.6H20V22H8V10z" fill="#fff" />
              <text x="36" y="23" fill="#fff" fontFamily="Montserrat, Arial, sans-serif" fontSize="18" fontWeight="700">
                Seismic
              </text>
            </svg>
          </div>
          <p className="seismic-webinar-hero__eyebrow">{eyebrow}</p>
          <h1 className="seismic-webinar-hero__title">
            <Text field={props.fields.Title} />
          </h1>
          <div className="seismic-webinar-hero__body">
            <RichText field={props.fields.Text} />
          </div>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="seismic-webinar-hero__cta" />
          )}
        </div>
        <div className="seismic-webinar-hero__media">
          <NextImage
            field={props.fields.Image}
            className="seismic-webinar-hero__img"
            width={960}
            height={720}
          />
        </div>
      </div>
    </section>
  );
};
