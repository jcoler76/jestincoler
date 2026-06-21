import { describe, it, expect, vi, afterEach } from "vitest";
import { createGitHubRoastHandler } from "@/demos/github-roast/handler";

function fakeClient(text: string) {
  return { messages: { create: vi.fn().mockResolvedValue({ content: [{ type: "text", text }] }) } } as never;
}
function ghResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

afterEach(() => vi.restoreAllMocks());

describe("github-roast handler", () => {
  it("fetches profile + repos and returns a roast with a factual header", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        ghResponse(200, {
          login: "octocat",
          name: "The Octocat",
          bio: "meow",
          public_repos: 8,
          followers: 100,
          created_at: "2015-01-01T00:00:00Z",
        }),
      )
      .mockResolvedValueOnce(
        ghResponse(200, [
          { name: "Hello-World", description: "first", language: "Ruby", stargazers_count: 50, fork: false },
          { name: "Spoon-Knife", description: "demo", language: "HTML", stargazers_count: 10, fork: false },
        ]),
      );
    vi.stubGlobal("fetch", fetchMock);
    const handler = createGitHubRoastHandler(
      fakeClient("Eight repos and a cat avatar — bold.\n\nBut real talk: Hello-World is iconic."),
    );
    const result = await handler({ username: "octocat" });
    expect(result.output).toMatch(/@octocat · 8 public repos/);
    expect(result.output).toMatch(/But real talk/);
    const firstInit = fetchMock.mock.calls[0][1] as { headers: Record<string, string> };
    expect(firstInit.headers["User-Agent"]).toBeTruthy();
  });

  it("uses claude-haiku-4-5", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          ghResponse(200, { login: "x", name: null, bio: null, public_repos: 0, followers: 0, created_at: "2020-01-01T00:00:00Z" }),
        )
        .mockResolvedValueOnce(ghResponse(200, [])),
    );
    const client = fakeClient("roast\n\nBut real talk: nice");
    await createGitHubRoastHandler(client)({ username: "x" });
    const args = (client as never as { messages: { create: ReturnType<typeof vi.fn> } }).messages.create.mock.calls[0][0];
    expect(args.model).toBe("claude-haiku-4-5");
  });

  it("rejects a missing username", async () => {
    await expect(createGitHubRoastHandler(fakeClient("x"))({})).rejects.toThrow(/username/i);
  });

  it("rejects a malformed username", async () => {
    await expect(createGitHubRoastHandler(fakeClient("x"))({ username: "bad name!" })).rejects.toThrow(/github username/i);
  });

  it("surfaces a friendly error when the user is not found (404)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(ghResponse(404, {})));
    await expect(createGitHubRoastHandler(fakeClient("x"))({ username: "ghostuser" })).rejects.toThrow(/no github user/i);
  });

  it("surfaces a friendly rate-limit error on 403", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ghResponse(403, {})));
    await expect(createGitHubRoastHandler(fakeClient("x"))({ username: "anyone" })).rejects.toThrow(/rate-limit/i);
  });

  it("throws a generic (non-validation) error on an unexpected GitHub status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ghResponse(500, {})));
    await expect(createGitHubRoastHandler(fakeClient("x"))({ username: "anyone" })).rejects.toThrow(/fetch failed/i);
  });

  it("still roasts when the repos fetch fails (best-effort)", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          ghResponse(200, { login: "solo", name: null, bio: null, public_repos: 3, followers: 1, created_at: "2021-01-01T00:00:00Z" }),
        )
        .mockResolvedValueOnce(ghResponse(500, {})),
    );
    const result = await createGitHubRoastHandler(fakeClient("roast\n\nBut real talk: keep going"))({ username: "solo" });
    expect(result.output).toMatch(/@solo · 3 public repos/);
  });
});
