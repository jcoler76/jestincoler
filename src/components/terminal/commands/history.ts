import type { Command } from "./types";

export const history: Command = {
  name: "history",
  description: "show this session's commands",
  run: (_args, ctx) => {
    if (ctx.history.length === 0) {
      ctx.print("(no history yet)");
    } else {
      ctx.history.forEach((cmd, i) => ctx.print(`  ${String(i + 1).padStart(3)}  ${cmd}`));
    }
    ctx.print("");
  },
};
