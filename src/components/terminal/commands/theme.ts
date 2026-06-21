import type { Command } from "./types";

export const theme: Command = {
  name: "theme",
  description: "flip the lights — `theme dark` | `theme light`",
  run: (args, ctx) => {
    const t = args[0];
    if (t === "dark" || t === "light") {
      ctx.setTheme(t);
      ctx.print(t === "dark" ? "lights off. 🌙" : "lights on. ☀️");
    } else {
      ctx.print("usage: theme dark|light");
    }
    ctx.print("");
  },
};
