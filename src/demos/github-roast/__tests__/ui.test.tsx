import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GitHubRoastUI from "@/demos/github-roast/ui";

afterEach(() => vi.restoreAllMocks());

describe("GitHubRoastUI", () => {
  it("submits a username and renders the roast", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ output: "@jcoler76 · 5 public repos\n\nroasted!" }) }),
    );
    render(<GitHubRoastUI />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "jcoler76" } });
    fireEvent.click(screen.getByRole("button", { name: /roast me/i }));
    await waitFor(() => expect(screen.getByText(/roasted!/)).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith("/api/demo/github-roast", expect.objectContaining({ method: "POST" }));
  });

  it("shows an error from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'No GitHub user named "x".' }) }),
    );
    render(<GitHubRoastUI />);
    fireEvent.click(screen.getByRole("button", { name: /roast me/i }));
    await waitFor(() => expect(screen.getByText(/no github user/i)).toBeInTheDocument());
  });
});
