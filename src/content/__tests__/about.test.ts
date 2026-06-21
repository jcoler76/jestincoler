import { describe, it, expect } from "vitest";
import { about } from "@/content/about";

describe("about content", () => {
  it("has core identity fields", () => {
    expect(about.name).toBe("Jestin Coler");
    expect(about.title.length).toBeGreaterThan(0);
    expect(about.location.length).toBeGreaterThan(0);
  });

  it("has whoami identity lines", () => {
    expect(about.whoami.length).toBeGreaterThan(0);
    expect(about.whoami.find((l) => l.key === "also")?.value).toMatch(/NectarStudio/i);
  });

  it("has metrics, a non-empty stack, and contact links", () => {
    expect(about.metrics.length).toBeGreaterThan(0);
    expect(about.stack).toContain("TypeScript");
    expect(about.links.email).toBe("jestin@jestincoler.com");
    expect(about.links.github).toMatch(/github\.com\/jcoler76/);
    expect(about.links.linkedin).toMatch(/linkedin\.com\/in\/jestin-coler/);
    expect(about.links.resume).toBe("/Jestin-Coler-Resume.pdf");
  });
});
