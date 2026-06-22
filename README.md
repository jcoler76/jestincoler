# jestincoler.com

My personal portfolio — a deliberately playful site about building **AI systems that do real work**.
Live at **[jestincoler.com](https://jestincoler.com)**.

By Jestin Coler — AI Solutions Architect & Data Systems Builder, building NectarStudio.

## Highlights

- **Case studies** of production AI / data systems — autonomous auto-fix PR agents, an agentic testing
  suite, a RAG knowledge-base pipeline, an API & workflow platform, and a couple of live products.
- **AI playground** — small, self-contained demos powered by Claude, running live in the page: a haiku
  generator, "Roast My GitHub" (real GitHub fetch + roast), a Snoop-ism advice bot, and a
  Bob's-Burgers-style Burger of the Day.
- **Ask me anything (`/ask`)** — a retrieval-grounded chat over my real materials: knowledge cards are
  embedded at build time (OpenAI), the question is embedded and cosine-matched at request time, and
  Claude streams a cited answer (or an honest "not in my materials" when it isn't).
- **Live session inspector (`/live`)** — turns the lens on the visitor: their location on a world map,
  device facts, and a live feed of their own actions, all in-memory and ephemeral.
- **Interactive terminal** — press `~` anywhere; includes a playable Snake, a `neofetch` card, and
  navigation commands.
- **Session-aware hero greeting** — a witty one-liner that riffs on your city (IP geo), local time, OS,
  and browser language, all derived server-side from request headers.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · the Anthropic SDK
(`claude-haiku-4-5`) · OpenAI embeddings + cosine retrieval for `/ask` · d3-geo for the `/live` map ·
Vitest + React Testing Library · Playwright. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

The AI playground and greeting call Claude, and `/ask` also uses OpenAI for embeddings, so set both
keys in `.env.local`:

```bash
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

The `/ask` chat retrieves over a prebuilt vector index. Regenerate it whenever the knowledge cards
(`src/content/knowledge/cards.ts`) change:

```bash
npm run embed      # writes src/content/knowledge/embeddings.json (commit the result)
```

## Checks

```bash
npm test           # unit (Vitest)
npm run lint
npm run build
npm run e2e        # Playwright (visual + smoke)
```

---

Built with a heavy assist from modern AI tooling (Claude, Cursor) — I lean on it to ship fast without
lowering the bar.
