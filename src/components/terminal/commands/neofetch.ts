import type { Command } from "./types";

// Left column ASCII "JC" monogram paired line-by-line with an info card.
const ART = [
  "   ___ ____ ",
  "  |_  / ___|",
  "   / / |    ",
  "  / /| |    ",
  " /___|\\____|",
  "            ",
  "            ",
  "            ",
];

const INFO = [
  "jestin@portfolio",
  "----------------",
  "OS        jestincoler.com (portfolio)",
  "host      NectarStudio",
  "shell     jsh 1.0",
  "stack     Next.js · React · TypeScript · Tailwind",
  "editor    Claude + Cursor",
  "uptime    19 years in enterprise software",
  "status    building AI that does real work",
  "theme     try `theme dark`",
];

export const neofetch: Command = {
  name: "neofetch",
  description: "system info, portfolio edition",
  run: (_args, ctx) => {
    const rows = Math.max(ART.length, INFO.length);
    for (let i = 0; i < rows; i++) {
      const left = (ART[i] ?? "            ").padEnd(13);
      const right = INFO[i] ?? "";
      ctx.print(`${left}${right}`);
    }
    ctx.print("");
  },
};
