import { describe, it, expect } from "vitest";
import { getClientIp } from "@/lib/ip";

describe("getClientIp", () => {
  it("prefers x-real-ip", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9" }))).toBe("1.2.3.4");
  });
  it("falls back to the rightmost x-forwarded-for entry (anti-spoof)", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2, 3.3.3.3" }))).toBe("3.3.3.3");
  });
  it("returns 'anon' when no IP headers present", () => {
    expect(getClientIp(new Headers())).toBe("anon");
  });
});
