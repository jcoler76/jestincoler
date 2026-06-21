"use client";

import { useEffect, useState } from "react";

export default function LocationGreeting() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/greeting", { method: "POST", signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.greeting === "string" && d.greeting) setGreeting(d.greeting);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
    return () => controller.abort();
  }, []);

  // It sits above the hero kicker, so reserve the line up front — the greeting fades into an
  // existing slot instead of shoving the headline down when it arrives a beat after load.
  if (!loaded) return <div className="mb-5 h-5" aria-hidden="true" />;
  if (!greeting) return null;
  return (
    <p className="mb-5 animate-[fadeIn_0.6s_ease-out] font-mono text-[13px] text-muted">
      <span aria-hidden="true">✈ </span>
      {greeting}
    </p>
  );
}
