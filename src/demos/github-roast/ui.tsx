"use client";

import DemoForm from "@/demos/DemoForm";

export default function GitHubRoastUI() {
  return (
    <DemoForm
      slug="github-roast"
      field="username"
      placeholder="a GitHub username — e.g. torvalds"
      idleLabel="roast me"
      loadingLabel="roasting…"
      inputProps={{ autoCapitalize: "off", autoCorrect: "off", spellCheck: false }}
    />
  );
}
