import { mutator } from 'satcheljs';
import { appStore } from '../store/app.store';
import {
  loadChartData,
  loadChartDataSuccess,
  loadChartDataFailure,
  connectChartStream,
  connectChartStreamSuccess,
  connectChartStreamFailure,
  upsertCurrentCandle,
  setChartInterval,
} from '../actions/chart.actions';

const store = appStore();

mutator(loadChartData, ({ symbol, interval }) => {
  store.chart.symbol = symbol;
  store.chart.interval = interval;
  store.chart.isLoading = true;
  store.chart.error = null;
});

mutator(loadChartDataSuccess, ({ symbol, candles }) => {
  store.chart.symbol = symbol;
  store.chart.candles = candles;
  store.chart.isLoading = false;
});

mutator(loadChartDataFailure, ({ error }) => {
  store.chart.isLoading = false;
  store.chart.error = error;
});

mutator(connectChartStream, ({ symbol, interval }) => {
  store.chart.symbol = symbol;
  store.chart.interval = interval;
  store.chart.isStreaming = true;
});

mutator(connectChartStreamSuccess, () => {
  store.chart.isStreaming = true;
});

mutator(connectChartStreamFailure, ({ error }) => {
  store.chart.isStreaming = false;
  store.chart.error = error;
});

mutator(upsertCurrentCandle, ({ candle }) => {
  const candles = store.chart.candles;
  const lastCandle = candles[candles.length - 1];

  if (!lastCandle) {
    store.chart.candles = [candle];
    return;
  }

  if (lastCandle.time === candle.time) {
    candles[candles.length - 1] = candle;
    store.chart.candles = [...candles];
    return;
  }

  store.chart.candles = [...candles, candle];
});

mutator(setChartInterval, ({ interval }) => {
  store.chart.interval = interval;
});