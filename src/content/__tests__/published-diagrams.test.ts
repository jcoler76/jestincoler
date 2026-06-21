import { describe, it, expect } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "public", "work");
const EXPECTED = [
  "agentic-testing.svg",
  "api-platform.svg",
  "auto-fix-prs.svg",
  "icolerlaw.svg",
  "kb-pipeline.svg",
  "support-triage.svg",
  "videogen.svg",
];

describe("published case-study diagrams", () => {
  it("has exactly the seven expected diagram files", () => {
    const files = readdirSync(DIR).filter((f) => f.endsWith(".svg"));
    expect(files.sort()).toEqual([...EXPECTED].sort());
  });
});
