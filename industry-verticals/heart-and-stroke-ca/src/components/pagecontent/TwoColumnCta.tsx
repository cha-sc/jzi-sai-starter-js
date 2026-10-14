'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
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
}

export type TwoColumnCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    placeholder,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    placeholder: string;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    const buttonStyle = props.params?.ButtonStyle
      ? `button-${props.params.ButtonStyle.toLowerCase()}`
      : 'button-main';

    return (
      <div
        className={`col-sm-12 col-lg-6 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={800} height={800} />
          {(isPageEditing || title?.value) && (
            <h2>
              <Text field={title} />
            </h2>
          )}
          {(isPageEditing || text?.value) && (
            <p>
              <Text field={text} />
            </p>
          )}
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className={`button ${buttonStyle}`} />
          )}
          <Placeholder name={placeholder} rendering={props.rendering} />
        </div>
      </div>
    );
  };

  return (
    <div className={`component two-column-cta pb-5 ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
            placeholder="two-col-placeholder-left"
            delay={0}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            placeholder="two-col-placeholder-right"
            delay={500}
          />
        </div>
      </div>
    </div>
  );
};

/* Heart & Stroke — dual research photo tiles with white content boxes */
export const ResearchDualTiles = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Tile = ({
    image,
    title,
    text,
    link,
    align,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    align: 'center-right' | 'center-left';
  }) => (
    <article className={`hs-research__tile hs-research__tile--${align}`}>
      <div className="hs-research__media">
        <NextImage field={image} width={1200} height={1400} />
      </div>
      <div className="hs-research__box">
        <h3 className="hs-research__title">
          <Text field={title} />
        </h3>
        <p className="hs-research__text">
          <Text field={text} />
        </p>
        {(isPageEditing || link?.value?.href) && (
          <Link field={link} className="hs-research__cta" />
        )}
      </div>
    </article>
  );

  return (
    <section
      className={`component two-column-cta hs-research ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="hs-research__grid">
        <Tile
          image={props.fields.Image1}
          title={props.fields.Title1}
          text={props.fields.Text1}
          link={props.fields.Link1}
          align="center-right"
        />
        <Tile
          image={props.fields.Image2}
          title={props.fields.Title2}
          text={props.fields.Text2}
          link={props.fields.Link2}
          align="center-left"
        />
      </div>
    </section>
  );
};

/* Heart & Stroke — grey legacy tile + solid red donate tile */
export const GivingPromoTiles = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component two-column-cta hs-giving ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="hs-giving__grid">
          <article className="hs-giving__tile hs-giving__tile--muted">
            <h3 className="hs-giving__title">
              <Text field={props.fields.Title1} />
            </h3>
            <p className="hs-giving__text">
              <Text field={props.fields.Text1} />
            </p>
            {(isPageEditing || props.fields.Link1?.value?.href) && (
              <Link field={props.fields.Link1} className="hs-giving__link" />
            )}
          </article>
          <article className="hs-giving__tile hs-giving__tile--red">
            <h3 className="hs-giving__title">
              <Text field={props.fields.Title2} />
            </h3>
            <p className="hs-giving__text">
              <Text field={props.fields.Text2} />
            </p>
            {(isPageEditing || props.fields.Link2?.value?.href) && (
              <Link field={props.fields.Link2} className="hs-giving__cta" />
            )}
          </article>
        </div>
      </div>
    </section>
  );
};
