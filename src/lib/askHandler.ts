import type Anthropic from "@anthropic-ai/sdk";
import { getClientIp } from "@/lib/ip";
import { rateLimit } from "@/lib/rateLimit";
import { rankBySimilarity, type VectorEntry } from "@/lib/retrieval";
import {
  validateConversation,
  buildSystemPrompt,
  REDIRECT,
  RETRIEVAL_K,
  SIMILARITY_THRESHOLD,
  MAX_TOKENS,
  type ChatMessage,
} from "@/lib/ask";
import type { KnowledgeCard } from "@/content/knowledge/cards";

interface Deps {
  embed: (text: string) => Promise<number[]>;
  getClient: () => Anthropic;
  entries: VectorEntry[];
  cards: KnowledgeCard[];
}

const MODEL = "claude-haiku-4-5";

function textResponse(body: string, sources: { id: string; label: string }[], status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "X-Retrieved-Sources": JSON.stringify(sources),
    },
  });
}

export function createAskHandler({ embed, getClient, entries, cards }: Deps) {
  return async function handler(request: Request): Promise<Response> {
    let body: { messages?: ChatMessage[] };
    try {
      body = await request.json();
    } catch {
      return new Response("bad request", { status: 400 });
    }

    const messages = body.messages ?? [];
    if (!validateConversation(messages).ok) {
      return new Response("bad request", { status: 400 });
    }

    const ip = getClientIp(request.headers);
    if (!rateLimit(`ask:${ip}`, 15, 60_000, Date.now()).ok) {
      return new Response("rate limited", { status: 429 });
    }

    const question = messages[messages.length - 1].content;

    let qVec: number[];
    try {
      qVec = await embed(question);
    } catch {
      return new Response("embeddings unavailable", { status: 502 });
    }

    const top = rankBySimilarity(qVec, entries, RETRIEVAL_K).filter(
      (r) => r.score >= SIMILARITY_THRESHOLD,
    );
    if (top.length === 0) return textResponse(REDIRECT, []);

    const used = top
      .map((r) => cards.find((c) => c.id === r.id))
      .filter((c): c is KnowledgeCard => Boolean(c));
    const sources = used.map((c) => ({ id: c.id, label: c.label }));

    const stream = getClient().messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(used),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream as AsyncIterable<{
            type: string;
            delta?: { type: string; text?: string };
          }>) {
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text ?? ""));
            }
          }
        } catch {
          // end the stream; the client surfaces an error state
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "X-Retrieved-Sources": JSON.stringify(sources),
      },
    });
  };
}
