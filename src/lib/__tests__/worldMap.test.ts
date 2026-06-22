import { describe, it, expect } from "vitest";
import { WORLD_MAP } from "@/lib/worldMap";

describe("WORLD_MAP", () => {
  it("builds a non-empty land path", () => {
    expect(WORLD_MAP.landPath.length).toBeGreaterThan(1000);
    expect(WORLD_MAP.landPath.startsWith("M")).toBe(true);
  });

  it("exposes finite projection parameters within the viewBox", () => {
    expect(Number.isFinite(WORLD_MAP.scale)).toBe(true);
    expect(WORLD_MAP.scale).toBeGreaterThan(0);
    const [tx, ty] = WORLD_MAP.translate;
    expect(tx).toBeGreaterThan(0);
    expect(tx).toBeLessThan(WORLD_MAP.width);
    expect(ty).toBeGreaterThan(0);
    expect(ty).toBeLessThan(WORLD_MAP.height);
  });

  it("projects [0,0] to the translate origin (equirectangular center)", () => {
    const RAD = Math.PI / 180;
    const x = WORLD_MAP.translate[0] + WORLD_MAP.scale * 0 * RAD;
    const y = WORLD_MAP.translate[1] - WORLD_MAP.scale * 0 * RAD;
    expect(x).toBeCloseTo(WORLD_MAP.translate[0]);
    expect(y).toBeCloseTo(WORLD_MAP.translate[1]);
  });
});
