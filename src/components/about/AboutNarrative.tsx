import Link from "next/link";
import { about } from "@/content/about";

export default function AboutNarrative() {
  return (
    <div>
      <h1 className="text-[clamp(28px,4.5vw,40px)] font-[680] leading-[1.1] tracking-[-0.025em]">
        I build software that does real work.
      </h1>
      <div className="mt-5 max-w-[62ch] space-y-4 text-[16.5px] leading-[1.7] text-ink/90">
        <p>
          For 19 years I&apos;ve turned messy operational problems like support, data migration, QA,
          and customer enablement into products that scale. Lately that means <b>applied AI</b> for the
          parts of enterprise software people usually avoid.
        </p>
        <p>
          I&apos;m the Director of Data Services and AI Solutions Architect at{" "}
          <b>Mirabel Technologies</b>, where I built and lead the database-services function from the
          ground up: a team of five running an 800+ database production environment for a multi-tenant
          SaaS platform.
        </p>
        <p>
          A lot of the role is consultative. I meet directly with publishers to understand their
          pain points, then design and build <b>custom solutions</b> for them: bespoke reports,
          tailored workflows, and integrations with third-party systems. I also help shape where the
          platform goes next, partnering with executive leadership on its technical direction
          and roadmap.
        </p>
        <p>
          My recent work makes institutional knowledge usable at scale: a self-service API platform
          with a visual workflow builder, an AI-assisted regression-testing suite with DB-level
          assertions and self-healing tests, a retrieval-augmented knowledge assistant that curates
          support history into trustworthy cited answers, and a Jira deep-dive system that turns
          tickets into engineering analysis and guarded draft pull requests. A few are written up in{" "}
          <Link href="/#work" className="text-accent underline underline-offset-2">
            my work →
          </Link>
        </p>
        <p>
          I also build <b>NectarStudio</b>, where I ship AI products end to end, from
          the database and API to the workflow engine and UI.
        </p>
        <p>
          I&apos;m at my best where the problem isn&apos;t neatly contained: legacy databases,
          enterprise CRM workflows, support operations, and AI that has to survive real users and real
          data. I care about systems that are <b>accountable</b>, sourced, evaluated, and safe to
          trust. I was an early adopter of AI development tooling (Claude, Cursor) and lean on it to
          ship faster without lowering the bar.
        </p>
        <p>
          Off the clock, I&apos;m a husband and girl-dad of two: one studying aerospace engineering at
          Purdue, the other an aspiring artist. I build remotely from Indiana, by way of Miami,
          Nashville, and Huntington Beach.
        </p>
      </div>

      <div className="mb-3 mt-9 flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
        Stack <span className="h-px flex-1 bg-line" />
      </div>
      <div className="flex flex-wrap gap-2">
        {about.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[12px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
