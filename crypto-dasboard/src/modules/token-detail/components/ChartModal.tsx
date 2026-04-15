import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { closeChartModal } from "../../../app/actions/market.actions";
import { TokenDetailPanel } from "./TokenDetailPanel";
import { t } from "../../../shared/i18n";

export const ChartModal = observer(() => {
  const store = appStore();

  if (!store.market.isChartModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4 !mt-0">
      <div className="relative h-[92vh] w-full overflow-auto rounded-t-3xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-[95vw] sm:rounded-3xl sm:p-6 xl:max-w-[92vw]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-semibold text-[var(--foreground)] sm:text-lg">
            {store.market.selectedSymbol} {t("chart")}
          </h3>

          <button
            type="button"
            onClick={closeChartModal}
            className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-white/10"
          >
            {t("close")}
          </button>
        </div>

        <TokenDetailPanel />
      </div>
    </div>
  );
});
