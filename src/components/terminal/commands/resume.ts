import type { Command } from "./types";

export const resume: Command = {
  name: "resume",
  description: "open my résumé (PDF)",
  run: (_args, ctx) => {
    ctx.print("opening résumé …");
    ctx.openUrl("/Jestin-Coler-Resume.pdf");
  },
};
