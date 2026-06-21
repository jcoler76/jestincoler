import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { demos } from "@/demos/registry";

export const metadata: Metadata = {
  title: "Playground — Jestin Coler",
  description: "Little AI machines you can poke. Self-contained demos that run in the page.",
};

export default function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <header className="pt-16 pb-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          {"// the playground"}
        </p>
        <h1 className="text-[clamp(34px,6vw,56px)] font-[680] leading-[1.04] tracking-[-0.03em]">
          Little AI machines you can poke
        </h1>
        <p className="mt-5 max-w-[56ch] text-[18px] text-muted">
          Self-contained demos powered by Claude, running right in the page. No sign-up.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {demos.map((d) =>
          d.comingSoon ? (
            <div key={d.slug} className="bg-bg p-6 opacity-60">
              <h2 className="text-[20px] tracking-[-0.02em]">{d.title}</h2>
              <p className="mt-2 text-[14.5px] text-muted">{d.blurb}</p>
              <span className="mt-3 inline-block font-mono text-[11px] text-muted">coming soon</span>
            </div>
          ) : (
            <Link
              key={d.slug}
              href={`/playground/${d.slug}`}
              className="group bg-bg p-6 transition-colors hover:bg-card"
            >
              <h2 className="text-[20px] tracking-[-0.02em] transition-colors group-hover:text-accent">
                {d.title}
              </h2>
              <p className="mt-2 text-[14.5px] text-muted">{d.blurb}</p>
              <span className="mt-3 inline-block font-mono text-[12px] text-accent">▶ run it</span>
            </Link>
          ),
        )}
      </div>
      <Footer />
    </main>
  );
}
