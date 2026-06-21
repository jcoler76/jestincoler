import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VideoFigure from "@/components/work/VideoFigure";

describe("VideoFigure", () => {
  it("renders a captioned video with poster and source", () => {
    const { container } = render(
      <VideoFigure
        src="/work/nectarstudio-api.mp4"
        poster="/work/nectarstudio-api.jpg"
        title="API Endpoint Creation"
      />,
    );
    const video = screen.getByLabelText("API Endpoint Creation demo video");
    expect(video).toHaveAttribute("poster", "/work/nectarstudio-api.jpg");
    expect(container.querySelector("source")).toHaveAttribute("src", "/work/nectarstudio-api.mp4");
    expect(screen.getByText(/API Endpoint Creation/)).toBeInTheDocument();
  });
});
