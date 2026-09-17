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

/* FultonCounty variant — navy Top Services icon cards */
export const FultonCounty = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sectionTitle = props.params?.SectionTitle || '';
  const sectionEyebrow = props.params?.SectionEyebrow || 'FULTON COUNTY GOVERNMENT';
  const showHeading = props.params?.ShowSectionHeading === '1';

  const cards = [
    {
      image: props.fields.Image1,
      title: props.fields.Title1,
      text: props.fields.Text1,
      link: props.fields.Link1,
    },
    {
      image: props.fields.Image2,
      title: props.fields.Title2,
      text: props.fields.Text2,
      link: props.fields.Link2,
    },
    {
      image: props.fields.Image3,
      title: props.fields.Title3,
      text: props.fields.Text3,
      link: props.fields.Link3,
    },
    {
      image: props.fields.Image4,
      title: props.fields.Title4,
      text: props.fields.Text4,
      link: props.fields.Link4,
    },
  ];

  return (
    <div
      className={`component four-column-cta four-column-cta-fulton ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        {showHeading && (
          <div className="fulton-services-heading">
            <p className="fulton-services-eyebrow">{sectionEyebrow}</p>
            <h2 className="fulton-services-title">{sectionTitle || 'TOP SERVICES'}</h2>
          </div>
        )}
        <div className="row g-4">
          {cards.map((card, index) => {
            const hasContent =
              isPageEditing ||
              card.title?.value ||
              card.image?.value?.src ||
              card.link?.value?.href;
            if (!hasContent) return null;

            return (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
                <div className="fulton-service-card">
                  <div className="fulton-service-icon">
                    <NextImage field={card.image} width={72} height={72} />
                  </div>
                  <h3>
                    <Text field={card.title} />
                  </h3>
                  {(isPageEditing || card.text?.value) && (
                    <p className="fulton-service-text">
                      <Text field={card.text} />
                    </p>
                  )}
                  {(isPageEditing || card.link?.value?.href) && (
                    <Link field={card.link} className="fulton-read-more" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getFourColumnCards = (fields: Fields) => [
  { image: fields.Image1, title: fields.Title1, text: fields.Text1, link: fields.Link1 },
  { image: fields.Image2, title: fields.Title2, text: fields.Text2, link: fields.Link2 },
  { image: fields.Image3, title: fields.Title3, text: fields.Text3, link: fields.Link3 },
  { image: fields.Image4, title: fields.Title4, text: fields.Text4, link: fields.Link4 },
];

/* SuperiorCourtQuickLinks — circular icon wells under QUICK LINKS */
export const SuperiorCourtQuickLinks = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sectionTitle = props.params?.SectionTitle || 'QUICK LINKS';
  const cards = getFourColumnCards(props.fields);

  return (
    <div
      className={`component four-column-cta four-column-cta-sc-quicklinks ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <h2 className="sc-section-title">{sectionTitle}</h2>
        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => {
            const hasContent =
              isPageEditing ||
              card.title?.value ||
              card.image?.value?.src ||
              card.link?.value?.href;
            if (!hasContent) return null;

            const inner = (
              <>
                <div className="sc-quicklink-icon">
                  <NextImage field={card.image} width={64} height={64} />
                </div>
                <h3>
                  <Text field={card.title} />
                </h3>
              </>
            );

            return (
              <div className="col-6 col-md-3" key={index}>
                <div className="sc-quicklink-card">
                  {card.link?.value?.href && !isPageEditing ? (
                    <Link field={card.link} className="sc-quicklink-anchor">
                      {inner}
                    </Link>
                  ) : (
                    <div className="sc-quicklink-anchor">{inner}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* SuperiorCourtTiles — photo tiles with orange banner labels (THE COURT) */
export const SuperiorCourtTiles = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const sectionTitle = props.params?.SectionTitle || 'THE COURT';
  const sectionIntro =
    props.params?.SectionIntro ||
    'The Superior Court of Fulton County serves the residents of Georgia’s most populous county with fairness, integrity, and access to justice.';
  const cards = getFourColumnCards(props.fields);

  return (
    <div
      className={`component four-column-cta four-column-cta-sc-tiles ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <h2 className="sc-section-title">{sectionTitle}</h2>
        <p className="sc-section-intro">{sectionIntro}</p>
        <div className="row g-3">
          {cards.map((card, index) => {
            const hasContent =
              isPageEditing || card.title?.value || card.image?.value?.src;
            if (!hasContent) return null;

            const tile = (
              <div className="sc-court-tile">
                <div className="sc-court-tile-media">
                  <NextImage field={card.image} width={480} height={640} />
                </div>
                <div className="sc-court-tile-banner">
                  <Text field={card.title} />
                </div>
              </div>
            );

            return (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
                {card.link?.value?.href && !isPageEditing ? (
                  <Link field={card.link} className="sc-court-tile-link">
                    {tile}
                  </Link>
                ) : (
                  tile
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
