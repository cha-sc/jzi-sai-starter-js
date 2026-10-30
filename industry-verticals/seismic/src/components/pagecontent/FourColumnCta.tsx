'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Title3: Field<string>;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Title4: Field<string>;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
}

export type FourColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-3 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <Link field={link}>
          <div className="content-wrapper">
            <NextImage field={image} width={300} height={300} />
            <div className="text-wrapper">
              <h2>
                <Text field={title} />
              </h2>
              <p>
                <Text field={text} />
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced four-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            title={props.fields.Title4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
        </div>
      </div>
    </div>
  );
};

/* *************************************************************** */
/* SEISMIC — vertical experience cards (4-up fallback) */
export const ExperienceStack = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sectionTitle = props.params?.SectionTitle || "What You'll Experience";
  const items = [
    { image: props.fields.Image1, title: props.fields.Title1, text: props.fields.Text1 },
    { image: props.fields.Image2, title: props.fields.Title2, text: props.fields.Text2 },
    { image: props.fields.Image3, title: props.fields.Title3, text: props.fields.Text3 },
    { image: props.fields.Image4, title: props.fields.Title4, text: props.fields.Text4 },
  ];

  return (
    <section
      className={`component four-column-cta seismic-experience ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="seismic-experience__inner">
        <h3 className="seismic-experience__heading">{sectionTitle}</h3>
        <div className="seismic-experience__list">
          {items.map((item, index) => {
            if (!item.title?.value && !item.image?.value?.src) return null;
            return (
              <article className="seismic-experience__card" key={`exp4-${index}`}>
                <div className="seismic-experience__icon">
                  <NextImage field={item.image} width={48} height={48} />
                </div>
                <div className="seismic-experience__copy">
                  <h4 className="seismic-experience__title">
                    <Text field={item.title} />
                  </h4>
                  <p className="seismic-experience__body">
                    <Text field={item.text} />
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
