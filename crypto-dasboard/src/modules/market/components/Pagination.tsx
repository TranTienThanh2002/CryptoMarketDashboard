import { t } from "../../../shared/i18n";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <div className="text-sm text-slate-300">
        {t('page')} {currentPage} / {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('prev')}
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};