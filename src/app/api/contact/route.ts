import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type ContactPayload = {
  /** contact = /contact 說明會報名；landing = OK PRIME 落地頁預約 */
  source?: "contact" | "landing";
  name?: string;
  salutation?: string;
  session?: string;
  region?: string;
  guests?: string;
  phone?: string;
  contactTime?: string;
  email?: string;
  note?: string;
  locale?: "zh" | "jp";
  /** honeypot — bots fill this; humans leave empty */
  website?: string;
};

/** Per-instance cooldown (best-effort on serverless). Key → last send ms */
const recentSends = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;
const RATE_LIMIT_MAX_KEYS = 500;

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const last = recentSends.get(key);
  if (last && now - last < RATE_LIMIT_MS) return true;
  if (recentSends.size > RATE_LIMIT_MAX_KEYS) recentSends.clear();
  recentSends.set(key, now);
  return false;
}

export async function POST(request: Request) {
  // Emergency kill switch — set CONTACT_EMAIL_ENABLED=false to stop all sends
  if (process.env.CONTACT_EMAIL_ENABLED === "false") {
    return NextResponse.json({ error: "mail_disabled" }, { status: 503 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const source = body.source === "landing" ? "landing" : "contact";
  const name = clean(body.name, 80);
  const salutation = clean(body.salutation, 40);
  const session = clean(body.session, 120);
  const region = clean(body.region, 80);
  const guests = clean(body.guests, 40) || "1";
  const phone = clean(body.phone, 20);
  const contactTime = clean(body.contactTime, 80);
  const email = clean(body.email, 120);
  const note = clean(body.note, 2000);
  const locale = body.locale === "jp" ? "jp" : "zh";

  if (!name || !phone) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (source === "contact" && (!salutation || !session || !region)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (phone.replace(/\D/g, "").length > 15) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip = clientIp(request);
  const rateKey = `${ip}|${phone}|${name}`;
  if (isRateLimited(rateKey)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from =
    process.env.RESEND_FROM_EMAIL ||
    `${siteConfig.name} <noreply@winnerlife.com>`;

  const subject =
    source === "landing"
      ? `【OK PRIME 白金高輪】落地頁說明會預約 — ${name}`
      : locale === "jp"
        ? `【${siteConfig.buildingName}】説明会申込 — ${name}`
        : `【${siteConfig.buildingName}】說明會報名 — ${name}`;

  const sourceUrl =
    source === "landing"
      ? `${siteConfig.url}/ok-prime-shirokane-takanawa`
      : locale === "jp"
        ? `${siteConfig.url}/jp/contact`
        : `${siteConfig.url}/contact`;

  const lines =
    source === "landing"
      ? [
          "OK PRIME 白金高輪 — 落地頁海外置產說明會預約",
          "",
          `姓名: ${name}`,
          `電話: ${phone}`,
          email ? `Email: ${email}` : "",
          session ? `報名場次: ${session}` : "",
          `參加人數: ${guests}`,
          note ? `備註: ${note}` : "",
          "",
          `來源頁面: ${sourceUrl}`,
          `收件: ${to}`,
        ]
      : locale === "jp"
        ? [
            "OK PRIME+ 白金高輪 説明会申込（公式サイト）",
            "",
            `氏名: ${name}`,
            `敬称: ${salutation}`,
            `セミナー: ${session}`,
            `地域: ${region}`,
            `人数: ${guests}`,
            `電話: ${phone}`,
            contactTime ? `連絡時間: ${contactTime}` : "",
            email ? `Email: ${email}` : "",
            note ? `備考: ${note}` : "",
            "",
            `送信元: ${sourceUrl}`,
            `受信: ${to}`,
          ]
        : [
            "OK PRIME+ 白金高輪 說明會報名（官方網站）",
            "",
            `姓名: ${name}`,
            `稱謂: ${salutation}`,
            `報名場次: ${session}`,
            `所在區域: ${region}`,
            `人數: ${guests}`,
            `電話: ${phone}`,
            contactTime ? `聯繫時段: ${contactTime}` : "",
            email ? `Email: ${email}` : "",
            note ? `備註: ${note}` : "",
            "",
            `來源頁面: ${sourceUrl}`,
            `收件: ${to}`,
          ];

  const text = lines.filter(Boolean).join("\n");

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email || undefined,
      subject,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "send_failed", detail: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
