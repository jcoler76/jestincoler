import { describe, it, expect } from "vitest";
import { cards } from "@/content/knowledge/cards";
import data from "@/content/knowledge/embeddings.json";

describe("embeddings integrity", () => {
  it("has a vector for every card and no orphans", () => {
    const ids = cards.map((c) => c.id).sort();
    const vecIds = Object.keys(data.vectors).sort();
    expect(vecIds).toEqual(ids);
  });

  it("every vector matches the declared dim", () => {
    for (const v of Object.values(data.vectors)) {
      expect((v as number[]).length).toBe(data.dim);
    }
  });
});
