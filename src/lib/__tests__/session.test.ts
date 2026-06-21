import { describe, it, expect } from "vitest";
import { getSession } from "@/lib/session";

const UA_WIN_CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const UA_IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const UA_MAC_SAFARI =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

describe("getSession", () => {
  it("parses Windows + Chrome desktop", () => {
    const s = getSession(new Headers({ "user-agent": UA_WIN_CHROME }));
    expect(s.os).toBe("Windows");
    expect(s.browser).toBe("Chrome");
    expect(s.device).toBe("desktop");
  });

  it("parses iPhone (iOS, mobile, Safari) and macOS Safari", () => {
    const iphone = getSession(new Headers({ "user-agent": UA_IPHONE }));
    expect(iphone.os).toBe("iOS");
    expect(iphone.device).toBe("mobile");
    expect(iphone.browser).toBe("Safari");
    const mac = getSession(new Headers({ "user-agent": UA_MAC_SAFARI }));
    expect(mac.os).toBe("macOS");
    expect(mac.browser).toBe("Safari");
  });

  it("detects Chrome on iOS (CriOS) as Chrome, not Safari", () => {
    const ua =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1 (KHTML, like Gecko) CriOS/120.0 Mobile/15E148 Safari/604.1";
    const s = getSession(new Headers({ "user-agent": ua }));
    expect(s.os).toBe("iOS");
    expect(s.browser).toBe("Chrome");
    expect(s.device).toBe("mobile");
  });

  it("returns a non-English language and omits English", () => {
    expect(getSession(new Headers({ "accept-language": "es-MX,es;q=0.9,en;q=0.8" })).language).toBe("Spanish");
    expect(getSession(new Headers({ "accept-language": "en-US,en;q=0.9" })).language).toBeUndefined();
  });

  it("maps only funny hours (injected now + timezone)", () => {
    const at = (iso: string) =>
      getSession(new Headers({ "x-vercel-ip-timezone": "UTC" }), new Date(iso)).timeOfDay;
    expect(at("2026-06-21T02:00:00Z")).toBe("late night");
    expect(at("2026-06-21T23:30:00Z")).toBe("late night");
    expect(at("2026-06-21T06:00:00Z")).toBe("early morning");
    expect(at("2026-06-21T14:00:00Z")).toBeUndefined();
  });

  it("returns undefined fields when headers are absent", () => {
    const s = getSession(new Headers());
    expect(s.city).toBeUndefined();
    expect(s.os).toBeUndefined();
    expect(s.timeOfDay).toBeUndefined();
    expect(s.language).toBeUndefined();
  });
});
