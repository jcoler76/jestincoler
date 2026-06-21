"use client";

import { demoUIs } from "@/demos/ui-registry";

export default function DemoLoader({ slug }: { slug: string }) {
  const Demo = demoUIs[slug];
  if (!Demo) {
    return <p className="font-mono text-sm text-muted">This demo isn&apos;t available yet.</p>;
  }
  return <Demo />;
}
