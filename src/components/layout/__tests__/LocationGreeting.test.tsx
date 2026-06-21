import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import LocationGreeting from "@/components/layout/LocationGreeting";

afterEach(() => vi.restoreAllMocks());

describe("LocationGreeting", () => {
  it("renders the greeting when the API returns one", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ greeting: "Welcome, traveler from Indy." }) }),
    );
    render(<LocationGreeting />);
    await waitFor(() => expect(screen.getByText(/traveler from Indy/i)).toBeInTheDocument());
  });

  it("renders nothing when greeting is null", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ greeting: null }) }));
    const { container } = render(<LocationGreeting />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container.querySelector("p")).toBeNull();
  });
});
