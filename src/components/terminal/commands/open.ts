import { projects } from "@/content/projects";
import type { Command } from "./types";

export const open: Command = {
  name: "open",
  description: "open a project — e.g. `open 01`",
  run: (args, ctx) => {
    const id = args[0];
    if (!id) {
      ctx.print("usage: open <id|slug> — e.g. open 01");
      ctx.print("");
      return;
    }
    const project = projects.find((p) => p.id === id || p.slug === id);
    if (!project) {
      ctx.print(`no project "${id}". try: ls`);
      ctx.print("");
      return;
    }
    ctx.print(`▸ opening ${project.title}…`);
    ctx.navigate(`/work/${project.slug}`);
  },
};
