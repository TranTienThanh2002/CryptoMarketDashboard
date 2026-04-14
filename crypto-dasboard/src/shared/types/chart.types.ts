export interface CandleItem {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface BinanceKlineRestItem extends Array<string | number> {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: number;
}

export interface BinanceKlineWsPayload {
  e: string;
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: string;
    o: string;
    c: string;
    h: string;
    l: string;
    x: boolean;
  };
}