"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Client-only: lazy-loads each demo's UI component. Add a live demo's UI here.
export const demoUIs: Record<string, ComponentType> = {
  "haiku-generator": dynamic(() => import("./haiku-generator/ui")),
  "github-roast": dynamic(() => import("./github-roast/ui")),
  "snoop-ism": dynamic(() => import("./snoop-ism/ui")),
  "burger-of-the-day": dynamic(() => import("./burger-of-the-day/ui")),
};
