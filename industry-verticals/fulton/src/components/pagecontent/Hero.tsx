'use client';

import { FormEvent, JSX, useState } from 'react';
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

export type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeroProps): JSX.Element => {
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

/* FultonCounty variant — full-bleed photo with centered search overlay */
export const FultonCounty = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const placeholder =
    props.fields?.Title?.value?.toString() || 'I need help finding...';
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    const href = props.fields?.Link?.value?.href || '/search';
    const separator = href.includes('?') ? '&' : '?';
    window.location.href = `${href}${separator}q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <div
      className={`component hero hero-fulton-county ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <picture>
        <NextImage field={props.fields.Image} className="" width={1920} height={640} />
      </picture>
      <div className="hero-fulton-overlay">
        <div className="container">
          {(isPageEditing || props.fields?.Text?.value) && (
            <div className="hero-fulton-kicker">
              <RichText field={props.fields.Text} />
            </div>
          )}
          <form className="hero-fulton-search" onSubmit={handleSubmit} role="search">
            {isPageEditing ? (
              <div className="hero-fulton-search-editing">
                <Text field={props.fields.Title} tag="span" />
              </div>
            ) : (
              <input
                type="search"
                name="q"
                aria-label="Site search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
            <button type="submit" aria-label="Submit search">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
