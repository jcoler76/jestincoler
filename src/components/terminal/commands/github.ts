import type { Command } from "./types";

export const github: Command = {
  name: "github",
  description: "open my GitHub",
  run: (_args, ctx) => {
    ctx.print("opening github.com/jcoler76 …");
    ctx.openUrl("https://github.com/jcoler76");
  },
};
