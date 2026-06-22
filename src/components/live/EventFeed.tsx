"use client";

import { useEffect, useState } from "react";
import type { SessionEvent } from "@/lib/events";

interface EventFeedProps {
  events: SessionEvent[];
  startedAt: number;
  route: string;
  referrer: string | null;
}

const VERB: Record<SessionEvent["type"], string> = {
  page_view: "page_view",
  terminal_opened: "terminal_opened",
  command: "command",
  demo_run: "demo_run",
  theme_changed: "theme_changed",
};

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function EventFeed({ events, startedAt, route, referrer }: EventFeedProps) {
  const [now, setNow] = useState(startedAt);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const ordered = [...events].reverse();

  return (
    <section className="rounded-lg border border-line bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">live feed</h2>
        <span className="font-mono text-[11px] text-muted">
          {fmt(now - startedAt)} on site · {route}
          {referrer ? ` · via ${referrer}` : ""}
        </span>
      </div>
      {ordered.length === 0 ? (
        <p className="font-mono text-[13px] text-muted">waiting for activity…</p>
      ) : (
        <ul className="space-y-1">
          {ordered.map((e) => (
            <li key={e.id} className="flex items-baseline gap-3 font-mono text-[13px]">
              <span className="w-12 shrink-0 text-muted">{fmt(now - e.at)}</span>
              <span className="text-accent">{VERB[e.type]}</span>
              {e.label && <span className="text-ink">{e.label}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
