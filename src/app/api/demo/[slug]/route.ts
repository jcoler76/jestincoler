import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/ip";
import { ValidationError, type DemoHandler } from "@/demos/types";
import { haikuHandler } from "@/demos/haiku-generator/handler";
import { githubRoastHandler } from "@/demos/github-roast/handler";
import { snoopHandler } from "@/demos/snoop-ism/handler";
import { burgerHandler } from "@/demos/burger-of-the-day/handler";

export const runtime = "nodejs"; // the Anthropic SDK needs the Node runtime
export const maxDuration = 30;

// Server-only handler map. Add a demo's handler here.
const handlers: Record<string, DemoHandler> = {
  "haiku-generator": haikuHandler,
  "github-roast": githubRoastHandler,
  "snoop-ism": snoopHandler,
  "burger-of-the-day": burgerHandler,
};

const LIMIT = 10; // requests
const WINDOW_MS = 60_000; // per minute, per (demo, ip)

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const handler = handlers[slug];
  if (!handler) {
    return NextResponse.json({ error: "Unknown demo." }, { status: 404 });
  }

  const ip = getClientIp(request.headers);
  const limit = rateLimit(`${slug}:${ip}`, LIMIT, WINDOW_MS, Date.now());
  if (!limit.ok) {
    return NextResponse.json(
      { error: "You're going a bit fast — try again in a moment." },
      { status: 429, headers: { "retry-after": String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const result = await handler(body);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // Unexpected (missing key, Anthropic outage, etc.) — log server-side, don't leak detail.
    console.error(`demo handler "${slug}" failed:`, error);
    return NextResponse.json({ error: "Something went wrong on our end." }, { status: 500 });
  }
}
