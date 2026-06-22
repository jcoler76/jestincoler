import { projects } from "@/content/projects";

export interface KnowledgeCard {
  id: string;
  label: string;
  category: "work" | "about" | "experience" | "logistics" | "comp";
  text: string;
}

const authored: KnowledgeCard[] = [
  {
    id: "about-identity",
    label: "About",
    category: "about",
    text: "I'm Jestin Coler, an AI Solutions Architect and Data Systems Builder at Mirabel Technologies. I design and ship agentic AI systems that do real work: RAG pipelines, autonomous dev agents, and self-healing test suites. I also build NectarStudio, an AI-powered iPaaS I designed and built end to end.",
  },
  {
    id: "about-experience",
    label: "Experience",
    category: "experience",
    text: "I have 19 years of experience turning messy operational problems (support, data migration, QA, customer enablement) into products that scale. At Mirabel I built and lead the database-services function from the ground up: a team of five running an 800+ database production environment for a multi-tenant SaaS platform. A lot of the role is consultative: I meet directly with publishers to understand their pain points and build custom solutions for them (bespoke reports, tailored workflows, third-party integrations), and I help shape where the platform goes next, partnering with executive leadership on its technical direction and roadmap.",
  },
  {
    id: "about-stack",
    label: "Stack",
    category: "about",
    text: "My core stack: TypeScript, React, Node/Express, GraphQL, SQL Server, PostgreSQL, Prisma, MongoDB, Redis, Playwright, Claude and OpenAI, RAG and embeddings, workflow automation, and Jira/GitHub. I was an early adopter of AI dev tooling (Claude, Cursor).",
  },
  {
    id: "logistics-remote",
    label: "Remote & Location",
    category: "logistics",
    text: "I work remotely from Indiana, and I've built and shipped from Miami, Nashville, and Huntington Beach along the way. I'm effective in remote and distributed teams.",
  },
  {
    id: "logistics-availability",
    label: "Availability",
    category: "logistics",
    text: "I'm currently employed and open to the right opportunity. For timelines and availability, the best path is to email me at jestin@jestincoler.com.",
  },
  {
    id: "logistics-authorization",
    label: "Work Authorization",
    category: "logistics",
    text: "I'm authorized to work in the United States and don't require sponsorship.",
  },
  {
    id: "comp",
    label: "Compensation",
    category: "comp",
    text: "I'm open on compensation; it depends on the role, scope, and location, and I'm happy to discuss specifics directly. The best path is to email me at jestin@jestincoler.com.",
  },
];

const projectCards: KnowledgeCard[] = projects.map((p) => ({
  id: `proj-${p.slug}`,
  label: p.title,
  category: "work" as const,
  text: `${p.blurb} ${p.summary.join(" ")}`,
}));

export const cards: KnowledgeCard[] = [...authored, ...projectCards];
