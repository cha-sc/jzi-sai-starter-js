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

function parseEliteTermCardText(value: string | undefined): { age: string; features: string[] } {
  const lines = (value || '')
    .split(/\r?\n|\\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    age: lines[0] || '',
    features: lines.slice(1),
  };
}

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

/* Elite Term — four coverage cards with red headers + footer CTAs */
export const EliteTermCards = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const cards = [
    { title: props.fields.Title1, text: props.fields.Text1 },
    { title: props.fields.Title2, text: props.fields.Text2 },
    { title: props.fields.Title3, text: props.fields.Text3 },
    { title: props.fields.Title4, text: props.fields.Text4 },
  ];

  return (
    <section
      className={`component four-column-cta elite-term-cards ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="elite-term-cards__inner">
        <div className="elite-term-cards__grid">
          {cards.map((card, index) => {
            const { age, features } = parseEliteTermCardText(card.text?.value);
            return (
              <article key={index} className="elite-term-cards__card">
                <header className="elite-term-cards__card-header">
                  <Text field={card.title} />
                </header>
                <div className="elite-term-cards__card-body">
                  {isPageEditing ? (
                    <p className="elite-term-cards__age">
                      <Text field={card.text} />
                    </p>
                  ) : (
                    <>
                      {age && (
                        <p className="elite-term-cards__age">
                          <span className="elite-term-cards__age-value">{age}</span>
                          <span className="elite-term-cards__age-label">years old</span>
                        </p>
                      )}
                      {features.length > 0 && (
                        <ul className="elite-term-cards__features">
                          {features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="elite-term-cards__actions">
          {(isPageEditing || props.fields?.Link1?.value?.href) && (
            <Link field={props.fields.Link1} className="elite-term-cards__cta elite-term-cards__cta--outline" />
          )}
          {(isPageEditing || props.fields?.Link2?.value?.href) && (
            <Link field={props.fields.Link2} className="elite-term-cards__cta elite-term-cards__cta--solid" />
          )}
        </div>
      </div>
    </section>
  );
};
