import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { MarketRow } from "./MarketRow";
import { Pagination } from "./Pagination";
import { setMarketPage } from "../../../app/actions/market.actions";
import { t } from "../../../shared/i18n";
import { MarketListSkeleton } from "./MarketListSkeleton";
import { EmptyState } from "../../../shared/components/EmptyState";

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

  const filteredPairs = pairs.filter((pair) => {
    const matchesKeyword =
      !normalizedKeyword ||
      pair.symbol.toLowerCase().includes(normalizedKeyword) ||
      pair.baseAsset.toLowerCase().includes(normalizedKeyword) ||
      pair.quoteAsset.toLowerCase().includes(normalizedKeyword);

    const matchesTab =
      activeTab === "all" ? true : favorites.includes(pair.symbol);

    return matchesKeyword && matchesTab;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPairs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedPairs = filteredPairs.slice(startIndex, startIndex + pageSize);

  if (isLoadingPairs) {
    return <MarketListSkeleton />;
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
        <div className="hidden grid-cols-[40px_1.2fr_1fr_1fr] gap-4 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
          <div></div>
          <div>{t("symbol")}</div>
          <div className="text-right">{t("price")}</div>
          <div className="text-right">{t("change24h")}</div>
        </div>

        {paginatedPairs.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title={t("noMatchingPairs")}
              description={
                activeTab === "favorites"
                  ? t("tryAddFavorites")
                  : t("tryDifferentSearch")
              }
            />
          </div>
        ) : (
          paginatedPairs.map((pair) => (
            <MarketRow key={pair.symbol} pair={pair} />
          ))
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
