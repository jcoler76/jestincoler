import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "@/components/about/ProfileCard";

describe("ProfileCard", () => {
  it("renders the headshot, name, title, a metric, and CTA links", () => {
    render(<ProfileCard />);
    expect(screen.getByAltText("Jestin Coler")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Jestin Coler" })).toBeInTheDocument();
    expect(screen.getByText(/19 years/)).toBeInTheDocument();

    const getInTouch = screen.getByRole("link", { name: /get in touch/i });
    expect(getInTouch).toHaveAttribute("href", "mailto:jestin@jestincoler.com");
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/Jestin-Coler-Resume.pdf",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/jcoler76",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jestin-coler",
    );
  });
});
