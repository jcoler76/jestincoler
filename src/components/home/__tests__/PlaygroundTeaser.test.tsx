import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PlaygroundTeaser from "@/components/home/PlaygroundTeaser";

describe("PlaygroundTeaser", () => {
  it("renders the playground heading and demo names", () => {
    render(<PlaygroundTeaser />);
    expect(screen.getByRole("heading", { name: /The Playground/i })).toBeInTheDocument();
    expect(screen.getByText(/Haiku Generator/i)).toBeInTheDocument();
  });

  it("links to the full playground", () => {
    render(<PlaygroundTeaser />);
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain("/playground");
  });
});
