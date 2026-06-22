"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTerminal, PROMPT } from "./useTerminal";
import { applyTheme } from "@/lib/theme";
import { emitSessionEvent } from "@/lib/events";
import SnakeGame from "./snake/SnakeGame";

const BANNER = [
  "jestin.coler — interactive shell",
  "type `help` to get started · `esc` to close",
  "",
];

export default function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [viewport, setViewport] = useState<{ top: number; height: number } | null>(null);
  const [app, setApp] = useState<string | null>(null);
  const handleSnakeExit = useCallback(() => setApp(null), []);
  const appRef = useRef(app);
  useEffect(() => {
    appRef.current = app;
  }, [app]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
    if (open) emitSessionEvent("terminal_opened", "");
  }, [open]);

  const onNavigate = useCallback(
    (path: string) => {
      setOpen(false);
      if (path.startsWith("/#")) {
        // smooth-scroll if the anchor is on the current page; otherwise navigate there
        const el = document.querySelector(path.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push(path);
      } else {
        router.push(path);
      }
    },
    [router],
  );

  const { lines, history, runLine } = useTerminal({
    onNavigate,
    onSetTheme: applyTheme,
    onOpenUrl: (url) => window.open(url, "_blank", "noopener,noreferrer"),
    onLaunch: (a) => setApp(a),
  });

  // Stable listener for the `terminal:open` custom event — never re-registers.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("terminal:open", onOpen);
    return () => window.removeEventListener("terminal:open", onOpen);
  }, []);

  // Track the visual viewport while open so the terminal stays inside the area the
  // mobile on-screen keyboard leaves visible (the keyboard shrinks visualViewport,
  // but NOT vh/dvh — so a vh-sized panel hides its input behind the keyboard).
  useEffect(() => {
    if (!open) return;
    const vp = window.visualViewport;
    const update = () => {
      if (vp) setViewport({ top: vp.offsetTop, height: vp.height });
      else setViewport({ top: 0, height: window.innerHeight });
    };
    update();
    vp?.addEventListener("resize", update);
    vp?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vp?.removeEventListener("resize", update);
      vp?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      setViewport(null);
    };
  }, [open]);

  // `~` to open and `esc` to close — reads open state via ref so the handler
  // is registered once and never re-subscribes on open/close toggles.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing =
        el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || !!el?.isContentEditable;
      if (e.key === "~" && !openRef.current && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && openRef.current) {
        if (appRef.current) {
          appRef.current = null;
          setApp(null);
        } else {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && !app) inputRef.current?.focus();
  }, [open, app]);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runLine(value);
      setValue("");
      setHistIdx(null);
    } else if (e.key === "ArrowUp" && history.length) {
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setValue(history[idx]);
    } else if (e.key === "ArrowDown" && histIdx !== null) {
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(idx);
        setValue(history[idx]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[100] px-3 py-4 backdrop-blur-sm sm:px-[4vw] sm:py-[6vh]"
      style={{
        background: "rgba(6,8,10,0.55)",
        top: viewport ? viewport.top : 0,
        height: viewport ? viewport.height : "100dvh",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
          setApp(null);
        }
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Interactive terminal" className="mx-auto flex h-full max-h-[560px] w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-[#2b333d] bg-[#0b0f14] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-[#232b34] bg-[#0a0e13] px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-[12.5px] text-[#6b7785]">jestin@portfolio: ~</span>
          <button
            onClick={() => {
              setOpen(false);
              setApp(null);
            }}
            aria-label="Close terminal"
            className="ml-auto font-mono text-xs text-[#6b7785] hover:text-[#ff5f56]"
          >
            ✕ esc
          </button>
        </div>
        {app === "snake" ? (
          <SnakeGame onExit={handleSnakeExit} />
        ) : (
          <>
        <div ref={outRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-[13.5px] leading-[1.65] text-[#c9d1d9]">
          {BANNER.map((b, i) => (
            <div key={`b${i}`} className="whitespace-pre-wrap break-words text-[#56d364]">{b}</div>
          ))}
          {lines.map((l) => (
            <div
              key={l.id}
              className={`whitespace-pre-wrap break-words ${l.kind === "input" ? "text-[#56d364]" : ""}`}
            >
              {l.text}
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-[#1b222a] bg-[#0a0e13] px-4 py-2.5 font-mono text-[13.5px]">
          <span className="mr-2 whitespace-nowrap text-[#56d364]">{PROMPT.trimEnd()}</span>
          {/* 16px prevents iOS Safari from auto-zooming (and shifting the fixed overlay) on focus */}
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="flex-1 border-0 bg-transparent text-[16px] text-[#e6edf3] outline-none"
          />
        </div>
          </>
        )}
      </div>
    </div>
  );
}
