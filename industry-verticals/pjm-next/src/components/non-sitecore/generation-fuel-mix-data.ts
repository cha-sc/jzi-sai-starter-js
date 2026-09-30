/**
 * Mock Generation Fuel Mix datasets for PJM Next demo.
 * Baseline MW values approximate the ISO-style card; variants stay within ±5% per fuel.
 */

export type FuelKey =
  | 'coal'
  | 'gas'
  | 'hydro'
  | 'multipleFuels'
  | 'nuclear'
  | 'oil'
  | 'otherRenewables'
  | 'solar'
  | 'storage'
  | 'wind';

export interface FuelDefinition {
  key: FuelKey;
  label: string;
  color: string;
  /** Included in the Renewables total when true. */
  renewable: boolean;
}

export const FUEL_DEFINITIONS: FuelDefinition[] = [
  { key: 'coal', label: 'Coal', color: '#4E2A84', renewable: false },
  { key: 'gas', label: 'Gas', color: '#5BC2F2', renewable: false },
  { key: 'hydro', label: 'Hydro', color: '#3359B6', renewable: true },
  { key: 'multipleFuels', label: 'Multiple Fuels', color: '#0E254C', renewable: false },
  { key: 'nuclear', label: 'Nuclear', color: '#EFC137', renewable: false },
  { key: 'oil', label: 'Oil', color: '#F7FD51', renewable: false },
  { key: 'otherRenewables', label: 'Other Renewables', color: '#8A3A54', renewable: true },
  { key: 'solar', label: 'Solar', color: '#E64359', renewable: true },
  { key: 'storage', label: 'Storage', color: '#DBB1B1', renewable: false },
  { key: 'wind', label: 'Wind', color: '#8CBF3F', renewable: true },
];

export type FuelMwValues = Record<FuelKey, number>;

export interface FuelMixDataset {
  id: string;
  label: string;
  asOf: string;
  fuels: FuelMwValues;
}

/** Baseline MW by fuel — totals = 97,279 MW; renewables = 5,279 MW. */
export const BASELINE_FUELS: FuelMwValues = {
  coal: 7782,
  gas: 46571,
  hydro: 1456,
  multipleFuels: 2918,
  nuclear: 33075,
  oil: 973,
  otherRenewables: 486,
  solar: 778,
  storage: 681,
  wind: 2559,
};

/** Per-fuel multipliers within ±5% of baseline for each named variant. */
const VARIANT_MULTIPLIERS: Record<string, Partial<Record<FuelKey, number>>> = {
  Default: {},
  MorningPeak: {
    coal: 1.03,
    gas: 1.04,
    hydro: 0.97,
    multipleFuels: 1.02,
    nuclear: 1.01,
    oil: 1.05,
    otherRenewables: 0.96,
    solar: 0.95,
    storage: 1.02,
    wind: 0.98,
  },
  Midday: {
    coal: 0.98,
    gas: 0.97,
    hydro: 1.02,
    multipleFuels: 0.99,
    nuclear: 1.0,
    oil: 0.96,
    otherRenewables: 1.03,
    solar: 1.05,
    storage: 0.97,
    wind: 1.04,
  },
  EveningPeak: {
    coal: 1.02,
    gas: 1.05,
    hydro: 1.01,
    multipleFuels: 1.03,
    nuclear: 0.99,
    oil: 1.04,
    otherRenewables: 0.98,
    solar: 0.96,
    storage: 1.05,
    wind: 1.02,
  },
  Overnight: {
    coal: 0.97,
    gas: 0.95,
    hydro: 0.99,
    multipleFuels: 0.98,
    nuclear: 1.02,
    oil: 0.97,
    otherRenewables: 1.01,
    solar: 0.95,
    storage: 0.96,
    wind: 1.03,
  },
};

const VARIANT_META: Record<
  string,
  { label: string; asOf: string }
