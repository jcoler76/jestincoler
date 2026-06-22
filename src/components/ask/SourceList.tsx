export interface Source {
  id: string;
  label: string;
}

export default function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">sources</span>
      {sources.map((s) => (
        <span
          key={s.id}
          className="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[11px] text-muted"
        >
          {s.label}
        </span>
      ))}
    </div>
  );
}
