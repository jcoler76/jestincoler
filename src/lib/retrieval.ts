export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export interface VectorEntry {
  id: string;
  vector: number[];
}

export interface Ranked {
  id: string;
  score: number;
}

export function rankBySimilarity(query: number[], entries: VectorEntry[], k: number): Ranked[] {
  return entries
    .map((e) => ({ id: e.id, score: cosineSimilarity(query, e.vector) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, k);
}
