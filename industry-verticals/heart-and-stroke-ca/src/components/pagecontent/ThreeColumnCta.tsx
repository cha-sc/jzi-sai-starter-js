'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  LinkField,
  Link,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Text1: Field<string>;
  SubText1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Text2: Field<string>;
  SubText2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Text3: Field<string>;
  SubText3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
}

export type ThreeColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    text,
    subText,
    link,
    delay,
  }: {
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    const buttonStyle = props.params?.ButtonStyle
      ? `button-${props.params.ButtonStyle.toLowerCase()}`
      : 'button-main';

    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={400} height={400} />
          <h2>
            <Text field={text} />
          </h2>
          <p>
            <Text field={subText} />
          </p>
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className={`button ${buttonStyle}`} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};

export const WithIcons = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    text,
    subText,
    link,
    delay,
  }: {
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <Link field={link} className="wrapper-link">
          <div className="content-wrapper">
            <div className="image-wrapper mb-5">
              <NextImage field={image} width={32} height={32} />
            </div>
            <h2>
              <Text field={text} />
            </h2>
            <p>
              <Text field={subText} />
            </p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta with-icons ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row gx-0">
          <Column
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};

/* Heart & Stroke — key priorities image cards with carousel chrome */
export const PrioritiesCarousel = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Card = ({
    image,
    text,
    subText,
    link,
  }: {
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
  }) => (
    <article className="hs-priorities__card">
      <div className="hs-priorities__media">
        <NextImage field={image} width={640} height={480} />
      </div>
      <div className="hs-priorities__body">
        <h3 className="hs-priorities__title">
          <Text field={text} />
        </h3>
        <p className="hs-priorities__caption">
          <Text field={subText} />
        </p>
        {(isPageEditing || link?.value?.href) && (
          <Link field={link} className="hs-priorities__link" />
        )}
      </div>
    </article>
  );

  return (
    <section
      className={`component component-spaced three-column-cta hs-priorities ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <header className="hs-priorities__header">
          <h2 className="hs-priorities__heading">Our key priorities</h2>
        </header>
        <div className="hs-priorities__track">
          <Card
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Card
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
          />
          <Card
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
          />
        </div>
        <div className="hs-priorities__chrome" aria-hidden="true">
          <span className="hs-priorities__arrow">‹</span>
          <span className="hs-priorities__progress" />
          <span className="hs-priorities__arrow">›</span>
        </div>
      </div>
    </section>
  );
};

/* Heart & Stroke — featured article left + stacked teasers */
export const ArticlesFeatureStack = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component component-spaced three-column-cta hs-articles ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <header className="hs-articles__header">
          <h2 className="hs-articles__heading">Latest articles</h2>
        </header>
        <div className="hs-articles__grid">
          <article className="hs-articles__feature">
            <div className="hs-articles__feature-media">
              <NextImage field={props.fields.Image1} width={900} height={600} />
            </div>
            <p className="hs-articles__category">
              <Text field={props.fields.SubText1} />
            </p>
            <h3 className="hs-articles__feature-title">
              <Text field={props.fields.Text1} />
            </h3>
            {(isPageEditing || props.fields.Link1?.value?.href) && (
              <Link field={props.fields.Link1} className="hs-articles__read" />
            )}
          </article>
          <div className="hs-articles__stack">
            {[
              {
                image: props.fields.Image2,
                text: props.fields.Text2,
                sub: props.fields.SubText2,
                link: props.fields.Link2,
              },
              {
                image: props.fields.Image3,
                text: props.fields.Text3,
                sub: props.fields.SubText3,
                link: props.fields.Link3,
              },
            ].map((item, index) => (
              <article className="hs-articles__teaser" key={index}>
                <div className="hs-articles__teaser-media">
                  <NextImage field={item.image} width={240} height={180} />
                </div>
                <div className="hs-articles__teaser-body">
                  <p className="hs-articles__category">
                    <Text field={item.sub} />
                  </p>
                  <h3 className="hs-articles__teaser-title">
                    <Text field={item.text} />
                  </h3>
                  {(isPageEditing || item.link?.value?.href) && (
                    <Link field={item.link} className="hs-articles__read" />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Heart & Stroke — recipe cards with category labels */
export const RecipesCarousel = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Recipe = ({
    image,
    text,
    subText,
    link,
  }: {
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
  }) => (
    <article className="hs-recipes__card">
      <div className="hs-recipes__media">
        <NextImage field={image} width={480} height={360} />
      </div>
      <p className="hs-recipes__category">
        <Text field={subText} />
      </p>
      <h3 className="hs-recipes__title">
        <Text field={text} />
      </h3>
      {(isPageEditing || link?.value?.href) && (
        <Link field={link} className="hs-recipes__more" />
      )}
    </article>
  );

  return (
    <section
      className={`component component-spaced three-column-cta hs-recipes ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <header className="hs-recipes__header">
          <h2 className="hs-recipes__heading">Heart-healthy recipes</h2>
          {(isPageEditing || props.fields.Link1?.value?.href) && (
            <Link field={props.fields.Link1} className="hs-recipes__view-all" />
          )}
        </header>
        <div className="hs-recipes__track">
          <Recipe
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Recipe
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
          />
          <Recipe
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
          />
        </div>
      </div>
    </section>
  );
};

export const WithIconsCompact = (props: ThreeColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    text,
    subText,
    link,
    delay,
  }: {
    image: ImageField;
    text: Field<string>;
    subText: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-4 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        } `}
        ref={domRef}
      >
        <Link field={link} className="wrapper-link">
          <div className="content-wrapper">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="image-wrapper">
                <NextImage field={image} width={32} height={32} />
              </div>
              <h2 className="eyebrow-accent mb-0 mt-2">
                <Text field={text} />
              </h2>
            </div>
            <p>
              <Text field={subText} />
            </p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced three-column-cta with-icons with-icons-compact ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row gx-0">
          <Column
            image={props.fields.Image1}
            text={props.fields.Text1}
            subText={props.fields.SubText1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            text={props.fields.Text2}
            subText={props.fields.SubText2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            text={props.fields.Text3}
            subText={props.fields.SubText3}
            link={props.fields.Link3}
            delay={1000}
          />
        </div>
      </div>
    </div>
  );
};
