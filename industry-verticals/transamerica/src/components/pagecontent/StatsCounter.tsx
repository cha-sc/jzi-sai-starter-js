'use client';

import { JSX } from 'react';
import { Field, ImageField, NextImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { CountUp } from 'components/non-sitecore/CountUp';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';

interface Fields {
  Image1: ImageField;
  Image2: ImageField;
  Value1: Field<string>;
  Symbol1: Field<string>;
  Caption1: Field<string>;
  Value2: Field<string>;
  Symbol2: Field<string>;
  Caption2: Field<string>;
  Value3: Field<string>;
  Symbol3: Field<string>;
  Caption3: Field<string>;
}

export type StatsCounterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: StatsCounterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component stats-counter component-spaced ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container container-wide-fluid">
        <NextImage field={props.fields?.Image1} className="image-left" width={300} height={300} />
        <div className="container">
          <DottedAccent className="dotted-accent-top" />
          <div className="row gx-0">
            <div className="col-lg-4">
              <p className="display-6 fw-bold">
                <span>
                  {isPageEditing ? (
                    <Text field={props.fields?.Value1} />
                  ) : (
                    <CountUp value={parseInt(props.fields?.Value1.value)} />
                  )}
                </span>
                <span>
                  <Text field={props.fields?.Symbol1} />
                </span>
              </p>
              <p className="fs-5 mb-0">
                <Text field={props.fields?.Caption1} />
              </p>
            </div>
            <div className="col-lg-4">
              <p className="display-6 fw-bold">
                <span>
                  {isPageEditing ? (
                    <Text field={props.fields?.Value2} />
                  ) : (
                    <CountUp value={parseInt(props.fields?.Value2.value)} />
                  )}
                </span>
                <span>
                  <Text field={props.fields?.Symbol2} />
                </span>
              </p>
              <p className="fs-5 mb-0">
                <Text field={props.fields?.Caption2} />
              </p>
            </div>
            <div className="col-lg-4">
              <p className="display-6 fw-bold">
                <span>
                  {isPageEditing ? (
                    <Text field={props.fields?.Value3} />
                  ) : (
                    <CountUp value={parseInt(props.fields?.Value3.value)} />
                  )}
                </span>
                <span>
                  <Text field={props.fields?.Symbol3} />
                </span>
              </p>
              <p className="fs-5 mb-0">
                <Text field={props.fields?.Caption3} />
              </p>
            </div>
          </div>
          <DottedAccent className="dotted-accent-bottom" />
        </div>
        <NextImage field={props.fields?.Image2} className="image-right" width={300} height={300} />
      </div>
    </div>
  );
};

/* *************************************************************** */
/* Transamerica — navy panel with hexagonal photo + large white stats */
export const StatsWithHexImage = (props: StatsCounterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  const stats = [
    { value: props.fields?.Value1, symbol: props.fields?.Symbol1, caption: props.fields?.Caption1 },
    { value: props.fields?.Value2, symbol: props.fields?.Symbol2, caption: props.fields?.Caption2 },
    { value: props.fields?.Value3, symbol: props.fields?.Symbol3, caption: props.fields?.Caption3 },
  ];

  return (
    <section
      className={`component stats-counter stats-with-hex-image ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="stats-with-hex-image__inner">
        <div className="stats-with-hex-image__media">
          <div className="stats-with-hex-image__hex">
            <NextImage
              field={props.fields?.Image1}
              className="stats-with-hex-image__img"
              width={720}
              height={720}
            />
          </div>
        </div>
        <div className="stats-with-hex-image__stats">
          {stats.map((stat, index) => (
            <div className="stats-with-hex-image__stat" key={index}>
              <p className="stats-with-hex-image__value">
                <Text field={stat.value} />
                <Text field={stat.symbol} />
              </p>
              <p className="stats-with-hex-image__caption">
                <Text field={stat.caption} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
