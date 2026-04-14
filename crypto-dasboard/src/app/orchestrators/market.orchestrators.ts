import { orchestrator } from "satcheljs";
import { WebSocketManager } from "../../services/websocket/websocket-manager";
import type {
  BinanceMiniTickerStreamItem,
  MarketTicker,
} from "../../shared/types/market.types";
import {
  connectMiniTickerStream,
  connectMiniTickerStreamFailure,
  connectMiniTickerStreamSuccess,
  disconnectMiniTickerStream,
  loadTradingPairs,
  loadTradingPairsFailure,
  loadTradingPairsSuccess,
  upsertManyTickers,
} from "../actions/market.actions";
import { getExchangeInfo } from "../../services/api/binance.api";
import { BINANCE_WS_BASE_URL } from "../../shared/constants/api";
import { setMarketConnectionStatus } from "../actions/market.actions";
let marketSocket: WebSocketManager<BinanceMiniTickerStreamItem[]> | null = null;
let flushTimer: number | null = null;
const tickerBuffer = new Map<string, MarketTicker>();
const lastKnownPrices = new Map<string, number>();

const flushBufferedTickers = (): void => {
  if (tickerBuffer.size === 0) return;

  const tickers = Array.from(tickerBuffer.values());
  tickerBuffer.clear();
  upsertManyTickers(tickers);
};

orchestrator(loadTradingPairs, async () => {
  try {
    const pairs = await getExchangeInfo();
    loadTradingPairsSuccess(pairs);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load trading pairs";

    loadTradingPairsFailure(message);
  }
});

orchestrator(connectMiniTickerStream, () => {
  if (marketSocket) {
    marketSocket.disconnect();
  }

  marketSocket = new WebSocketManager(
    `${BINANCE_WS_BASE_URL}/!miniTicker@arr`,
    (payload: BinanceMiniTickerStreamItem[]) => {
      if (!Array.isArray(payload)) return;

      for (const item of payload) {
        const currentPrice = Number(item.c);
        const openPrice = Number(item.o);
        const previousPrice = lastKnownPrices.get(item.s) ?? currentPrice;

        const ticker: MarketTicker = {
          symbol: item.s,
          currentPrice,
          priceChangePercent24h:
            openPrice > 0 ? ((currentPrice - openPrice) / openPrice) * 100 : 0,
          lastDirection:
            currentPrice > previousPrice
              ? "up"
              : currentPrice < previousPrice
                ? "down"
                : "neutral",
          updatedAt: Date.now(),
        };

        lastKnownPrices.set(item.s, currentPrice);
        tickerBuffer.set(item.s, ticker);
      }

      if (!flushTimer) {
        flushTimer = window.setTimeout(() => {
          flushBufferedTickers();
          flushTimer = null;
        }, 250);
      }
    },
    () => {
      connectMiniTickerStreamSuccess();
      setMarketConnectionStatus("live");
    },
    () => {
      console.warn("MiniTicker websocket error");
    },
    (event) => {
      console.warn("MiniTicker websocket closed", event.code, event.reason);

      if (event.code !== 1000) {
        setMarketConnectionStatus("disconnected");
      }
    },
    () => {
      setMarketConnectionStatus("reconnecting");
    },
  );

  marketSocket.connect();
});
orchestrator(disconnectMiniTickerStream, () => {
  marketSocket?.disconnect();
  marketSocket = null;
  setMarketConnectionStatus('disconnected');
});
