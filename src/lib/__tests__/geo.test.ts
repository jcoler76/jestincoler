import { describe, it, expect } from "vitest";
import { getGeo } from "@/lib/geo";

describe("getGeo", () => {
  it("decodes the city and maps region/country", () => {
    const h = new Headers({
      "x-vercel-ip-city": "San%20Francisco",
      "x-vercel-ip-country-region": "CA",
      "x-vercel-ip-country": "US",
    });
    expect(getGeo(h)).toEqual({ city: "San Francisco", region: "CA", country: "US" });
  });

  it("returns undefined fields when headers are absent", () => {
    expect(getGeo(new Headers())).toEqual({ city: undefined, region: undefined, country: undefined });
  });

  it("reads latitude, longitude, and timezone when present", () => {
    const h = new Headers({
      "x-vercel-ip-latitude": "41.07",
      "x-vercel-ip-longitude": "-85.13",
      "x-vercel-ip-timezone": "America/Indiana/Indianapolis",
    });
    const geo = getGeo(h);
    expect(geo.latitude).toBe("41.07");
    expect(geo.longitude).toBe("-85.13");
    expect(geo.timezone).toBe("America/Indiana/Indianapolis");
  });

  it("leaves coordinates undefined when headers are absent", () => {
    const geo = getGeo(new Headers());
    expect(geo.latitude).toBeUndefined();
    expect(geo.longitude).toBeUndefined();
  });
});
