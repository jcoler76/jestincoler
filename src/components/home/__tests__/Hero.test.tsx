import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/home/Hero";

describe("Hero", () => {
  it("renders the headline and the tilde hint", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AI systems/i);
    expect(screen.getByText(/~/)).toBeInTheDocument();
  });
});
