import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhoamiBlock from "@/components/about/WhoamiBlock";
import ProfileCard from "@/components/about/ProfileCard";
import AboutNarrative from "@/components/about/AboutNarrative";

export const metadata: Metadata = {
  title: "About — Jestin Coler",
  description:
    "AI Solutions Architect & Data Systems Builder — 19 years building enterprise data and applied-AI systems.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <p className="mb-5 mt-12 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {"// about"}
      </p>
      <WhoamiBlock />
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
        <ProfileCard />
        <AboutNarrative />
      </div>
      <Footer />
    </main>
  );
}
