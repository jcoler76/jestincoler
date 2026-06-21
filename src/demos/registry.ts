import type { DemoMeta } from "./types";
import { meta as haikuGenerator } from "./haiku-generator/meta";
import { meta as gitHubRoast } from "./github-roast/meta";
import { meta as snoopIsm } from "./snoop-ism/meta";
import { meta as burgerOfTheDay } from "./burger-of-the-day/meta";

// Client-safe: pure metadata only (no handlers). Add a demo's meta here.
export const demos: DemoMeta[] = [haikuGenerator, gitHubRoast, snoopIsm, burgerOfTheDay];

export function getDemoMeta(slug: string): DemoMeta | undefined {
  return demos.find((d) => d.slug === slug);
}
