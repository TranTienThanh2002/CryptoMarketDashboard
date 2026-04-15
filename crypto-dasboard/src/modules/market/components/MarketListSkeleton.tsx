import { t } from "../../../shared/i18n";

export const MarketListSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white/5">
      <div className="grid grid-cols-[40px_1.2fr_1fr_1fr] gap-4 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <div></div>
        <div>{t('symbol')}</div>
        <div className="text-right">{t('price')}</div>
        <div className="text-right">{t('change24h')}</div>
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[40px_1.2fr_1fr_1fr] items-center gap-4 border-t border-white/5 px-4 py-4"
        >
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
          <div>
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-3 w-16 animate-pulse rounded bg-white/10" />
          </div>
          <div className="ml-auto h-4 w-20 animate-pulse rounded bg-white/10" />
          <div className="ml-auto h-4 w-16 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
};