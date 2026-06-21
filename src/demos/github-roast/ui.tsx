"use client";

import { useState } from "react";

export default function GitHubRoastUI() {
  const [username, setUsername] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/demo/github-roast", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else setOutput(data.output);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && run()}
          placeholder="a GitHub username — e.g. torvalds"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 rounded-md border border-line bg-card px-3 py-2 outline-none focus:border-accent"
        />
        <button
          onClick={run}
          disabled={loading}
          className="rounded-md bg-ink px-4 py-2 font-mono text-sm text-bg transition-colors hover:bg-accent hover:text-[#04130a] disabled:opacity-60"
        >
          {loading ? "roasting…" : "roast me"}
        </button>
      </div>
      {error && <p className="font-mono text-sm text-[#ff5f56]">{error}</p>}
      {output && (
        <pre className="whitespace-pre-wrap rounded-md border border-line bg-card p-4 font-mono text-[15px] leading-relaxed">
          {output}
        </pre>
      )}
    </div>
  );
}
