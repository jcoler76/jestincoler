import type { WorldMap } from "@/lib/worldMap";

interface GeoPanelProps {
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
  map?: WorldMap;
}

const RAD = Math.PI / 180;

export default function GeoPanel({ city, region, country, latitude, longitude, map }: GeoPanelProps) {
  const lat = latitude ? parseFloat(latitude) : null;
  const lon = longitude ? parseFloat(longitude) : null;
  const hasDot = lat !== null && lon !== null && !Number.isNaN(lat) && !Number.isNaN(lon);
  const place = [city, region, country].filter(Boolean).join(", ") || "location unavailable";

  // Equirectangular projection that mirrors d3-geo's geoEquirectangular (default center/rotate),
  // using the scale + translate computed server-side, so the dot lands on the rendered map.
  const dot =
    hasDot && map
      ? {
          x: map.translate[0] + map.scale * lon! * RAD,
          y: map.translate[1] - map.scale * lat! * RAD,
        }
      : null;

  return (
    <section className="rounded-lg border border-line bg-card p-4">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">geo</h2>
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md border border-line bg-bg">
        {map ? (
          <svg
            viewBox={`0 0 ${map.width} ${map.height}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path d={map.landPath} className="fill-line/70 stroke-line" strokeWidth={0.4} />
            {dot && (
              <>
                <circle cx={dot.x} cy={dot.y} r={14} className="fill-accent/20">
                  <animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={dot.x} cy={dot.y} r={5} className="fill-accent" />
              </>
            )}
          </svg>
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "12.5% 16.66%",
            }}
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-3 font-mono text-[13px] text-ink">{place}</p>
    </section>
  );
}
