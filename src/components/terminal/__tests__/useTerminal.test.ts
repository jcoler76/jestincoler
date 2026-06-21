import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTerminal } from "@/components/terminal/useTerminal";

describe("useTerminal", () => {
  it("runs a known command and appends output lines", () => {
    const { result } = renderHook(() => useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn() }));
    act(() => result.current.runLine("whoami"));
    expect(result.current.lines.some((l) => /Jestin Coler/.test(l.text))).toBe(true);
  });

  it("prints an error for an unknown command", () => {
    const { result } = renderHook(() => useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn() }));
    act(() => result.current.runLine("frobnicate"));
    expect(result.current.lines.some((l) => /command not found/.test(l.text))).toBe(true);
  });

  it("clear empties the buffer", () => {
    const { result } = renderHook(() => useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn() }));
    act(() => result.current.runLine("whoami"));
    act(() => result.current.runLine("clear"));
    expect(result.current.lines).toHaveLength(0);
  });

  it("theme command forwards to onSetTheme", () => {
    const onSetTheme = vi.fn();
    const { result } = renderHook(() => useTerminal({ onNavigate: vi.fn(), onSetTheme }));
    act(() => result.current.runLine("theme dark"));
    expect(onSetTheme).toHaveBeenCalledWith("dark");
  });

  it("ignores empty/whitespace input", () => {
    const { result } = renderHook(() => useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn() }));
    act(() => result.current.runLine("   "));
    expect(result.current.lines).toHaveLength(0);
  });

  it("snake command forwards to onLaunch", () => {
    const onLaunch = vi.fn();
    const { result } = renderHook(() =>
      useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn(), onLaunch }),
    );
    act(() => result.current.runLine("snake"));
    expect(onLaunch).toHaveBeenCalledWith("snake");
  });

  it("github command forwards to onOpenUrl", () => {
    const onOpenUrl = vi.fn();
    const { result } = renderHook(() =>
      useTerminal({ onNavigate: vi.fn(), onSetTheme: vi.fn(), onOpenUrl }),
    );
    act(() => result.current.runLine("github"));
    expect(onOpenUrl).toHaveBeenCalledWith("https://github.com/jcoler76");
  });
});
