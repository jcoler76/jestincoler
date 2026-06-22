import type { Command } from "./types";

export const whoami: Command = {
  name: "whoami",
  description: "a little about me",
  run: (_args, ctx) => {
    ctx.print("Jestin Coler — builder, tinkerer, AI engineer.");
    ctx.print("I ship agentic AI that does real work: dev agents, RAG, self-healing tests.");
    ctx.print("");
  },
};
