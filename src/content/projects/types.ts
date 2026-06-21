export interface Project {
  id: string; // "01".."06" — display index
  slug: string; // URL slug
  title: string;
  blurb: string; // one-line, used on cards
  tags: string[];
  role: string;
  summary: string[]; // paragraphs for the case study (high-level, anonymized)
  diagram?: string; // public path to the architecture diagram SVG, e.g. "/work/<slug>.svg"
  screenshot?: string; // public path to a live-site screenshot, e.g. "/work/<slug>-site.png"
  link?: { href: string; label: string }; // external live-site link
  videos?: { src: string; poster: string; title: string }[]; // embedded demo videos
}
