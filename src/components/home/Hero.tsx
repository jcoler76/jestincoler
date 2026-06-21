import LocationGreeting from "@/components/layout/LocationGreeting";

export default function Hero() {
  return (
    <header className="pt-20 pb-14">
      <LocationGreeting />
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {"// builder · founder · ai engineer"}
      </p>
      <h1 className="max-w-[17ch] text-[clamp(40px,7vw,74px)] font-[680] leading-[1.02] tracking-[-0.035em]">
        I build AI systems that do real work
        <span className="ml-1 inline-block h-[1em] w-[0.55ch] translate-y-[0.12em] animate-pulse bg-accent" />
      </h1>
      <p className="mt-6 max-w-[56ch] text-[19px] text-muted">
        I design and ship agentic AI — RAG pipelines, autonomous dev agents, and self-healing
        test suites — that run in production. Founder of NectarStudio. Press{" "}
        <code className="rounded bg-line px-1.5 py-0.5 font-mono text-[0.9em] text-ink">~</code>{" "}
        anywhere to open a terminal and look around.
      </p>
    </header>
  );
}
