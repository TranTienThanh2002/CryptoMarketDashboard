import { observer } from 'mobx-react-lite';
import { appStore } from '../../../app/store/app.store';
import { useEffect } from 'react';
import {
  connectChartStream,
  disconnectChartStream,
  loadChartData,
  setChartInterval,
} from '../../../app/actions/chart.actions';
import { CandlestickChart } from './CandlestickChart';
import { t } from '../../../shared/i18n';

const intervals = ['1m', '5m', '15m', '1h', '4h'];

export const TokenDetailPanel = observer(() => {
  const store = appStore();
  const selectedSymbol = store.market.selectedSymbol;
  const { candles, interval, isLoading, error } = store.chart;

  useEffect(() => {
    if (!selectedSymbol) return;

    loadChartData(selectedSymbol, interval);
    connectChartStream(selectedSymbol, interval);

    return () => {
      disconnectChartStream();
    };
  }, [selectedSymbol, interval]);

  if (!selectedSymbol) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
        {t('selectPairForChart')}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{selectedSymbol}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {t('realTimeCandlestickChart')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {intervals.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setChartInterval(item)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                interval === item
                  ? 'bg-sky-500 text-white'
                  : 'border border-white/10 bg-white/5 text-slate-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#121a2b] px-4 py-16 text-center text-sm text-slate-300">
          {t('loadingChartData')}
        </div>
      ) : candles.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#121a2b] px-4 py-16 text-center text-sm text-slate-300">
          {t('noChartData')}
        </div>
      ) : (
        <CandlestickChart candles={candles} />
      )}
    </div>
  );
});