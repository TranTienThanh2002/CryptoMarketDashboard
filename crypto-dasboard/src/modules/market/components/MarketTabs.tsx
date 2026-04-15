import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { setActiveMarketTab } from "../../../app/actions/market.actions";
import { t } from "../../../shared/i18n";

export const MarketTabs = observer(() => {
  const store = appStore();
  const { activeTab, favorites } = store.market;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setActiveMarketTab("all")}
        className={`rounded-full px-4 py-2 text-sm transition ${
          activeTab === "all"
            ? "bg-sky-500 text-white"
            : "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
        }`}
      >
        {t("all")}
      </button>

      <button
        type="button"
        onClick={() => setActiveMarketTab("favorites")}
        className={`rounded-full px-4 py-2 text-sm transition ${
          activeTab === "favorites"
            ? "bg-sky-500 text-white"
            : "border border-[var(--border)] bg-white/5 text-[var(--foreground)]"
        }`}
      >
        {t("favorites")} ({favorites.length})
      </button>
    </div>
  );
});
