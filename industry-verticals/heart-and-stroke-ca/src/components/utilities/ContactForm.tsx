'use client';

import { JSX } from 'react';
import { Field, ImageField, NextImage, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  EmailLabel: Field<string>;
  SubjectLabel: Field<string>;
  MessageLabel: Field<string>;
  ButtonLabel: Field<string>;
  BackgroundImage: ImageField;
}

export type ContactFormProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ContactFormProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component contact-form component-spaced ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container container-widest-fluid">
        <NextImage
          field={props.fields.BackgroundImage}
          className="img-fluid"
          width={1920}
          height={800}
        />
        <div className="container">
          <div className="contact-form-inner">
            <form>
              <h2 className="mb-4">
                <Text field={props.fields?.Title} />
              </h2>
              <input type="text" placeholder={props.fields.EmailLabel?.value} />
              <input type="text" placeholder={props.fields.SubjectLabel?.value} />
              <textarea placeholder={props.fields.MessageLabel?.value} />
              <input
                type="submit"
                value={props.fields.ButtonLabel?.value}
                className="button button-main mt-3"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Heart & Stroke — muted grey newsletter band */
export const NewsletterBand = (props: ContactFormProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section
      className={`component contact-form component-spaced hs-newsletter ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="hs-newsletter__inner">
          <h2 className="hs-newsletter__title">
            <Text field={props.fields?.Title} />
          </h2>
          <form className="hs-newsletter__form">
            <input
              type="text"
              className="hs-newsletter__input"
              placeholder={props.fields.SubjectLabel?.value || 'First name'}
            />
            <input
              type="text"
              className="hs-newsletter__input"
              placeholder={props.fields.MessageLabel?.value || 'Last name'}
            />
            <input
              type="email"
              className="hs-newsletter__input"
              placeholder={props.fields.EmailLabel?.value || 'Email'}
            />
            <input
              type="submit"
              className="hs-newsletter__submit"
              value={props.fields.ButtonLabel?.value || 'Subscribe'}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
