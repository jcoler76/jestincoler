import type { Command } from "./types";

// makeHelp lists every command in the registry (the registry is filled in
// before any command runs, so `help` sees the complete set at run time).
export const makeHelp = (registry: Record<string, Command>): Command => ({
  name: "help",
  description: "this list",
  run: (_args, ctx) => {
    ctx.print("available commands:");
    for (const c of Object.values(registry)) ctx.print(`  ${c.name.padEnd(11)} ${c.description}`);
    ctx.print("");
  },
});
