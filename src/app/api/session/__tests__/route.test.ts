import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/session/route";

function req(headers: Record<string, string>) {
  return new Request("http://localhost/api/session", {
    method: "POST",
    headers: new Headers(headers),
  });
}

describe("POST /api/session", () => {
  it("returns server-derived facts from geo + UA headers", async () => {
    const res = await POST(
      req({
        "x-vercel-ip-city": "Fort Wayne",
        "x-vercel-ip-country-region": "IN",
        "x-vercel-ip-country": "US",
        "x-vercel-ip-latitude": "41.07",
        "x-vercel-ip-longitude": "-85.13",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "x-real-ip": "203.0.113.7",
      }),
    );
    const body = await res.json();
    expect(body.city).toBe("Fort Wayne");
    expect(body.latitude).toBe("41.07");
    expect(body.os).toBe("Windows");
    expect(body.browser).toBe("Chrome");
    expect(body.device).toBe("desktop");
  });

  it("returns a partial payload when geo is absent (local dev)", async () => {
    const res = await POST(req({ "user-agent": "curl/8", "x-real-ip": "203.0.113.8" }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.city ?? null).toBeNull();
  });
});
