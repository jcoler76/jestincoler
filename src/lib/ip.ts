// Resolve the client IP for rate-limiting. Prefer x-real-ip (set by Vercel's proxy and not
// client-overridable). Fall back to the RIGHTMOST x-forwarded-for entry — the real connecting IP
// the proxy appends; clients can only PREPEND spoofed entries, so the rightmost is hardest to
// forge. (Deliberate anti-spoof choice — do NOT switch to the leftmost entry.)
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip")?.trim() ||
    headers
      .get("x-forwarded-for")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .at(-1) ||
    "anon"
  );
}
