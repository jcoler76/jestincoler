import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LiveInspector from "@/components/live/LiveInspector";

export const metadata: Metadata = {
  title: "Live — Jestin Coler",
  description: "A live look at your own session: location, device, and activity, in real time.",
  robots: { index: false },
};

export default function LivePage() {
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <p className="mb-5 mt-12 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {"// live"}
      </p>
      <h1 className="text-[clamp(28px,4.5vw,40px)] font-[680] leading-[1.1] tracking-[-0.025em]">
        Your session, live.
      </h1>
      <p className="mt-4 max-w-[60ch] text-[16.5px] leading-[1.7] text-ink/90">
        Everything I ship is observable, so this page turns the lens on you. It is all real and
        all ephemeral: events stay in your browser and vanish on reload, with no cookies and
        nothing stored. The only network call is a single IP-geo lookup.
      </p>
      <LiveInspector />
      <Footer />
    </main>
  );
}
