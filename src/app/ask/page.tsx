import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AskChat from "@/components/ask/AskChat";

export const metadata: Metadata = {
  title: "Ask — Jestin Coler",
  description:
    "Ask about my work, skills, experience, and logistics. Answers are retrieved from my real materials and cited.",
};

export default function AskPage() {
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <p className="mb-5 mt-12 font-mono text-xs uppercase tracking-[0.16em] text-muted">{"// ask"}</p>
      <h1 className="text-[clamp(28px,4.5vw,40px)] font-[680] leading-[1.1] tracking-[-0.025em]">
        Ask me anything.
      </h1>
      <p className="mt-4 text-[16.5px] leading-[1.7] text-ink/90">
        Questions about my work, skills, experience, or logistics get answered from my actual
        materials, with the sources each answer draws on shown right below it. If it isn&apos;t in
        my notes, I&apos;ll say so.
      </p>
      <AskChat />
      <Footer />
    </main>
  );
}
