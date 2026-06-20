"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import { CopyBlock, StaticBlock } from "./EquipmentBlocks";

const NAVY = "#0d417b";

function FaqSection({ items, heading, subtitle, idPrefix = "kitchen" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-16 md:px-10 md:py-24 lg:px-16"
      aria-labelledby={`${idPrefix}-faq-heading`}
    >
      <div className="mx-auto max-w-[900px]">
        <CopyBlock>
          <p className="m-0 mb-3 text-center text-[10px] tracking-[0.35em] text-gray-400">
            {subtitle}
          </p>
        </CopyBlock>
        <CopyBlock delay={0.05}>
          <h2
            id={`${idPrefix}-faq-heading`}
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
                  id={`${idPrefix}-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`${idPrefix}-faq-answer-${index}`}
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
                  id={`${idPrefix}-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-faq-question-${index}`}
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

function LayoutAccordion({ layouts, viewLabel }) {
  const [openId, setOpenId] = useState(layouts[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {layouts.map((layout) => {
        const isOpen = openId === layout.id;
        return (
          <div key={layout.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : layout.id)}
              className="flex w-full items-center justify-between gap-4 bg-[#3a3a3a] px-5 py-4 md:px-8 md:py-5 text-left transition-colors hover:bg-[#2f2f2f]"
            >
              <div className="min-w-0">
                <span className="block text-sm md:text-base font-medium tracking-[0.08em] text-white">
                  {layout.title}
                </span>
                {layout.subtitle && (
                  <span className="mt-1 block text-[11px] tracking-[0.1em] text-white/60">
                    {layout.subtitle}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3 text-white/80">
                <span className="hidden md:inline text-xs tracking-[0.15em]">
                  {viewLabel}
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
                <p className="mx-auto mb-8 max-w-[820px] text-sm leading-[2.2] text-gray-600">
                  {layout.body}
                </p>
                <div
                  className={`mx-auto grid max-w-[1000px] gap-4 md:gap-6 ${
                    layout.images.length >= 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : layout.images.length === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1"
                  }`}
                >
                  {layout.images.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] overflow-hidden bg-white"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width:768px) 100vw, 500px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div className="mb-10 md:mb-14 text-center">
      <CopyBlock>
        <p className="m-0 text-[10px] tracking-[0.35em] text-gray-400 mb-3">
          {label}
        </p>
      </CopyBlock>
      <CopyBlock delay={0.05}>
        <h2 className="m-0 font-serif text-xl md:text-2xl tracking-[0.12em] text-gray-900">
          {title}
        </h2>
      </CopyBlock>
    </div>
  );
}

export default function EquipmentKitchenPage() {
  const t = useTranslations("equipmentKitchenPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";

  const homeHref = getLocalizedPath("/", locale);
  const equipmentHref = getLocalizedPath("/equipment", locale);

  const conceptParagraphs = t.raw("concept.paragraphs");
  const featureParagraphs = t.raw("features.paragraphs");
  const layouts = t.raw("layouts.items");
  const equipment = t.raw("equipment.items");
  const setPlans = t.raw("setPlans.items");
  const cases = t.raw("cases.items");
  const faqItems = t.raw("faq.items");

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      <main className="pt-20 md:pt-24">
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
                  {t("hero.tag")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.05}>
                <h1 className="m-0 font-serif text-3xl md:text-4xl tracking-[0.1em] text-gray-900 mb-2">
                  {t("hero.title")}
                </h1>
              </CopyBlock>
              <CopyBlock delay={0.08}>
                <p className="m-0 text-base md:text-lg tracking-[0.12em] text-[#1a4a8a] mb-6">
                  {t("hero.product")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.12}>
                <p className="m-0 text-sm leading-[2] text-gray-500 max-w-md">
                  {t("hero.description")}
                </p>
              </CopyBlock>
            </div>
          </div>
        </section>

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

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("concept.label")} title={t("concept.heading")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="space-y-6">
                {conceptParagraphs.map((para, i) => (
                  <CopyBlock key={para} delay={i * 0.06}>
                    <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
                      {para}
                    </p>
                  </CopyBlock>
                ))}
              </div>
              <div className="relative aspect-[4/3] bg-[#f4f4f4]">
                <Image
                  src={t("concept.image")}
                  alt={t("concept.imageAlt")}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width:768px) 100vw, 550px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("features.label")} title={t("features.heading")} />
            <div className="mx-auto mb-12 max-w-[820px] space-y-6">
              {featureParagraphs.map((para, i) => (
                <CopyBlock key={para} delay={i * 0.06}>
                  <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
                    {para}
                  </p>
                </CopyBlock>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <StaticBlock>
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={t("features.imageMain")}
                    alt={t("features.imageMainAlt")}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width:768px) 100vw, 550px"
                  />
                </div>
              </StaticBlock>
              <StaticBlock>
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={t("features.imageDiagram")}
                    alt={t("features.imageDiagramAlt")}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width:768px) 100vw, 550px"
                  />
                </div>
              </StaticBlock>
            </div>
            {t("features.note") && (
              <CopyBlock delay={0.1}>
                <p className="m-0 mt-8 text-center text-[11px] leading-relaxed text-gray-400">
                  {t("features.note")}
                </p>
              </CopyBlock>
            )}
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("layouts.label")} title={t("layouts.heading")} />
            <LayoutAccordion layouts={layouts} viewLabel={t("layouts.viewLabel")} />
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("colors.label")} title={t("colors.heading")} />
            <CopyBlock>
              <p className="mx-auto mb-10 max-w-[820px] text-center text-sm leading-[2.2] text-gray-600">
                {t("colors.body")}
              </p>
            </CopyBlock>
            <div className="relative mx-auto aspect-[16/7] max-w-[900px] overflow-hidden bg-white">
              <Image
                src={t("colors.image")}
                alt={t("colors.imageAlt")}
                fill
                className="object-contain p-4"
                sizes="(max-width:900px) 100vw, 900px"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("equipment.label")} title={t("equipment.heading")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.map((item) => (
                <StaticBlock key={item.title}>
                  <figure className="m-0 overflow-hidden bg-[#fafafa]">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width:768px) 100vw, 360px"
                      />
                    </div>
                    <figcaption className="px-5 py-4 text-center text-xs tracking-[0.1em] text-gray-600 border-t border-gray-100">
                      {item.title}
                    </figcaption>
                  </figure>
                </StaticBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#ececec] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("setPlans.label")} title={t("setPlans.heading")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {setPlans.map((plan) => (
                <StaticBlock key={plan.image}>
                  <div className="overflow-hidden bg-white">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={plan.image}
                        alt={plan.title}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width:768px) 100vw, 360px"
                      />
                    </div>
                    <p className="m-0 px-4 py-3 text-center text-[11px] tracking-[0.08em] text-gray-600">
                      {plan.title}
                    </p>
                  </div>
                </StaticBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("cases.label")} title={t("cases.heading")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {cases.map((item) => (
                <StaticBlock key={item.image}>
                  <div className="overflow-hidden bg-[#fafafa]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1100}
                      height={700}
                      className="h-auto w-full"
                      sizes="(max-width:1100px) 100vw, 550px"
                    />
                  </div>
                </StaticBlock>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          items={faqItems}
          heading={t("faq.heading")}
          subtitle={t("faq.subtitle")}
        />
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
