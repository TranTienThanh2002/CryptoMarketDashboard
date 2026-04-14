export interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export interface MarketTicker {
  symbol: string;
  currentPrice: number;
  priceChangePercent24h: number;
  lastDirection: 'up' | 'down' | 'neutral';
  updatedAt: number;
}

export interface BinanceExchangeInfoResponse {
  symbols: Array<{
    symbol: string;
    status: string;
    baseAsset: string;
    quoteAsset: string;
    isSpotTradingAllowed: boolean;
  }>;
}

export interface BinanceMiniTickerStreamItem {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}

export type MarketTickerMap = Record<string, MarketTicker>;