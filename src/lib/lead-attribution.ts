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
  /** First landing path (no origin) */
  landing_path?: string;
  /** ISO timestamp of first capture in this session */
  captured_at?: string;
};

function cleanParam(value: string | null, max = 120): string {
  if (!value) return "";
  return value.trim().slice(0, max);
}

/** Friendly label for ops email / CRM */
export function formatAttributionLabel(attr: LeadAttribution | null | undefined): string {
  if (!attr) return "未知／直接造訪";

  const source = (attr.utm_source || "").toLowerCase();
  if (source === "facebook" || source === "fb" || source === "meta" || attr.fbclid) {
    const campaign = attr.utm_campaign ? `（${attr.utm_campaign}）` : "";
    return `Facebook 廣告${campaign}`;
  }
  if (source === "qrcode" || source === "qr" || source === "qr_code") {
    const campaign = attr.utm_campaign ? `（${attr.utm_campaign}）` : "";
    return `QR Code${campaign}`;
  }
  if (attr.utm_source) {
    const parts = [attr.utm_source, attr.utm_medium, attr.utm_campaign].filter(Boolean);
    return parts.join(" / ");
  }
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

/**
 * Capture UTM / fbclid from the current URL once per tab session.
 * Later navigations without params keep the first touch.
 */
export function captureLeadAttributionFromUrl(): LeadAttribution | null {
  if (typeof window === "undefined") return null;

  const existing = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);

  const next: LeadAttribution = { ...(existing || {}) };
  let changed = false;

  for (const key of UTM_KEYS) {
    const value = cleanParam(params.get(key));
    if (value && !next[key]) {
      next[key] = value;
      changed = true;
    }
  }

  const fbclid = cleanParam(params.get("fbclid"), 200);
  if (fbclid && !next.fbclid) {
    next.fbclid = fbclid;
    changed = true;
  }

  if (!next.landing_path) {
    next.landing_path = `${window.location.pathname}${window.location.search}`;
    changed = true;
  }

  if (!next.captured_at) {
    next.captured_at = new Date().toISOString();
    changed = true;
  }

  // Only persist if we have any useful signal or first path
  const hasSignal =
    Boolean(next.utm_source) ||
    Boolean(next.fbclid) ||
    Boolean(next.landing_path);

  if (hasSignal && (changed || !existing)) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / private mode */
    }
  }

  return hasSignal ? next : existing;
}

/** Payload fragment to attach on form submit */
export function getAttributionPayload(): LeadAttribution {
  const attr = readStoredAttribution() || captureLeadAttributionFromUrl();
  return attr || {};
}
