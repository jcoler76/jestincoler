import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/ip";
import { getGeo } from "@/lib/geo";
import { getSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`session:${ip}`, 20, 60_000, Date.now());
  if (!limit.ok) {
    return NextResponse.json({}, { status: 429 });
  }

  const geo = getGeo(request.headers);
  const session = getSession(request.headers);

  return NextResponse.json({
    city: geo.city ?? null,
    region: geo.region ?? null,
    country: geo.country ?? null,
    latitude: geo.latitude ?? null,
    longitude: geo.longitude ?? null,
    timezone: geo.timezone ?? null,
    os: session.os ?? null,
    browser: session.browser ?? null,
    device: session.device ?? null,
  });
}
