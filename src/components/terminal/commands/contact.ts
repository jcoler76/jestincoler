import type { Command } from "./types";

export const contact: Command = {
  name: "contact",
  description: "how to reach me",
  run: (_args, ctx) => {
    ctx.print("email   jestin@jestincoler.com");
    ctx.print("github  github.com/jcoler76");
    ctx.print("");
  },
};
