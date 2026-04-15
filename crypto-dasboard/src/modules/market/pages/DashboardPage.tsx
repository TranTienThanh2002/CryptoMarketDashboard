import { useEffect } from "react";
import {
  loadTradingPairs,
  connectMiniTickerStream,
  disconnectMiniTickerStream,
} from "../../../app/actions/market.actions";
import { appStore } from "../../../app/store/app.store";
import { observer } from "mobx-react-lite";
import { SearchBar } from "../components/SearchBar";
import { MarketList } from "../components/MarketList";
import { LanguageSwitcher } from "../../settings/components/LanguageSwitcher";
import { MarketTabs } from "../components/MarketTabs";
import { ChartModal } from "../../token-detail/components/ChartModal";
import { t } from "../../../shared/i18n";
import { ConnectionBadge } from "../../../shared/components/ConnectionBadge";
import { ThemeToggle } from "../../settings/components/ThemeToggle";
export const DashboardPage = observer(() => {
  const store = appStore();

  useEffect(() => {
    loadTradingPairs();
    connectMiniTickerStream();

    return () => {
      disconnectMiniTickerStream();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              {t("dashboardTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {t("dashboardSubtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--foreground)]">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {t("pairs")}: {store.market.pairs.length}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--foreground)]">{t("stream")}:</span>
            <ConnectionBadge status={store.market.connectionStatus} />
          </div>

          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-yellow-300">
            {t("favorites")}: {store.market.favorites.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <MarketTabs />
        <div className="w-full lg:max-w-md">
          <SearchBar />
        </div>
      </div>
      <MarketList />
      <ChartModal />
    </div>
  );
});
