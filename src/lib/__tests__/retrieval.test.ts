import { describe, it, expect } from "vitest";
import { cosineSimilarity, rankBySimilarity } from "@/lib/retrieval";

describe("retrieval", () => {
  it("cosineSimilarity is 1 for identical, 0 for orthogonal", () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("ranks by similarity and limits to k", () => {
    const entries = [
      { id: "a", vector: [1, 0] },
      { id: "b", vector: [0, 1] },
      { id: "c", vector: [0.9, 0.1] },
    ];
    const ranked = rankBySimilarity([1, 0], entries, 2);
    expect(ranked.map((r) => r.id)).toEqual(["a", "c"]);
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });
});
