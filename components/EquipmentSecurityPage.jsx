"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import { CopyBlock, StaticBlock } from "./EquipmentBlocks";

const NAVY = "#0d417b";

function FaqSection({ items, heading, subtitle }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-16 md:px-10 md:py-24 lg:px-16"
      aria-labelledby="security-faq-heading"
    >
      <div className="mx-auto max-w-[900px]">
        <CopyBlock>
          <p className="m-0 mb-3 text-center text-[10px] tracking-[0.35em] text-gray-400">
            {subtitle}
          </p>
        </CopyBlock>
        <CopyBlock delay={0.05}>
          <h2
            id="security-faq-heading"
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
                  id={`security-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`security-faq-answer-${index}`}
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
                  id={`security-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`security-faq-question-${index}`}
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

function SectionHeading({ label, title, subtitle, dark = false }) {
  return (
    <div className="mb-10 md:mb-14 text-center">
      {label && (
        <CopyBlock>
          <p
            className={`m-0 text-[10px] tracking-[0.35em] mb-3 ${dark ? "text-white/50" : "text-gray-400"}`}
          >
            {label}
          </p>
        </CopyBlock>
      )}
      <CopyBlock delay={0.05}>
        <h2
          className={`m-0 font-serif text-xl md:text-2xl tracking-[0.12em] ${dark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h2>
      </CopyBlock>
      {subtitle && (
        <CopyBlock delay={0.08}>
          <p
            className={`mx-auto mt-5 max-w-[820px] text-sm md:text-[15px] leading-[2.2] ${dark ? "text-white/75" : "text-gray-600"}`}
          >
            {subtitle}
          </p>
        </CopyBlock>
      )}
    </div>
  );
}

function MonitoringPillars({ heading, subtitle, items }) {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
          {items.map((item, i) => (
            <React.Fragment key={item.title}>
              <StaticBlock className="flex-1 min-w-0">
                <article className="h-full border border-gray-200 bg-white">
                  <div className="relative aspect-[4/3] w-full bg-[#f7f7f7]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width:768px) 100vw, 360px"
                    />
                  </div>
                  <div className="px-5 py-6 md:px-6 md:py-7 text-center">
                    <CopyBlock delay={i * 0.06}>
                      <h3 className="m-0 text-sm md:text-base font-medium tracking-[0.08em] text-[#1a4a8a] mb-3">
                        {item.title}
                      </h3>
                      <p className="m-0 text-sm leading-[2] text-gray-600">
                        {item.body}
                      </p>
                    </CopyBlock>
                  </div>
                </article>
              </StaticBlock>
              {i < items.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center px-3 text-2xl font-light text-[#1a4a8a]"
                  aria-hidden
                >
                  +
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceGridCard({ item, index }) {
  return (
    <article className="flex flex-col sm:flex-row gap-0 h-full border border-gray-200 bg-white overflow-hidden">
      <StaticBlock>
        <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-44 md:w-52 bg-[#f7f7f7]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width:640px) 100vw, 208px"
          />
        </div>
      </StaticBlock>
      <div className="flex flex-1 flex-col justify-center px-5 py-5 md:px-6 md:py-6">
        <CopyBlock delay={index * 0.04}>
          <h3 className="m-0 text-sm md:text-base font-medium tracking-[0.08em] text-gray-900 pb-3 mb-3 border-b-2 border-[#1a4a8a] w-fit max-w-full">
            {item.title}
          </h3>
          <p className="m-0 text-sm leading-[2] text-gray-600">{item.body}</p>
        </CopyBlock>
      </div>
    </article>
  );
}

function EditorialBlock({ item, reverse = false }) {
  return (
    <article className="border-t border-gray-200 pt-12 md:pt-16 first:border-t-0 first:pt-0">
      <div
        className={`grid grid-cols-1 gap-8 md:gap-12 items-center md:grid-cols-2 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
      >
        <div>
          <CopyBlock>
            <h3 className="m-0 text-lg md:text-xl font-medium tracking-[0.06em] text-gray-900 mb-5">
              {item.title}
            </h3>
          </CopyBlock>
          <CopyBlock delay={0.06}>
            <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
              {item.body}
            </p>
          </CopyBlock>
        </div>
        <div className="relative aspect-[4/3] bg-[#f7f7f7] overflow-hidden">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-contain p-4"
            sizes="(max-width:768px) 100vw, 550px"
          />
        </div>
      </div>
    </article>
  );
}

export default function EquipmentSecurityPage() {
  const t = useTranslations("equipmentSecurityPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";

  const homeHref = getLocalizedPath("/", locale);
  const equipmentHref = getLocalizedPath("/equipment", locale);

  const introParagraphs = t.raw("intro.paragraphs");
  const monitoringPillars = t.raw("monitoring.items");
  const serviceGrid = t.raw("serviceGrid.items");
  const dispatchItems = t.raw("dispatch.items");
  const editorialFeatures = t.raw("editorial.items");
  const devices = t.raw("devices.items");
  const faqItems = t.raw("faq.items");

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      <main className="pt-20 md:pt-24">
        <section className="relative w-full text-white" style={{ backgroundColor: NAVY }}>
          <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row">
            <div className="relative h-[320px] w-full md:h-[480px] md:w-[55%]">
              <Image
                src={t("hero.image")}
                alt={t("hero.imageAlt")}
                fill
                className="object-cover object-center opacity-90"
                priority
                sizes="(max-width:768px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-[#0d417b]/30" />
            </div>
            <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-12 md:py-16">
              <CopyBlock>
                <p className="m-0 text-[10px] tracking-[0.35em] text-white/60 mb-4">
                  {t("hero.tag")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.05}>
                <h1 className="m-0 font-serif text-3xl md:text-4xl tracking-[0.1em] text-white mb-3">
                  {t("hero.title")}
                </h1>
              </CopyBlock>
              <CopyBlock delay={0.08}>
                <p className="m-0 text-sm tracking-[0.15em] text-white/80 mb-6">
                  {t("hero.subtitle")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.12}>
                <p className="m-0 text-sm leading-[2] text-white/70 max-w-md">
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
          <div className="mx-auto max-w-[900px] text-center">
            <CopyBlock>
              <h2 className="m-0 font-serif text-2xl md:text-3xl tracking-[0.1em] text-gray-900 mb-8">
                {t("intro.heading")}
              </h2>
            </CopyBlock>
            <div className="space-y-6">
              {introParagraphs.map((para, i) => (
                <CopyBlock key={para} delay={i * 0.06}>
                  <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
                    {para}
                  </p>
                </CopyBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 md:mb-14 border-b border-gray-200 pb-8 text-center">
              <CopyBlock>
                <p className="m-0 text-[10px] tracking-[0.35em] text-gray-400 mb-3">
                  {t("brand.tag")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.05}>
                <h2 className="m-0 font-serif text-3xl md:text-4xl tracking-[0.1em] text-gray-900">
                  {t("brand.name")}
                </h2>
              </CopyBlock>
              <CopyBlock delay={0.08}>
                <p className="m-0 mt-3 text-base md:text-lg tracking-[0.1em] text-[#1a4a8a]">
                  {t("brand.product")}
                </p>
              </CopyBlock>
            </div>

            <CopyBlock>
              <p className="mx-auto mb-10 max-w-[820px] text-center text-sm md:text-[15px] leading-[2.2] text-gray-600">
                {t("brand.description")}
              </p>
            </CopyBlock>

            <CopyBlock delay={0.05}>
              <p className="m-0 mb-8 text-sm tracking-[0.12em] text-gray-700 text-center md:text-left">
                {t("brand.includesLabel")}
              </p>
            </CopyBlock>
          </div>
        </section>

        <MonitoringPillars
          heading={t("monitoring.heading")}
          subtitle={t("monitoring.subtitle")}
          items={monitoringPillars}
        />

        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading
              label={t("serviceGrid.label")}
              title={t("serviceGrid.heading")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {serviceGrid.map((item, i) => (
                <ServiceGridCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="text-white px-6 py-14 md:px-10 md:py-20 lg:px-16" style={{ backgroundColor: NAVY }}>
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading
              title={t("dispatch.heading")}
              subtitle={t("dispatch.subtitle")}
              dark
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dispatchItems.map((item) => (
                <StaticBlock key={item.title}>
                  <div className="text-center">
                    <div className="relative mx-auto mb-5 aspect-[4/3] max-w-[340px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="340px"
                      />
                    </div>
                    <CopyBlock>
                      <h3 className="m-0 text-sm font-medium tracking-[0.08em] text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="m-0 text-xs leading-[1.9] text-white/70">
                        {item.body}
                      </p>
                    </CopyBlock>
                  </div>
                </StaticBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1000px]">
            <SectionHeading
              label={t("editorial.label")}
              title={t("editorial.heading")}
            />
            <div className="space-y-0">
              {editorialFeatures.map((item, i) => (
                <EditorialBlock key={item.title} item={item} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("devices.label")} title={t("devices.heading")} />
            <CopyBlock>
              <p className="mx-auto mb-10 max-w-[820px] text-center text-sm leading-[2.2] text-gray-600">
                {t("devices.body")}
              </p>
            </CopyBlock>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {devices.map((item) => (
                <StaticBlock key={item.title}>
                  <figure className="m-0 bg-white overflow-hidden">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width:768px) 100vw, 260px"
                      />
                    </div>
                    <figcaption className="border-t border-gray-100 px-4 py-4">
                      <p className="m-0 text-[11px] tracking-[0.1em] text-[#1a4a8a] mb-1">
                        {item.number}
                      </p>
                      <p className="m-0 text-sm font-medium tracking-[0.06em] text-gray-900 mb-2">
                        {item.title}
                      </p>
                      <p className="m-0 text-xs leading-relaxed text-gray-500">
                        {item.location}
                      </p>
                    </figcaption>
                  </figure>
                </StaticBlock>
              ))}
            </div>
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-hidden bg-white">
                <Image
                  src={t("devices.floorplan2ldk")}
                  alt={t("devices.floorplan2ldkAlt")}
                  width={1100}
                  height={700}
                  className="h-auto w-full"
                  sizes="(max-width:1100px) 100vw, 550px"
                />
              </div>
              <div className="overflow-hidden bg-white">
                <Image
                  src={t("devices.floorplan3ldk")}
                  alt={t("devices.floorplan3ldkAlt")}
                  width={1100}
                  height={700}
                  className="h-auto w-full"
                  sizes="(max-width:1100px) 100vw, 550px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20 lg:px-16 bg-white">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading label={t("operation.label")} title={t("operation.heading")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                {t.raw("operation.paragraphs").map((para, i) => (
                  <CopyBlock key={para} delay={i * 0.06}>
                    <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
                      {para}
                    </p>
                  </CopyBlock>
                ))}
              </div>
              <div className="relative aspect-[4/3] bg-[#f7f7f7]">
                <Image
                  src={t("operation.image")}
                  alt={t("operation.imageAlt")}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width:768px) 100vw, 550px"
                />
              </div>
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
