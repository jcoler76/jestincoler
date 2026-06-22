import { describe, it, expect, vi, afterEach } from "vitest";
import { embed } from "@/lib/embeddings";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("embed", () => {
  it("throws when OPENAI_API_KEY is missing", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    await expect(embed("hi")).rejects.toThrow();
  });

  it("returns the embedding vector from the API", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ embedding: [0.1, 0.2, 0.3] }] }),
      }),
    );
    expect(await embed("hi")).toEqual([0.1, 0.2, 0.3]);
  });
});
