"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import { CopyBlock, StaticBlock } from "./EquipmentBlocks";

const NAVY = "#0d417b";

function PlanAccordion({ plans, viewPlanLabel }) {
  const [openId, setOpenId] = useState(plans[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {plans.map((plan) => {
        const isOpen = openId === plan.id;
        return (
          <div key={plan.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : plan.id)}
              className="flex w-full items-center justify-between gap-4 bg-[#3a3a3a] px-5 py-4 md:px-8 md:py-5 text-left transition-colors hover:bg-[#2f2f2f]"
            >
              <div className="flex flex-wrap items-center gap-2 md:gap-3 min-w-0">
                {plan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 border border-white/30 px-2 py-0.5 text-[10px] md:text-[11px] tracking-[0.08em] text-white/90"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-sm md:text-base font-medium tracking-[0.06em] text-white truncate">
                  {plan.title}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-white/80">
                <span className="hidden md:inline text-xs tracking-[0.15em]">
                  {viewPlanLabel}
                </span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="bg-[#f4f4f4] px-5 py-8 md:px-10 md:py-10">
                <div className="mx-auto max-w-[1000px]">
                  {plan.image && (
                    <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden bg-white">
                      <Image
                        src={plan.image}
                        alt={plan.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width:768px) 100vw, 1000px"
                      />
                    </div>
                  )}
                  <ul className="m-0 list-none space-y-2 p-0">
                    {plan.specs.map((spec) => (
                      <li
                        key={spec}
                        className="text-sm leading-relaxed text-gray-600 border-b border-gray-200 pb-2"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                  {plan.note && (
                    <p className="mt-6 text-[11px] leading-relaxed text-gray-400">
                      {plan.note}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FaqSection({ items, heading }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-16 md:px-10 md:py-24 lg:px-16"
      aria-labelledby="toilet-faq-heading"
    >
      <div className="mx-auto max-w-[900px]">
        <CopyBlock>
          <h2
            id="toilet-faq-heading"
            className="m-0 mb-10 md:mb-12 text-center font-serif text-xl md:text-2xl tracking-[0.12em] text-gray-900"
          >
            {heading}
          </h2>
        </CopyBlock>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="overflow-hidden border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 md:px-8 text-left transition-colors hover:bg-gray-50"
                >
                  <h3 className="m-0 text-sm md:text-base font-medium tracking-[0.06em] text-gray-900">
                    {item.question}
                  </h3>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 text-sm text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ↓
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={!isOpen}
                  className="border-t border-gray-100 px-5 py-5 md:px-8 md:py-6"
                >
                  <p className="m-0 text-sm leading-[2] text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function EquipmentToiletPage() {
  const t = useTranslations("equipmentToiletPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const plans = t.raw("plans.items");
  const catalogPages = t.raw("catalog.pages");
  const features = t.raw("features.items");
  const faqItems = t.raw("faq.items");

  const homeHref = getLocalizedPath("/", locale);
  const equipmentHref = getLocalizedPath("/equipment", locale);

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative w-full bg-[#eef2f6]">
          <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row">
            <div className="relative h-[320px] w-full md:h-[480px] md:w-[55%]">
              <Image
                src={t("hero.image")}
                alt={t("hero.imageAlt")}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width:768px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-12 md:py-16 bg-[#e8edf2]">
              <CopyBlock>
                <p className="m-0 text-[10px] tracking-[0.3em] text-gray-500 mb-4">
                  {t("hero.category")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.05}>
                <p className="m-0 font-serif text-4xl md:text-5xl tracking-[0.08em] text-gray-900 mb-2">
                  {t("hero.brand")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.1}>
                <h1 className="m-0 text-2xl md:text-3xl font-light tracking-[0.2em] text-[#1a4a8a] mb-6">
                  {t("hero.title")}
                </h1>
              </CopyBlock>
              <CopyBlock delay={0.15}>
                <p className="m-0 text-sm tracking-[0.12em] text-gray-600 mb-4">
                  {t("hero.model")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.2}>
                <p className="m-0 text-sm leading-[2] text-gray-500 max-w-md">
                  {t("hero.description")}
                </p>
              </CopyBlock>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav
          aria-label={t("breadcrumb.ariaLabel")}
          className="border-b border-gray-100 bg-[#f7f7f7] px-6 py-3 md:px-10 text-[11px] tracking-[0.08em] text-gray-500"
        >
          <Link href={homeHref} className="hover:text-gray-800 transition-colors">
            {t("breadcrumb.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href={equipmentHref} className="hover:text-gray-800 transition-colors">
            {t("breadcrumb.equipment")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{t("breadcrumb.current")}</span>
        </nav>

        {/* Intro */}
        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[900px] text-center">
            <CopyBlock>
              <h2 className="m-0 font-serif text-xl md:text-2xl tracking-[0.12em] text-gray-900 mb-6">
                {t("intro.heading")}
              </h2>
            </CopyBlock>
            <CopyBlock delay={0.08}>
              <p className="m-0 text-sm leading-[2.2] text-gray-600 whitespace-pre-line">
                {t("intro.body")}
              </p>
            </CopyBlock>
          </div>
        </section>

        {/* Plan accordion */}
        <section className="bg-[#ececec] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <CopyBlock>
              <h2 className="m-0 mb-10 text-center text-lg md:text-xl tracking-[0.15em] text-gray-800">
                {t("plans.heading")}
              </h2>
            </CopyBlock>
            <PlanAccordion plans={plans} viewPlanLabel={t("plans.viewPlan")} />
          </div>
        </section>

        {/* Feature highlight */}
        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <CopyBlock>
              <h2 className="m-0 mb-12 text-center text-lg md:text-xl tracking-[0.15em] text-gray-800">
                {t("features.heading")}
              </h2>
            </CopyBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="relative aspect-[4/3] bg-[#f4f4f4]">
                <Image
                  src={t("features.image")}
                  alt={t("features.imageAlt")}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width:768px) 100vw, 550px"
                />
              </div>
              <div className="space-y-6">
                {features.map((item, i) => (
                  <CopyBlock key={item.title} delay={i * 0.06}>
                    <div>
                      <h3 className="m-0 text-base font-medium tracking-[0.08em] text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="m-0 text-sm leading-[2] text-gray-500">
                        {item.body}
                      </p>
                    </div>
                  </CopyBlock>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Spec comparison */}
        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <CopyBlock>
              <h2 className="m-0 mb-10 text-center text-lg md:text-xl tracking-[0.15em] text-gray-800">
                {t("specs.heading")}
              </h2>
            </CopyBlock>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.raw("specs.items").map((item, i) => (
                <StaticBlock key={item.title}>
                  <div className="bg-white p-6 md:p-8 text-center">
                    <div className="relative mx-auto mb-5 aspect-square max-w-[200px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="200px"
                      />
                    </div>
                    <h3 className="m-0 text-sm font-medium tracking-[0.08em] text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <ul className="m-0 list-none space-y-1 p-0 text-xs text-gray-500">
                      {item.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </StaticBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Full catalog pages from PDF */}
        <section className="bg-white px-6 md:px-10 pb-6">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-t border-gray-100 py-10">
              <CopyBlock>
                <h2 className="m-0 text-center text-lg tracking-[0.15em] text-gray-800">
                  {t("catalog.heading")}
                </h2>
              </CopyBlock>
            </div>
            <div className="space-y-4 md:space-y-6">
              {catalogPages.map((src, i) => (
                <div key={src} className="w-full overflow-hidden rounded-sm bg-[#fafafa]">
                  <Image
                    src={src}
                    alt={`${t("catalog.pageAlt")} ${i + 1}`}
                    width={1400}
                    height={788}
                    className="h-auto w-full max-w-[1400px]"
                    sizes="(max-width: 1400px) 100vw, 1400px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection items={faqItems} heading={t("faq.heading")} />
      </main>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: NAVY }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
