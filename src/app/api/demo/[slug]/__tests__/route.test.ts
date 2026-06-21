import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the handler modules so the route test never imports the Anthropic SDK.
vi.mock("@/demos/haiku-generator/handler", async () => {
  const { ValidationError } = await import("@/demos/types");
  return {
    haikuHandler: vi.fn(async (input: unknown) => {
      const topic = (input as { topic?: string })?.topic;
      if (!topic) throw new ValidationError("Please enter a topic.");
      if (topic === "boom") throw new Error("internal upstream detail");
      return { output: "haiku!" };
    }),
  };
});

vi.mock("@/demos/github-roast/handler", () => ({
  githubRoastHandler: vi.fn(async () => ({ output: "@octocat · 8 public repos\n\nroasted" })),
}));

import { POST } from "@/app/api/demo/[slug]/route";
import { _resetRateLimits } from "@/lib/rateLimit";

function req(body: unknown) {
  return new Request("http://test/api/demo/x", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4" },
    body: JSON.stringify(body),
  });
}
const ctx = (slug: string) => ({ params: Promise.resolve({ slug }) });

beforeEach(() => _resetRateLimits());

describe("POST /api/demo/[slug]", () => {
  it("404s for an unknown demo", async () => {
    const res = await POST(req({}), ctx("nope"));
    expect(res.status).toBe(404);
  });

  it("dispatches to the matching handler and returns its output", async () => {
    const res = await POST(req({ topic: "cats" }), ctx("haiku-generator"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ output: "haiku!" });
  });

  it("returns 400 with the handler's message on bad input", async () => {
    const res = await POST(req({}), ctx("haiku-generator"));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/topic/i);
  });

  it("returns a generic 500 (no internal detail) for non-validation errors", async () => {
    const res = await POST(req({ topic: "boom" }), ctx("haiku-generator"));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Something went wrong on our end.");
    expect(body.error).not.toMatch(/internal upstream detail/);
  });

  it("dispatches to the github-roast handler", async () => {
    const res = await POST(req({ username: "octocat" }), ctx("github-roast"));
    expect(res.status).toBe(200);
    expect((await res.json()).output).toMatch(/roasted/);
  });

  it("rate-limits after the per-window cap", async () => {
    for (let i = 0; i < 10; i++) await POST(req({ topic: "x" }), ctx("haiku-generator"));
    const res = await POST(req({ topic: "x" }), ctx("haiku-generator"));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBeTruthy();
  });
});
