'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import {
  FUEL_DEFINITIONS,
  type FuelKey,
  type FuelMixDataset,
  calculateTotals,
  formatAsOfLabel,
  formatMw,
  getDataset,
  getDatasetForTime,
  msUntilNextFiveMinuteMark,
} from './generation-fuel-mix-data';

export type GenerationFuelMixProps = {
  params?: { [key: string]: string };
  fields?: unknown;
  /**
   * When set, pins a single mock dataset (Sitecore named variants).
   * When omitted, rotates through datasets on each 5-minute clock mark.
   */
  datasetId?: string;
};

type ViewMode = 'all' | 'renewables';

const polarToCartesian = (cx: number, cy: number, radius: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

const describeSlice = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
};

/** Live dataset + "As of" label that advances on each 5-minute mark. */
const useRotatingFuelMix = (): { dataset: FuelMixDataset; asOfLabel: string } => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextMark = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNow(new Date());
        scheduleNextMark();
      }, msUntilNextFiveMinuteMark(new Date()));
    };

    scheduleNextMark();

    const onVisible = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }
      setNow(new Date());
      scheduleNextMark();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return {
    dataset: getDatasetForTime(now),
    asOfLabel: formatAsOfLabel(now),
  };
};

const FuelMixChart = ({
  dataset,
  asOfLabel,
}: {
  dataset: FuelMixDataset;
  asOfLabel: string;
}): JSX.Element => {
  const [view, setView] = useState<ViewMode>('all');
  const { totalMw, renewablesMw } = useMemo(
    () => calculateTotals(dataset.fuels),
    [dataset.fuels]
  );

  const visibleFuels = useMemo(() => {
    const defs =
      view === 'renewables' ? FUEL_DEFINITIONS.filter((f) => f.renewable) : FUEL_DEFINITIONS;
    return defs
      .map((def) => ({
        ...def,
        mw: dataset.fuels[def.key as FuelKey] ?? 0,
      }))
      .filter((f) => f.mw > 0);
  }, [dataset.fuels, view]);

  const chartTotal = visibleFuels.reduce((sum, f) => sum + f.mw, 0) || 1;

  const slices = useMemo(() => {
    let angle = 0;
    return visibleFuels.map((fuel) => {
      const sweep = (fuel.mw / chartTotal) * 360;
      const start = angle;
      const end = angle + Math.max(sweep, 0.2);
      angle = end;
      return { ...fuel, start, end };
    });
  }, [visibleFuels, chartTotal]);

  return (
    <div className="generation-fuel-mix__card">
      <header className="generation-fuel-mix__header">
        <div>
          <h3 className="generation-fuel-mix__title">Generation Fuel Mix</h3>
          <p className="generation-fuel-mix__as-of">{asOfLabel}</p>
        </div>
        <div className="generation-fuel-mix__toggle" role="tablist" aria-label="Fuel mix view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'all'}
            className={view === 'all' ? 'is-active' : ''}
            onClick={() => setView('all')}
          >
            All Fuels
          </button>
          <span className="generation-fuel-mix__toggle-sep" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'renewables'}
            className={view === 'renewables' ? 'is-active' : ''}
            onClick={() => setView('renewables')}
          >
            Renewables
          </button>
        </div>
      </header>

      <div className="generation-fuel-mix__body">
        <div className="generation-fuel-mix__chart" aria-hidden="true">
          <svg viewBox="0 0 220 220" width="220" height="220">
            {slices.map((slice) => (
              <path
                key={slice.key}
                d={describeSlice(110, 110, 100, slice.start, slice.end)}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="generation-fuel-mix__aside">
          <ul className="generation-fuel-mix__legend">
            {visibleFuels.map((fuel) => (
              <li key={fuel.key}>
                <span
                  className="generation-fuel-mix__swatch"
                  style={{ backgroundColor: fuel.color }}
                  aria-hidden="true"
                />
                <span>{fuel.label}</span>
              </li>
            ))}
          </ul>

          <dl className="generation-fuel-mix__totals">
            <div>
              <dt>Total:</dt>
              <dd>{formatMw(view === 'renewables' ? renewablesMw : totalMw)}</dd>
            </div>
            <div>
              <dt>Renewables:</dt>
              <dd>{formatMw(renewablesMw)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

const GenerationFuelMixView = ({
  datasetId,
  params,
}: {
  datasetId?: string;
  params?: { [key: string]: string };
}): JSX.Element => {
  const rotating = useRotatingFuelMix();
  const pinned = datasetId ? getDataset(datasetId) : null;
  const dataset = pinned ?? rotating.dataset;
  const asOfLabel = pinned ? pinned.label : rotating.asOfLabel;
  const id = params?.RenderingIdentifier;
  const sxaStyles = `${params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced generation-fuel-mix ${sxaStyles}`.trim()}
      id={id || undefined}
      data-dataset={dataset.id}
    >
      <div className="container">
        <FuelMixChart dataset={dataset} asOfLabel={asOfLabel} />
      </div>
    </div>
  );
};

/** Default: rotates mock datasets on each 5-minute clock mark. */
export const Default = (props: GenerationFuelMixProps): JSX.Element => (
  <GenerationFuelMixView datasetId={props.datasetId} params={props.params} />
);

/** Named variants pin a dataset for Pages authoring / Design Library preview. */
export const MorningPeak = (props: GenerationFuelMixProps): JSX.Element => (
  <GenerationFuelMixView datasetId="MorningPeak" params={props.params} />
);

export const Midday = (props: GenerationFuelMixProps): JSX.Element => (
  <GenerationFuelMixView datasetId="Midday" params={props.params} />
);

export const EveningPeak = (props: GenerationFuelMixProps): JSX.Element => (
  <GenerationFuelMixView datasetId="EveningPeak" params={props.params} />
);

export const Overnight = (props: GenerationFuelMixProps): JSX.Element => (
  <GenerationFuelMixView datasetId="Overnight" params={props.params} />
);
