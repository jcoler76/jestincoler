import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import type { SessionInfo } from "@/lib/session";

const SYSTEM =
  "You are the witty host of a personal portfolio greeting a visitor. You're given a few signals about " +
  "them (their city, and maybe their local time, operating system, or browser language). Write ONE short, " +
  "warm, funny welcome line that riffs on the SINGLE funniest signal — e.g. their city, that it's the " +
  "middle of the night where they are, that they're on Windows, or their language. Don't list the " +
  "signals; pick one angle. PG, clever, ONE line under 90 characters, no hashtags or emoji. Output only " +
  "the line.";

export function createGreetingHandler(client: Anthropic) {
  return async (session: SessionInfo): Promise<string> => {
    const where = session.city
      ? session.region
        ? `${session.city}, ${session.region}`
        : session.city
      : "";
    const signals = [
      where ? `city: ${where}` : null,
      session.timeOfDay ? `local time: ${session.timeOfDay}` : null,
      session.os
        ? `device: ${session.os}${session.browser ? ` / ${session.browser}` : ""}${session.device === "mobile" ? " (mobile)" : ""}`
        : null,
      session.language ? `browser language: ${session.language}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 64,
      system: SYSTEM,
      messages: [{ role: "user", content: `Visitor signals:\n${signals}` }],
    });
    const line = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    // hard cap so an unusual response can never break the hero layout
    return line.slice(0, 200);
  };
}
