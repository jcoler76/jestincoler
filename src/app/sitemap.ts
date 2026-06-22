import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { demos } from "@/demos/registry";

const BASE = "https://jestincoler.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/playground"];
  return [
    ...staticPaths.map((p) => ({ url: `${BASE}${p}` })),
    ...projects.map((p) => ({ url: `${BASE}/work/${p.slug}` })),
    ...demos.map((d) => ({ url: `${BASE}/playground/${d.slug}` })),
  ];
}
