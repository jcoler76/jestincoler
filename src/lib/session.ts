import { getGeo } from "@/lib/geo";

export interface SessionInfo {
  city?: string;
  region?: string;
  os?: string;
  browser?: string;
  device?: "mobile" | "desktop";
  timeOfDay?: "late night" | "early morning";
  language?: string;
}

function parseUserAgent(ua: string): Pick<SessionInfo, "os" | "browser" | "device"> {
  if (!ua) return {};
  let os: string | undefined;
  if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Macintosh|Mac OS X/.test(ua)) os = "macOS";
  else if (/Windows/.test(ua)) os = "Windows";
  else if (/Linux/.test(ua)) os = "Linux";

  let browser: string | undefined;
  // iOS browsers report CriOS/EdgiOS/FxiOS (all WebKit) — check before the Safari fallback.
  if (/Edg\/|EdgiOS\//.test(ua)) browser = "Edge";
  else if (/Chrome\/|CriOS\//.test(ua)) browser = "Chrome";
  else if (/Firefox\/|FxiOS\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  const device: "mobile" | "desktop" = /Mobile|iPhone|Android/.test(ua) ? "mobile" : "desktop";
  return { os, browser, device };
}

const LANGUAGES: Record<string, string> = {
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  it: "Italian",
  ja: "Japanese",
  zh: "Chinese",
  ko: "Korean",
  ru: "Russian",
  hi: "Hindi",
  ar: "Arabic",
  nl: "Dutch",
  sv: "Swedish",
  pl: "Polish",
  tr: "Turkish",
};

function parseLanguage(header: string | null): string | undefined {
  const first = header?.split(",")[0]?.trim().toLowerCase();
  if (!first) return undefined;
  const code = first.split("-")[0];
  if (code === "en") return undefined; // English is the default — no signal
  return LANGUAGES[code]; // undefined for unmapped/unknown codes
}

function funnyTimeOfDay(headers: Headers, now: Date): SessionInfo["timeOfDay"] {
  const tz = headers.get("x-vercel-ip-timezone");
  if (!tz) return undefined;
  let hour: number;
  try {
    hour = parseInt(
      new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hourCycle: "h23" }).format(now),
      10,
    );
  } catch {
    return undefined; // invalid timezone
  }
  if (Number.isNaN(hour)) return undefined;
  if (hour <= 4 || hour === 23) return "late night";
  if (hour >= 5 && hour <= 7) return "early morning";
  return undefined;
}

export function getSession(headers: Headers, now: Date = new Date()): SessionInfo {
  const geo = getGeo(headers);
  const ua = parseUserAgent(headers.get("user-agent") ?? "");
  return {
    city: geo.city,
    region: geo.region,
    os: ua.os,
    browser: ua.browser,
    device: ua.device,
    timeOfDay: funnyTimeOfDay(headers, now),
    language: parseLanguage(headers.get("accept-language")),
  };
}
