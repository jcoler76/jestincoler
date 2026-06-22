export const STARTERS = [
  "What's your experience with Postgres at scale?",
  "Tell me about the bankruptcy-law platform.",
  "Are you open to remote work?",
  "What are your comp expectations?",
];

export default function StarterChips({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STARTERS.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="rounded-full border border-line bg-card px-3 py-1.5 text-left font-mono text-[12.5px] text-muted transition-colors hover:border-accent hover:text-ink"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
