import { describe, it, expect, vi } from "vitest";
import { createGreetingHandler } from "@/lib/greeting";

function fakeClient(text: string) {
  return { messages: { create: vi.fn().mockResolvedValue({ content: [{ type: "text", text }] }) } } as never;
}

describe("greeting handler", () => {
  it("returns a one-line greeting and passes the city to the model", async () => {
    const client = fakeClient("Just flew in from Indy — and boy, are my arms tired.");
    const out = await createGreetingHandler(client)({ city: "Indianapolis", region: "IN" });
    expect(out).toMatch(/flew in/i);
    const args = (client as never as { messages: { create: ReturnType<typeof vi.fn> } }).messages.create.mock.calls[0][0];
    expect(args.model).toBe("claude-haiku-4-5");
    expect(args.messages[0].content).toContain("Indianapolis, IN");
  });
  it("includes the present signals and omits absent ones", async () => {
    const client = fakeClient("night owl in Denver, respect");
    await createGreetingHandler(client)({
      city: "Denver",
      os: "Windows",
      browser: "Chrome",
      device: "desktop",
      timeOfDay: "late night",
      language: "Spanish",
    });
    const content = (client as never as { messages: { create: ReturnType<typeof vi.fn> } }).messages.create.mock.calls[0][0].messages[0].content as string;
    expect(content).toContain("Denver");
    expect(content).toContain("late night");
    expect(content).toContain("Windows");
    expect(content).toContain("Spanish");
  });
});
