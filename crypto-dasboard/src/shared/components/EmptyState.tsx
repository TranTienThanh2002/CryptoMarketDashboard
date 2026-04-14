interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
      <div className="text-base font-semibold text-white">{title}</div>
      {description ? (
        <div className="mt-2 text-sm text-slate-400">{description}</div>
      ) : null}
    </div>
  );
};