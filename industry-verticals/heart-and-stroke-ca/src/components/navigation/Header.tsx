'use client';

import { AppPlaceholder, ComponentMap, ImageField, NextImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <div className={`component header ${props.params.styles?.trimEnd()}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <AppPlaceholder name="header-left" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};



export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  
  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <a href="/"><NextImage field={props.fields.LogoImage} width={200} height={50} /></a>
          </div>
          <div className="col">
            <AppPlaceholder name="header-right" rendering={props.rendering} page={page} componentMap={props.componentMap} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Heart & Stroke — charcoal header shell for donate pill / white nav */
export const HeaderDarkDonate = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();

  return (
    <div
      className={`component header hs-header-dark ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase() || 'default'}-fluid`}>
        <div className="row align-items-center hs-header-dark__row">
          <div className="col-auto">
            {props.fields?.LogoImage?.value?.src ? (
              <a href="/">
                <NextImage field={props.fields.LogoImage} width={200} height={50} />
              </a>
            ) : (
              <AppPlaceholder
                name="header-left"
                rendering={props.rendering}
                page={page}
                componentMap={props.componentMap}
              />
            )}
          </div>
          <div className="col">
            <AppPlaceholder
              name="header-right"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
