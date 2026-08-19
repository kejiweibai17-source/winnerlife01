"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Copy from "./Copy";

const BEIGE = "#f5f3ef";
const DARK = "#4b3d33";
const BORDER = "#e0dbd4";

const HERO_IMAGE = "/images/story/152f7e88-f8c2-47bb-bfa4-38ba3cca70de.png";
const TEAM_IMAGES = [
  "/images/concept/置產顧問團隊.png",
  "/images/architecture/sk-building-01.jpg",
  "/images/concept/a96de8c2-9540-43c1-80fb-e44c3be0d651.png",
];
const PROJECT_IMAGE = "/images/index/9497269d-233d-4a5e-8325-5febb2acf4d7.png";
const CTA_IMAGES = [
  "/images/story/news1-1280x850.png",
  "/images/story/news3-1280x850.png",
];

function ArrowIcon() {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/60">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-3.5 w-3.5"
        aria-hidden
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CopyBlock({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Copy animateOnScroll delay={delay}>
        {children}
      </Copy>
    </div>
  );
}

function SectionAside({ title, delay = 0 }) {
  return (
    <CopyBlock delay={delay}>
      <h2 className="m-0 font-serif text-base md:text-lg tracking-[0.12em] text-gray-800 leading-relaxed">
        {title}
      </h2>
    </CopyBlock>
  );
}

function BorderedContent({ children, className = "" }) {
  return (
    <div
      className={`border-t border-b py-8 md:py-10 ${className}`}
      style={{ borderColor: BORDER }}
    >
      {children}
    </div>
  );
}

function SplitCTA({ t }) {
  return (
    <section className="px-0 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {[
          { key: "download", image: CTA_IMAGES[0] },
          { key: "reserve", image: CTA_IMAGES[1] },
        ].map(({ key, image }, index) => (
          <Link
            key={key}
            href="https://page.line.me/qoi6885d?oat_content=url&openQrModal=true"
            className="group relative flex min-h-[280px] md:min-h-[360px] items-center justify-center overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(75, 61, 51, 0.72)" }}
            />
            <div className="relative z-10 px-8 md:px-12 text-center text-white max-w-md">
              <CopyBlock delay={index * 0.08}>
                <h3 className="m-0 font-serif text-xl md:text-2xl tracking-[0.08em] mb-4">
                  {t(`cta.${key}.title`)}
                </h3>
              </CopyBlock>
              <CopyBlock delay={index * 0.08 + 0.06}>
                <p className="m-0 text-sm leading-[2] text-white/85 font-light whitespace-pre-line mb-8">
                  {t(`cta.${key}.description`)}
                </p>
              </CopyBlock>
              <CopyBlock delay={index * 0.08 + 0.12}>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.2em] border border-white/50 rounded-full px-6 py-3 group-hover:bg-white/10 transition-colors">
                  {t(`cta.${key}.button`)}
                  <ArrowIcon />
                </span>
              </CopyBlock>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function DeveloperPage() {
  const t = useTranslations("developer");
  const brandLines = t.raw("brandStory.lines");
  const bodyParagraphs = t.raw("brandStory.bodyParagraphs");
  const pillarsLabelItems = String(t("brandStory.pillarsLabel"))
    .split("｜")
    .map((s) => s.trim())
    .filter(Boolean);
  const recommendItems = t.raw("recommend.items");
  const pillars = t.raw("pillars");
  const teamMembers = t.raw("team.members");
  const projectParagraphs = t.raw("project.paragraphs");
  const craftDetails = t.raw("craftsmanship.details");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="relative w-full overflow-x-hidden font-sans text-gray-800"
      style={{ backgroundColor: BEIGE }}
    >
      <main className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="mx-auto max-w-[1100px]">
            <CopyBlock>
              <p className="mb-6 text-center text-[10px] md:text-xs tracking-[0.35em] text-gray-500 uppercase">
                {t("hero.tag")}
              </p>
            </CopyBlock>
            <CopyBlock delay={0.05}>
              <h1 className="m-0 text-center font-serif text-2xl md:text-4xl lg:text-[42px] tracking-[0.08em] leading-snug text-gray-900">
                {t("hero.title")}
              </h1>
            </CopyBlock>
            <CopyBlock delay={0.1}>
              <p className="mt-6 text-center text-sm md:text-base tracking-[0.06em] text-gray-600 font-light">
                {t("hero.subtitle")}
              </p>
            </CopyBlock>
            <CopyBlock delay={0.15}>
              <p className="mx-auto mt-8 max-w-[720px] text-center text-sm md:text-[15px] leading-[2.2] text-gray-600 font-light">
                {t("hero.intro")}
              </p>
            </CopyBlock>
          </div>

          <div className="relative mx-auto mt-12 md:mt-16 max-w-[1200px] aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src={HERO_IMAGE}
              alt={t("hero.imageAlt")}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </section>

        {/* Brand story — manifesto + readable body */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-28">
          <div className="mx-auto max-w-[920px]">
            <div className="mx-auto max-w-[640px] text-center">
              {brandLines.map((line, index) => (
                <CopyBlock
                  key={index}
                  delay={index * 0.06}
                  className="mb-3 md:mb-4"
                >
                  <p className="m-0 font-serif text-lg md:text-xl lg:text-[1.65rem] tracking-[0.04em] leading-[1.85] text-gray-800">
                    {line}
                  </p>
                </CopyBlock>
              ))}
            </div>

            <div
              className="mx-auto mt-14 md:mt-20 max-w-[38rem] border-t pt-12 md:pt-16"
              style={{ borderColor: BORDER }}
            >
              <CopyBlock delay={0.18}>
                <p
                  className="m-0 text-center font-serif text-xl md:text-2xl tracking-[0.22em] text-gray-900"
                  style={{ color: DARK }}
                >
                  {t("brandStory.brand")}
                </p>
              </CopyBlock>

              <div className="mt-8 md:mt-10 space-y-5 md:space-y-6">
                {bodyParagraphs.map((paragraph, index) => (
                  <CopyBlock key={index} delay={0.22 + index * 0.05}>
                    <p
                      className={`m-0 text-[15px] md:text-base leading-[1.95] md:leading-[2.05] font-light text-gray-700 ${
                        index === 0
                          ? "text-center font-normal text-gray-800"
                          : "text-left md:text-center"
                      }`}
                    >
                      {paragraph}
                    </p>
                  </CopyBlock>
                ))}
              </div>

              <CopyBlock delay={0.4}>
                <p className="mt-10 md:mt-12 text-center text-[11px] md:text-xs tracking-[0.2em] text-gray-500">
                  {t("brandStory.tagline")}
                </p>
              </CopyBlock>

              <CopyBlock delay={0.45}>
                <p className="mt-6 md:mt-8 text-center text-[11px] md:text-xs tracking-[0.12em] leading-relaxed text-gray-500">
                  {pillarsLabelItems.join("  ·  ")}
                </p>
              </CopyBlock>
            </div>
          </div>
        </section>

        {/* Recommend — asymmetric list */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <BorderedContent>
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-16 items-start">
                <SectionAside title={t("recommend.title")} />
                <ul className="m-0 list-none space-y-4 md:space-y-5 p-0">
                  {recommendItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm md:text-[15px] leading-[2] text-gray-700 font-light"
                    >
                      <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                      <CopyBlock delay={index * 0.05}>
                        <span>{item}</span>
                      </CopyBlock>
                    </li>
                  ))}
                </ul>
              </div>
            </BorderedContent>
          </div>
        </section>

        {/* Split CTA — moved between recommend & pillars */}
        <SplitCTA t={t} />

        {/* Four pillars — 01–04 */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div
              className="border-t pt-12 md:pt-16"
              style={{ borderColor: BORDER }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20">
                {pillars.map((pillar, index) => (
                  <div key={index} className="text-center">
                    <CopyBlock delay={index * 0.04}>
                      <p className="m-0 text-sm tracking-[0.2em] text-gray-400 font-light">
                        {pillar.num}
                      </p>
                    </CopyBlock>
                    <CopyBlock delay={index * 0.04 + 0.05} className="mt-4">
                      <h3 className="m-0 font-serif text-lg md:text-xl tracking-[0.08em] text-gray-900">
                        {pillar.title}
                      </h3>
                    </CopyBlock>
                    <CopyBlock delay={index * 0.04 + 0.1} className="mt-5">
                      <p className="m-0 text-sm leading-[2.1] text-gray-600 font-light text-left md:text-center">
                        {pillar.description}
                      </p>
                    </CopyBlock>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team — 3-column cards */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-16 items-start mb-12 md:mb-16">
              <SectionAside title={t("team.title")} />
              <CopyBlock delay={0.08}>
                <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600 font-light">
                  {t("team.description")}
                </p>
              </CopyBlock>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {teamMembers.map((member, index) => (
                <article key={index}>
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <Image
                      src={TEAM_IMAGES[index]}
                      alt={member.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CopyBlock delay={index * 0.06}>
                    <h3 className="m-0 font-serif text-base md:text-lg tracking-[0.06em] text-gray-900 mb-4">
                      {member.title}
                    </h3>
                  </CopyBlock>
                  <CopyBlock delay={index * 0.06 + 0.06}>
                    <p className="m-0 text-sm leading-[2.1] text-gray-600 font-light">
                      {member.description}
                    </p>
                  </CopyBlock>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Project — image + text */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <CopyBlock>
              <p className="text-center font-serif text-lg md:text-xl tracking-[0.1em] text-gray-800 mb-4">
                {t("project.title")}
              </p>
            </CopyBlock>
            <CopyBlock delay={0.06} className="mb-12 md:mb-16">
              <h2 className="m-0 text-center font-serif text-xl md:text-2xl lg:text-3xl tracking-[0.06em] leading-snug text-gray-900">
                {t("project.subtitle")}
              </h2>
            </CopyBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="relative aspect-[4/3] overflow-hidden order-2 md:order-1">
                <Image
                  src={PROJECT_IMAGE}
                  alt={t("project.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                {projectParagraphs.map((para, index) => (
                  <CopyBlock key={index} delay={index * 0.08}>
                    <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600 font-light">
                      {para}
                    </p>
                  </CopyBlock>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship — bordered detail block */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20 pb-20 md:pb-28">
          <div className="mx-auto max-w-[1100px]">
            <BorderedContent>
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-16 items-start">
                <SectionAside title={t("craftsmanship.title")} />
                <div>
                  <CopyBlock delay={0.06}>
                    <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600 font-light mb-8">
                      {t("craftsmanship.description")}
                    </p>
                  </CopyBlock>
                  <dl className="m-0 space-y-3 mb-8">
                    {craftDetails.map((detail, index) => (
                      <CopyBlock key={index} delay={0.1 + index * 0.05}>
                        <div className="flex flex-wrap gap-x-2 text-sm text-gray-700 font-light">
                          <dt className="font-normal text-gray-500">
                            {detail.label}：
                          </dt>
                          <dd className="m-0">{detail.value}</dd>
                        </div>
                      </CopyBlock>
                    ))}
                  </dl>
                  <CopyBlock delay={0.25}>
                    <p className="m-0 font-serif text-base md:text-lg tracking-[0.06em] text-gray-800">
                      {t("craftsmanship.closing")}
                    </p>
                  </CopyBlock>
                </div>
              </div>
            </BorderedContent>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: DARK }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
