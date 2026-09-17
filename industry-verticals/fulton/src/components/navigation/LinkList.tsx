'use client';

import { JSX } from 'react';
import { Link, LinkField, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';

type LinkListChild = {
  field?: {
    link?: LinkField;
  };
  fields?: {
    Link?: LinkField;
  };
};

type LinkListDatasource = {
  children?: {
    results?: LinkListChild[];
  };
  field?: {
    title?: TextField;
  };
};

type LinkListItemShape = {
  fields?: {
    Link?: LinkField;
  };
  url?: string;
};

export type LinkListProps = {
  params: { [key: string]: string };
  fields?: {
    data?: {
      datasource?: LinkListDatasource;
    };
    Title?: TextField;
    items?: LinkListItemShape[];
    children?: LinkListChild[];
  };
};

const getLinkFields = (props: LinkListProps): LinkField[] => {
  const results = props.fields?.data?.datasource?.children?.results;
  if (Array.isArray(results) && results.length > 0) {
    return results
      .map((item) => item?.field?.link || item?.fields?.Link)
      .filter((link): link is LinkField => Boolean(link?.value?.href || link?.value?.text));
  }

  const items = props.fields?.items;
  if (Array.isArray(items) && items.length > 0) {
    return items
      .map((item) => item?.fields?.Link)
      .filter((link): link is LinkField => Boolean(link?.value?.href || link?.value?.text));
  }

  const children = props.fields?.children;
  if (Array.isArray(children) && children.length > 0) {
    return children
      .map((item) => item?.field?.link || item?.fields?.Link)
      .filter((link): link is LinkField => Boolean(link?.value?.href || link?.value?.text));
  }

  return [];
};

/**
 * Fulton County utility bar — horizontal uppercase links for the navy eyebrow.
 * Default matches UtilityNav so the component works even when FieldNames is still Default.
 */
const UtilityNavView = (props: LinkListProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`.trimEnd();
  const links = getLinkFields(props);
  const { page } = useSitecore();
  const { isEditing } = page.mode;

  if (!links.length && !isEditing) {
    return <></>;
  }

  return (
    <nav
      className={`component link-list utility-nav ${sxaStyles}`}
      id={id ? id : undefined}
      aria-label="Utility navigation"
    >
      <ul className="utility-nav__list">
        {links.map((link, index) => (
          <li key={`${link.value?.href || 'utility'}-${index}`} className="utility-nav__item">
            <Link field={link} className="utility-nav__link" />
          </li>
        ))}
      </ul>
      {isEditing && !links.length && (
        <span className="utility-nav__empty">Add links to the Utility Nav datasource</span>
      )}
    </nav>
  );
};

export const Default = (props: LinkListProps): JSX.Element => <UtilityNavView {...props} />;

export const UtilityNav = (props: LinkListProps): JSX.Element => <UtilityNavView {...props} />;
