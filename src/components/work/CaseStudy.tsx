import Link from "next/link";
import type { Project } from "@/content/projects/types";
import DiagramFigure from "@/components/work/DiagramFigure";
import VideoFigure from "@/components/work/VideoFigure";

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="pt-20 pb-16">
      <Link href="/#work" className="font-mono text-[13px] text-muted hover:text-accent">
        ← back to work
      </Link>
      <p className="mb-3 mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {project.id} · {project.role}
      </p>
      <h1 className="text-[clamp(34px,6vw,60px)] font-[680] leading-[1.04] tracking-[-0.03em]">
        {project.title}
      </h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
            {t}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 font-mono text-[13px] text-bg transition-colors hover:bg-accent hover:text-accent-ink"
        >
          {project.link.label} →
        </a>
      )}
      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink/90">
        {project.summary.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {project.screenshot && (
        <DiagramFigure
          src={project.screenshot}
          title={project.title}
          caption="Live site"
          alt={`${project.title} — live site`}
          note={`// ${
            project.link
              ? `live at ${project.link.href.replace(/^https?:\/\//, "")}`
              : "live screenshot"
          } · click to view full size`}
        />
      )}
      {project.videos?.map((v) => (
        <VideoFigure key={v.src} src={v.src} poster={v.poster} title={v.title} />
      ))}
      {project.diagram && <DiagramFigure src={project.diagram} title={project.title} />}
    </article>
  );
}
