import Link from "next/link";
import type { Project } from "@/content/projects/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden bg-bg p-6 transition-colors hover:bg-card"
    >
      <span className="font-mono text-xs text-muted">{project.id}</span>
      <span className="absolute right-5 top-5 font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
        ↗
      </span>
      <h3 className="mb-2 mt-2.5 text-[21px] tracking-[-0.02em] transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mb-4 text-[14.5px] text-muted">{project.blurb}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
