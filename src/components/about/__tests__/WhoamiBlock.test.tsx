import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WhoamiBlock from "@/components/about/WhoamiBlock";

describe("WhoamiBlock", () => {
  it("renders the whoami prompt and identity lines", () => {
    render(<WhoamiBlock />);
    expect(screen.getByText("whoami", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Jestin Coler/)).toBeInTheDocument();
    expect(screen.getByText(/Founder, NectarStudio/i)).toBeInTheDocument();
  });
});
