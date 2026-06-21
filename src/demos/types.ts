export interface DemoMeta {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  comingSoon?: boolean;
}

export interface DemoResult {
  output: string;
}

// A handler receives the parsed JSON request body and returns a text result.
// It validates its own input and throws Error(message) on bad input.
export type DemoHandler = (input: unknown) => Promise<DemoResult>;

// Thrown by handlers for user-facing input validation errors (safe to surface as 400).
export class ValidationError extends Error {}
