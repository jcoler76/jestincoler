import { useSyncExternalStore } from "react";

export type SessionEventType =
  | "page_view"
  | "terminal_opened"
  | "command"
  | "demo_run"
  | "theme_changed";

export interface SessionEvent {
  id: number;
  type: SessionEventType;
  label: string;
  at: number;
}

const MAX = 50;
let events: SessionEvent[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

export function emitSessionEvent(type: SessionEventType, label: string): void {
  const next = [...events, { id: nextId++, type, label, at: Date.now() }];
  events = next.length > MAX ? next.slice(next.length - MAX) : next;
  for (const l of listeners) l();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSessionEventsSnapshot(): SessionEvent[] {
  return events;
}

// test-only helper
export function __resetSessionEvents(): void {
  events = [];
  nextId = 1;
  listeners.clear();
}

const EMPTY: SessionEvent[] = [];

export function useSessionEvents(): SessionEvent[] {
  return useSyncExternalStore(subscribe, getSessionEventsSnapshot, () => EMPTY);
}
