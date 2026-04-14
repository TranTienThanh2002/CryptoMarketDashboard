import { action } from "satcheljs";
import type {
  MarketTicker,
  TradingPair,
} from "../../shared/types/market.types";

export const loadTradingPairs = action("loadTradingPairs");

export const loadTradingPairsSuccess = action(
  "loadTradingPairsSuccess",
  (pairs: TradingPair[]) => ({ pairs }),
);

export const loadTradingPairsFailure = action(
  "loadTradingPairsFailure",
  (error: string) => ({ error }),
);

export const connectMiniTickerStream = action("connectMiniTickerStream");

export const connectMiniTickerStreamSuccess = action(
  "connectMiniTickerStreamSuccess",
);

export const connectMiniTickerStreamFailure = action(
  "connectMiniTickerStreamFailure",
  (error: string) => ({ error }),
);

export const upsertManyTickers = action(
  "upsertManyTickers",
  (tickers: MarketTicker[]) => ({ tickers }),
);

export const setMarketSearchKeyword = action(
  "setMarketSearchKeyword",
  (keyword: string) => ({ keyword }),
);

export const setSelectedSymbol = action(
  "setSelectedSymbol",
  (symbol: string | null) => ({ symbol }),
);

export const toggleFavoriteSymbol = action(
  "toggleFavoriteSymbol",
  (symbol: string) => ({ symbol }),
);

export const disconnectMiniTickerStream = action("disconnectMiniTickerStream");

export const setActiveMarketTab = action(
  "setActiveMarketTab",
  (tab: "all" | "favorites") => ({ tab }),
);

export const setMarketPage = action("setMarketPage", (page: number) => ({
  page,
}));

export const openChartModal = action("openChartModal", (symbol: string) => ({
  symbol,
}));

export const closeChartModal = action("closeChartModal");

export const setMarketConnectionStatus = action(
  'setMarketConnectionStatus',
  (
    status: 'connecting' | 'live' | 'reconnecting' | 'disconnected',
  ) => ({ status }),
);
