import { describe, it, expect } from "vitest";
import { cards } from "@/content/knowledge/cards";
import { projects } from "@/content/projects";

describe("knowledge cards", () => {
  it("has unique ids and non-empty fields", () => {
    const ids = new Set<string>();
    for (const c of cards) {
      expect(c.id).toBeTruthy();
      expect(c.label).toBeTruthy();
      expect(c.text.length).toBeGreaterThan(20);
      expect(ids.has(c.id)).toBe(false);
      ids.add(c.id);
    }
  });

  it("covers every project", () => {
    for (const p of projects) {
      expect(cards.find((c) => c.id === `proj-${p.slug}`)).toBeDefined();
    }
  });

  it("includes logistics and comp cards", () => {
    expect(cards.some((c) => c.category === "comp")).toBe(true);
    expect(cards.some((c) => c.category === "logistics")).toBe(true);
  });
});
