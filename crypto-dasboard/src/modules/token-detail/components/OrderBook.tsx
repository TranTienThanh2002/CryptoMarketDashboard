import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { formatPrice } from "../../../shared/utils/format";
import { ConnectionBadge } from "../../../shared/components/ConnectionBadge";
import { t } from "../../../shared/i18n";

export const OrderBook = observer(() => {
  const store = appStore();
  const { bids, asks, isLoading, error, connectionStatus } =
    store.chart.orderBook;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[var(--foreground)]">
          {t("orderBook")}
        </h4>
        <ConnectionBadge status={connectionStatus} />
      </div>

      {error ? (
        <div className="mb-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-3">
              <div className="h-4 animate-pulse rounded bg-white/10" />
              <div className="h-4 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {t("bids")}
            </div>
            <div className="space-y-1">
              {bids.map((item) => (
                <div
                  key={`bid-${item.price}`}
                  className="grid grid-cols-2 gap-3 border-t border-white/5 py-2 text-sm"
                >
                  <div className="text-emerald-400">
                    {formatPrice(item.price)}
                  </div>
                  <div className="text-right text-[var(--foreground)]">
                    {item.quantity.toFixed(5)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
              {t("asks")}
            </div>
            <div className="space-y-1">
              {asks.map((item) => (
                <div
                  key={`ask-${item.price}`}
                  className="grid grid-cols-2 gap-3 border-t border-white/5 py-2 text-sm"
                >
                  <div className="text-red-400">{formatPrice(item.price)}</div>
                  <div className="text-right text-[var(--foreground)]">
                    {item.quantity.toFixed(5)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
