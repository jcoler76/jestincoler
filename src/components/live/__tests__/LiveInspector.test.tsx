import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import LiveInspector from "@/components/live/LiveInspector";
import { __resetSessionEvents } from "@/lib/events";

describe("LiveInspector", () => {
  beforeEach(() => {
    __resetSessionEvents();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          city: "Fort Wayne",
          region: "IN",
          country: "US",
          latitude: "41.07",
          longitude: "-85.13",
          os: "Windows",
          browser: "Chrome",
          device: "desktop",
        }),
      }),
    );
  });

  it("renders location and device facts after fetch", async () => {
    render(<LiveInspector />);
    await waitFor(() => expect(screen.getByText(/Fort Wayne/)).toBeInTheDocument());
    expect(screen.getByText("Windows")).toBeInTheDocument();
    expect(screen.getByText("Chrome")).toBeInTheDocument();
  });
});
