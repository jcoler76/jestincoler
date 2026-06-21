import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects";

describe("project diagrams", () => {
  it("each project's diagram (if present) points to an existing file", () => {
    for (const p of projects) {
      if (p.diagram === undefined) continue;
      expect(p.diagram).toBe(`/work/${p.slug}.svg`);
      expect(
        existsSync(join(process.cwd(), "public", p.diagram)),
        `missing file for ${p.slug}`,
      ).toBe(true);
    }
  });

  it("the diagram-bearing case studies all declare a diagram", () => {
    const withDiagram = [
      "auto-fix-prs",
      "agentic-testing",
      "kb-pipeline",
      "support-triage",
      "api-platform",
      "videogen",
      "icolerlaw",
    ];
    for (const slug of withDiagram) {
      const p = projects.find((x) => x.slug === slug);
      expect(p?.diagram, `${slug} should declare a diagram`).toBe(`/work/${slug}.svg`);
    }
  });

  it("nectarstudio has two demo videos (files + posters exist) and a live link", () => {
    const p = projects.find((x) => x.slug === "nectarstudio");
    expect(p).toBeDefined();
    expect(p!.link?.href).toBe("https://nectarstudio.ai");
    expect(p!.videos).toHaveLength(2);
    for (const v of p!.videos!) {
      expect(existsSync(join(process.cwd(), "public", v.src)), `missing ${v.src}`).toBe(true);
      expect(existsSync(join(process.cwd(), "public", v.poster)), `missing ${v.poster}`).toBe(true);
      expect(v.title.length).toBeGreaterThan(0);
    }
  });

  it("icolerlaw links to the live site and points at an existing screenshot", () => {
    const p = projects.find((x) => x.slug === "icolerlaw");
    expect(p).toBeDefined();
    expect(p!.link?.href).toBe("https://icolerlaw.com");
    expect(p!.link?.label).toMatch(/icolerlaw\.com/i);
    expect(p!.screenshot).toBe("/work/icolerlaw-site.png");
    expect(existsSync(join(process.cwd(), "public", p!.screenshot!))).toBe(true);
  });
});
