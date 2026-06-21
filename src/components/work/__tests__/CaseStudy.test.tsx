import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CaseStudy from "@/components/work/CaseStudy";
import { projects } from "@/content/projects";

describe("CaseStudy", () => {
  it("renders the title, role, tags, and every summary paragraph", () => {
    const p = projects[0];
    render(<CaseStudy project={p} />);
    expect(screen.getByRole("heading", { name: p.title })).toBeInTheDocument();
    // role is rendered as part of a larger "id · role" line, so match a substring
    expect(screen.getByText(p.role, { exact: false })).toBeInTheDocument();
    for (const para of p.summary) expect(screen.getByText(para)).toBeInTheDocument();
  });

  it("renders the architecture diagram when the project has one", () => {
    const p = projects[0];
    expect(p.diagram).toBeTruthy();
    render(<CaseStudy project={p} />);
    expect(screen.getByAltText(`${p.title} architecture diagram`)).toBeInTheDocument();
  });

  it("renders the live-site link, screenshot, and diagram for icolerlaw", () => {
    const p = projects.find((x) => x.slug === "icolerlaw")!;
    render(<CaseStudy project={p} />);
    const link = screen.getByRole("link", { name: /visit icolerlaw\.com/i });
    expect(link).toHaveAttribute("href", "https://icolerlaw.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByAltText(`${p.title} — live site`)).toBeInTheDocument();
    expect(screen.getByAltText(`${p.title} architecture diagram`)).toBeInTheDocument();
  });

  it("renders demo videos and the live link for nectarstudio", () => {
    const p = projects.find((x) => x.slug === "nectarstudio")!;
    render(<CaseStudy project={p} />);
    expect(screen.getAllByLabelText(/demo video/i)).toHaveLength(2);
    const link = screen.getByRole("link", { name: /visit nectarstudio\.ai/i });
    expect(link).toHaveAttribute("href", "https://nectarstudio.ai");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits the diagram when the project has none", () => {
    const p = { ...projects[0], diagram: undefined };
    render(<CaseStudy project={p} />);
    expect(
      screen.queryByAltText(`${p.title} architecture diagram`),
    ).not.toBeInTheDocument();
  });
});
