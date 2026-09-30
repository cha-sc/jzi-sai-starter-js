'use client';

import { JSX } from 'react';
import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

/** Bootstrap grid classes for equal columns across common counts. */
const EQUAL_COLUMN_WIDTH: Record<number, string> = {
  1: 'col-12',
  2: 'col-12 col-md-6',
  3: 'col-12 col-md-4',
  4: 'col-12 col-md-3',
  5: 'col-12 col-md-2',
  6: 'col-12 col-md-2',
};

const HALF_WIDTH_PATTERN = /\bcol-(?:sm|md|lg|xl)-6\b/;

const getEqualWidthClass = (columnCount: number): string =>
  EQUAL_COLUMN_WIDTH[columnCount] ?? 'col-12';

/**
 * When 3+ columns are enabled but Sitecore still has 2-column (col-*-6) widths,
 * redistribute to equal thirds/fourths so columns stay on one row.
 */
const shouldEqualizeWidths = (enabled: string[], widths: Array<string | undefined>): boolean => {
  if (enabled.length < 3) {
    return false;
  }

  return enabled.every((ph) => {
    const width = widths[+ph - 1]?.trim();
    return !width || HALF_WIDTH_PATTERN.test(width);
  });
};

export const Default = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const columnWidths = [
    props.params.ColumnWidth1,
    props.params.ColumnWidth2,
    props.params.ColumnWidth3,
    props.params.ColumnWidth4,
    props.params.ColumnWidth5,
    props.params.ColumnWidth6,
    props.params.ColumnWidth7,
    props.params.ColumnWidth8,
  ];
  const columnStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  const enabledPlaceholders = (props.params.EnabledPlaceholders || '1,2')
    .split(',')
    .map((ph) => ph.trim())
    .filter(Boolean);
  const equalize = shouldEqualizeWidths(enabledPlaceholders, columnWidths);
  const equalWidthClass = getEqualWidthClass(enabledPlaceholders.length);
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`row component column-splitter ${styles}`} id={id ? id : undefined}>
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `column-${ph}-{*}`;
        const configuredWidth = columnWidths[+ph - 1]?.trim();
        const widthClass = equalize ? equalWidthClass : configuredWidth || equalWidthClass;
        const phStyles = `${widthClass} ${columnStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <div key={index} className={phStyles}>
            <div className="row">
              <Placeholder key={index} name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
