import type { Command } from "./types";

export const playground: Command = {
  name: "playground",
  description: "jump to the live AI demos",
  run: (_args, ctx) => {
    ctx.print("→ heading to the playground…");
    ctx.navigate("/#play");
  },
};
