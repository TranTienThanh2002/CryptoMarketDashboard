import type { OrderBookLevel } from "../types/orderbook.types";

const normalizeLevels = (
  current: OrderBookLevel[],
  updates: OrderBookLevel[],
  side: "bids" | "asks",
  limit = 10,
): OrderBookLevel[] => {
  const map = new Map<number, number>();

  for (const level of current) {
    map.set(level.price, level.quantity);
  }

  for (const level of updates) {
    if (level.quantity <= 0) {
      map.delete(level.price);
    } else {
      map.set(level.price, level.quantity);
    }
  }

  const next = Array.from(map.entries()).map(([price, quantity]) => ({
    price,
    quantity,
  }));

  next.sort((a, b) =>
    side === "bids" ? b.price - a.price : a.price - b.price,
  );

  return next.slice(0, limit);
};

export const mergeOrderBookLevels = (
  currentBids: OrderBookLevel[],
  currentAsks: OrderBookLevel[],
  nextBids: OrderBookLevel[],
  nextAsks: OrderBookLevel[],
  limit = 10,
) => {
  return {
    bids: normalizeLevels(currentBids, nextBids, "bids", limit),
    asks: normalizeLevels(currentAsks, nextAsks, "asks", limit),
  };
};
