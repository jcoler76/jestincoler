import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HaikuGeneratorUI from "@/demos/haiku-generator/ui";

afterEach(() => vi.restoreAllMocks());

describe("HaikuGeneratorUI", () => {
  it("submits the topic and renders the returned output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ output: "silent pond / a frog leaps in / splash" }),
      }),
    );
    render(<HaikuGeneratorUI />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ponds" } });
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    await waitFor(() => expect(screen.getByText(/silent pond/)).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith(
      "/api/demo/haiku-generator",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("shows an error message when the API returns an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "Please enter a topic." }) }),
    );
    render(<HaikuGeneratorUI />);
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    await waitFor(() => expect(screen.getByText(/please enter a topic/i)).toBeInTheDocument());
  });
});
