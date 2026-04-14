import { memo, useMemo } from 'react';
import type { TradingPair } from '../../../shared/types/market.types';
import { appStore } from '../../../app/store/app.store';
import { observer } from 'mobx-react-lite';
import { formatPercent, formatPrice } from '../../../shared/utils/format';
import {
  openChartModal,
  toggleFavoriteSymbol,
} from '../../../app/actions/market.actions';

interface MarketRowProps {
  pair: TradingPair;
}

export const MarketRow = memo(
  observer(({ pair }: MarketRowProps) => {
    const store = appStore();
    const ticker = store.market.tickers[pair.symbol];
    const isActive = store.market.selectedSymbol === pair.symbol;
    const isFavorite = store.market.favorites.includes(pair.symbol);

    const highlightClass = useMemo(() => {
      if (!ticker) return 'bg-white/0';
      if (ticker.lastDirection === 'up') return 'bg-emerald-500/10';
      if (ticker.lastDirection === 'down') return 'bg-red-500/10';
      return 'bg-white/0';
    }, [ticker]);

    const percentClass =
      !ticker || ticker.priceChangePercent24h === 0
        ? 'text-slate-300'
        : ticker.priceChangePercent24h > 0
          ? 'text-emerald-400'
          : 'text-red-400';

    return (
      <div
        className={`grid grid-cols-[40px_1.2fr_1fr_1fr] items-center gap-4 border-t border-white/5 px-4 py-4 transition-colors duration-300 ${highlightClass} ${
          isActive ? 'ring-1 ring-sky-500/60' : ''
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFavoriteSymbol(pair.symbol)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${
            isFavorite
              ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300'
              : 'border-white/10 bg-white/5 text-slate-400 hover:text-yellow-300'
          }`}
        >
          ★
        </button>

        <button
          type="button"
          onClick={() => openChartModal(pair.symbol)}
          className="min-w-0 text-left"
        >
          <div className="font-semibold text-white">{pair.symbol}</div>
          <div className="text-xs text-slate-400">
            {pair.baseAsset} / {pair.quoteAsset}
          </div>
        </button>

        <div className="text-right font-medium text-white">
          {ticker ? formatPrice(ticker.currentPrice) : '--'}
        </div>

        <div className={`text-right font-medium ${percentClass}`}>
          {ticker ? formatPercent(ticker.priceChangePercent24h) : '--'}
        </div>
      </div>
    );
  }),
);

MarketRow.displayName = 'MarketRow';