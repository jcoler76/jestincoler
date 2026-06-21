import "server-only";
import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

// Lazily construct and memoize the client so the key is only required at request
// time (not at import/build time). Server-only: never import this from a client component.
export function getAnthropic(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
