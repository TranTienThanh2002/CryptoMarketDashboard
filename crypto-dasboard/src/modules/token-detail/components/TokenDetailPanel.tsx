import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { useEffect } from "react";
import {
  connectChartStream,
  disconnectChartStream,
  loadChartData,
  resetChartState,
  setChartInterval,
} from "../../../app/actions/chart.actions";
import { CandlestickChart } from "./CandlestickChart";
import { t } from "../../../shared/i18n";
import { ConnectionBadge } from "../../../shared/components/ConnectionBadge";
import { EmptyState } from "../../../shared/components/EmptyState";
import { RecentTrades } from "./RecentTrades";
import {
  connectTradesStream,
  disconnectTradesStream,
} from "../../../app/actions/chart.actions";
const intervals = ["1m", "5m", "15m", "1h", "4h"];

export const TokenDetailPanel = observer(() => {
  const store = appStore();
  const selectedSymbol = store.market.selectedSymbol;
  const { candles, interval, isLoading, error } = store.chart;

  useEffect(() => {
    if (!selectedSymbol) return;

    disconnectChartStream();
    disconnectTradesStream();
    resetChartState();

    loadChartData(selectedSymbol, interval);
    connectChartStream(selectedSymbol, interval);
    connectTradesStream(selectedSymbol);

    return () => {
      disconnectChartStream();
      disconnectTradesStream();
    };
  }, [selectedSymbol, interval]);

  if (!selectedSymbol) {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-white/5 p-6 text-sm text-[var(--foreground)]">
        {t("selectPairForChart")}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            {selectedSymbol}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {t("realTimeCandlestickChart")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ConnectionBadge status={store.chart.connectionStatus} />

          {intervals.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setChartInterval(item)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                interval === item
                  ? "bg-sky-500 text-white"
                  : "border border-[var(--border)] bg-white/5 text-[var(--foreground)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#121a2b] px-4 py-16 text-center text-sm text-slate-300">
          {t("loadingChartData")}
        </div>
      ) : candles.length === 0 ? (
        <EmptyState
          title={t("noChartData")}
          description="Please try another interval or token."
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-2)] p-3">
            <CandlestickChart
              candles={candles}
              symbol={selectedSymbol}
              interval={interval}
            />
          </div>

          <RecentTrades />
        </div>
      )}
    </div>
  );
});
