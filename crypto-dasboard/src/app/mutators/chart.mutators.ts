import { mutator } from "satcheljs";
import { appStore } from "../store/app.store";
import {
  loadChartData,
  loadChartDataSuccess,
  loadChartDataFailure,
  connectChartStream,
  connectChartStreamSuccess,
  connectChartStreamFailure,
  upsertCurrentCandle,
  setChartInterval,
  connectTradesStream,
  connectTradesStreamSuccess,
  connectTradesStreamFailure,
  prependRecentTrade,
  clearRecentTrades,
  resetChartState,
} from "../actions/chart.actions";
import { setChartConnectionStatus } from "../actions/chart.actions";
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
  store.chart.connectionStatus = "disconnected";
});

mutator(connectChartStream, ({ symbol, interval }) => {
  store.chart.symbol = symbol;
  store.chart.interval = interval;
  store.chart.isStreaming = true;
  store.chart.connectionStatus = "connecting";
});

mutator(connectChartStreamSuccess, () => {
  store.chart.isStreaming = true;
  store.chart.connectionStatus = "live";
});

mutator(connectChartStreamFailure, ({ error }) => {
  store.chart.isStreaming = false;
  store.chart.error = error;
  store.chart.connectionStatus = "disconnected";
});

mutator(upsertCurrentCandle, ({ candle }) => {
  const candles = store.chart.candles;
  const lastCandle = candles[candles.length - 1];

  if (!lastCandle) {
    store.chart.candles = [candle];
    return;
  }

  if (candle.time < lastCandle.time) {
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

mutator(setChartConnectionStatus, ({ status }) => {
  store.chart.connectionStatus = status;
});

mutator(connectTradesStream, () => {
  store.chart.isLoadingTrades = true;
  store.chart.tradeError = null;
});

mutator(connectTradesStreamSuccess, () => {
  store.chart.isLoadingTrades = false;
});

mutator(connectTradesStreamFailure, ({ error }) => {
  store.chart.isLoadingTrades = false;
  store.chart.tradeError = error;
});

mutator(prependRecentTrade, ({ trade }) => {
  const exists = store.chart.trades.some(
    (item) =>
      item.id === trade.id &&
      item.timestamp === trade.timestamp &&
      item.price === trade.price,
  );

  if (exists) return;

  store.chart.trades = [trade, ...store.chart.trades].slice(0, 40);
});

mutator(clearRecentTrades, () => {
  store.chart.trades = [];
  store.chart.tradeError = null;
  store.chart.isLoadingTrades = false;
});
mutator(resetChartState, () => {
  store.chart.candles = [];
  store.chart.trades = [];
  store.chart.error = null;
  store.chart.tradeError = null;
  store.chart.isLoading = false;
  store.chart.isLoadingTrades = false;
});