> = {
  Default: { label: 'As of 7:00 p.m. EPT', asOf: '7:00 p.m. EPT' },
  MorningPeak: { label: 'As of 8:00 a.m. EPT', asOf: '8:00 a.m. EPT' },
  Midday: { label: 'As of 12:00 p.m. EPT', asOf: '12:00 p.m. EPT' },
  EveningPeak: { label: 'As of 6:00 p.m. EPT', asOf: '6:00 p.m. EPT' },
  Overnight: { label: 'As of 2:00 a.m. EPT', asOf: '2:00 a.m. EPT' },
};

const applyMultipliers = (
  base: FuelMwValues,
  multipliers: Partial<Record<FuelKey, number>>
): FuelMwValues => {
  const next = { ...base };
  (Object.keys(base) as FuelKey[]).forEach((key) => {
    const factor = multipliers[key] ?? 1;
    next[key] = Math.round(base[key] * factor);
  });
  return next;
};

export const FUEL_MIX_DATASETS: Record<string, FuelMixDataset> = Object.fromEntries(
  Object.keys(VARIANT_META).map((id) => {
    const fuels = applyMultipliers(BASELINE_FUELS, VARIANT_MULTIPLIERS[id] ?? {});
    return [
      id,
      {
        id,
        label: VARIANT_META[id].label,
        asOf: VARIANT_META[id].asOf,
        fuels,
      } satisfies FuelMixDataset,
    ];
  })
);

export const getDataset = (variantId: string): FuelMixDataset =>
  FUEL_MIX_DATASETS[variantId] ?? FUEL_MIX_DATASETS.Default;

/** Stable rotation order for time-based dataset switching. */
export const FUEL_MIX_ROTATION_ORDER: string[] = [
  'Default',
  'MorningPeak',
  'Midday',
  'EveningPeak',
  'Overnight',
];

export const FIVE_MINUTES_MS = 5 * 60 * 1000;

/** Floor the clock to the current 5-minute mark (e.g. 11:07 → 11:05). */
export const floorToFiveMinuteMark = (date: Date = new Date()): Date => {
  const floored = new Date(date);
  floored.setSeconds(0, 0);
  floored.setMinutes(Math.floor(floored.getMinutes() / 5) * 5);
  return floored;
};

/** Deterministic index into the rotation list for a given time. */
export const getDatasetSlotIndex = (
  date: Date = new Date(),
  order: string[] = FUEL_MIX_ROTATION_ORDER
): number => {
  const slot = Math.floor(date.getTime() / FIVE_MINUTES_MS);
  return ((slot % order.length) + order.length) % order.length;
};

export const getDatasetIdForTime = (
  date: Date = new Date(),
  order: string[] = FUEL_MIX_ROTATION_ORDER
): string => order[getDatasetSlotIndex(date, order)] ?? order[0];

export const getDatasetForTime = (date: Date = new Date()): FuelMixDataset =>
  getDataset(getDatasetIdForTime(date));

/** Milliseconds until the next :00/:05/:10/:15… boundary. */
export const msUntilNextFiveMinuteMark = (date: Date = new Date()): number => {
  const next = floorToFiveMinuteMark(date);
  next.setTime(next.getTime() + FIVE_MINUTES_MS);
  return Math.max(1, next.getTime() - date.getTime());
};

/** e.g. "As of 11:05 a.m. EPT" from the floored local clock. */
export const formatAsOfLabel = (date: Date = new Date()): string => {
  const mark = floorToFiveMinuteMark(date);
  const time = mark.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `As of ${time} EPT`;
};

export const sumFuelMw = (fuels: FuelMwValues, keys?: FuelKey[]): number => {
  const list = keys ?? (Object.keys(fuels) as FuelKey[]);
  return list.reduce((sum, key) => sum + (fuels[key] ?? 0), 0);
};

export const getRenewableKeys = (): FuelKey[] =>
  FUEL_DEFINITIONS.filter((f) => f.renewable).map((f) => f.key);

export const calculateTotals = (fuels: FuelMwValues) => {
  const totalMw = sumFuelMw(fuels);
  const renewablesMw = sumFuelMw(fuels, getRenewableKeys());
  return { totalMw, renewablesMw };
};

export const formatMw = (value: number): string =>
  `${value.toLocaleString('en-US')} MW`;
