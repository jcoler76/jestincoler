import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/ip";
import { getSession } from "@/lib/session";
import { getAnthropic } from "@/lib/anthropic";
import { createGreetingHandler } from "@/lib/greeting";

export const runtime = "nodejs"; // the Anthropic SDK needs the Node runtime
export const maxDuration = 20;

export async function POST(request: Request) {
  const session = getSession(request.headers);
  if (!session.city) {
    return NextResponse.json({ greeting: null });
  }

  const ip = getClientIp(request.headers);
  const limit = rateLimit(`greeting:${ip}`, 10, 60_000, Date.now());
  if (!limit.ok) {
    return NextResponse.json({ greeting: null }, { status: 429 });
  }

  try {
    const greeting = await createGreetingHandler(getAnthropic())(session);
    if (!greeting) return NextResponse.json({ greeting: null });
    return NextResponse.json({ greeting });
  } catch (error) {
    console.error("greeting failed:", error);
    return NextResponse.json({ greeting: null }); // greeting is non-essential — never error the hero
  }
}
