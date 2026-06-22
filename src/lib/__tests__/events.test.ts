import { describe, it, expect, beforeEach } from "vitest";
import {
  emitSessionEvent,
  subscribe,
  getSessionEventsSnapshot,
  __resetSessionEvents,
} from "@/lib/events";

describe("session event bus", () => {
  beforeEach(() => __resetSessionEvents());

  it("appends emitted events to the snapshot", () => {
    emitSessionEvent("page_view", "/about");
    const snap = getSessionEventsSnapshot();
    expect(snap).toHaveLength(1);
    expect(snap[0]).toMatchObject({ type: "page_view", label: "/about" });
    expect(typeof snap[0].at).toBe("number");
  });

  it("notifies subscribers and supports unsubscribe", () => {
    let calls = 0;
    const unsub = subscribe(() => (calls += 1));
    emitSessionEvent("command", "whoami");
    expect(calls).toBe(1);
    unsub();
    emitSessionEvent("command", "ls");
    expect(calls).toBe(1);
  });

  it("returns a new snapshot reference after each emit", () => {
    const a = getSessionEventsSnapshot();
    emitSessionEvent("terminal_opened", "");
    expect(getSessionEventsSnapshot()).not.toBe(a);
  });

  it("caps the buffer at 50, dropping oldest", () => {
    for (let i = 0; i < 60; i++) emitSessionEvent("page_view", `/p${i}`);
    const snap = getSessionEventsSnapshot();
    expect(snap).toHaveLength(50);
    expect(snap[snap.length - 1].label).toBe("/p59");
    expect(snap[0].label).toBe("/p10");
  });
});
