"use client";

import { useEffect, useState } from "react";
import { useSessionEvents } from "@/lib/events";
import type { WorldMap } from "@/lib/worldMap";
import GeoPanel from "./GeoPanel";
import DevicePanel from "./DevicePanel";
import EventFeed from "./EventFeed";

interface ServerFacts {
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
  os: string | null;
  browser: string | null;
  device: string | null;
}

const EMPTY: ServerFacts = {
  city: null,
  region: null,
  country: null,
  latitude: null,
  longitude: null,
  os: null,
  browser: null,
  device: null,
};

interface ClientFacts {
  screen: string | null;
  locale: string | null;
  connection: string | null;
  osPrefersDark: boolean | null;
  referrer: string | null;
}

const EMPTY_CLIENT: ClientFacts = {
  screen: null,
  locale: null,
  connection: null,
  osPrefersDark: null,
  referrer: null,
};

export default function LiveInspector({ map }: { map?: WorldMap }) {
  const events = useSessionEvents();
  const [facts, setFacts] = useState<ServerFacts>(EMPTY);
  const [client, setClient] = useState<ClientFacts>(EMPTY_CLIENT);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/session", { method: "POST", signal: controller.signal })
      .then((r) => (r.ok ? r.json() : EMPTY))
      .then((d) => setFacts({ ...EMPTY, ...d }))
      .catch(() => {});

    // Client-only facts (window/navigator/document) are read post-mount. Defer the state
    // commit to a microtask so it isn't a synchronous setState inside the effect body.
    queueMicrotask(() => {
      const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      let referrer: string | null = null;
      if (document.referrer) {
        try {
          referrer = new URL(document.referrer).hostname;
        } catch {
          referrer = null;
        }
      }
      setClient({
        screen: `${window.screen.width}×${window.screen.height}`,
        locale: navigator.language || null,
        connection: conn?.effectiveType ?? null,
        osPrefersDark: window.matchMedia
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
          : null,
        referrer,
      });
    });
    return () => controller.abort();
  }, []);

  const route = events.length ? events[events.length - 1].label : "/live";

  return (
    <div className="mt-8 space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GeoPanel
          city={facts.city}
          region={facts.region}
          country={facts.country}
          latitude={facts.latitude}
          longitude={facts.longitude}
          map={map}
        />
        <DevicePanel
          os={facts.os}
          browser={facts.browser}
          device={facts.device}
          screen={client.screen}
          locale={client.locale}
          connection={client.connection}
          osPrefersDark={client.osPrefersDark}
        />
      </div>
      <EventFeed events={events} startedAt={startedAt} route={route} referrer={client.referrer} />
    </div>
  );
}
