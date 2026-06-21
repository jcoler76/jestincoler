import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DemoLoader from "@/components/playground/DemoLoader";
import { demos, getDemoMeta } from "@/demos/registry";

export function generateStaticParams() {
  return demos.filter((d) => !d.comingSoon).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getDemoMeta(slug);
  if (!meta) return { title: "Not found — Jestin Coler" };
  return { title: `${meta.title} — Playground`, description: meta.blurb };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getDemoMeta(slug);
  if (!meta || meta.comingSoon) notFound();
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <article className="pt-16 pb-12">
        <Link href="/playground" className="font-mono text-[13px] text-muted hover:text-accent">
          ← back to playground
        </Link>
        <h1 className="mb-2 mt-8 text-[clamp(30px,5vw,48px)] font-[680] tracking-[-0.03em]">
          {meta.title}
        </h1>
        <p className="mb-8 max-w-[56ch] text-[17px] text-muted">{meta.blurb}</p>
        <DemoLoader slug={slug} />
      </article>
      <Footer />
    </main>
  );
}
