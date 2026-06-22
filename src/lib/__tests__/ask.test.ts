import { describe, it, expect } from "vitest";
import { validateConversation, buildSystemPrompt } from "@/lib/ask";
import type { KnowledgeCard } from "@/content/knowledge/cards";

const CARDS: KnowledgeCard[] = [
  { id: "comp", label: "Compensation", category: "comp", text: "open on comp." },
  { id: "about-identity", label: "About", category: "about", text: "I'm Jestin." },
];

describe("validateConversation", () => {
  it("rejects empty and non-user-last", () => {
    expect(validateConversation([]).ok).toBe(false);
    expect(validateConversation([{ role: "assistant", content: "hi" }]).ok).toBe(false);
  });

  it("rejects too many turns and overlong content", () => {
    const many = Array.from({ length: 9 }, () => ({ role: "user" as const, content: "q" }));
    expect(validateConversation(many).ok).toBe(false);
    expect(validateConversation([{ role: "user", content: "x".repeat(2001) }]).ok).toBe(false);
  });

  it("accepts a normal conversation", () => {
    expect(validateConversation([{ role: "user", content: "hello" }]).ok).toBe(true);
  });
});

describe("buildSystemPrompt", () => {
  it("includes card labels, the email, and the grounding rule", () => {
    const p = buildSystemPrompt(CARDS);
    expect(p).toMatch(/Compensation/);
    expect(p).toMatch(/jestin@jestincoler\.com/);
    expect(p.toLowerCase()).toMatch(/only/);
  });
});
