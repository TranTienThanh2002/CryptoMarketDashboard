import { action } from 'satcheljs';
import type { CandleItem } from '../../shared/types/chart.types';

export const loadChartData = action(
  'loadChartData',
  (symbol: string, interval: string) => ({
    symbol,
    interval,
  }),
);

export const loadChartDataSuccess = action(
  'loadChartDataSuccess',
  (symbol: string, candles: CandleItem[]) => ({
    symbol,
    candles,
  }),
);

export const loadChartDataFailure = action(
  'loadChartDataFailure',
  (error: string) => ({
    error,
  }),
);

export const connectChartStream = action(
  'connectChartStream',
  (symbol: string, interval: string) => ({
    symbol,
    interval,
  }),
);

export const connectChartStreamSuccess = action('connectChartStreamSuccess');

export const connectChartStreamFailure = action(
  'connectChartStreamFailure',
  (error: string) => ({
    error,
  }),
);

export const disconnectChartStream = action('disconnectChartStream');

export const upsertCurrentCandle = action(
  'upsertCurrentCandle',
  (candle: CandleItem) => ({
    candle,
  }),
);

export const setChartInterval = action(
  'setChartInterval',
  (interval: string) => ({
    interval,
  }),
);

export const setChartConnectionStatus = action(
  'setChartConnectionStatus',
  (
    status: 'idle' | 'connecting' | 'live' | 'reconnecting' | 'disconnected',
  ) => ({ status }),
);