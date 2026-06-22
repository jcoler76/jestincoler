import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import { getAnthropic, extractText } from "@/lib/anthropic";
import type { DemoHandler, DemoResult } from "../types";
import { ValidationError } from "../types";

const SYSTEM =
  "You are a haiku poet. Given a topic, respond with a single haiku (three lines, " +
  "roughly 5-7-5 syllables). Output only the haiku — no title, preamble, or commentary.";

function parseTopic(input: unknown): string {
  const topic =
    typeof input === "object" && input !== null && "topic" in input
      ? String((input as { topic: unknown }).topic ?? "")
      : "";
  const trimmed = topic.trim();
  if (!trimmed) throw new ValidationError("Please enter a topic.");
  if (trimmed.length > 200) throw new ValidationError("That topic is too long (max 200 characters).");
  return trimmed;
}

export function createHaikuHandler(client: Anthropic): DemoHandler {
  return async (input): Promise<DemoResult> => {
    const topic = parseTopic(input);
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 256,
      system: SYSTEM,
      messages: [{ role: "user", content: topic }],
    });
    const output = extractText(message);
    return { output };
  };
}

// Production handler — constructs the real client lazily at request time.
export const haikuHandler: DemoHandler = (input) => createHaikuHandler(getAnthropic())(input);
