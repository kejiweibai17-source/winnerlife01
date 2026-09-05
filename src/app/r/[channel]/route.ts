import { NextResponse } from "next/server";
import { landingPage01Path } from "@/lib/landing-page-01-path";

export const runtime = "nodejs";

/**
 * Fixed short links for FB / QR — always inject UTM so form emails can attribute.
 *
 * Use these (replace host with production domain):
 *   /r/fb          → 落地頁（Facebook）
 *   /r/qr          → 落地頁（QR Code）
 *   /r/fb-contact  → 聯絡表單（Facebook）
 *   /r/qr-contact  → 聯絡表單（QR Code）
 */
const CHANNELS: Record<
  string,
  { path: string; utm_source: string; utm_medium: string; utm_campaign: string }
> = {
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
};

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

  const url = new URL(dest.path, request.url);
  url.searchParams.set("utm_source", dest.utm_source);
  url.searchParams.set("utm_medium", dest.utm_medium);
  url.searchParams.set("utm_campaign", dest.utm_campaign);

  return NextResponse.redirect(url, 302);
}
