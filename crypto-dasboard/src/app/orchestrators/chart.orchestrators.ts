import { orchestrator } from "satcheljs";
import {
  connectChartStream,
  connectChartStreamFailure,
  connectChartStreamSuccess,
  disconnectChartStream,
  loadChartData,
  loadChartDataFailure,
  loadChartDataSuccess,
  upsertCurrentCandle,
} from "../actions/chart.actions";
import { getKlines } from "../../services/api/binance.api";
import { WebSocketManager } from "../../services/websocket/websocket-manager";
import { BINANCE_WS_BASE_URL } from "../../shared/constants/api";
import type { BinanceKlineWsPayload } from "../../shared/types/chart.types";
import { setChartConnectionStatus } from "../actions/chart.actions";
let chartSocket: WebSocketManager<BinanceKlineWsPayload> | null = null;

orchestrator(loadChartData, async ({ symbol, interval }) => {
  try {
    const candles = await getKlines(symbol, interval);
    loadChartDataSuccess(symbol, candles);
  } catch (error) {
    console.error("loadChartData error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to load chart data";
    loadChartDataFailure(message);
  }
});

orchestrator(connectChartStream, ({ symbol, interval }) => {
  chartSocket?.disconnect();

  chartSocket = new WebSocketManager<BinanceKlineWsPayload>(
    `${BINANCE_WS_BASE_URL}/${symbol.toLowerCase()}@kline_${interval}`,
    (payload) => {
      if (!payload?.k) return;

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
    },
    () => {
      console.warn("Chart websocket error");
    },
    (event) => {
      console.warn("Chart websocket closed", event.code, event.reason);

      if (event.code !== 1000) {
        setChartConnectionStatus("disconnected");
      }
    },
    (attempt) => {
      console.log("chart ws reconnect attempt", attempt);
      setChartConnectionStatus("reconnecting");
    },
  );

  chartSocket.connect();
});

orchestrator(disconnectChartStream, () => {
  chartSocket?.disconnect();
  chartSocket = null;
  setChartConnectionStatus("idle");
});
