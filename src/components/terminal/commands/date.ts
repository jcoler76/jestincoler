import type { Command } from "./types";

export const date: Command = {
  name: "date",
  description: "show the current date/time",
  run: (_args, ctx) => {
    ctx.print(new Date().toString());
    ctx.print("");
  },
};
