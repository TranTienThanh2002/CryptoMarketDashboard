import { memo, useMemo } from "react";
import type { TradingPair } from "../../../shared/types/market.types";
import { appStore } from "../../../app/store/app.store";
import { observer } from "mobx-react-lite";
import { formatPercent, formatPrice } from "../../../shared/utils/format";
import {
  openChartModal,
  toggleFavoriteSymbol,
} from "../../../app/actions/market.actions";
import { t } from "../../../shared/i18n";

interface MarketRowProps {
  pair: TradingPair;
}

export const MarketRow = memo(
  observer(({ pair }: MarketRowProps) => {
    const store = appStore();
    const ticker = store.market.tickers[pair.symbol];
    const isFavorite = store.market.favorites.includes(pair.symbol);

    const highlightClass = useMemo(() => {
      if (!ticker) return "bg-white/0";
      if (ticker.lastDirection === "up") return "bg-emerald-500/10";
      if (ticker.lastDirection === "down") return "bg-red-500/10";
      return "bg-white/0";
    }, [ticker]);

    const percentClass =
      !ticker || ticker.priceChangePercent24h === 0
        ? "text-[var(--foreground)]"
        : ticker.priceChangePercent24h > 0
          ? "text-emerald-400"
          : "text-red-400";

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => openChartModal(pair.symbol)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openChartModal(pair.symbol);
          }
        }}
        className={`cursor-pointer border-t border-white/5 px-4 py-4 transition-colors duration-300 ${highlightClass}`}
      >
        <div className="flex items-start gap-3 md:grid md:grid-cols-[40px_1.2fr_1fr_1fr] md:items-center md:gap-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleFavoriteSymbol(pair.symbol);
            }}
            onKeyDown={(event) => {
              event.stopPropagation();
            }}
            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition md:mt-0 ${
              isFavorite
                ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                : "border-[var(--border)] bg-white/5 text-slate-400 hover:text-yellow-300"
            }`}
          >
            ★
          </button>

          <div className="min-w-0 flex-1">
            <div className="font-semibold text-[var(--foreground)]">{pair.symbol}</div>
            <div className="text-xs text-slate-400">
              {pair.baseAsset} / {pair.quoteAsset}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 md:hidden">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-slate-500">
                  {t("price")}
                </div>
                <div className="mt-1 text-sm font-medium text-[var(--foreground)]">
                  {ticker ? formatPrice(ticker.currentPrice) : "--"}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wide text-slate-500">
                  {t("change24h")}
                </div>
                <div className={`mt-1 text-sm font-medium ${percentClass}`}>
                  {ticker ? formatPercent(ticker.priceChangePercent24h) : "--"}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden text-right font-medium text-[var(--foreground)] md:block">
            {ticker ? formatPrice(ticker.currentPrice) : "--"}
          </div>

          <div
            className={`hidden text-right font-medium md:block ${percentClass}`}
          >
            {ticker ? formatPercent(ticker.priceChangePercent24h) : "--"}
          </div>
        </div>
      </div>
    );
  }),
);

MarketRow.displayName = "MarketRow";
