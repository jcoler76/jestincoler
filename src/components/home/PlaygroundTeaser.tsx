import Link from "next/link";
import { demos } from "@/demos/registry";

export default function PlaygroundTeaser() {
  return (
    <section id="play" className="my-16">
      <div className="mb-6 flex items-baseline gap-4">
        <h2 className="font-mono text-[15px] font-semibold uppercase tracking-[0.14em]">
          The Playground
        </h2>
        <div className="h-px flex-1 bg-line" />
        <Link href="/playground" className="font-mono text-[13px] text-muted hover:text-accent">
          ~/live-demos →
        </Link>
      </div>
      <div className="overflow-hidden rounded-[10px] border border-[#232b34] bg-[#0d1117] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-[#232b34] bg-[#0a0e13] px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-[12.5px] text-[#6b7785]">playground — zsh</span>
        </div>
        <div className="p-6 font-mono text-sm text-[#c9d1d9]">
          <p>
            <span className="text-[#56d364]">jestin@portfolio</span>
            <span className="text-[#8b949e]">:</span>
            <span className="text-[#79c0ff]">~/playground</span>
            <span className="text-[#8b949e]">$</span> ls --demos
          </p>
          <h3 className="mb-1 mt-3.5 font-sans text-2xl tracking-[-0.02em] text-[#e6edf3]">
            Little AI machines you can poke
          </h3>
          <p className="mb-4 font-sans text-[15px] text-[#8b949e]">
            Self-contained demos that run right in the page. No sign-up, no nonsense.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {demos.map((d) =>
              d.comingSoon ? (
                <div
                  key={d.slug}
                  className="flex items-center justify-between rounded-md border border-[#232b34] px-3 py-2.5"
                >
                  <span>{d.title}</span>
                  <span className="text-[#6b7785]">soon</span>
                </div>
              ) : (
                <Link
                  key={d.slug}
                  href={`/playground/${d.slug}`}
                  className="flex items-center justify-between rounded-md border border-[#232b34] px-3 py-2.5 transition-colors hover:border-[#2ea043] hover:text-white"
                >
                  <span>{d.title}</span>
                  <span className="text-[#56d364]">▶ run</span>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
