import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AskChat from "@/components/ask/AskChat";

function streamRes(text: string, sources: { id: string; label: string }[]) {
  return {
    ok: true,
    headers: new Headers({ "X-Retrieved-Sources": JSON.stringify(sources) }),
    body: new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    }),
  };
}

describe("AskChat", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(streamRes("I'm Jestin.", [{ id: "about-identity", label: "About" }])),
    );
  });

  it("renders starter chips", () => {
    render(<AskChat />);
    expect(screen.getByText(/open to remote/i)).toBeInTheDocument();
  });

  it("sends a question and renders the streamed answer + sources", async () => {
    render(<AskChat />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "who are you" } });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getByText("I'm Jestin.")).toBeInTheDocument());
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
