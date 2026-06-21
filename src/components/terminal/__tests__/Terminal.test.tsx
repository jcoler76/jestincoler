import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Terminal from "@/components/terminal/Terminal";

// useRouter from next/navigation needs an App Router context that does not exist
// in the Vitest/jsdom environment. Mock it so the component can render.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Terminal", () => {
  it("is hidden until the terminal:open event fires, then shows an input", () => {
    render(<Terminal />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    fireEvent(window, new CustomEvent("terminal:open"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("runs a command on Enter and shows output", () => {
    render(<Terminal />);
    fireEvent(window, new CustomEvent("terminal:open"));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "whoami" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/Jestin Coler/)).toBeInTheDocument();
  });

  it("running `snake` enters game mode", async () => {
    render(<Terminal />);
    window.dispatchEvent(new CustomEvent("terminal:open"));
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: "snake" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(await screen.findByLabelText("snake board")).toBeInTheDocument();
  });
});
