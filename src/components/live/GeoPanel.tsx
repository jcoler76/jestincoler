interface GeoPanelProps {
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
}

export default function GeoPanel({ city, region, country, latitude, longitude }: GeoPanelProps) {
  const lat = latitude ? parseFloat(latitude) : null;
  const lon = longitude ? parseFloat(longitude) : null;
  const hasDot = lat !== null && lon !== null && !Number.isNaN(lat) && !Number.isNaN(lon);
  const x = hasDot ? Math.min(100, Math.max(0, ((lon! + 180) / 360) * 100)) : 0;
  const y = hasDot ? Math.min(100, Math.max(0, ((90 - lat!) / 180) * 100)) : 0;
  const place = [city, region, country].filter(Boolean).join(", ") || "location unavailable";

  return (
    <section className="rounded-lg border border-line bg-card p-4">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">geo</h2>
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md border border-line bg-bg">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "12.5% 16.66%",
          }}
          aria-hidden="true"
        />
        {hasDot && (
          <span
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent ring-4 ring-accent/25"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-3 font-mono text-[13px] text-ink">{place}</p>
    </section>
  );
}
