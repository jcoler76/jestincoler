import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SnakeGame from "../SnakeGame";

afterEach(() => vi.useRealTimers());

describe("SnakeGame", () => {
  it("renders the board and score, and quits on 'q'", () => {
    vi.useFakeTimers();
    const onExit = vi.fn();
    render(<SnakeGame onExit={onExit} />);
    expect(screen.getByLabelText("snake board")).toBeInTheDocument();
    expect(screen.getByText(/score/i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "q" });
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
