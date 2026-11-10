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
/* Transamerica — full-bleed lifestyle photo + angled navy copy panel */
export const HeroDiagonalNavy = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component hero hero-diagonal-navy ${isPageEditing ? 'is-editing' : ''} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="hero-diagonal-navy__media" aria-hidden={!isPageEditing && !props.fields?.Image?.value?.src}>
        <NextImage
          field={props.fields.Image}
          className="hero-diagonal-navy__img"
          width={1920}
          height={900}
        />
      </div>
      <div className="hero-diagonal-navy__panel">
        <div className="hero-diagonal-navy__copy">
          <h1 className="hero-diagonal-navy__title">
            <Text field={props.fields.Title} />
          </h1>
          <div className="hero-diagonal-navy__subtitle">
            <RichText field={props.fields.Text} />
          </div>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="hero-diagonal-navy__cta" />
          )}
        </div>
      </div>
    </section>
  );
};
