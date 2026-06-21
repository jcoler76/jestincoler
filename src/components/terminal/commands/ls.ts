import { projects } from "@/content/projects";
import type { Command } from "./types";

export const ls: Command = {
  name: "ls",
  description: "list projects",
  run: (_args, ctx) => {
    ctx.print("selected work/");
    for (const p of projects) ctx.print(`  ${p.id}  ${p.title}`);
    ctx.print("");
  },
};
