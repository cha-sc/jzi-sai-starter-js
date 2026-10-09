'use client';

import { JSX } from 'react';
import { Field, ImageField, NextImage, Text } from '@sitecore-content-sdk/nextjs';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

export type ImageItemProps = {
  fields: {
    Image: ImageField;
    Title?: Field<string>;
  };
  name: string;
  url: string;
};

export type ImageGalleryProps = {
  params: { [key: string]: string };
  fields: {
    Title?: Field<string>;
    items: ImageItemProps[];
  };
};

export const Default = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component image-gallery ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <DottedAccent className="dotted-accent-top" />
        <div className="image-gallery-grid">
          {images?.map((image) => (
            <div className="image-gallery-item" key={image.url}>
              <NextImage field={image.fields.Image} width={650} height={650} />
            </div>
          ))}
        </div>
        <DottedAccent className="dotted-accent-bottom" />
      </div>
    </div>
  );
};

/* *************************************************************** */
/* LATICRETE — 7-up square category tiles with teal text links */
export const LaticreteCategoryGrid = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items?.filter(
    (item) => item.name !== 'Data' && item.fields?.Image
  );
  const sxaStyles = `${props.params?.styles || ''}`;
  const hasTitleField = Boolean(props.fields?.Title);
  const fallbackHeading = props.params?.SectionTitle || 'View by Category';

  return (
    <section
      className={`component image-gallery laticrete-category-grid ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="laticrete-category-grid__inner">
        <h2 className="laticrete-category-grid__heading">
          {hasTitleField ? <Text field={props.fields.Title} /> : fallbackHeading}
        </h2>
        <div className="laticrete-category-grid__grid">
          {images?.map((image) => {
            const label =
              image.fields?.Title?.value ||
              image.fields?.Image?.value?.alt ||
              image.name;
            const href = image.url || '#';

            return (
              <a
                key={image.url || image.name}
                href={href}
                className="laticrete-category-grid__tile"
              >
                <div className="laticrete-category-grid__media">
                  <NextImage
                    field={image.fields.Image}
                    className="laticrete-category-grid__img"
                    width={400}
                    height={400}
                  />
                </div>
                <span className="laticrete-category-grid__label">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
