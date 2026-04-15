import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { formatPrice } from "../../../shared/utils/format";
import { formatTradeTime } from "../../../shared/utils/trade-format";
import { t } from "../../../shared/i18n";

export const RecentTrades = observer(() => {
  const store = appStore();
  const { trades, isLoadingTrades, tradeError } = store.chart;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[var(--foreground)]">
          {t("recentTrades")}
        </h4>
        <span className="text-xs text-[var(--muted)]">
          {trades.length} {t("items")}
        </span>
      </div>

      {tradeError ? (
        <div className="mb-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {tradeError}
        </div>
      ) : null}

      {isLoadingTrades ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-3">
              <div className="h-4 animate-pulse rounded bg-white/10" />
              <div className="h-4 animate-pulse rounded bg-white/10" />
              <div className="h-4 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : trades.length === 0 ? (
        <div className="text-sm text-[var(--muted)]">{t("noRecentTrades")}</div>
      ) : (
        <div className="max-h-[420px] space-y-2 overflow-auto">
          <div className="grid grid-cols-3 gap-3 text-[11px] uppercase tracking-wide text-[var(--muted)]">
            <div>{t("price")}</div>
            <div className="text-right">{t("qty")}</div>
            <div className="text-right">{t("time")}</div>
          </div>

          {trades.map((trade) => {
            const sideClass = trade.isBuyerMaker
              ? "text-red-400"
              : "text-emerald-400";

            return (
              <div
                key={trade.id}
                className="grid grid-cols-3 gap-3 border-t border-white/5 py-2 text-sm"
              >
                <div className={sideClass}>{formatPrice(trade.price)}</div>
                <div className="text-right text-[var(--foreground)]">
                  {trade.quantity.toFixed(5)}
                </div>
                <div className="text-right text-[var(--muted)]">
                  {formatTradeTime(trade.timestamp)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
