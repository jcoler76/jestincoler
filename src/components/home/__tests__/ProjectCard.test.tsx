import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectCard from "@/components/home/ProjectCard";
import { projects } from "@/content/projects";

describe("ProjectCard", () => {
  it("renders title, blurb, tags, and links to the case study", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(screen.getByRole("heading", { name: projects[0].title })).toBeInTheDocument();
    expect(screen.getByText(projects[0].blurb)).toBeInTheDocument();
    expect(screen.getByText(projects[0].tags[0])).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/work/${projects[0].slug}`);
  });
});
