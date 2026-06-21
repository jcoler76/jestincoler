import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/greeting/route";

describe("greeting route", () => {
  it("returns a null greeting when no city header is present", async () => {
    const res = await POST(new Request("http://localhost/api/greeting", { method: "POST" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ greeting: null });
  });
});
