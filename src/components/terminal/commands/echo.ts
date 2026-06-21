import type { Command } from "./types";

export const echo: Command = {
  name: "echo",
  description: "print text — e.g. `echo hi`",
  run: (args, ctx) => {
    ctx.print(args.join(" "));
    ctx.print("");
  },
};
