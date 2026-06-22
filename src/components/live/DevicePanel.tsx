interface DevicePanelProps {
  os: string | null;
  browser: string | null;
  device: string | null;
  screen: string | null;
  locale: string | null;
  connection: string | null;
  osPrefersDark: boolean | null;
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/60 py-1.5 last:border-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{k}</span>
      <span className="font-mono text-[13px] text-ink">{v}</span>
    </div>
  );
}

export default function DevicePanel(p: DevicePanelProps) {
  const dash = (s: string | null) => s ?? "—";
  return (
    <section className="rounded-lg border border-line bg-card p-4">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">device</h2>
      <Row k="os" v={dash(p.os)} />
      <Row k="browser" v={dash(p.browser)} />
      <Row k="type" v={dash(p.device)} />
      <Row k="screen" v={dash(p.screen)} />
      <Row k="locale" v={dash(p.locale)} />
      <Row k="connection" v={dash(p.connection)} />
      <Row
        k="os theme"
        v={p.osPrefersDark === null ? "—" : p.osPrefersDark ? "prefers dark" : "prefers light"}
      />
    </section>
  );
}
