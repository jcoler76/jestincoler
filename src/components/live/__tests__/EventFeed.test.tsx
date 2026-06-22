import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventFeed from "@/components/live/EventFeed";

describe("EventFeed", () => {
  it("renders events newest-first", () => {
    render(
      <EventFeed
        events={[
          { id: 1, type: "page_view", label: "/", at: 1000 },
          { id: 2, type: "command", label: "whoami", at: 2000 },
        ]}
        startedAt={1000}
        route="/live"
        referrer="linkedin.com"
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("whoami");
    expect(items[1]).toHaveTextContent("/");
  });

  it("shows a placeholder when there are no events", () => {
    render(<EventFeed events={[]} startedAt={0} route="/live" referrer={null} />);
    expect(screen.getByText(/waiting for activity/i)).toBeInTheDocument();
  });
});
