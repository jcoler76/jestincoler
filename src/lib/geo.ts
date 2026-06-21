export interface Geo {
  city?: string;
  region?: string;
  country?: string;
}

function decode(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value).trim() || undefined;
  } catch {
    return value.trim() || undefined;
  }
}

// Reads Vercel's edge geo headers (populated automatically in production).
export function getGeo(headers: Headers): Geo {
  return {
    city: decode(headers.get("x-vercel-ip-city")),
    region: decode(headers.get("x-vercel-ip-country-region")),
    country: decode(headers.get("x-vercel-ip-country")),
  };
}
