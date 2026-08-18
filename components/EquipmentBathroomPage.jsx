"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import { CopyBlock, StaticBlock } from "./EquipmentBlocks";

const NAVY = "#0d417b";

function FaqSection({ items, heading }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-16 md:px-10 md:py-24 lg:px-16"
      aria-labelledby="bathroom-faq-heading"
    >
      <div className="mx-auto max-w-[900px]">
        <CopyBlock>
          <h2
            id="bathroom-faq-heading"
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
                  id={`bathroom-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`bathroom-faq-answer-${index}`}
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
                  id={`bathroom-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`bathroom-faq-question-${index}`}
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

function BrandHeader({ brand, product }) {
  return (
    <div className="mb-10 md:mb-14 border-b border-gray-200 pb-8">
      <CopyBlock>
        <h2 className="m-0 font-serif text-3xl md:text-4xl tracking-[0.1em] text-gray-900">
          {brand}
        </h2>
      </CopyBlock>
      {product && (
        <CopyBlock delay={0.08}>
          <p className="m-0 mt-3 text-base md:text-lg tracking-[0.1em] text-[#1a4a8a]">
            {product}
          </p>
        </CopyBlock>
      )}
    </div>
  );
}

function ToiletSection({ data, linkHref }) {
  return (
    <section
      id="toilet"
      className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16"
      aria-labelledby="toilet-heading"
    >
      <div className="mx-auto max-w-[1000px]">
        <BrandHeader brand={data.brand} product={data.product} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {data.specs.map((item, i) => (
            <CopyBlock key={item.label} delay={i * 0.05}>
              <div className="bg-white px-6 py-8 text-center h-full flex flex-col justify-center">
                <p className="m-0 text-xs tracking-[0.2em] text-gray-400 mb-3">
                  {item.label}
                </p>
                <p className="m-0 text-sm md:text-base font-medium tracking-[0.08em] text-gray-900">
                  {item.value}
                </p>
              </div>
            </CopyBlock>
          ))}
        </div>

        <CopyBlock>
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 border border-[#1a4a8a] px-5 py-2.5 text-xs tracking-[0.15em] text-[#1a4a8a] transition-colors hover:bg-[#1a4a8a] hover:text-white"
          >
            {data.linkLabel}
            <span aria-hidden>→</span>
          </Link>
        </CopyBlock>
      </div>
    </section>
  );
}

function NasluckSection({ data }) {
  return (
    <section
      id="nasluck"
      className="bg-white px-6 py-14 md:px-10 md:py-20 lg:px-16"
      aria-labelledby="nasluck-heading"
    >
      <div className="mx-auto max-w-[1100px]">
        <BrandHeader brand={data.brand} product={data.product} />

        <div className="relative mb-12 md:mb-16 aspect-[16/9] w-full overflow-hidden bg-[#f4f4f4]">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            className="object-contain p-4 md:p-8"
            sizes="(max-width:1100px) 100vw, 1100px"
          />
        </div>

        <div className="mx-auto max-w-[820px] space-y-8 md:space-y-10 mb-14 md:mb-16">
          {data.paragraphs.map((para, i) => (
            <CopyBlock key={para} delay={i * 0.06}>
              <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600">
                {para}
              </p>
            </CopyBlock>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {data.highlights.map((item) => (
            <StaticBlock key={item.caption}>
              <figure className="m-0 overflow-hidden bg-[#fafafa]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width:768px) 100vw, 540px"
                  />
                </div>
                <figcaption className="px-5 py-4 text-xs tracking-[0.1em] text-gray-500 text-center border-t border-gray-100">
                  {item.caption}
                </figcaption>
              </figure>
            </StaticBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureImages({ images, layout }) {
  if (!images?.length) return null;

  if (layout === "eco") {
    const [hero, ...rest] = images;
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-white">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="object-contain p-3 md:p-5"
            sizes="(max-width:1100px) 100vw, 1100px"
          />
        </div>
        <div className={`grid gap-4 md:gap-6 ${rest.length >= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
          {rest.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-3"
                sizes="(max-width:768px) 100vw, 360px"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "wide") {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-contain p-3 md:p-5"
          sizes="(max-width:1100px) 100vw, 1100px"
        />
      </div>
    );
  }

  if (layout === "double") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {images.map((img) => (
          <div key={img.src} className="relative aspect-[4/3] overflow-hidden bg-white">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain p-3"
              sizes="(max-width:768px) 100vw, 540px"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        className="object-contain p-4"
        sizes="(max-width:1100px) 100vw, 1100px"
      />
    </div>
  );
}

function HousetecSection({ data }) {
  return (
    <section
      id="housetec"
      className="bg-[#f7f7f7] px-6 py-14 md:px-10 md:py-20 lg:px-16"
      aria-labelledby="housetec-heading"
    >
      <div className="mx-auto max-w-[1100px]">
        <BrandHeader brand={data.brand} product={data.product} />

        <div className="relative mb-14 md:mb-20 aspect-[16/8] w-full overflow-hidden bg-white">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            className="object-contain p-4 md:p-8"
            sizes="(max-width:1100px) 100vw, 1100px"
          />
        </div>

        <div className="space-y-16 md:space-y-24">
          {data.features.map((feature) => (
              <article
                key={feature.title}
                className="border-t border-gray-200 pt-12 md:pt-16"
              >
                <CopyBlock>
                  <h3 className="m-0 text-lg md:text-xl font-medium tracking-[0.06em] text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                </CopyBlock>
                <CopyBlock delay={0.06}>
                  <p className="m-0 mt-5 max-w-[820px] text-sm md:text-[15px] leading-[2.2] text-gray-600">
                    {feature.body}
                  </p>
                </CopyBlock>
                {feature.note && (
                  <CopyBlock delay={0.1}>
                    <p className="m-0 mt-4 text-[11px] leading-relaxed text-gray-400">
                      {feature.note}
                    </p>
                  </CopyBlock>
                )}
                <div className="mt-8 md:mt-10">
                  <FeatureImages images={feature.images} layout={feature.layout} />
                </div>
              </article>
          ))}
        </div>

        {data.colorLineup?.length > 0 && (
          <div className="mt-16 md:mt-20 border-t border-gray-200 pt-12">
            <CopyBlock>
              <h3 className="m-0 mb-8 text-center text-sm tracking-[0.15em] text-gray-700">
                {data.colorLineupHeading}
              </h3>
            </CopyBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {data.colorLineup.map((src, i) => (
                <div key={src} className="overflow-hidden bg-white">
                  <Image
                    src={src}
                    alt={`${data.colorLineupHeading} ${i + 1}`}
                    width={1100}
                    height={620}
                    className="h-auto w-full"
                    sizes="(max-width:1100px) 100vw, 1100px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function EquipmentBathroomPage() {
  const t = useTranslations("equipmentBathroomPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const faqItems = t.raw("faq.items");

  const homeHref = getLocalizedPath("/", locale);
  const equipmentHref = getLocalizedPath("/equipment", locale);
  const toiletHref = getLocalizedPath("/equipment/toilet", locale);

  const toiletData = {
    brand: t("toilet.brand"),
    product: t("toilet.product"),
    linkLabel: t("toilet.linkLabel"),
    specs: t.raw("toilet.specs"),
  };

  const nasluckData = {
    brand: t("nasluck.brand"),
    product: t("nasluck.product"),
    heroImage: t("nasluck.heroImage"),
    heroImageAlt: t("nasluck.heroImageAlt"),
    paragraphs: t.raw("nasluck.paragraphs"),
    highlights: t.raw("nasluck.highlights"),
  };

  const housetecData = {
    brand: t("housetec.brand"),
    product: t("housetec.product"),
    heroImage: t("housetec.heroImage"),
    heroImageAlt: t("housetec.heroImageAlt"),
    features: t.raw("housetec.features"),
    colorLineupHeading: t("housetec.colorLineupHeading"),
    colorLineup: t.raw("housetec.colorLineup"),
  };

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
                <h1 className="m-0 font-serif text-3xl md:text-4xl tracking-[0.1em] text-gray-900 mb-4">
                  {t("hero.title")}
                </h1>
              </CopyBlock>
              <CopyBlock delay={0.08}>
                <p className="m-0 text-sm tracking-[0.15em] text-[#1a4a8a] whitespace-pre-line">
                  {t("hero.subtitle")}
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

        <ToiletSection data={toiletData} linkHref={toiletHref} />
        <NasluckSection data={nasluckData} />
        <HousetecSection data={housetecData} />

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
