import { describe, it, expect, vi } from "vitest";
import { commands } from "@/components/terminal/commands";
import type { CommandContext } from "@/components/terminal/commands/types";

function makeCtx(): CommandContext & { lines: string[] } {
  const lines: string[] = [];
  return {
    lines,
    print: (l: string) => lines.push(l),
    clear: vi.fn(),
    setTheme: vi.fn(),
    navigate: vi.fn(),
    openUrl: vi.fn(),
    launch: vi.fn(),
    history: [],
  };
}

describe("terminal commands", () => {
  it("help lists available commands", () => {
    const ctx = makeCtx();
    commands.help.run([], ctx);
    expect(ctx.lines.join("\n")).toMatch(/ls/);
    expect(ctx.lines.join("\n")).toMatch(/open/);
  });

  it("ls lists project ids and titles", () => {
    const ctx = makeCtx();
    commands.ls.run([], ctx);
    expect(ctx.lines.join("\n")).toMatch(/01/);
    expect(ctx.lines.join("\n")).toMatch(/Autonomous Auto-Fix PRs/);
  });

  it("open with a valid id navigates to the case study", () => {
    const ctx = makeCtx();
    commands.open.run(["01"], ctx);
    expect(ctx.navigate).toHaveBeenCalledWith("/work/auto-fix-prs");
  });

  it("open with an invalid id prints an error and does not navigate", () => {
    const ctx = makeCtx();
    commands.open.run(["99"], ctx);
    expect(ctx.navigate).not.toHaveBeenCalled();
    expect(ctx.lines.join("\n")).toMatch(/no project/i);
  });

  it("theme dark calls setTheme('dark')", () => {
    const ctx = makeCtx();
    commands.theme.run(["dark"], ctx);
    expect(ctx.setTheme).toHaveBeenCalledWith("dark");
  });

  it("clear calls ctx.clear", () => {
    const ctx = makeCtx();
    commands.clear.run([], ctx);
    expect(ctx.clear).toHaveBeenCalled();
  });

  it("about navigates to /about", () => {
    const ctx = makeCtx();
    commands.about.run([], ctx);
    expect(ctx.navigate).toHaveBeenCalledWith("/about");
  });

  it("live navigates to /live", () => {
    const ctx = makeCtx();
    commands.live.run([], ctx);
    expect(ctx.navigate).toHaveBeenCalledWith("/live");
  });

  it("resume opens the PDF", () => {
    const ctx = makeCtx();
    commands.resume.run([], ctx);
    expect(ctx.openUrl).toHaveBeenCalledWith("/Jestin-Coler-Resume.pdf");
  });

  it("email/github/linkedin open the right URLs", () => {
    const ctx = makeCtx();
    commands.email.run([], ctx);
    commands.github.run([], ctx);
    commands.linkedin.run([], ctx);
    expect(ctx.openUrl).toHaveBeenCalledWith("mailto:jestin@jestincoler.com");
    expect(ctx.openUrl).toHaveBeenCalledWith("https://github.com/jcoler76");
    expect(ctx.openUrl).toHaveBeenCalledWith("https://www.linkedin.com/in/jestin-coler");
  });

  it("echo prints its arguments", () => {
    const ctx = makeCtx();
    commands.echo.run(["hello", "world"], ctx);
    expect(ctx.lines.join("\n")).toMatch(/hello world/);
  });

  it("date prints a non-empty line", () => {
    const ctx = makeCtx();
    commands.date.run([], ctx);
    expect(ctx.lines[0].length).toBeGreaterThan(0);
  });

  it("history prints prior commands from ctx.history", () => {
    const ctx = makeCtx();
    ctx.history = ["whoami", "ls"];
    commands.history.run([], ctx);
    const out = ctx.lines.join("\n");
    expect(out).toMatch(/whoami/);
    expect(out).toMatch(/ls/);
  });

  it("man <cmd> prints that command's description", () => {
    const ctx = makeCtx();
    commands.man.run(["whoami"], ctx);
    expect(ctx.lines.join("\n")).toMatch(/a little about me/);
  });

  it("man with no arg prints usage", () => {
    const ctx = makeCtx();
    commands.man.run([], ctx);
    expect(ctx.lines.join("\n")).toMatch(/usage/i);
  });

  it("neofetch prints the system-info card", () => {
    const ctx = makeCtx();
    commands.neofetch.run([], ctx);
    const out = ctx.lines.join("\n");
    expect(out).toMatch(/OS/);
    expect(out).toMatch(/stack/i);
    expect(ctx.lines.length).toBeGreaterThan(5);
  });

  it("ls includes the NectarStudio project (08)", () => {
    const ctx = makeCtx();
    commands.ls.run([], ctx);
    const out = ctx.lines.join("\n");
    expect(out).toMatch(/08/);
    expect(out).toMatch(/NectarStudio/);
  });

  it("ls includes the icolerlaw project (07)", () => {
    const ctx = makeCtx();
    commands.ls.run([], ctx);
    const out = ctx.lines.join("\n");
    expect(out).toMatch(/07/);
    expect(out).toMatch(/Law-Firm Client & Payments Platform/);
  });
});
