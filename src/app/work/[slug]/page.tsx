import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CaseStudy from "@/components/work/CaseStudy";
import { projects, getProject } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found — Jestin Coler" };
  return { title: `${project.title} — Jestin Coler`, description: project.blurb };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <CaseStudy project={project} />
      <Footer />
    </main>
  );
}
