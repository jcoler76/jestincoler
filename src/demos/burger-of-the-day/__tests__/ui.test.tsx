import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BurgerOfTheDayUI from "@/demos/burger-of-the-day/ui";

afterEach(() => vi.restoreAllMocks());

describe("BurgerOfTheDayUI", () => {
  it("submits and renders the returned output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ output: "The Kale Me Maybe Burger" }) }),
    );
    render(<BurgerOfTheDayUI />);
    fireEvent.click(screen.getByRole("button", { name: /cook one up/i }));
    await waitFor(() => expect(screen.getByText(/Kale Me Maybe/i)).toBeInTheDocument());
  });
});
