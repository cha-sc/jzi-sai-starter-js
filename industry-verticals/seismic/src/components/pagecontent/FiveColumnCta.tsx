'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
  Text5: Field<string>;
  Image5: ImageField;
  Link5: LinkField;
}

export type FiveColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FiveColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col ${!isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''} `}
        ref={domRef}
      >
        <Link field={link}>
          <div className="image-container">
            <NextImage field={image} className="d-block w-100 h-100" width={200} height={200} />
          </div>
        </Link>
        <div className="text-container">
          <Text field={text} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced five-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-gap-3 gx-5 justify-content-center">
          <Column image={props.fields.Image1} text={props.fields.Text1} link={props.fields.Link1} />
          <Column
            image={props.fields.Image2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
          <Column
            image={props.fields.Image5}
            text={props.fields.Text5}
            link={props.fields.Link5}
            delay={2000}
          />
        </div>
      </div>
    </div>
  );
};

const splitTitleBody = (value?: string): { title: string; body: string } => {
  const raw = value || '';
  const sep = raw.includes('|||') ? '|||' : '\n';
  const [title, ...rest] = raw.split(sep);
  return { title: (title || '').trim(), body: rest.join(sep).trim() };
};

/* *************************************************************** */
/* SEISMIC — vertical experience cards for webinar landing */
export const ExperienceStack = (props: FiveColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sectionTitle = props.params?.SectionTitle || "What You'll Experience";
  const items = [
    { image: props.fields.Image1, text: props.fields.Text1 },
    { image: props.fields.Image2, text: props.fields.Text2 },
    { image: props.fields.Image3, text: props.fields.Text3 },
    { image: props.fields.Image4, text: props.fields.Text4 },
    { image: props.fields.Image5, text: props.fields.Text5 },
  ];

  return (
    <section
      className={`component five-column-cta seismic-experience ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-experience__inner">
        <h3 className="seismic-experience__heading">{sectionTitle}</h3>
        <div className="seismic-experience__list">
          {items.map((item, index) => {
            const { title, body } = splitTitleBody(item.text?.value);
            if (!title && !item.image?.value?.src) return null;
            return (
              <article className="seismic-experience__card" key={`exp-${index}`}>
                <div className="seismic-experience__icon">
                  <NextImage field={item.image} width={48} height={48} />
                </div>
                <div className="seismic-experience__copy">
                  <h4 className="seismic-experience__title">{title}</h4>
                  {body ? <p className="seismic-experience__body">{body}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
