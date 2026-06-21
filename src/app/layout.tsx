import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Terminal from "@/components/terminal/Terminal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jestin Coler — builder, founder, AI engineer",
  description:
    "I design and ship agentic AI systems that do real work. Portfolio, projects, and an AI playground.",
};

// Light is the intentional default (the professional canvas); dark is opt-in via the
// terminal `theme` command and persisted in localStorage. We deliberately do not auto-follow
// the OS prefers-color-scheme setting.
const NO_FLASH = `(function(){try{var t=localStorage.getItem('jc-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Terminal />
      </body>
    </html>
  );
}
