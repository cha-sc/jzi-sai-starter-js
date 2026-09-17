'use client';

import { JSX } from 'react';
import {
  Link,
  LinkField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

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

  return [];
};

const getTitleField = (props: LinkListProps): TextField | undefined =>
  props.fields?.data?.datasource?.field?.title || props.fields?.Title;

export const Default = (props: LinkListProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`.trimEnd();
  const links = getLinkFields(props);
  const titleField = getTitleField(props);
  const { page } = useSitecore();
  const { isEditing } = page.mode;

  if (!links.length && !isEditing) {
    return <></>;
  }

  return (
    <nav
      className={`component link-list ${sxaStyles}`}
      id={id ? id : undefined}
      aria-label="Link list"
    >
      <div className="component-content">
        {(titleField?.value || isEditing) && <Text tag="h3" field={titleField} />}
        <ul>
          {links.map((link, index) => (
            <li key={`${link.value?.href || 'link'}-${index}`}>
              <div className="field-link">
                <Link field={link} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

/**
 * Fulton County utility bar — horizontal uppercase links for the navy eyebrow.
 * Wire to /Data/Link Lists/Utility Nav and select this variant in Pages.
 */
export const UtilityNav = (props: LinkListProps): JSX.Element => {
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
