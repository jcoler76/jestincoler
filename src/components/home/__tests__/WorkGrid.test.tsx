import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkGrid from "@/components/home/WorkGrid";
import { projects } from "@/content/projects";

describe("WorkGrid", () => {
  it("renders a card per project under a Selected Work heading", () => {
    render(<WorkGrid />);
    expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(projects.length);
  });
});
