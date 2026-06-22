import { describe, it, expect, vi } from "vitest";
import { createAskHandler } from "@/lib/askHandler";
import type { KnowledgeCard } from "@/content/knowledge/cards";

const cards: KnowledgeCard[] = [
  { id: "about-identity", label: "About", category: "about", text: "I'm Jestin." },
];
const entries = [{ id: "about-identity", vector: [1, 0] }];

function makeClient(deltas: string[]) {
  return {
    messages: {
      stream: vi.fn(() =>
        (async function* () {
          for (const t of deltas) {
            yield { type: "content_block_delta", delta: { type: "text_delta", text: t } };
          }
        })(),
      ),
    },
  };
}

function req(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/ask", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json", "x-real-ip": ip }),
    body: JSON.stringify(body),
  });
}

describe("createAskHandler", () => {
  it("400s on an invalid conversation", async () => {
    const handler = createAskHandler({
      embed: vi.fn(),
      getClient: () => makeClient([]) as never,
      entries,
      cards,
    });
    const res = await handler(req({ messages: [] }));
    expect(res.status).toBe(400);
  });

  it("returns the redirect with empty sources and no model call when below threshold", async () => {
    const client = makeClient(["should not run"]);
    const handler = createAskHandler({
      embed: vi.fn().mockResolvedValue([0, 1]), // orthogonal → score 0 < threshold
      getClient: () => client as never,
      entries,
      cards,
    });
    const res = await handler(
      req({ messages: [{ role: "user", content: "unrelated" }] }, "203.0.113.11"),
    );
    expect(res.headers.get("X-Retrieved-Sources")).toBe("[]");
    expect(await res.text()).toMatch(/email me/i);
    expect(client.messages.stream).not.toHaveBeenCalled();
  });

  it("streams the answer and sets sources on a hit", async () => {
    const client = makeClient(["Hello", " world"]);
    const handler = createAskHandler({
      embed: vi.fn().mockResolvedValue([1, 0]), // identical → score 1
      getClient: () => client as never,
      entries,
      cards,
    });
    const res = await handler(
      req({ messages: [{ role: "user", content: "who are you" }] }, "203.0.113.12"),
    );
    const sources = JSON.parse(res.headers.get("X-Retrieved-Sources") ?? "[]");
    expect(sources[0].label).toBe("About");
    expect(await res.text()).toBe("Hello world");
    expect(client.messages.stream).toHaveBeenCalledOnce();
  });
});
