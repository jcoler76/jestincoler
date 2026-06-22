"use client";

import DemoForm from "@/demos/DemoForm";

export default function HaikuGeneratorUI() {
  return (
    <DemoForm
      slug="haiku-generator"
      field="topic"
      placeholder="a topic — e.g. autumn rain"
      idleLabel="generate"
      loadingLabel="writing…"
    />
  );
}
