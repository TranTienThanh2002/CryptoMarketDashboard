import type {
  BinanceKlineRestItem,
  CandleItem,
} from "../../shared/types/chart.types";
import type {
  BinanceExchangeInfoResponse,
  TradingPair,
} from "../../shared/types/market.types";
import type { OrderBookState } from "../../shared/types/orderbook.types";
import { http } from "./http";

export const getExchangeInfo = async (): Promise<TradingPair[]> => {
  const response = await http.get<BinanceExchangeInfoResponse>("/exchangeInfo");

  return response.data.symbols
    ?.filter((item) => item.status === "TRADING" && item.quoteAsset === "USDT")
    .map((item) => ({
      symbol: item.symbol,
      baseAsset: item.baseAsset,
      quoteAsset: item.quoteAsset,
    }));
};

export const getKlines = async (
  symbol: string,
  interval: string,
  limit = 120,
): Promise<CandleItem[]> => {
  const response = await http.get<BinanceKlineRestItem[]>("/klines", {
    params: {
      symbol,
      interval,
      limit,
    },
  });

  return response.data.map((item) => ({
    time: Math.floor(Number(item[0]) / 1000),
    open: Number(item[1]),
    high: Number(item[2]),
    low: Number(item[3]),
    close: Number(item[4]),
  }));
};

export const getOrderBook = async (
  symbol: string,
  limit = 10,
): Promise<OrderBookState> => {
  const response = await http.get("/depth", {
    params: {
      symbol,
      limit,
    },
  });

  return {
    bids: (response.data.bids ?? []).map(
      ([price, quantity]: [string, string]) => ({
        price: Number(price),
        quantity: Number(quantity),
      }),
    ),
    asks: (response.data.asks ?? []).map(
      ([price, quantity]: [string, string]) => ({
        price: Number(price),
        quantity: Number(quantity),
      }),
    ),
  };
};
