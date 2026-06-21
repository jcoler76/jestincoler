export interface CommandContext {
  print: (line: string) => void;
  clear: () => void;
  setTheme: (theme: "light" | "dark") => void;
  navigate: (path: string) => void;
  openUrl: (url: string) => void; // external link / mailto / pdf — opens a new tab
  launch: (app: string) => void; // start an interactive app (e.g. "snake")
  history: string[]; // commands entered earlier this session
}

export interface Command {
  name: string;
  description: string;
  run: (args: string[], ctx: CommandContext) => void;
}
