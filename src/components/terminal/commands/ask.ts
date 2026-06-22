import type { Command } from "./types";

export const ask: Command = {
  name: "ask",
  description: "ask my AI anything about my work & experience",
  run: (_args, ctx) => {
    ctx.print("→ opening the ask-me-anything chat…");
    ctx.navigate("/ask");
  },
};
