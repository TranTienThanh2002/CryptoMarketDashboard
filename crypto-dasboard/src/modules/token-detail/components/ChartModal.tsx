import { observer } from 'mobx-react-lite';
import { appStore } from '../../../app/store/app.store';
import { closeChartModal } from '../../../app/actions/market.actions';
import { TokenDetailPanel } from './TokenDetailPanel';
import { t } from '../../../shared/i18n';

export const ChartModal = observer(() => {
  const store = appStore();

  if (!store.market.isChartModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {store.market.selectedSymbol} {t('chart')}
          </h3>

          <button
            type="button"
            onClick={closeChartModal}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            {t('close')}
          </button>
        </div>

        <TokenDetailPanel />
      </div>
    </div>
  );
});