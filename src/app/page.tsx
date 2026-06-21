import Nav from "@/components/layout/Nav";
import Hero from "@/components/home/Hero";
import WorkGrid from "@/components/home/WorkGrid";
import PlaygroundTeaser from "@/components/home/PlaygroundTeaser";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-[820px] px-7">
      <Nav />
      <Hero />
      <WorkGrid />
      <PlaygroundTeaser />
      <Footer />
    </main>
  );
}
