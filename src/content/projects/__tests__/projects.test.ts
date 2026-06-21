import { describe, it, expect } from "vitest";
import { projects, getProject } from "@/content/projects";

describe("projects content", () => {
  it("has eight projects with unique slugs", () => {
    expect(projects).toHaveLength(8);
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(8);
  });

  it("every project has required fields", () => {
    for (const p of projects) {
      expect(p.id).toMatch(/^\d{2}$/);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.blurb.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(0);
    }
  });

  it("getProject returns a project by slug or undefined", () => {
    expect(getProject("auto-fix-prs")?.title).toBe("Autonomous Auto-Fix PRs");
    expect(getProject("nope")).toBeUndefined();
  });
});
