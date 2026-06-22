"use client";

import { useState, type InputHTMLAttributes } from "react";
import { emitSessionEvent } from "@/lib/events";

interface DemoFormProps {
  slug: string;
  field: string;
  placeholder: string;
  idleLabel: string;
  loadingLabel: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export default function DemoForm({ slug, field, placeholder, idleLabel, loadingLabel, inputProps }: DemoFormProps) {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    emitSessionEvent("demo_run", slug);
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch(`/api/demo/${slug}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ [field]: value }),
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && run()}
          placeholder={placeholder}
          {...inputProps}
          className="flex-1 rounded-md border border-line bg-card px-3 py-2 outline-none focus:border-accent"
        />
        <button
          onClick={run}
          disabled={loading}
          className="rounded-md bg-ink px-4 py-2 font-mono text-sm text-bg transition-colors hover:bg-accent hover:text-[#04130a] disabled:opacity-60"
        >
          {loading ? loadingLabel : idleLabel}
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
