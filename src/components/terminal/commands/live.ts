import type { Command } from "./types";

export const live: Command = {
  name: "live",
  description: "watch your own session in real time",
  run: (_args, ctx) => {
    ctx.print("→ opening the live session inspector…");
    ctx.navigate("/live");
  },
};
