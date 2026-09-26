'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Link,
  LinkField,
  NextImage,
  RichText,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Eyebrow: Field<string>;
  Text: RichTextField;
  Link: LinkField;
  Image1: ImageField;
  Title1: Field<string>;
  Text1: Field<string>;
  Title2: Field<string>;
  Text2: Field<string>;
}

export type FeaturesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FeaturesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component features component-spaced ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="info">
          <div className="eyebrow-accent">
            <Text field={props.fields?.Eyebrow} />
          </div>
          <div className="tagline">
            <RichText field={props.fields?.Text} />
          </div>
          <div className="button button-main">
            <Link field={props.fields?.Link} />
          </div>
        </div>
        <div className="items">
          <div className="item left">
            <div className="icon">
              <NextImage field={props.fields?.Image1} width={32} height={32} />
            </div>
            <div className="title">
              <Text field={props.fields?.Title1} />
            </div>
            <p className="subtitle">
              <Text field={props.fields?.Text1} />
            </p>
          </div>
          <div className="item right">
            <div className="title">
              <Text field={props.fields?.Title2} />
            </div>
            <p className="subtitle">
              <Text field={props.fields?.Text2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/** PJM Current Conditions: two-up data cards (LMP + fuel mix) with map image */
export const DataDashboard = (props: FeaturesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component features data-dashboard component-spaced ${sxaStyles}`}
      id={id || undefined}
    >
      <div className="container">
        <header className="data-dashboard__header">
          <h2 className="data-dashboard__eyebrow">
            <Text field={props.fields?.Eyebrow} />
          </h2>
          <div className="data-dashboard__intro">
            <RichText field={props.fields?.Text} />
          </div>
        </header>
        <div className="data-dashboard__grid">
          <article className="data-dashboard__card">
            <div className="data-dashboard__media">
              <NextImage field={props.fields?.Image1} width={640} height={400} />
            </div>
            <h3 className="data-dashboard__title">
              <Text field={props.fields?.Title1} />
            </h3>
            <p className="data-dashboard__copy">
              <Text field={props.fields?.Text1} />
            </p>
          </article>
          <article className="data-dashboard__card">
            <h3 className="data-dashboard__title">
              <Text field={props.fields?.Title2} />
            </h3>
            <p className="data-dashboard__copy">
              <Text field={props.fields?.Text2} />
            </p>
            <div className="data-dashboard__cta">
              <Link field={props.fields?.Link} className="button button-main" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
