import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "01",
    slug: "auto-fix-prs",
    title: "Autonomous Auto-Fix PRs",
    blurb:
      "An agent that reads a ticket, analyzes the codebase, writes a fix, and opens a guard-railed GitHub PR.",
    tags: ["Claude", "GitHub App", "RAG"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "An autonomous coding agent that turns a triaged ticket into a candidate code change, opened as a draft GitHub pull request with a human feedback loop.",
      "The agent synthesizes changes from a retrieval-augmented analysis of the codebase, then runs them through guardrails — blocking unsafe patches, type/lint failures, and high-risk file mutations — before pushing. A short-lived GitHub App token opens or refreshes the PR, and review comments feed back in for revisions.",
      "Built with a dry-run-by-default posture and a full audit trail so every automated change is traceable and reversible.",
    ],
    diagram: "/work/auto-fix-prs.svg",
  },
  {
    id: "02",
    slug: "agentic-testing",
    title: "Agentic Testing Suite",
    blurb:
      "In-app QA platform: LLM-driven test discovery, self-healing selectors, and real-time quality gates over Playwright.",
    tags: ["Playwright", "LLMs", "Postgres"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "A quality platform that validates a complex import-and-workflow product end-to-end, combining deterministic Playwright suites with autonomous, LLM-driven test exploration.",
      "Background daemons watch coverage and auto-draft new test plans for gaps, validate and promote passing drafts, and self-heal brittle selectors when the UI shifts. A Postgres-backed registry stores specs, run plans, evidence, and regression digests.",
      "Quality gates surface flakiness and regressions with captured traces, videos, and screenshots, and emit summarized reports.",
    ],
    diagram: "/work/agentic-testing.svg",
  },
  {
    id: "03",
    slug: "kb-pipeline",
    title: "Knowledge-Base Pipeline",
    blurb:
      "A central RAG brain with a 6-stage nightly curation pipeline — dedup, rescore, decay, promote, pattern-extract, reinforce.",
    tags: ["pgvector", "embeddings", "Node/TS"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "A centralized knowledge service that powers AI agents across a platform — chat, ticket triage, and autonomous dev agents — backed by vector search over curated content.",
      "A nightly curation pipeline keeps quality high: it deduplicates near-identical entries, recomputes quality with source-trust weighting, ages out stale content, promotes proven answers through a lifecycle, clusters solutions into canonical patterns, and flags contradictions for human review.",
      "Live retrieval defaults to curated content only, so agents answer from the platform's best, most-trusted knowledge.",
    ],
    diagram: "/work/kb-pipeline.svg",
  },
  {
    id: "04",
    slug: "support-triage",
    title: "AI Support Triage Agent",
    blurb:
      "A support agent that classifies intent, routes tickets, and answers with RAG over tickets, procedures, and learned knowledge.",
    tags: ["Claude", "RAG", "SQL"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "An AI support assistant that triages incoming tickets — classifying intent, scoring confidence, and routing to the right team — then drafts grounded answers and suggests next actions.",
      "Responses are retrieval-augmented over support history, procedures, business rules, and a growing store of learned knowledge, with a system prompt assembled per message from live schema and business context.",
      "An audit panel tracks intent, status, and escalation for every interaction, and usage telemetry feeds back into knowledge-quality reinforcement.",
    ],
    diagram: "/work/support-triage.svg",
  },
  {
    id: "05",
    slug: "api-platform",
    title: "API Workflow Platform",
    blurb:
      "Self-service API management with a visual workflow builder, schema intelligence, and an MCP server for AI assistants.",
    tags: ["React", "GraphQL", "MCP"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "A self-service platform that lets tenants discover, document, and manage REST and GraphQL APIs, with key-based auth, rate limiting, and a versioned public API library.",
      "A visual workflow builder composes API calls, scheduling, and approval gates on a node canvas with execution insights. AI-assisted schema intelligence summarizes operations and auto-generates OpenAPI docs, and an MCP server exposes the surface to AI assistants.",
      "Enterprise auth (JWT, 2FA, RBAC, multi-tenant) and a hardened middleware stack secure the control plane.",
    ],
    diagram: "/work/api-platform.svg",
  },
  {
    id: "06",
    slug: "videogen",
    title: "VideoGen Pipeline",
    blurb:
      "Turns live app pages into narrated MP4 walkthroughs — declarative scene engine, LLM selector discovery, grounded scripts, TTS.",
    tags: ["Playwright", "TTS", "ffmpeg"],
    role: "Design & implementation — Mirabel Technologies",
    summary: [
      "A generator that turns live application pages into narrated MP4 product walkthroughs, internal docs, and help-center articles from a single declarative run.",
      "A scene engine drives Playwright through real pages; LLM-assisted selector discovery and live DOM bootstrapping keep recordings resilient when markup changes. Narration is grounded strictly in knowledge-base content, voiced via configurable TTS, and muxed with per-beat timing so audio and video stay in sync.",
      "One run yields a video, written docs, and knowledge chunks that flow back into the platform's retrieval system.",
    ],
    diagram: "/work/videogen.svg",
  },
  {
    id: "07",
    slug: "icolerlaw",
    title: "Law-Firm Client & Payments Platform",
    blurb:
      "A client-intake, document-automation, e-sign, and payments platform for a California bankruptcy firm — with an AI bilingual content engine. Live.",
    tags: ["React", "GraphQL", "Stripe/Square", "Claude"],
    role: "Independent — design, build & deploy",
    summary: [
      "A full client + payments platform I designed, built, and deployed for my wife's California Chapter 7 bankruptcy practice (live at icolerlaw.com). It runs the firm end-to-end: client intake, document automation, a secure client portal, and billing.",
      "Guided, bilingual (English/Spanish) intake captures each case, then a document engine merges that data into the firm's templates to generate onboarding and filing packets as Word and PDF (docxtemplater + headless LibreOffice).",
      "Clients sign in to a secure portal (JWT + two-factor) to review and e-sign documents and manage payments. Billing runs across two processors — Stripe and Square — with payment plans, auto-pay, and scheduled reminders, on a GraphQL API over PostgreSQL (deployed on Railway).",
      "A scheduled content engine uses Claude to generate bilingual educational posts about filing Chapter 7 bankruptcy in California and auto-publishes them to the firm's Facebook page — a self-running marketing channel.",
    ],
    diagram: "/work/icolerlaw.svg",
    screenshot: "/work/icolerlaw-site.png",
    link: { href: "https://icolerlaw.com", label: "Visit icolerlaw.com" },
  },
  {
    id: "08",
    slug: "nectarstudio",
    title: "NectarStudio",
    blurb:
      "An AI-powered iPaaS I designed and built — bulk-generate governed REST/GraphQL APIs and build automation workflows, multi-tenant. Live.",
    tags: ["Claude", "iPaaS", "React", "Postgres"],
    role: "Creator — design, build & deploy",
    summary: [
      "NectarStudio is an AI-powered iPaaS (integration platform-as-a-service) I designed and built. It turns a customer's data sources into governed REST and GraphQL APIs — generated in bulk — with a visual workflow builder layered on top, all multi-tenant.",
      "An AI layer (Claude) accelerates the platform: it drafts API endpoints from a schema and assembles automation workflows from a plain-language description, so teams stand up integrations in minutes instead of weeks.",
      "It's built as a set of services — a customer-facing core app, a marketing/lead service, and an admin portal — over a multi-tenant PostgreSQL database, with authentication, Stripe billing, and rate limiting. The demos below show two of its signature flows.",
    ],
    videos: [
      { src: "/work/nectarstudio-workflow.mp4", poster: "/work/nectarstudio-workflow.jpg", title: "AI Workflow Generator" },
      { src: "/work/nectarstudio-api.mp4", poster: "/work/nectarstudio-api.jpg", title: "API Endpoint Creation" },
    ],
    link: { href: "https://nectarstudio.ai", label: "Visit nectarstudio.ai" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
