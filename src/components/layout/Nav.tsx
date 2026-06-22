"use client";

import Link from "next/link";

export default function Nav() {
  const openTerminal = () =>
    window.dispatchEvent(new CustomEvent("terminal:open"));

  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-6 font-mono text-[13px]">
      <Link href="/" className="font-bold tracking-tight">
        jestin<span className="text-accent">.</span>coler
      </Link>
      <div className="flex items-center gap-4 sm:gap-5">
        <Link href="/#work" className="text-muted hover:text-ink transition-colors">work</Link>
        <Link href="/#play" className="text-muted hover:text-ink transition-colors">playground</Link>
        <Link href="/about" className="text-muted hover:text-ink transition-colors">whoami</Link>
        <Link href="/ask" className="text-muted hover:text-ink transition-colors">ask</Link>
        <Link
          href="/live"
          className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          live
        </Link>
        <button
          onClick={openTerminal}
          aria-label="Open terminal"
          className="rounded-md border border-line px-2.5 py-1.5 text-muted hover:text-accent hover:border-accent transition-colors"
        >
          &gt;_ <span className="hidden sm:inline">terminal </span><kbd className="rounded bg-line px-1.5">~</kbd>
        </button>
      </div>
    </nav>
  );
}
