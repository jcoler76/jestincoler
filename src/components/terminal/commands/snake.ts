import type { Command } from "./types";

export const snake: Command = {
  name: "snake",
  description: "play snake — arrows/wasd to move, q to quit",
  run: (_args, ctx) => {
    ctx.print("starting snake… arrows/wasd to move · r restart · q quit");
    ctx.launch("snake");
  },
};
