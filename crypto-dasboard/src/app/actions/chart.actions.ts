import { action } from "satcheljs";
import type { CandleItem } from "../../shared/types/chart.types";
import type { RecentTradeItem } from "../../shared/types/trade.types";

export const loadChartData = action(
  "loadChartData",
  (symbol: string, interval: string) => ({
    symbol,
    interval,
  }),
);

export const loadChartDataSuccess = action(
  "loadChartDataSuccess",
  (symbol: string, candles: CandleItem[]) => ({
    symbol,
    candles,
  }),
);

export const loadChartDataFailure = action(
  "loadChartDataFailure",
  (error: string) => ({
    error,
  }),
);

export const connectChartStream = action(
  "connectChartStream",
  (symbol: string, interval: string) => ({
    symbol,
    interval,
  }),
);

export const connectChartStreamSuccess = action("connectChartStreamSuccess");

export const connectChartStreamFailure = action(
  "connectChartStreamFailure",
  (error: string) => ({
    error,
  }),
);

export const disconnectChartStream = action("disconnectChartStream");

export const upsertCurrentCandle = action(
  "upsertCurrentCandle",
  (candle: CandleItem) => ({
    candle,
  }),
);

export const setChartInterval = action(
  "setChartInterval",
  (interval: string) => ({
    interval,
  }),
);

export const setChartConnectionStatus = action(
  "setChartConnectionStatus",
  (
    status: "idle" | "connecting" | "live" | "reconnecting" | "disconnected",
  ) => ({ status }),
);
export const resetChartState = action("resetChartState");
export const connectTradesStream = action(
  "connectTradesStream",
  (symbol: string) => ({ symbol }),
);

export const connectTradesStreamSuccess = action("connectTradesStreamSuccess");

export const connectTradesStreamFailure = action(
  "connectTradesStreamFailure",
  (error: string) => ({ error }),
);

export const disconnectTradesStream = action("disconnectTradesStream");

export const prependRecentTrade = action(
  "prependRecentTrade",
  (trade: RecentTradeItem) => ({ trade }),
);

export const clearRecentTrades = action("clearRecentTrades");
