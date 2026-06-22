"use client";

import DemoForm from "@/demos/DemoForm";

export default function BurgerOfTheDayUI() {
  return (
    <DemoForm
      slug="burger-of-the-day"
      field="theme"
      placeholder="a theme (optional) — e.g. breakfast"
      idleLabel="cook one up"
      loadingLabel="grilling…"
    />
  );
}
