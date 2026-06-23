import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Terminal from "@/components/terminal/Terminal";
import RouteTracker from "@/components/layout/RouteTracker";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jestin Coler — builder, tinkerer, AI engineer",
  description:
    "I design and ship agentic AI systems that do real work: RAG pipelines, autonomous dev agents, and self-healing test suites, plus a live AI playground to explore.",
  metadataBase: new URL("https://jestincoler.com"),
  authors: [{ name: "Jestin Coler", url: "https://jestincoler.com" }],
  creator: "Jestin Coler",
  publisher: "Jestin Coler",
  openGraph: {
    title: "Jestin Coler — builder, tinkerer, AI engineer",
    description:
      "I design and ship agentic AI systems that do real work: RAG pipelines, autonomous dev agents, and self-healing test suites, plus a live AI playground to explore.",
    url: "https://jestincoler.com",
    siteName: "jestincoler.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jestin Coler — builder, tinkerer, AI engineer",
    description:
      "I design and ship agentic AI systems that do real work: RAG pipelines, autonomous dev agents, and self-healing test suites, plus a live AI playground to explore.",
  },
};

// Light is the intentional default (the professional canvas); dark is opt-in via the
// terminal `theme` command and persisted in localStorage. We deliberately do not auto-follow
// the OS prefers-color-scheme setting.
const NO_FLASH = `(function(){try{var t=localStorage.getItem('jc-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

// Structured data so search engines + link unfurlers (LinkedIn, etc.) can attribute the author.
const PERSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jestin Coler",
  url: "https://jestincoler.com",
  jobTitle: "AI Solutions Architect & Data Systems Builder",
  sameAs: ["https://www.linkedin.com/in/jestin-coler", "https://github.com/jcoler76"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PERSON_LD }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RouteTracker />
        {children}
        <Terminal />
        <Analytics />
      </body>
    </html>
  );
}
