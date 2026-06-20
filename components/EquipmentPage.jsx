"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import { CopyBlock } from "./EquipmentBlocks";

const NAVY = "#0d417b";

function WaveDivider({ id = "equipment-wave" }) {
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
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="95" width="2400" height="30" fill="#ffffff" />
        <path
          className="animate-wave-slow"
          d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.25"
        />
        <path
          className="animate-wave-mid"
          d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.45"
        />
        <path
          className="animate-wave-fast"
          d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
          fill={`url(#${id})`}
        />
      </svg>
    </div>
  );
}

export default function EquipmentPage() {
  const t = useTranslations("equipmentPage");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const introImages = t.raw("intro.gridImages");
  const categories = t.raw("categories.items");

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      <style jsx global>{`
        @keyframes waveSlow {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25%) scaleY(0.8); }
          100% { transform: translateX(-50%) scaleY(1); }
        }
        @keyframes waveMid {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-15%) scaleY(1.1); }
          100% { transform: translateX(-30%) scaleY(1); }
        }
        @keyframes waveFast {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-20%) scaleY(0.9); }
          100% { transform: translateX(-40%) scaleY(1); }
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

      <main className="pt-20 md:pt-24">
        {/* Top collage section */}
        <section className="relative bg-[#eceae6] pb-24 md:pb-32">
          <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
            <div className="relative h-[280px] w-full lg:h-[520px] lg:w-[38%]">
              <Image
                src={t("intro.mainImage")}
                alt={t("intro.mainImageAlt")}
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 38vw"
              />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center lg:px-10">
              <CopyBlock>
                <p className="m-0 mb-6 text-[10px] tracking-[0.35em] text-gray-500">
                  {t("intro.tag")}
                </p>
              </CopyBlock>
              <div className="mb-8 flex items-center gap-4 md:gap-6">
                <CopyBlock delay={0.05}>
                  <div className="border border-gray-800 px-4 py-8 md:px-6 md:py-10">
                    <p className="m-0 [writing-mode:vertical-rl] text-lg md:text-xl tracking-[0.4em] font-light">
                      {t("intro.titleLine1")}
                    </p>
                  </div>
                </CopyBlock>
                <CopyBlock delay={0.1}>
                  <span className="text-3xl md:text-4xl font-light text-gray-400">
                    {t("intro.titleX")}
                  </span>
                </CopyBlock>
                <CopyBlock delay={0.15}>
                  <div className="border border-gray-800 px-4 py-8 md:px-6 md:py-10">
                    <p className="m-0 [writing-mode:vertical-rl] text-lg md:text-xl tracking-[0.4em] font-light">
                      {t("intro.titleLine2")}
                    </p>
                  </div>
                </CopyBlock>
              </div>
              <CopyBlock delay={0.2}>
                <p className="m-0 max-w-md text-sm leading-[2] text-gray-600">
                  {t("intro.subtitle")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.25} className="mt-6">
                <p className="m-0 max-w-lg text-xs leading-[2] text-gray-500">
                  {t("intro.description")}
                </p>
              </CopyBlock>
            </div>

            <div className="grid w-full grid-cols-2 lg:w-[34%]">
              {introImages.map((src, i) => (
                <div key={src} className="relative aspect-square">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 17vw"
                  />
                </div>
              ))}
            </div>
          </div>
          <WaveDivider />
        </section>

        {/* Category grid — MON architects style */}
        <section className="bg-white px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <CopyBlock>
              <h2 className="m-0 mb-3 text-center text-xs tracking-[0.35em] text-gray-400">
                {t("categories.label")}
              </h2>
            </CopyBlock>
            <CopyBlock delay={0.05} className="mb-12 md:mb-16">
              <h3 className="m-0 text-center font-serif text-2xl md:text-3xl tracking-[0.12em] text-gray-900">
                {t("categories.heading")}
              </h3>
            </CopyBlock>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((item, index) => {
                const href = item.href
                  ? getLocalizedPath(item.href, locale)
                  : "#";

                const content = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="border-b border-gray-100 py-5">
                      <CopyBlock delay={index * 0.05}>
                        <p className="m-0 text-sm md:text-base font-medium tracking-[0.1em] text-gray-900 group-hover:opacity-70 transition-opacity">
                          {item.title}
                        </p>
                      </CopyBlock>
                      <CopyBlock delay={index * 0.05 + 0.04}>
                        <p className="m-0 mt-1 text-[11px] tracking-[0.2em] text-gray-400">
                          {item.subtitle}
                        </p>
                      </CopyBlock>
                    </div>
                  </>
                );

                return item.href ? (
                  <Link
                    key={item.id}
                    href={href}
                    className="group block cursor-pointer"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={item.id} className="group block cursor-default">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
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
