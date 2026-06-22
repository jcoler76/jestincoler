"use client";

import DemoForm from "@/demos/DemoForm";

export default function SnoopIsmUI() {
  return (
    <DemoForm
      slug="snoop-ism"
      field="situation"
      placeholder="what's on your mind? (optional)"
      idleLabel="get some wisdom"
      loadingLabel="thinking…"
    />
  );
}
