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
