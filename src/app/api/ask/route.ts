import { getAnthropic } from "@/lib/anthropic";
import { embed } from "@/lib/embeddings";
import { cards } from "@/content/knowledge/cards";
import { createAskHandler } from "@/lib/askHandler";
import embeddings from "@/content/knowledge/embeddings.json";

export const runtime = "nodejs";
export const maxDuration = 30;

const entries = Object.entries(embeddings.vectors).map(([id, vector]) => ({
  id,
  vector: vector as number[],
}));

const handler = createAskHandler({ embed, getClient: getAnthropic, entries, cards });

export async function POST(request: Request) {
  return handler(request);
}
