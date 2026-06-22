"use client";

import { useRef, useState } from "react";
import StarterChips from "./StarterChips";
import SourceList, { type Source } from "./SourceList";

interface Turn {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export default function AskChat() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const turnsRef = useRef<Turn[]>([]);
  turnsRef.current = turns;

  async function send(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setError("");
    setBusy(true);
    const base: Turn[] = [...turnsRef.current, { role: "user", content: q }];
    setTurns([...base, { role: "assistant", content: "", sources: [] }]);
    setInput("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: base.map(({ role, content }) => ({ role, content })) }),
      });
      if (!res.ok || !res.body) throw new Error("request failed");

      let sources: Source[] = [];
      try {
        sources = JSON.parse(res.headers.get("X-Retrieved-Sources") ?? "[]");
      } catch {
        sources = [];
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setTurns([...base, { role: "assistant", content: acc, sources }]);
      }
    } catch {
      setError("Something went wrong — please try again.");
      setTurns(base);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8">
      {turns.length === 0 ? (
        <StarterChips onPick={send} />
      ) : (
        <div className="space-y-5">
          {turns.map((t, i) => (
            <div key={i} className={t.role === "user" ? "text-ink" : ""}>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {t.role === "user" ? "you" : "jestin"}
              </p>
              <p className="whitespace-pre-wrap text-[16px] leading-[1.7] text-ink/90">{t.content}</p>
              {t.role === "assistant" && t.sources && <SourceList sources={t.sources} />}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-4 font-mono text-sm text-[#ff5f56]">{error}</p>}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask about my work, skills, experience, or logistics…"
          className="flex-1 rounded-md border border-line bg-card px-3 py-2 outline-none focus:border-accent"
        />
        <button
          onClick={() => send(input)}
          disabled={busy}
          className="rounded-md bg-ink px-4 py-2 font-mono text-sm text-bg transition-colors hover:bg-accent hover:text-[#04130a] disabled:opacity-60"
        >
          {busy ? "…" : "send"}
        </button>
      </div>
    </div>
  );
}
