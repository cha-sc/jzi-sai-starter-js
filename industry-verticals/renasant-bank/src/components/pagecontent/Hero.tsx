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

/* Renasant Bank — full-bleed hero + navy demo CTA panel (no credential form) */
export const HeroWithLoginPanel = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component hero hero-with-login-panel ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="hero-with-login-panel__media" aria-hidden={!props.fields?.Image?.value?.src}>
        <NextImage field={props.fields.Image} className="hero-with-login-panel__img" width={1920} height={720} />
      </div>
      <div className="container hero-with-login-panel__content">
        <div className="hero-with-login-panel__copy">
          <h1 className="hero-with-login-panel__title">
            <Text field={props.fields.Title} />
          </h1>
          <div className="hero-with-login-panel__subtitle">
            <RichText field={props.fields.Text} />
          </div>
          {(isPageEditing || props.fields?.Link?.value?.href) && (
            <Link field={props.fields.Link} className="hero-with-login-panel__cta" />
          )}
        </div>
        <aside className="hero-login-panel" aria-label="Banking shortcuts">
          <div className="hero-login-panel__tabs" role="tablist">
            <span className="hero-login-panel__tab is-active" role="tab" aria-selected="true">
              Personal
            </span>
            <span className="hero-login-panel__tab" role="tab" aria-selected="false">
              Business
            </span>
          </div>
          <div className="hero-login-panel__body">
            <p className="hero-login-panel__hint">Demo shortcuts — not a live login</p>
            <a
              className="hero-login-panel__login"
              href="https://www.renasantbank.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
            <a
              className="hero-login-panel__link"
              href="https://ole.renasant.online-banking-services.com/onlineEnrol"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll in Online Banking
            </a>
          </div>
          <div className="hero-login-panel__footer">
            <a href="https://www.renasantbank.com/checking" target="_blank" rel="noopener noreferrer">
              Open an Account
            </a>
            <span className="hero-login-panel__divider" aria-hidden="true" />
            <a href="https://www.renasantbank.com/loans" target="_blank" rel="noopener noreferrer">
              Apply for a Loan
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};
