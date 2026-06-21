import Image from "next/image";
import { about } from "@/content/about";

const linkClass =
  "flex items-center justify-between rounded-md border border-line px-3 py-2 font-mono text-[12.5px] transition-colors hover:border-accent hover:text-accent";

export default function ProfileCard() {
  const { links } = about;
  return (
    <aside className="self-start rounded-xl border border-line bg-card p-5 md:sticky md:top-6">
      <Image
        src="/headshot.png"
        alt={about.name}
        width={88}
        height={88}
        priority
        className="h-[88px] w-[88px] rounded-full border border-line object-cover"
      />
      <h2 className="mt-3.5 text-[22px] tracking-[-0.02em]">{about.name}</h2>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{about.title}</p>

      <dl className="mt-4 flex flex-col gap-2.5 border-t border-line pt-3.5">
        {about.metrics.map((m) => (
          <div key={m.label} className="flex justify-between font-mono text-[12.5px]">
            <dt className="text-muted">{m.label}</dt>
            <dd className="font-semibold">{m.value}</dd>
          </div>
        ))}
        <div className="flex justify-between font-mono text-[12.5px]">
          <dt className="text-muted">based in</dt>
          <dd className="font-semibold">{about.location}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={`mailto:${links.email}`}
          className="flex items-center justify-between rounded-md border border-ink bg-ink px-3 py-2 font-mono text-[12.5px] text-bg transition-colors hover:border-accent hover:bg-accent hover:text-[#04130a]"
        >
          get in touch <span aria-hidden="true">→</span>
        </a>
        {links.resume && (
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
            résumé <span aria-hidden="true">pdf</span>
          </a>
        )}
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          github <span aria-hidden="true">↗</span>
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          linkedin <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
