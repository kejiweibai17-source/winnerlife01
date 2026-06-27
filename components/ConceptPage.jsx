"use client";

import React from "react";
import { useTranslations } from "next-intl";
import HeroSlider from "./HeroSlider/page";

const MARQUEE_IMAGES = [
  "/images/index/ChatGPT Image 2026年5月29日 上午11_28_42.png",
  "/images/index/周邊.png",
  "/images/index/白金アエルシティ.png",
  "/images/index/東京都済生会中央病院.png",
  "/images/index/芝公園.png",
  "/images/index/ChatGPT Image 2026年5月29日 上午11_34_05.png",
];

const SURROUNDING_IMAGES = [
  "/images/index/01.png",
  "/images/index/02.png",
  "/images/index/03.png",
];

function Paragraph({ text }) {
  const lines = text.split("\n");
  return (
    <p>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br className="hidden md:block" />}
        </React.Fragment>
      ))}
    </p>
  );
}

export default function ConceptPage() {
  const t = useTranslations("concept");
  const marqueeItems = t.raw("marquee");
  const paragraphs = t.raw("waterFront.paragraphs");
  const surroundings = t.raw("surroundings.items");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const marqueeRow1 = [...Array(2)].flatMap(() =>
    MARQUEE_IMAGES.map((src, index) => ({
      ...marqueeItems[index % marqueeItems.length],
      src,
    })),
  );

  const marqueeRow2 = marqueeRow1;

  return (
    <div className="relative w-full bg-white font-sans text-gray-800 overflow-x-hidden">
      <style jsx global>{`
        @keyframes waveSlow {
          0% {
            transform: translateX(0) translateZ(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) translateZ(0) scaleY(0.8);
          }
          100% {
            transform: translateX(-50%) translateZ(0) scaleY(1);
          }
        }
        @keyframes waveMid {
          0% {
            transform: translateX(0) translateZ(0) scaleY(1);
          }
          50% {
            transform: translateX(-15%) translateZ(0) scaleY(1.1);
          }
          100% {
            transform: translateX(-30%) translateZ(0) scaleY(1);
          }
        }
        @keyframes waveFast {
          0% {
            transform: translateX(0) translateZ(0) scaleY(1);
          }
          50% {
            transform: translateX(-20%) translateZ(0) scaleY(0.9);
          }
          100% {
            transform: translateX(-40%) translateZ(0) scaleY(1);
          }
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

      <main>
        <section className="relative w-full z-10">
          <HeroSlider />

          <div className="absolute -bottom-[2px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg
              className="relative block h-[100px] md:h-[180px] lg:h-[250px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2400 120"
              preserveAspectRatio="none"
              style={{ width: "200%" }}
            >
              <defs>
                <linearGradient
                  id="wave-gradient-animated"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a4b8c9" stopOpacity="1" />
                </linearGradient>
              </defs>

              <path
                className="animate-wave-slow"
                d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
                fill="#ffffff"
                opacity="0.2"
              />

              <path
                className="animate-wave-mid"
                d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
                fill="#ffffff"
                opacity="0.4"
              />

              <path
                className="animate-wave-fast"
                d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
                fill="url(#wave-gradient-animated)"
              />
            </svg>
          </div>
        </section>

        <section className="relative w-full z-0 pt-16 md:pt-32 pb-24 px-4 bg-gradient-to-b from-[#a4b8c9] via-[#f4f7f9] to-white flex flex-col items-center text-center">
          <div className="mb-10">
            <h3 className="font-serif text-2xl md:text-4xl text-gray-700 tracking-[0.1em] mb-2">
              {t("waterFront.line1")}
            </h3>
            <h2 className="font-serif text-5xl md:text-7xl text-gray-800 tracking-[0.15em]">
              {t("waterFront.line2")}
            </h2>
          </div>

          <h4 className="text-xl md:text-2xl font-light text-gray-800 tracking-[0.2em] mb-12">
            {t("waterFront.subtitle")}
          </h4>

          <div className="space-y-6 text-sm md:text-base text-gray-700 font-light tracking-[0.15em] leading-[2.2]">
            {paragraphs.map((paragraph, index) => (
              <Paragraph key={index} text={paragraph} />
            ))}
          </div>
        </section>

        <section className="w-full bg-white py-16 overflow-hidden">
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              will-change: transform;
            }
            .marquee-track-1 {
              animation: marquee 28s linear infinite;
            }
            .marquee-track-2 {
              animation: marquee-reverse 32s linear infinite;
            }
            .marquee-wrapper:hover .marquee-track {
              animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-wrapper mb-3 overflow-hidden">
            <div className="marquee-track marquee-track-1">
              {marqueeRow1.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-[340px] h-[220px] mx-1.5 overflow-hidden group"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-white bg-black/55 px-2 py-1 tracking-wider backdrop-blur-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-track marquee-track-2">
              {marqueeRow2.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-[420px] h-[260px] mx-1.5 overflow-hidden group"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-white bg-black/55 px-2 py-1 tracking-wider backdrop-blur-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f3f5f6] w-full flex flex-col items-center px-4 relative">
          <div className="w-full max-w-6xl mx-auto text-left md:text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-[#3b4c6b] tracking-[0.15em] mb-6">
              {t("canalGreen.title")}
            </h2>
            <p className="text-gray-700 text-sm md:text-base font-light tracking-[0.15em]">
              {t("canalGreen.description")}
            </p>
          </div>

          <div className="w-full max-w-5xl shadow-2xl">
            <img
              src="/images/index/c2de02b1-7105-4795-ab74-c45b00505a7b.png"
              alt="Area Map"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        <section className="py-24 bg-[#f3f5f6] w-full border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-gray-700 text-sm md:text-base font-light tracking-[0.15em] mb-16">
              {t("surroundings.intro")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {surroundings.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="overflow-hidden aspect-[4/3] mb-4">
                    <img
                      src={SURROUNDING_IMAGES[index]}
                      alt={item.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-xs text-gray-600 tracking-wider">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-50 backdrop-blur-sm shadow-lg"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
