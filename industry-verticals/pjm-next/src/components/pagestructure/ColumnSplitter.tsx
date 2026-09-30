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

/** Strip Sitecore/Bootstrap width utilities so stale col-6 cannot fight equal layout. */
const STRIP_WIDTH_CLASS =
  /\b(?:col(?:-(?:sm|md|lg|xl|xxl))?-(?:\d{1,2}|auto)|basis-[\w/-]+|w-\d+)\b/g;

const getEqualWidthClass = (columnCount: number): string =>
  EQUAL_COLUMN_WIDTH[columnCount] ?? 'col-12';

const parseEnabledPlaceholders = (raw: string | undefined): string[] => {
  if (!raw) {
    return [];
  }

  return raw
    .split(/[,|]/)
    .map((ph) => ph.trim().replace(/[{}]/g, ''))
    .filter((ph) => /^\d+$/.test(ph));
};

/**
 * Resolve how many columns to render. Sitecore often keeps ColumnWidth* at col-6
 * after enabling a 3rd placeholder; prefer EnabledPlaceholders, then SplitterSize.
 */
const resolveEnabledPlaceholders = (params: ComponentParams): string[] => {
  const fromParam = parseEnabledPlaceholders(params.EnabledPlaceholders);
  if (fromParam.length > 0) {
    return fromParam;
  }

  const splitterSize = Number.parseInt(String(params.SplitterSize ?? ''), 10);
  if (Number.isFinite(splitterSize) && splitterSize >= 1) {
    return Array.from({ length: Math.min(splitterSize, 8) }, (_, i) => String(i + 1));
  }

  return ['1', '2'];
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
  const enabledPlaceholders = resolveEnabledPlaceholders(props.params);
  const columnCount = enabledPlaceholders.length;
  // Always equalize at 3+ — live layout has ColumnWidth1/2/3 all set to bare "col-6"
  // (50% at every breakpoint), which wraps the third column onto a new row.
  const equalize = columnCount >= 3;
  const equalWidthClass = getEqualWidthClass(columnCount);
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`row component column-splitter ${styles}`.trim()}
      id={id ? id : undefined}
      data-columns={columnCount}
    >
      {enabledPlaceholders.map((ph) => {
        const phKey = `column-${ph}-{*}`;
        const extraStyles = (columnStyles[+ph - 1] ?? '').replace(STRIP_WIDTH_CLASS, '').trim();
        const widthClass = equalize
          ? equalWidthClass
          : columnWidths[+ph - 1]?.trim() || equalWidthClass;
        const phStyles = `${widthClass} ${extraStyles}`.trim();

        return (
          <div key={ph} className={phStyles} data-column={ph}>
            <div className="row">
              <Placeholder name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
