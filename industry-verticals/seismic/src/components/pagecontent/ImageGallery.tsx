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
/* SEISMIC — centered trust headline + grayscale logo row */
export const LogoRow = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items?.filter(
    (item) => item.name !== 'Data' && item.fields?.Image
  );
  const sxaStyles = `${props.params?.styles || ''}`;
  const hasTitleField = Boolean(props.fields?.Title);
  const fallbackHeading =
    props.params?.SectionTitle || 'Trusted by approximately 2,000 organizations worldwide';

  return (
    <section
      className={`component image-gallery seismic-logo-row ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-logo-row__inner">
        <h2 className="seismic-logo-row__heading">
          {hasTitleField ? <Text field={props.fields.Title} /> : fallbackHeading}
        </h2>
        <div className="seismic-logo-row__logos">
          {images?.map((image) => (
            <div className="seismic-logo-row__logo" key={image.url || image.name}>
              <NextImage
                field={image.fields.Image}
                className="seismic-logo-row__img"
                width={160}
                height={48}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
