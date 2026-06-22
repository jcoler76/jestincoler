import { useCallback, useEffect, useRef, useState } from "react";
import { commands } from "./commands";
import type { CommandContext } from "./commands/types";
import { emitSessionEvent } from "@/lib/events";

export interface TermLine {
  id: number;
  text: string;
  kind: "input" | "output";
}

export const PROMPT = "jestin@portfolio:~$ ";

interface Options {
  onNavigate: (path: string) => void;
  onSetTheme: (theme: "light" | "dark") => void;
  onOpenUrl?: (url: string) => void;
  onLaunch?: (app: string) => void;
}

export function useTerminal({ onNavigate, onSetTheme, onOpenUrl, onLaunch }: Options) {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const lineSeqRef = useRef(0);

  // Keep callbacks + history in refs so runLine never needs to be recreated.
  const onNavigateRef = useRef(onNavigate);
  const onSetThemeRef = useRef(onSetTheme);
  const onOpenUrlRef = useRef(onOpenUrl);
  const onLaunchRef = useRef(onLaunch);
  const historyRef = useRef(history);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
    onSetThemeRef.current = onSetTheme;
    onOpenUrlRef.current = onOpenUrl;
    onLaunchRef.current = onLaunch;
    historyRef.current = history;
  });

  const runLine = useCallback((raw: string) => {
    const input = raw.trim();
    if (!input) return;

    let buffer: TermLine[] = [];
    let didClear = false;
    const push = (text: string, kind: TermLine["kind"]) =>
      buffer.push({ id: lineSeqRef.current++, text, kind });

    push(`${PROMPT}${input}`, "input");

    const ctx: CommandContext = {
      print: (l) => push(l, "output"),
      clear: () => {
        buffer = [];
        didClear = true;
      },
      setTheme: (t) => {
        emitSessionEvent("theme_changed", t);
        onSetThemeRef.current(t);
      },
      navigate: (p) => onNavigateRef.current(p),
      openUrl: (u) => onOpenUrlRef.current?.(u),
      launch: (a) => onLaunchRef.current?.(a),
      history: historyRef.current,
    };

    const [name, ...args] = input.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    if (cmd) {
      emitSessionEvent("command", name.toLowerCase());
      cmd.run(args, ctx);
    } else {
      push(`command not found: ${name} (try: help)`, "output");
      push("", "output");
    }
    setHistory((h) => [...h, input]);

    setLines((prev) => [...(didClear ? [] : prev), ...buffer]);
  }, []);

  return { lines, history, runLine };
}
