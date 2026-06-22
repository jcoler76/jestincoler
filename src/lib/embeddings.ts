// Server-only by convention: imported only by the /api/ask route and the build-time embed
// script. We avoid `import "server-only"` here because the standalone embed script runs in
// plain Node, where that import throws.

export const EMBED_MODEL = "text-embedding-3-small";

export async function embed(text: string): Promise<number[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: EMBED_MODEL, input: text }),
  });
  if (!res.ok) throw new Error(`embeddings request failed: ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding as number[];
}
