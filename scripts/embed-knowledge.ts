import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cards } from "../src/content/knowledge/cards";
import { embed, EMBED_MODEL } from "../src/lib/embeddings";

async function main() {
  const vectors: Record<string, number[]> = {};
  for (const c of cards) {
    vectors[c.id] = await embed(c.text);
    console.log(`embedded ${c.id}`);
  }
  const dim = vectors[cards[0].id].length;
  const out = { model: EMBED_MODEL, dim, vectors };
  const path = join(process.cwd(), "src/content/knowledge/embeddings.json");
  writeFileSync(path, JSON.stringify(out, null, 2));
  console.log(`wrote ${cards.length} vectors (dim ${dim}) to ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
