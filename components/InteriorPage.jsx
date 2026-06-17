"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./Copy";
import { getLocalizedPath } from "@/lib/locale-path";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_EASE = [0.76, 0, 0.24, 1];
const CLIP_HIDDEN = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
const CLIP_VISIBLE = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

function WaveDivider() {
  return (
    <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 w-full overflow-hidden leading-[0]">
      <svg
        className="relative block h-[100px] md:h-[180px] lg:h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ width: "200%" }}
      >
        <defs>
          <linearGradient id="interior-wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f7f7" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#f7f7f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#f7f7f7" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          className="animate-wave-slow"
          d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
          fill="#f7f7f7"
          opacity="0.25"
        />
        <path
          className="animate-wave-mid"
          d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
          fill="#f7f7f7"
          opacity="0.45"
        />
        <path
          className="animate-wave-fast"
          d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
          fill="url(#interior-wave-gradient)"
        />
      </svg>
    </div>
  );
}

function StaticImage({ src, alt, className = "", priority = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

function CopyBlock({ children, delay = 0, className = "", heading = false }) {
  return (
    <div className={`${heading ? "overflow-visible pb-2" : "overflow-hidden"} ${className}`}>
      <Copy animateOnScroll delay={delay}>{children}</Copy>
    </div>
  );
}

function RevealImage({ src, alt, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView) setRevealed(true);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      animate={{ clipPath: revealed ? CLIP_VISIBLE : CLIP_HIDDEN }}
      transition={{ duration: 1.2, ease: REVEAL_EASE }}
      className={`relative overflow-hidden shrink-0 ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{ scale: revealed ? 1 : 1.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="flex flex-col shrink-0 w-[72vw] sm:w-[48vw] md:w-[36vw] lg:w-[28vw] xl:w-[22vw]">
      <RevealImage
        src={project.image}
        alt={project.title}
        className="w-full aspect-[3/4] mb-5"
      />
      <CopyBlock delay={index * 0.05}>
        <h3 className="m-0 text-sm md:text-base font-medium tracking-[0.12em] text-white mb-1.5">
          {project.title}
        </h3>
      </CopyBlock>
      <CopyBlock delay={index * 0.05 + 0.04}>
        <p className="m-0 text-[11px] text-gray-500 tracking-[0.14em]">
          {project.category}
        </p>
      </CopyBlock>
    </article>
  );
}

export default function InteriorPage() {
  const t = useTranslations("interiorPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const lenis = useLenis();

  const projects = t.raw("projects.items");
  const moreProjects = t.raw("moreProjects.items");
  const journal = t.raw("journal.items");

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-black">
      <style jsx global>{`
        @keyframes waveSlow {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        @keyframes waveMid {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-15%) translateZ(0) scaleY(1.1); }
          100% { transform: translateX(-30%) translateZ(0) scaleY(1); }
        }
        @keyframes waveFast {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-20%) translateZ(0) scaleY(0.9); }
          100% { transform: translateX(-40%) translateZ(0) scaleY(1); }
        }
        .animate-wave-slow {
          animation: waveSlow 15s linear infinite;
          transform-origin: bottom;
        }
        .animate-wave-mid {
          animation: waveMid 10s linear infinite;
          transform-origin: bottom;
        }
        .animate-wave-fast {
          animation: waveFast 8s linear infinite;
          transform-origin: bottom;
        }
      `}</style>

      {/* Hero — 靜態大圖 + 波浪過渡 */}
      <section className="relative w-full h-screen z-10">
        <StaticImage
          src={t("hero.image")}
          alt={t("hero.imageAlt")}
          priority
          className="w-full h-full"
        />
        <WaveDivider />
        <div className="absolute bottom-28 md:bottom-36 left-6 md:left-12 text-white z-30 max-w-sm">
          <CopyBlock>
            <p className="mb-3 text-[10px] tracking-[0.28em] font-semibold drop-shadow-sm">
              {t("hero.tag")}
            </p>
          </CopyBlock>
          <CopyBlock delay={0.08}>
            <p className="text-sm leading-[1.9] tracking-wide font-light drop-shadow-sm">
              {t("hero.body")}
            </p>
          </CopyBlock>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-[#f7f7f7]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          <div>
            <CopyBlock heading className="mb-6">
              <h1 className="m-0 !text-2xl md:!text-3xl lg:!text-[34px] font-normal tracking-[0.04em] text-black whitespace-pre-line !leading-[1.45] !letter-normal">
                {t("philosophy.heading")}
              </h1>
            </CopyBlock>
            <CopyBlock delay={0.08}>
              <p className="m-0 text-sm text-gray-400 tracking-wide leading-[1.9] max-w-md font-light">
                {t("philosophy.body")}
              </p>
            </CopyBlock>
          </div>
          <div className="flex flex-col items-start lg:items-end lg:text-right gap-8 lg:pb-1">
            <CopyBlock delay={0.1}>
              <p className="m-0 text-xs text-gray-400 tracking-wide leading-[1.9] max-w-xs font-light">
                {t("philosophy.aside")}
              </p>
            </CopyBlock>
            <CopyBlock delay={0.14}>
              <Link
                href={getLocalizedPath("/concept", locale)}
                className="text-sm tracking-[0.08em] text-black hover:opacity-60 transition-opacity"
              >
                {t("philosophy.link")}
              </Link>
            </CopyBlock>
          </div>
        </div>
      </section>

      {/* Showcase — 靜態大圖，無動畫 */}
      <section className="w-full h-[65vh] md:h-[80vh] bg-[#f7f7f7]">
        <StaticImage
          src={t("showcase.image")}
          alt={t("showcase.imageAlt")}
          className="w-full h-full"
        />
      </section>

      {/* Recent Project */}
      <section className="bg-[#111111] text-white py-20 md:py-28 overflow-hidden">
        <div className="px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
          <CopyBlock heading>
            <h2 className="m-0 !text-2xl md:!text-3xl lg:!text-[34px] font-normal tracking-[0.06em] !leading-[1.35] !letter-normal">
              {t("projects.title")}
            </h2>
          </CopyBlock>
          <CopyBlock delay={0.06} className="mt-3">
            <p className="m-0 text-xs text-gray-500 tracking-[0.18em]">
              {t("projects.subtitle")}
            </p>
          </CopyBlock>
        </div>

        <div className="flex gap-6 md:gap-10 overflow-x-auto px-6 md:px-12 lg:px-16 pb-4 scrollbar-hide overscroll-x-contain">
          {projects.map((project, index) => (
            <div key={project.id} className="shrink-0">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section className="bg-[#111111] text-white pb-20 md:pb-28 overflow-hidden border-t border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start px-6 md:px-12 lg:px-16">
          <div className="lg:pt-2">
            <CopyBlock>
              <Link
                href={getLocalizedPath("/summary", locale)}
                className="inline-block text-lg md:text-xl tracking-[0.06em] text-white hover:opacity-70 transition-opacity mb-5"
              >
                {t("moreProjects.title")}
              </Link>
            </CopyBlock>
            <CopyBlock delay={0.06}>
              <p className="m-0 text-xs text-gray-500 tracking-wide leading-[1.9] max-w-[220px] font-light">
                {t("moreProjects.body")}
              </p>
            </CopyBlock>
          </div>

          <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide overscroll-x-contain -mr-6 md:-mr-12 lg:-mr-16 pr-6 md:pr-12 lg:pr-16">
            {moreProjects.map((project, index) => (
              <div key={project.id} className="shrink-0">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="bg-[#f7f7f7] text-black py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14 md:mb-16">
            <div>
              <CopyBlock heading>
                <h2 className="m-0 !text-2xl md:!text-3xl lg:!text-[34px] font-normal tracking-[0.04em] !leading-[1.35] !letter-normal">
                  {t("journal.title")}
                </h2>
              </CopyBlock>
              <CopyBlock delay={0.05} className="mt-3">
                <p className="m-0 text-xs text-gray-400 tracking-[0.18em]">
                  {t("journal.subtitle")}
                </p>
              </CopyBlock>
            </div>
            <CopyBlock delay={0.08}>
              <span className="text-xs tracking-[0.12em] text-black border-b border-black/20 pb-1">
                {t("journal.link")}
              </span>
            </CopyBlock>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {journal.map((item, index) => (
              <article key={item.id} className="flex flex-col group cursor-pointer">
                <RevealImage
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/3] mb-5"
                />
                <CopyBlock delay={index * 0.04}>
                  <p className="m-0 text-[11px] text-gray-400 tracking-[0.12em] mb-3">
                    {item.date}
                  </p>
                </CopyBlock>
                <CopyBlock delay={index * 0.04 + 0.05}>
                  <h4 className="m-0 text-sm font-medium tracking-[0.04em] leading-[1.75] mb-5 group-hover:text-gray-500 transition-colors">
                    {item.title}
                  </h4>
                </CopyBlock>
                <CopyBlock delay={index * 0.04 + 0.1}>
                  <p className="m-0 text-[11px] text-gray-500 underline decoration-gray-300 underline-offset-[6px] mt-auto">
                    {item.category}
                  </p>
                </CopyBlock>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 text-center bg-white border-t border-gray-200">
        <CopyBlock>
          <p className="m-0 mb-4 text-[10px] tracking-[0.25em] text-gray-400">
            {t("cta.tag")}
          </p>
        </CopyBlock>
        <CopyBlock delay={0.06} className="mb-8">
          <p className="m-0 text-base md:text-lg font-light tracking-wide text-gray-700">
            {t("cta.body")}
          </p>
        </CopyBlock>
        <Link
          href={getLocalizedPath("/summary", locale)}
          className="inline-block text-xs tracking-[0.2em] border-b border-gray-800 pb-1 text-gray-800 hover:opacity-60 transition-opacity"
        >
          {t("cta.button")}
        </Link>
      </section>
    </main>
  );
}
