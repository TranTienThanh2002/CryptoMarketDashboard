import { orchestrator } from "satcheljs";
import {
  clearOrderBook,
  connectChartStream,
  connectChartStreamSuccess,
  connectOrderBookStream,
  connectOrderBookStreamSuccess,
  disconnectChartStream,
  disconnectOrderBookStream,
  loadChartData,
  loadChartDataFailure,
  loadChartDataSuccess,
  loadOrderBook,
  loadOrderBookFailure,
  loadOrderBookSuccess,
  patchOrderBook,
  setOrderBookConnectionStatus,
  upsertCurrentCandle,
} from "../actions/chart.actions";
import { getKlines, getOrderBook } from "../../services/api/binance.api";
import { WebSocketManager } from "../../services/websocket/websocket-manager";
import { BINANCE_WS_BASE_URL } from "../../shared/constants/api";
import type { BinanceKlineWsPayload } from "../../shared/types/chart.types";
import { setChartConnectionStatus } from "../actions/chart.actions";
import {
  clearRecentTrades,
  connectTradesStream,
  connectTradesStreamSuccess,
  disconnectTradesStream,
  prependRecentTrade,
} from "../actions/chart.actions";
import type { BinanceTradeWsPayload } from "../../shared/types/trade.types";
import { appStore } from "../store/app.store";
import type { BinanceDepthWsPayload } from "../../shared/types/orderbook.types";
import { mergeOrderBookLevels } from "../../shared/utils/orderbook";
import { showError, showInfo, showSuccess } from "../../shared/utils/toast";
import { t } from "../../shared/i18n";
let chartSocket: WebSocketManager<BinanceKlineWsPayload> | null = null;
let tradeSocket: WebSocketManager<BinanceTradeWsPayload> | null = null;
let activeChartRequestKey = "";
let orderBookSocket: WebSocketManager<BinanceDepthWsPayload> | null = null;
orchestrator(loadChartData, async ({ symbol, interval }) => {
  const requestKey = `${symbol}_${interval}_${Date.now()}`;
  activeChartRequestKey = requestKey;
  try {
    const candles = await getKlines(symbol, interval);
    if (activeChartRequestKey !== requestKey) {
      return;
    }
    loadChartDataSuccess(symbol, candles);
  } catch (error) {
    if (activeChartRequestKey !== requestKey) {
      return;
    }
    const message =
      error instanceof Error ? error.message : "Failed to load chart data";
    loadChartDataFailure(message);
    showError(t('chartConnectionLost'));
  }
});

orchestrator(connectChartStream, ({ symbol, interval }) => {
  chartSocket?.disconnect();

  chartSocket = new WebSocketManager<BinanceKlineWsPayload>(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@kline_${interval}`,
    (payload) => {
      if (!payload?.k) return;
      if (payload.k.s !== appStore().market.selectedSymbol) return;

      upsertCurrentCandle({
        time: Math.floor(payload.k.t / 1000),
        open: Number(payload.k.o),
        high: Number(payload.k.h),
        low: Number(payload.k.l),
        close: Number(payload.k.c),
      });
    },
    () => {
      connectChartStreamSuccess();
      setChartConnectionStatus("live");
      showSuccess(t('chartConnected'));
    },
    () => {
      console.warn("Chart websocket error");
    },
    (event) => {
      console.warn("Chart websocket closed", event.code, event.reason);

      if (event.code !== 1000) {
        setChartConnectionStatus("disconnected");
        showError(t('chartConnectionLost'));
      }
    },
    (attempt) => {
      console.log("chart ws reconnect attempt", attempt);
      setChartConnectionStatus("reconnecting");
      showInfo(t('reconnecting'));
    },
  );

  chartSocket.connect();
});

orchestrator(disconnectChartStream, () => {
  chartSocket?.disconnect();
  chartSocket = null;
  setChartConnectionStatus("idle");
});

orchestrator(connectTradesStream, ({ symbol }) => {
  tradeSocket?.disconnect();

  tradeSocket = new WebSocketManager<BinanceTradeWsPayload>(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@trade`,
    (payload) => {
      if (payload.s !== appStore().market.selectedSymbol) return;
      prependRecentTrade({
        id: payload.t,
        price: Number(payload.p),
        quantity: Number(payload.q),
        timestamp: payload.T,
        isBuyerMaker: payload.m,
      });
    },
    () => {
      connectTradesStreamSuccess();
      console.log("trade ws live");
      showSuccess(t('tradesConnected'));
    },
    () => {
      console.warn("trade ws error");
    },
    (event) => {
      console.warn("trade ws closed", event.code, event.reason);
      showError(t('tradesConnectionLost'));
    },
    (attempt) => {
      console.log("trade ws reconnect attempt", attempt);
      showInfo(t('reconnecting'));
    },
  );

  tradeSocket.connect();
});

orchestrator(disconnectTradesStream, () => {
  tradeSocket?.disconnect();
  tradeSocket = null;
  clearRecentTrades();
});

orchestrator(loadOrderBook, async ({ symbol }) => {
  try {
    const snapshot = await getOrderBook(symbol, 10);
    loadOrderBookSuccess(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load order book";
    loadOrderBookFailure(message);
  }
});

orchestrator(connectOrderBookStream, ({ symbol }) => {
  orderBookSocket?.disconnect();

  orderBookSocket = new WebSocketManager<BinanceDepthWsPayload>(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@depth10@100ms`,
    (payload) => {
      const store = appStore();
      const nextBids = (payload.b ?? []).map(([price, quantity]) => ({
        price: Number(price),
        quantity: Number(quantity),
      }));
      const nextAsks = (payload.a ?? []).map(([price, quantity]) => ({
        price: Number(price),
        quantity: Number(quantity),
      }));

      const merged = mergeOrderBookLevels(
        store.chart.orderBook.bids,
        store.chart.orderBook.asks,
        nextBids,
        nextAsks,
        10,
      );

      patchOrderBook(merged);
    },
    () => {
      connectOrderBookStreamSuccess();
      setOrderBookConnectionStatus("live");
      showSuccess(t('orderBookConnected'));
    },
    () => {
      console.warn("Order book websocket error");
    },
    (event) => {
      console.warn("Order book websocket closed", event.code, event.reason);

      if (event.code !== 1000) {
        setOrderBookConnectionStatus("disconnected");
        showError(t('orderBookConnectionLost'));
      }
    },
    () => {
      setOrderBookConnectionStatus("reconnecting");
      showInfo(t('reconnecting'));
    },
  );

  orderBookSocket.connect();
});
orchestrator(disconnectOrderBookStream, () => {
  orderBookSocket?.disconnect();
  orderBookSocket = null;
  clearOrderBook();
});