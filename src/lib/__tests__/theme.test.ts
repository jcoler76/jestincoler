import { describe, it, expect, beforeEach } from "vitest";
import { applyTheme, getStoredTheme, toggleTheme, THEME_KEY, currentTheme } from "@/lib/theme";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("theme", () => {
  it("applyTheme('dark') adds the dark class and stores it", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");
  });

  it("applyTheme('light') removes the dark class and stores it", () => {
    document.documentElement.classList.add("dark");
    applyTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });

  it("getStoredTheme returns the stored value or null", () => {
    expect(getStoredTheme()).toBeNull();
    applyTheme("dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("toggleTheme flips and returns the new theme", () => {
    expect(toggleTheme()).toBe("dark");
    expect(toggleTheme()).toBe("light");
  });

  it("currentTheme reflects the dark class on documentElement", () => {
    expect(currentTheme()).toBe("light");
    document.documentElement.classList.add("dark");
    expect(currentTheme()).toBe("dark");
  });

  it("getStoredTheme returns null for an invalid stored value", () => {
    localStorage.setItem(THEME_KEY, "bogus");
    expect(getStoredTheme()).toBeNull();
  });
});
