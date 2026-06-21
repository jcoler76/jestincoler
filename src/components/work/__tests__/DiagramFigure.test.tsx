import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DiagramFigure from "@/components/work/DiagramFigure";

describe("DiagramFigure", () => {
  it("renders a framed diagram and opens/closes a lightbox", () => {
    render(<DiagramFigure src="/work/agentic-testing.svg" title="Agentic Testing Suite" />);

    expect(screen.getByText(/Architecture/i)).toBeInTheDocument();
    const inline = screen.getAllByAltText("Agentic Testing Suite architecture diagram");
    expect(inline).toHaveLength(1);
    expect(inline[0]).toHaveAttribute("src", "/work/agentic-testing.svg");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /zoom/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getAllByAltText("Agentic Testing Suite architecture diagram")).toHaveLength(2);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses a custom caption, note, and alt when provided", () => {
    render(
      <DiagramFigure
        src="/work/icolerlaw-site.png"
        title="Law-Firm Client & Payments Platform"
        caption="Live site"
        alt="Law-Firm Client & Payments Platform — live site"
        note="// live at icolerlaw.com"
      />,
    );
    expect(screen.getByText(/Live site/i)).toBeInTheDocument();
    expect(
      screen.getByAltText("Law-Firm Client & Payments Platform — live site"),
    ).toBeInTheDocument();
    expect(screen.getByText(/live at icolerlaw\.com/i)).toBeInTheDocument();
  });

  it("stays open when the enlarged image is clicked, closes on backdrop click", () => {
    render(<DiagramFigure src="/work/agentic-testing.svg" title="Agentic Testing Suite" />);
    fireEvent.click(screen.getByRole("button", { name: /zoom/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // clicking the enlarged image must NOT close the lightbox
    const enlarged = screen.getAllByAltText("Agentic Testing Suite architecture diagram")[1];
    fireEvent.click(enlarged);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // clicking the backdrop (the dialog container) DOES close it
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
