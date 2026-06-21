import type { Command } from "./types";

export const about: Command = {
  name: "about",
  description: "open the whoami page",
  run: (_args, ctx) => {
    ctx.print("opening /about …");
    ctx.navigate("/about");
  },
};
