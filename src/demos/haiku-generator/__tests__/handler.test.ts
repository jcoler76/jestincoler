import { describe, it, expect, vi } from "vitest";
import { createHaikuHandler } from "@/demos/haiku-generator/handler";

function fakeClient(text: string) {
  return {
    messages: {
      create: vi.fn().mockResolvedValue({ content: [{ type: "text", text }] }),
    },
  } as never;
}

describe("haiku handler", () => {
  it("rejects empty input", async () => {
    const handler = createHaikuHandler(fakeClient("x"));
    await expect(handler({ topic: "   " })).rejects.toThrow(/topic/i);
  });

  it("rejects overly long input", async () => {
    const handler = createHaikuHandler(fakeClient("x"));
    await expect(handler({ topic: "a".repeat(201) })).rejects.toThrow(/too long/i);
  });

  it("returns the model's text for a valid topic", async () => {
    const client = fakeClient("an old silent pond...");
    const handler = createHaikuHandler(client);
    const result = await handler({ topic: "ponds" });
    expect(result.output).toBe("an old silent pond...");
    // calls Haiku with no thinking/effort params
    const args = (client as never as { messages: { create: ReturnType<typeof vi.fn> } }).messages.create.mock.calls[0][0];
    expect(args.model).toBe("claude-haiku-4-5");
    expect(args.thinking).toBeUndefined();
    expect(args.output_config).toBeUndefined();
  });
});
