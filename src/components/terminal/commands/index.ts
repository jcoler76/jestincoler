import type { Command } from "./types";
import { ls } from "./ls";
import { open } from "./open";
import { theme } from "./theme";
import { whoami } from "./whoami";
import { contact } from "./contact";
import { playground } from "./playground";
import { clear } from "./clear";
import { snake } from "./snake";
import { about } from "./about";
import { resume } from "./resume";
import { email } from "./email";
import { github } from "./github";
import { linkedin } from "./linkedin";
import { history } from "./history";
import { echo } from "./echo";
import { date } from "./date";
import { neofetch } from "./neofetch";
import { live } from "./live";
import { ask } from "./ask";
import { makeMan } from "./man";
import { makeHelp } from "./help";

const list: Command[] = [
  ls,
  open,
  theme,
  whoami,
  contact,
  playground,
  about,
  resume,
  email,
  github,
  linkedin,
  history,
  echo,
  date,
  neofetch,
  snake,
  live,
  ask,
  clear,
];

const commands: Record<string, Command> = {};
for (const c of list) commands[c.name] = c;
// man + help read the registry at run time, so they see everything (incl. each other)
commands.man = makeMan(commands);
commands.help = makeHelp(commands);

export { commands };
export type { Command, CommandContext } from "./types";
