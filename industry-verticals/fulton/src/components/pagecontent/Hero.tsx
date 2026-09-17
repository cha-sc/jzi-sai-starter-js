'use client';

import { JSX, useState } from 'react';
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
import PreviewSearch from 'components/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '../../_data/customizations';

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

/* FultonCounty variant — full-bleed photo with Sitecore Search preview overlay */
export const FultonCounty = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const placeholder =
    props.fields?.Title?.value?.toString() || 'I need help finding...';
  const [isSearchOpen, setIsSearchOpen] = useState(true);

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
          <div className="hero-fulton-search" role="search">
            {isPageEditing ? (
              <div className="hero-fulton-search-editing">
                <Text field={props.fields.Title} tag="span" />
              </div>
            ) : (
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                placeholder={placeholder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
