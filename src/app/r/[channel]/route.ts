import { NextResponse } from "next/server";
import { landingPage01Path } from "@/lib/landing-page-01-path";

export const runtime = "nodejs";

/**
 * Fixed short links per marketing channel — always inject UTM so GA4 and
 * form emails can attribute the visit.
 *
 * Use these (replace host with production domain):
 *   /r/fb          → 落地頁（Facebook 廣告）
 *   /r/qr          → 落地頁（QR Code）
 *   /r/fb-contact  → 聯絡表單（Facebook 廣告）
 *   /r/qr-contact  → 聯絡表單（QR Code）
 *
 *   /r/ig          → 官網首頁（Instagram）
 *   /r/facebook    → 官網首頁（Facebook 粉專貼文）
 *   /r/line        → 官網首頁（LINE）
 *   /r/threads     → 官網首頁（Threads）
 *   /r/yt          → 官網首頁（YouTube）
 *   /r/weekly      → 官網首頁（週刊／雜誌）
 *   /r/newspaper   → 官網首頁（報紙）
 *   /r/edm         → 官網首頁（EDM／電子報）
 *
 * Optional query:
 *   ?to=/contact       → change destination (internal paths only)
 *   ?c=今周刊-1450     → utm_content, e.g. which issue / post / ad
 */
type Channel = {
  path: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

const CHANNELS: Record<string, Channel> = {
  fb: {
    path: landingPage01Path,
    utm_source: "facebook",
    utm_medium: "paid",
    utm_campaign: "seminar",
  },
  qr: {
    path: landingPage01Path,
    utm_source: "qrcode",
    utm_medium: "offline",
    utm_campaign: "seminar",
  },
  "fb-contact": {
    path: "/contact",
    utm_source: "facebook",
    utm_medium: "paid",
    utm_campaign: "seminar",
  },
  "qr-contact": {
    path: "/contact",
    utm_source: "qrcode",
    utm_medium: "offline",
    utm_campaign: "seminar",
  },
  ig: { path: "/", utm_source: "instagram", utm_medium: "social", utm_campaign: "okprime" },
  facebook: { path: "/", utm_source: "facebook", utm_medium: "social", utm_campaign: "okprime" },
  line: { path: "/", utm_source: "line", utm_medium: "social", utm_campaign: "okprime" },
  threads: { path: "/", utm_source: "threads", utm_medium: "social", utm_campaign: "okprime" },
  yt: { path: "/", utm_source: "youtube", utm_medium: "social", utm_campaign: "okprime" },
  weekly: { path: "/", utm_source: "weekly", utm_medium: "print", utm_campaign: "okprime" },
  newspaper: { path: "/", utm_source: "newspaper", utm_medium: "print", utm_campaign: "okprime" },
  edm: { path: "/", utm_source: "edm", utm_medium: "email", utm_campaign: "okprime" },
};

function safeInternalPath(value: string | null): string | null {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return null;
  return value.slice(0, 200);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ channel: string }> },
) {
  const { channel } = await context.params;
  const key = (channel || "").toLowerCase();
  const dest = CHANNELS[key];

  if (!dest) {
    return NextResponse.redirect(new URL(landingPage01Path, request.url), 302);
  }

  const query = new URL(request.url).searchParams;
  const path = safeInternalPath(query.get("to")) || dest.path;
  const content = (query.get("c") || "").trim().slice(0, 100);

  const url = new URL(path, request.url);
  url.searchParams.set("utm_source", dest.utm_source);
  url.searchParams.set("utm_medium", dest.utm_medium);
  url.searchParams.set("utm_campaign", dest.utm_campaign);
  if (content) url.searchParams.set("utm_content", content);

  return NextResponse.redirect(url, 302);
}
