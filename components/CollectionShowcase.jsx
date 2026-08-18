"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useIsMobile } from "@/lib/use-is-mobile";

import Carousel from "../components/EmblaCarousel06/index.jsx";

gsap.registerPlugin(ScrollTrigger);

const CASE_IMAGES = [
  "/images/index/ChatGPT Image 2026年5月29日 上午11_34_05.png",
  "/images/index/ChatGPT Image 2026年5月29日 上午11_52_53.png",
];
const CASE_BIG_IMAGE =
  "/images/index/ChatGPT Image 2026年5月29日 上午11_28_42.png";
const PRODUCT_IMAGES = [
  "/images/index/白金アエルシティ.png",
  "/images/index/東京都済生会中央病院.png",
  "/images/index/芝公園.png",
];

export default function CollectionShowcase() {
  const t = useTranslations("showcase");
  const pathname = usePathname();
  const locale = pathname.startsWith("/jp") ? "jp" : "zh";
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const cases = [
    {
      id: "style-01",
      caseNumber: t("cases.0.caseNumber"),
      role: t("cases.0.role"),
      name: t("cases.0.name"),
      description: t("cases.0.description"),
      image: CASE_IMAGES[0],
      blockTitle: t("cases.0.blockTitle"),
      blockDesc: t("cases.0.blockDesc"),
      href: `${getLocalizedPath("/location", locale)}#keio`,
      customProducts: PRODUCT_IMAGES.map((image, i) => ({
        id: `prod_0${i + 1}`,
        title: t(`cases.0.products.${i}.title`),
        slug: ["hakata-station", "takeshita-station", "lalaport-fukuoka"][i],
        price: t(`cases.0.products.${i}.price`),
        image,
        stepNum: t(`cases.0.products.${i}.stepNum`),
      })),
    },
    {
      id: "style-02",
      caseNumber: t("cases.1.caseNumber"),
      role: t("cases.1.role"),
      name: t("cases.1.name"),
      description: t("cases.1.description"),
      image: CASE_IMAGES[1],
      blockTitle: t("cases.1.blockTitle"),
      blockDesc: t("cases.1.blockDesc"),
      btnLabel: t("cases.1.btnLabel"),
      href: `${getLocalizedPath("/contact", locale)}#contact-form`,
      bigImage: CASE_BIG_IMAGE,
    },
  ];

  useGSAP(
    () => {
      if (isMobile) return;

      const images = gsap.utils.toArray(".parallax-img-wrapper");
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [isMobile] },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-black font-sans"
    >
      <div className="w-full pt-8 pb-5 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-widest flex items-start justify-center gap-1 mb-2">
            {t("headerTitle")}
            <span className="text-[15px] font-bold mt-2 tracking-normal uppercase">
              {t("headerSub")}
            </span>
          </h2>
          <p className="text-sm md:text-base font-bold tracking-[0.2em] uppercase">
            {t("headerTag")}
          </p>
        </div>
        <p className="text-[12px] md:text-[14px] text-gray-700 leading-[2.5] tracking-[0.15em] whitespace-pre-line max-w-3xl">
          {t("headerDesc")}
        </p>
      </div>

      {cases.map((item, index) => {
        const isEven = index % 2 !== 0;
        return (
          <div
            key={item.id}
            className={`flex flex-col lg:flex-row w-full h-auto lg:h-[100svh] ${
              isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-[50%] h-full overflow-hidden flex flex-col items-center justify-center bg-white z-10 relative py-12 lg:py-0">
              <div className="text-center mb-8 max-w-lg px-4">
                <h3 className="text-[20px] lg:text-[24px] font-bold leading-[1.8] mb-4 whitespace-pre-line text-gray-900 tracking-wider">
                  {item.blockTitle}
                </h3>
                <p className="text-[11px] lg:text-[12px] leading-[2.2] text-gray-500 whitespace-pre-line tracking-[0.1em]">
                  {item.blockDesc}
                </p>
              </div>

              {item.id === "style-02" ? (
                <div className="w-full px-10 md:px-20 mt-4">
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-gray-50">
                    <Image
                      src={item.bigImage}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full ml-10 md:ml-20">
                  <Carousel products={item.customProducts} />
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 h-[60vh] lg:h-full relative overflow-hidden group">
              <div className="parallax-img-wrapper absolute top-[-10%] left-0 w-full h-[120%] will-change-transform">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[10s] ease-out"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-12 w-full flex flex-col items-center text-center text-white z-20 px-6">
                <span className="border border-white/40 rounded-full px-5 py-1.5 text-[10px] font-bold tracking-[0.15em] mb-4 backdrop-blur-md">
                  {item.caseNumber}
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] mb-2 opacity-80 uppercase">
                  {item.role}
                </span>
                <h2 className="text-3xl lg:text-[32px] font-bold tracking-widest leading-[1.8] w-[75%] max-w-[800px] mb-4">
                  {item.name}
                </h2>
                <div className="w-6 h-[1px] bg-white/50 mb-6" />
                <p className="text-[15px] tracking-widest w-[65%] mx-auto mb-8 opacity-90">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="bg-[#fd4e27] text-white border border-white text-[10px] font-bold tracking-[0.2em] uppercase px-12 py-4 hover:bg-white hover:text-black transition-colors duration-300"
                >
                  {item.btnLabel ?? t("btnReadMore")}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
