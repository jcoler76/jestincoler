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
});
