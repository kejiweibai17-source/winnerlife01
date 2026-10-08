const STORAGE_KEY = "lead_attribution_v1";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  /** Facebook click id when present */
  fbclid?: string;
  /** Google Ads click id when present */
  gclid?: string;
  /** First landing path (no origin) */
  landing_path?: string;
  /** Hostname of document.referrer on first landing (external only) */
  referrer?: string;
  /** In-app browser detected from user agent (instagram / facebook / line …) */
  in_app?: string;
  /** ISO timestamp of first capture in this session */
  captured_at?: string;
};

function cleanParam(value: string | null | undefined, max = 120): string {
  if (!value) return "";
  return String(value).trim().slice(0, max);
}

const SOURCE_LABELS: { match: string[]; label: string }[] = [
  { match: ["instagram", "ig"], label: "Instagram" },
  { match: ["facebook", "fb", "meta"], label: "Facebook" },
  { match: ["line"], label: "LINE" },
  { match: ["threads"], label: "Threads" },
  { match: ["youtube", "yt"], label: "YouTube" },
  { match: ["weekly", "magazine"], label: "週刊／雜誌" },
  { match: ["newspaper"], label: "報紙" },
  { match: ["qrcode", "qr", "qr_code"], label: "QR Code" },
  { match: ["google"], label: "Google" },
  { match: ["edm", "email", "newsletter"], label: "EDM／電子報" },
];

const REFERRER_SOURCES: { pattern: RegExp; source: string }[] = [
  { pattern: /(^|\.)instagram\.com$/, source: "instagram" },
  { pattern: /(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$/, source: "facebook" },
  { pattern: /(^|\.)(line\.me|line-apps\.com|lin\.ee)$/, source: "line" },
  { pattern: /(^|\.)threads\.(net|com)$/, source: "threads" },
  { pattern: /(^|\.)(youtube\.com|youtu\.be)$/, source: "youtube" },
  { pattern: /(^|\.)google\.[a-z.]+$/, source: "google" },
  { pattern: /(^|\.)bing\.com$/, source: "bing" },
  { pattern: /(^|\.)yahoo\.(com|co\.jp)$/, source: "yahoo" },
];

const IN_APP_BROWSERS: { pattern: RegExp; source: string }[] = [
  { pattern: /Instagram/i, source: "instagram" },
  { pattern: /FBAN|FBAV|FB_IAB|FBIOS/i, source: "facebook" },
  { pattern: /\bLine\//i, source: "line" },
  { pattern: /Barcelona/i, source: "threads" },
];

function sourceLabel(source: string): string {
  const s = source.toLowerCase();
  return SOURCE_LABELS.find((item) => item.match.includes(s))?.label || source;
}

function detectReferrerSource(host: string | undefined): string {
  if (!host) return "";
  return REFERRER_SOURCES.find((item) => item.pattern.test(host))?.source || "";
}

/** Friendly label for ops email / CRM */
export function formatAttributionLabel(attr: LeadAttribution | null | undefined): string {
  if (!attr) return "未知／直接造訪";

  const source = (attr.utm_source || "").toLowerCase();
  const campaign = attr.utm_campaign ? `（${attr.utm_campaign}）` : "";
  const content = attr.utm_content ? ` - ${attr.utm_content}` : "";

  if (source) {
    const label = sourceLabel(source);
    const paid = attr.utm_medium === "paid" || attr.utm_medium === "cpc" ? " 廣告" : "";
    return `${label}${paid}${campaign}${content}`;
  }
  if (attr.fbclid) return "Facebook／Instagram（點擊連結，未帶 UTM）";
  if (attr.gclid) return "Google 廣告";

  const referrerSource = detectReferrerSource(attr.referrer);
  if (referrerSource === "google" || referrerSource === "bing" || referrerSource === "yahoo") {
    return `${sourceLabel(referrerSource)} 搜尋`;
  }
  if (referrerSource) return `${sourceLabel(referrerSource)}（未帶 UTM，由來源網站判斷）`;
  if (attr.in_app) return `${sourceLabel(attr.in_app)}（未帶 UTM，由 App 內建瀏覽器判斷）`;
  if (attr.referrer) return `外部網站（${attr.referrer}）`;
  if (attr.landing_path) return `直接造訪（${attr.landing_path}）`;
  return "未知／直接造訪";
}

export function readStoredAttribution(): LeadAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadAttribution;
  } catch {
    return null;
  }
}

function externalReferrerHost(): string {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname.toLowerCase();
    return host === window.location.hostname.toLowerCase() ? "" : host;
  } catch {
    return "";
  }
}

function detectInAppBrowser(): string {
  const ua = navigator.userAgent || "";
  return IN_APP_BROWSERS.find((item) => item.pattern.test(ua))?.source || "";
}

/**
 * Capture UTM / click ids / referrer from the current URL once per tab session.
 * Later navigations without params keep the first touch.
 */
export function captureLeadAttributionFromUrl(): LeadAttribution | null {
  if (typeof window === "undefined") return null;

  const existing = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const isFirstCapture = !existing;

  const next: LeadAttribution = { ...(existing || {}) };
  let changed = false;

  for (const key of UTM_KEYS) {
    const value = cleanParam(params.get(key));
    if (value && !next[key]) {
      next[key] = value;
      changed = true;
    }
  }

  for (const key of ["fbclid", "gclid"] as const) {
    const value = cleanParam(params.get(key), 200);
    if (value && !next[key]) {
      next[key] = value;
      changed = true;
    }
  }

  if (isFirstCapture) {
    const referrer = externalReferrerHost();
    if (referrer) next.referrer = referrer;
    const inApp = detectInAppBrowser();
    if (inApp) next.in_app = inApp;
  }

  if (!next.landing_path) {
    next.landing_path = `${window.location.pathname}${window.location.search}`;
    changed = true;
  }

  if (!next.captured_at) {
    next.captured_at = new Date().toISOString();
    changed = true;
  }

  if (changed || isFirstCapture) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / private mode */
    }
  }

  return next;
}

/** Payload fragment to attach on form submit */
export function getAttributionPayload(): LeadAttribution {
  const attr = readStoredAttribution() || captureLeadAttributionFromUrl();
  return attr || {};
}

/** Server-side: keep only known string fields, trimmed */
export function sanitizeAttribution(input: unknown): LeadAttribution {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string, unknown>;
  const out: LeadAttribution = {};
  const keys: (keyof LeadAttribution)[] = [
    ...UTM_KEYS,
    "fbclid",
    "gclid",
    "landing_path",
    "referrer",
    "in_app",
    "captured_at",
  ];
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) {
      out[key] = cleanParam(value, key === "landing_path" ? 300 : 200);
    }
  }
  return out;
}
