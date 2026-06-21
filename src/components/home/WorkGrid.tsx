import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";

export default function WorkGrid() {
  return (
    <section id="work">
      <div className="mb-6 mt-14 flex items-baseline gap-4">
        <h2 className="font-mono text-[15px] font-semibold uppercase tracking-[0.14em]">
          Selected Work
        </h2>
        <div className="h-px flex-1 bg-line" />
        <span className="font-mono text-[13px] text-muted">
          {String(projects.length).padStart(2, "0")} / systems
        </span>
      </div>
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
