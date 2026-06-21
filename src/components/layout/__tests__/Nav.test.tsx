import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

describe("Nav", () => {
  it("renders the logo and a terminal trigger", () => {
    render(<Nav />);
    expect(screen.getByText(/jestin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /terminal/i })).toBeInTheDocument();
  });

  it("links whoami to /about", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "whoami" })).toHaveAttribute("href", "/about");
  });
});
