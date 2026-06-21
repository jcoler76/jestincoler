import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SnoopIsmUI from "@/demos/snoop-ism/ui";

afterEach(() => vi.restoreAllMocks());

describe("SnoopIsmUI", () => {
  it("submits and renders the returned output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ output: "keep ya head up" }) }),
    );
    render(<SnoopIsmUI />);
    fireEvent.click(screen.getByRole("button", { name: /wisdom/i }));
    await waitFor(() => expect(screen.getByText(/keep ya head up/i)).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith("/api/demo/snoop-ism", expect.objectContaining({ method: "POST" }));
  });
});
