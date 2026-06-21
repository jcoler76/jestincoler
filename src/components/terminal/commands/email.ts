import type { Command } from "./types";

export const email: Command = {
  name: "email",
  description: "email me",
  run: (_args, ctx) => {
    ctx.print("opening your mail client …");
    ctx.openUrl("mailto:jestin@jestincoler.com");
  },
};
