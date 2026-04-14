import { observer } from 'mobx-react-lite';
import { appStore } from '../../../app/store/app.store';
import { MarketRow } from './MarketRow';
import { Pagination } from './Pagination';
import { setMarketPage } from '../../../app/actions/market.actions';
import { t } from '../../../shared/i18n';

export const MarketList = observer(() => {
  const store = appStore();
  const {
    pairs,
    searchKeyword,
    isLoadingPairs,
    favorites,
    activeTab,
    currentPage,
    pageSize,
  } = store.market;

  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  const filteredPairs = pairs
    .filter((pair) => {
      const matchesKeyword =
        !normalizedKeyword ||
        pair.symbol.toLowerCase().includes(normalizedKeyword) ||
        pair.baseAsset.toLowerCase().includes(normalizedKeyword) ||
        pair.quoteAsset.toLowerCase().includes(normalizedKeyword);

      const matchesTab =
        activeTab === 'all' ? true : favorites.includes(pair.symbol);

      return matchesKeyword && matchesTab;
    })

  const totalPages = Math.max(1, Math.ceil(filteredPairs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedPairs = filteredPairs.slice(startIndex, startIndex + pageSize);

  if (isLoadingPairs) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-slate-300">{t('loadingPairs')}</div>
      </div>
    );
}

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-[40px_1.2fr_1fr_1fr] gap-4 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <div></div>
          <div>{t('symbol')}</div>
          <div className="text-right">{t('price')}</div>
          <div className="text-right">{t('change24h')}</div>
        </div>

        {paginatedPairs.length === 0 ? (
          <div className="border-t border-white/5 px-4 py-6 text-sm text-slate-400">
            {t('noMatchingPairs')}
          </div>
        ) : (
          paginatedPairs.map((pair) => <MarketRow key={pair.symbol} pair={pair} />)
        )}
      </div>

      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onChange={setMarketPage}
      />
    </>
  );
});