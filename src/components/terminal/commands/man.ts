import type { Command } from "./types";

export const makeMan = (registry: Record<string, Command>): Command => ({
  name: "man",
  description: "manual for a command — e.g. `man snake`",
  run: (args, ctx) => {
    const name = (args[0] ?? "").toLowerCase();
    if (!name) {
      ctx.print("usage: man <command>  (try `help` for the list)");
      ctx.print("");
      return;
    }
    const cmd = registry[name];
    if (!cmd) {
      ctx.print(`no manual entry for ${name}`);
      ctx.print("");
      return;
    }
    ctx.print(`${cmd.name} — ${cmd.description}`);
    ctx.print("");
  },
});
