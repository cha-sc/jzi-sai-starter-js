'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

export type ImageItemProps = {
  fields: {
    Image?: ImageField;
    Title?: Field<string>;
    /** SXA / click-click-launch Image template field */
    ImageCaption?: Field<string>;
    /** Optional link on Image template */
    TargetUrl?: LinkField;
  };
  id?: string;
  name: string;
  url: string;
  displayName?: string;
};

export type ImageGalleryProps = {
  params: { [key: string]: string };
  fields: {
    Title?: Field<string>;
    /** Media Image Gallery datasource uses lowercase `title` */
    title?: Field<string> | string;
    items?: ImageItemProps[];
    image1?: ImageField;
    image2?: ImageField;
    image3?: ImageField;
    image4?: ImageField;
  };
};

const hasImageSrc = (image?: ImageField): boolean =>
  Boolean(image?.value?.src || image?.value?.['src']);

const fieldText = (field?: Field<string> | string): string => {
  if (typeof field === 'string') return field;
  const value = field?.value;
  return typeof value === 'string' ? value : '';
};

const getTileLabel = (item: ImageItemProps): string => {
  const caption = fieldText(item.fields?.ImageCaption);
  const title = fieldText(item.fields?.Title);
  const alt = item.fields?.Image?.value?.alt;
  const altText = typeof alt === 'string' ? alt : '';
  return caption || title || altText || item.displayName || item.name || '';
};

const getTileHref = (item: ImageItemProps): string => {
  const target = item.fields?.TargetUrl?.value?.href;
  if (typeof target === 'string' && target) return target;
  if (item.url && !item.url.includes('/Data/') && item.url !== '/') return item.url;
  return '#';
};

/** Fallback when children resolver is not configured — parent image1–image4 fields */
const tilesFromParentFields = (fields: ImageGalleryProps['fields']): ImageItemProps[] => {
  const slots: Array<{ key: string; field?: ImageField }> = [
    { key: 'image1', field: fields?.image1 },
    { key: 'image2', field: fields?.image2 },
    { key: 'image3', field: fields?.image3 },
    { key: 'image4', field: fields?.image4 },
  ];

  return slots
    .filter(({ field }) => hasImageSrc(field))
    .map(({ key, field }) => ({
      name: key,
      url: '#',
      fields: {
        Image: field,
        ImageCaption: {
          value: typeof field?.value?.alt === 'string' ? field.value.alt : key,
        } as Field<string>,
      },
    }));
};

export const Default = (props: ImageGalleryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const images = props.fields?.items?.length
    ? props.fields.items
    : tilesFromParentFields(props.fields);
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component image-gallery ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <DottedAccent className="dotted-accent-top" />
        <div className="image-gallery-grid">
          {images?.map((image, index) => (
            <div className="image-gallery-item" key={image.id || image.url || image.name || index}>
              {hasImageSrc(image.fields?.Image) && (
                <NextImage field={image.fields.Image} width={650} height={650} />
              )}
            </div>
          ))}
        </div>
        <DottedAccent className="dotted-accent-bottom" />
      </div>
    </div>
  );
};