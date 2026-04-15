import { createStore } from "satcheljs";
import type {
  MarketTickerMap,
  TradingPair,
} from "../../shared/types/market.types";
import type { CandleItem } from "../../shared/types/chart.types";
import type { UserSettings } from "../../shared/types/settings.types";
import type { RecentTradeItem } from "../../shared/types/trade.types";

export interface AppStore {
  market: {
    pairs: TradingPair[];
    tickers: MarketTickerMap;
    isLoadingPairs: boolean;
    isConnectingTickerStream: boolean;
    searchKeyword: string;
    selectedSymbol: string | null;
    error: string | null;
    favorites: string[];
    activeTab: "all" | "favorites";
    currentPage: number;
    pageSize: number;
    isChartModalOpen: boolean;
    connectionStatus: "connecting" | "live" | "reconnecting" | "disconnected";
  };
  chart: {
    symbol: string | null;
    candles: CandleItem[];
    interval: string;
    isLoading: boolean;
    isStreaming: boolean;
    error: string | null;
    connectionStatus:
      | "idle"
      | "connecting"
      | "live"
      | "reconnecting"
      | "disconnected";
    trades: RecentTradeItem[];
    isLoadingTrades: boolean;
    tradeError: string | null;
  };
  settings: UserSettings;
}

export const appStore = createStore<AppStore>("appStore", {
  market: {
    pairs: [],
    tickers: {},
    isLoadingPairs: false,
    isConnectingTickerStream: false,
    searchKeyword: "",
    selectedSymbol: null,
    error: null,
    favorites: [],
    activeTab: "all",
    currentPage: 1,
    pageSize: 10,
    isChartModalOpen: false,
    connectionStatus: "connecting",
  },
  chart: {
    symbol: null,
    candles: [],
    interval: "15m",
    isLoading: false,
    isStreaming: false,
    error: null,
    connectionStatus: "idle",
    trades: [],
    isLoadingTrades: false,
    tradeError: null,
  },
  settings: {
    language: "en",
    theme: "dark",
  },
});
