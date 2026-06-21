# jestincoler.com

My personal portfolio — a deliberately playful site about building **AI systems that do real work**.
Live at **[jestincoler.com](https://jestincoler.com)**.

By Jestin Coler — AI Solutions Architect & Data Systems Builder, founder of NectarStudio.

## Highlights

- **Case studies** of production AI / data systems — autonomous auto-fix PR agents, an agentic testing
  suite, a RAG knowledge-base pipeline, an API & workflow platform, and a couple of live products.
- **AI playground** — small, self-contained demos powered by Claude, running live in the page: a haiku
  generator, "Roast My GitHub" (real GitHub fetch + roast), a Snoop-ism advice bot, and a
  Bob's-Burgers-style Burger of the Day.
- **Interactive terminal** — press `~` anywhere; includes a playable Snake, a `neofetch` card, and
  navigation commands.
- **Session-aware hero greeting** — a witty one-liner that riffs on your city (IP geo), local time, OS,
  and browser language, all derived server-side from request headers.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · the Anthropic SDK
(`claude-haiku-4-5`) · Vitest + React Testing Library · Playwright. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

The AI playground and greeting call Claude, so set an Anthropic API key:

```bash
echo "ANTHROPIC_API_KEY=your-key" > .env.local
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
