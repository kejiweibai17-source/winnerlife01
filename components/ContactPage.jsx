"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { getLocalizedPath } from "@/lib/locale-path";
import { CONTACT_FORM_ID, scrollToElementId } from "@/lib/scroll-to";

const NAVY = "#0d417b";
const NAVY_DEEP = "#1a365d";
const GOLD = "#b29759";
const SKY = "#3b82f6";

function GoldArrowButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}) {
  const lenis = useLenis();
  const isHash =
    typeof href === "string" && href.startsWith("#") && href.length > 1;

  const handleClick = (e) => {
    if (isHash) {
      e.preventDefault();
      scrollToElementId(href.slice(1), lenis);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", href);
      }
    }
    onClick?.(e);
  };

  const inner = (
    <>
      <span className="tracking-[0.12em]">{children}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b29759] text-white transition-transform group-hover:translate-x-0.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  const cls = `group inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#1a365d] shadow-lg transition hover:shadow-xl ${className}`;

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-white/90 md:text-[15px]">
      <span className="mt-0.5 shrink-0 text-[#b29759]" aria-hidden>
        ✔
      </span>
      <span>{children}</span>
    </li>
  );
}

function RegionPanel({ region }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-sm border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-sm sm:h-28 sm:w-40">
          <Image
            src={region.image}
            alt=""
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
        <div className="flex min-h-[7.5rem] min-w-0 flex-1 flex-col sm:min-h-[6.5rem]">
          <p className="m-0 text-[10px] tracking-[0.35em] text-white/50">
            {region.tag}
          </p>
          <h3 className="m-0 mt-2 font-serif text-xl tracking-[0.08em] text-white md:text-2xl">
            {region.title}
          </h3>
          <p className="m-0 mt-2 text-sm leading-relaxed text-white/75">
            {region.subtitle}
          </p>
        </div>
      </div>
      <ul className="m-0 flex-1 list-none space-y-3 p-0">
        {region.points.map((point) => (
          <CheckItem key={point}>{point}</CheckItem>
        ))}
      </ul>
      {region.properties?.length > 0 && (
        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="m-0 mb-3 text-center text-xs tracking-[0.25em] text-[#b29759]">
            {region.propertiesLabel}
          </p>
          <ul className="m-0 list-none space-y-2 p-0 text-center text-sm text-white/85">
            {region.properties.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function SeminarCard({ session }) {
  const lenis = useLenis();

  const goForm = (e) => {
    e.preventDefault();
    scrollToElementId(CONTACT_FORM_ID, lenis);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${CONTACT_FORM_ID}`);
    }
  };

  return (
    <article className="group flex flex-col border border-white/25 bg-white/5 transition hover:bg-white/10 md:flex-row">
      <div className="relative h-44 w-full shrink-0 md:h-auto md:w-48 lg:w-56">
        <Image
          src={session.image}
          alt=""
          fill
          className="object-cover"
          sizes="224px"
        />
        <div className="absolute inset-0 bg-[#0d417b]/40" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <p className="m-0 text-[10px] tracking-[0.3em] text-white/50">
            {session.label}
          </p>
          <h3 className="m-0 mt-2 font-serif text-lg tracking-[0.08em] text-white md:text-xl">
            {session.title}
          </h3>
          <ul className="m-0 mt-4 list-none space-y-2 p-0 text-sm text-white/80">
            {session.dates.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <a
            href={`#${CONTACT_FORM_ID}`}
            onClick={goForm}
            className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition group-hover:bg-white group-hover:text-[#0d417b]"
            aria-label={session.ctaAria}
          >
            →
          </a>
        </div>
      </div>
    </article>
  );
}

function FormField({ label, required, children, hint }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium tracking-[0.06em] text-gray-800">
        {label}
        {required && <span className="ml-1 text-[#c41e3a]">*</span>}
      </label>
      {children}
      {hint && (
        <p className="m-0 text-[11px] leading-relaxed text-gray-400">{hint}</p>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#0d417b] focus:ring-1 focus:ring-[#0d417b]/30";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const pathname = usePathname();
  const lenis = useLenis();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash !== CONTACT_FORM_ID) return;
    const timer = window.setTimeout(() => {
      scrollToElementId(CONTACT_FORM_ID, lenis, { duration: 1.15 });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [lenis]);

  // Local `next dev` compiles /api/contact on first hit (~20s). Warm it on page load
  // so submit isn't blocked after the user finishes filling the form.
  useEffect(() => {
    void fetch("/api/contact", { method: "HEAD" }).catch(() => {});
  }, []);

  const highlights = t.raw("hero.highlights");
  const regions = t.raw("regions.items");
  const reasons = t.raw("reasons.items");
  const sessions = t.raw("seminars.sessions");
  const venues = t.raw("venues.items");
  const sessionOptions = t.raw("form.sessionOptions");
  const regionOptions = t.raw("form.regionOptions");
  const salutationOptions = t.raw("form.salutationOptions");
  const timeOptions = t.raw("form.timeOptions");

  const [form, setForm] = useState({
    name: "",
    salutation: "",
    session: "",
    region: "",
    guests: "1",
    phone: "",
    contactTime: "",
    email: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => {
      scrollToElementId(CONTACT_FORM_ID, lenis, { duration: 0.7, offset: -88 });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [submitted, lenis]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (
      !form.name.trim() ||
      !form.salutation ||
      !form.session ||
      !form.region ||
      !form.phone.trim()
    ) {
      setError(t("form.errorRequired"));
      return;
    }

    if (form.phone.replace(/\D/g, "").length > 10) {
      setError(t("form.errorPhone"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          source: "contact",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.error === "mail_not_configured") {
          setError(t("form.errorConfig"));
        } else {
          setError(t("form.errorSend"));
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setError(t("form.errorSend"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      {/* Hero */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <Image
          src="/images/index/運河.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d417b]/85 via-[#0d417b]/55 to-[#0d417b]/25" />
        <p
          className="pointer-events-none absolute right-[-5%] top-1/2 hidden -translate-y-1/2 select-none font-serif text-[11vw] font-bold leading-none tracking-tighter text-white/10 md:block"
          aria-hidden
        >
          {t("hero.watermark")}
        </p>

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-end px-6 pb-28 pt-32 md:px-12 lg:px-20">
          <p className="m-0 mb-4 text-[11px] tracking-[0.35em] text-white/70">
            {t("hero.eyebrow")}
          </p>
          <h1 className="m-0 max-w-3xl font-serif text-3xl font-medium leading-snug tracking-[0.06em] text-white md:text-5xl lg:text-[3.25rem]">
            {t("hero.title")}
          </h1>
          <ul className="m-0 mt-8 max-w-2xl list-none space-y-2 p-0">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-white/90 md:text-base"
              >
                <span className="text-[#b29759]" aria-hidden>
                  ✸
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldArrowButton href={`#${CONTACT_FORM_ID}`}>
              {t("hero.ctaPrimary")}
            </GoldArrowButton>
            <Link
              href="https://page.line.me/qoi6885d?oat_content=url&openQrModal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              {t("hero.ctaLine")}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/20 bg-[#0d417b]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1400px] items-center gap-6 overflow-x-auto px-6 py-3 text-[11px] tracking-[0.08em] text-white/85 md:px-12">
            <span className="shrink-0 font-medium text-[#b29759]">
              {t("hero.tickerLabel")}
            </span>
            <span className="whitespace-nowrap">{t("hero.tickerText")}</span>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20"
        style={{
          background: `linear-gradient(135deg, ${SKY} 0%, ${NAVY_DEEP} 55%, ${NAVY} 100%)`,
        }}
      >
        <p
          className="pointer-events-none absolute bottom-8 right-4 select-none font-serif text-[14vw] font-bold leading-none tracking-tighter text-white/[0.06] md:right-12"
          aria-hidden
        >
          {t("intro.watermark")}
        </p>
        <div className="relative z-10 mx-auto max-w-[900px]">
          <h2 className="m-0 font-serif text-2xl leading-relaxed tracking-[0.08em] text-white md:text-4xl">
            {t("intro.title")}
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-[2.1] text-white/85 md:text-[15px]">
            {t.raw("intro.paragraphs").map((para) => (
              <p key={para} className="m-0">
                {para}
              </p>
            ))}
          </div>
          <p className="m-0 mt-8 text-center text-sm tracking-[0.2em] text-[#b29759] md:text-left">
            {t("intro.urgency")}
          </p>
          <div className="mt-10">
            <GoldArrowButton href={`#${CONTACT_FORM_ID}`}>
              {t("intro.cta")}
            </GoldArrowButton>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section
        className="relative px-6 py-20 md:px-12 md:py-28"
        style={{ backgroundColor: NAVY }}
      >
        <div className="mx-auto max-w-[1200px]">
          <p className="m-0 text-center text-[10px] tracking-[0.35em] text-white/50">
            {t("regions.label")}
          </p>
          <h2 className="m-0 mt-3 text-center font-serif text-2xl tracking-[0.1em] text-white md:text-3xl">
            {t("regions.heading")}
          </h2>
          <p className="mx-auto m-0 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/70">
            {t("regions.subheading")}
          </p>
          <div className="mt-14 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {regions.map((region) => (
              <RegionPanel key={region.title} region={region} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <GoldArrowButton href={`#${CONTACT_FORM_ID}`}>
              {t("regions.cta")}
            </GoldArrowButton>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-[#f4f7fb] px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="m-0 font-serif text-2xl tracking-[0.1em] text-[#1a365d] md:text-3xl">
            {t("reasons.heading")}
          </h2>
          <p className="m-0 mt-3 text-sm tracking-[0.15em] text-gray-500">
            {t("reasons.subheading")}
          </p>
          <ul className="m-0 mt-12 list-none space-y-4 p-0 text-left md:mx-auto md:max-w-xl">
            {reasons.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-gray-200 pb-4 text-sm leading-relaxed text-gray-700"
              >
                <span className="text-[#b29759]" aria-hidden>
                  ✔
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <GoldArrowButton href={`#${CONTACT_FORM_ID}`}>
              {t("reasons.cta")}
            </GoldArrowButton>
          </div>
        </div>
      </section>

      {/* Seminars */}
      <section
        className="px-6 py-20 md:px-12 md:py-28"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
        }}
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="m-0 text-[10px] tracking-[0.35em] text-white/50">
            {t("seminars.label")}
          </p>
          <h2 className="m-0 mt-3 font-serif text-2xl tracking-[0.1em] text-white md:text-3xl">
            {t("seminars.heading")}
          </h2>
          <p className="m-0 mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            {t("seminars.note")}
          </p>
          <div className="mt-12 space-y-4">
            {sessions.map((session) => (
              <SeminarCard key={session.title} session={session} />
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 text-center font-serif text-xl tracking-[0.12em] text-gray-900 md:text-2xl">
            {t("venues.heading")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {venues.map((venue) => (
              <div
                key={venue.city}
                className="rounded-sm border border-gray-200 bg-[#f7f8fa] p-6 shadow-sm md:p-8"
              >
                <h3 className="m-0 text-sm font-medium tracking-[0.1em] text-[#0d417b]">
                  {venue.city}
                </h3>
                <p className="m-0 mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                  {venue.address}
                </p>
              </div>
            ))}
          </div>
          <p className="m-0 mt-10 text-center text-sm text-gray-500">
            {t("venues.linePrefix")}{" "}
            <Link
              href="https://page.line.me/qoi6885d?oat_content=url&openQrModal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d417b] underline underline-offset-4 hover:opacity-80"
            >
              {t("venues.lineLink")}
            </Link>
            {t("venues.lineSuffix")}
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        id={CONTACT_FORM_ID}
        className="scroll-mt-28 bg-[#eef2f7] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[720px]">
          <div className="mb-10 text-center">
            <h2 className="m-0 font-serif text-2xl tracking-[0.1em] text-gray-900 md:text-3xl">
              {t("form.heading")}
            </h2>
            <p className="m-0 mt-4 text-sm leading-relaxed text-gray-500">
              {t("form.note")}
            </p>
          </div>

          {submitted ? (
            <div
              role="status"
              className="rounded-sm border border-[#0d417b]/20 bg-white p-10 text-center shadow-sm"
            >
              <p className="m-0 font-serif text-xl tracking-[0.08em] text-[#0d417b]">
                {t("form.successTitle")}
              </p>
              <p className="m-0 mt-4 text-sm leading-relaxed text-gray-600">
                {t("form.successBody")}
              </p>
              <p className="m-0 mt-6 text-sm text-gray-500">
                {siteConfig.taipeiPhoneDisplay} · {siteConfig.email}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-sm bg-white p-6 shadow-sm md:p-10"
            >
              {error && (
                <p
                  className="m-0 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField label={t("form.name")} required>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls}
                    autoComplete="name"
                  />
                </FormField>
                <FormField label={t("form.salutation")} required>
                  <select
                    name="salutation"
                    required
                    value={form.salutation}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="">{t("form.selectPlaceholder")}</option>
                    {salutationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField
                label={t("form.session")}
                required
                hint={t("form.sessionHint")}
              >
                <div className="space-y-3">
                  {sessionOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-start gap-3 border px-4 py-3 text-sm transition ${
                        form.session === opt.value
                          ? "border-[#0d417b] bg-[#0d417b]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="session"
                        value={opt.value}
                        checked={form.session === opt.value}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </FormField>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label={t("form.region")}
                  required
                  hint={t("form.regionHint")}
                >
                  <select
                    name="region"
                    required
                    value={form.region}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="">{t("form.selectPlaceholder")}</option>
                    {regionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label={t("form.guests")} required>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField
                label={t("form.phone")}
                required
                hint={t("form.phoneHint")}
              >
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  className={inputCls}
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </FormField>

              <FormField label={t("form.contactTime")}>
                <select
                  name="contactTime"
                  value={form.contactTime}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">{t("form.selectPlaceholder")}</option>
                  {timeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label={t("form.email")}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputCls}
                  autoComplete="email"
                />
              </FormField>

              <FormField label={t("form.remarks")} hint={t("form.remarksHint")}>
                <textarea
                  name="note"
                  rows={4}
                  value={form.note}
                  onChange={handleChange}
                  className={`${inputCls} resize-y min-h-[100px]`}
                />
              </FormField>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-3 rounded-sm bg-[#0d417b] px-8 py-4 text-sm font-medium tracking-[0.15em] text-white transition hover:bg-[#1a365d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t("form.submitting") : t("form.submit")}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b29759] transition group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <div className="border-t border-gray-100 bg-white px-6 py-6 text-center text-[11px] text-gray-400">
        <Link
          href={getLocalizedPath("/", locale)}
          className="hover:text-gray-600"
        >
          ← {t("form.backHome")}
        </Link>
      </div>
    </div>
  );
}
