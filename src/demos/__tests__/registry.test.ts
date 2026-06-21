import { describe, it, expect } from "vitest";
import { demos, getDemoMeta } from "@/demos/registry";

describe("demo registry", () => {
  it("lists four demos with unique slugs", () => {
    expect(demos).toHaveLength(4);
    expect(new Set(demos.map((d) => d.slug)).size).toBe(4);
  });

  it("marks all four demos as live (none coming soon)", () => {
    for (const slug of ["haiku-generator", "github-roast", "snoop-ism", "burger-of-the-day"]) {
      expect(getDemoMeta(slug)?.comingSoon).toBeFalsy();
    }
  });

  it("getDemoMeta returns undefined for unknown slugs", () => {
    expect(getDemoMeta("nope")).toBeUndefined();
  });
});
