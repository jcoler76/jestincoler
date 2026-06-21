import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, _resetRateLimits } from "@/lib/rateLimit";

beforeEach(() => _resetRateLimits());

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const r1 = rateLimit("k", 2, 1000, 0);
    const r2 = rateLimit("k", 2, 1000, 100);
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    expect(r2.remaining).toBe(0);
  });

  it("blocks the request that exceeds the limit and reports retryAfter", () => {
    rateLimit("k", 2, 1000, 0);
    rateLimit("k", 2, 1000, 100);
    const r3 = rateLimit("k", 2, 1000, 200);
    expect(r3.ok).toBe(false);
    expect(r3.retryAfterMs).toBe(800); // window resets at 1000, now=200
  });

  it("resets after the window elapses", () => {
    rateLimit("k", 1, 1000, 0);
    expect(rateLimit("k", 1, 1000, 500).ok).toBe(false);
    expect(rateLimit("k", 1, 1000, 1000).ok).toBe(true); // new window
  });

  it("tracks keys independently", () => {
    rateLimit("a", 1, 1000, 0);
    expect(rateLimit("b", 1, 1000, 0).ok).toBe(true);
  });
});
