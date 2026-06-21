import type { Command } from "./types";

export const linkedin: Command = {
  name: "linkedin",
  description: "open my LinkedIn",
  run: (_args, ctx) => {
    ctx.print("opening LinkedIn …");
    ctx.openUrl("https://www.linkedin.com/in/jestin-coler");
  },
};
