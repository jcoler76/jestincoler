import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutNarrative from "@/components/about/AboutNarrative";

describe("AboutNarrative", () => {
  it("renders the heading, the work link, and stack chips", () => {
    render(<AboutNarrative />);
    expect(screen.getByRole("heading", { name: /real work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /my work/i })).toHaveAttribute("href", "/#work");
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("RAG / embeddings")).toBeInTheDocument();
  });
});
