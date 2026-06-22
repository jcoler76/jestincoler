export interface WhoamiLine {
  key: string;
  value: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface AboutLinks {
  email: string;
  github: string;
  linkedin: string;
  resume?: string; // optional — CTA renders only when set
}

export interface AboutContent {
  name: string;
  title: string;
  location: string;
  whoami: WhoamiLine[];
  metrics: Metric[];
  stack: string[];
  links: AboutLinks;
}

export const about: AboutContent = {
  name: "Jestin Coler",
  title: "AI Solutions Architect & Data Systems Builder",
  location: "Remote · Indiana",
  whoami: [
    { key: "name", value: "Jestin Coler" },
    { key: "role", value: "AI Solutions Architect & Data Systems Builder at Mirabel Technologies" },
    { key: "also", value: "Creator, NectarStudio" },
    { key: "building", value: "applied AI for enterprise software" },
    { key: "based", value: "Remote · Indiana" },
  ],
  metrics: [
    { label: "experience", value: "19 years" },
    { label: "team / env", value: "5 / 800+ DBs" },
    { label: "focus", value: "Applied AI" },
  ],
  stack: [
    "TypeScript",
    "React",
    "Node / Express",
    "GraphQL",
    "SQL Server",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Redis",
    "Playwright",
    "Claude / OpenAI",
    "RAG / embeddings",
    "Workflow automation",
    "Jira / GitHub",
  ],
  links: {
    email: "jestin@jestincoler.com",
    github: "https://github.com/jcoler76",
    linkedin: "https://www.linkedin.com/in/jestin-coler",
    resume: "/Jestin-Coler-Resume.pdf",
  },
};
