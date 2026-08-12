"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Copy from "./Copy";
import { getLocalizedPath } from "@/lib/locale-path";

const ACCENT = "#d4622a";
const TAG_BG = "#4a3f35";
const HERO_IMAGE = "/images/transportation/EFプラス白金高輪05.06p.jpg";

const PHOTO_GALLERY_IMAGES = [
  "/images/transportation/004.png",
  "/images/transportation/005.png",
  "/images/transportation/006.png",
  "/images/transportation/007.png",
];

function WaveDivider() {
  return (
    <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
      <svg
        className="relative block h-[100px] md:h-[180px] lg:h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ width: "200%", marginLeft: 0 }}
      >
        <defs>
          <linearGradient id="trans-wave-gradient" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#trans-wave-gradient)"
        />
      </svg>
    </div>
  );
}

function SectionNum({ children }) {
  return (
    <span className="font-serif text-4xl md:text-5xl text-gray-300 leading-none shrink-0">
      {children}
    </span>
  );
}

function SanuSectionHeader({ num, title, description, delay = 0 }) {
  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[72px_1fr_1fr] gap-6 md:gap-10 items-start mb-12 md:mb-16">
      <SectionNum>{num}</SectionNum>
      <div className="overflow-hidden">
        <Copy animateOnScroll delay={delay}>
          <h2 className="font-serif text-xl md:text-2xl tracking-[0.06em] leading-snug m-0 text-gray-900">
            {title}
          </h2>
        </Copy>
      </div>
      <div className="overflow-hidden">
        <Copy animateOnScroll delay={delay + 0.08}>
          <p className="text-sm md:text-[15px] text-gray-600 leading-[2.1] font-light m-0">
            {description}
          </p>
        </Copy>
      </div>
    </div>
  );
}

export default function TransportationPage() {
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const t = useTranslations("transportation");

  const stationAreasCol1 = t.raw("stationAreasCol1");
  const stationAreasCol2 = t.raw("stationAreasCol2");
  const transportNodes = t.raw("transportNodes");
  const photoGallery = t.raw("photoGallery");
  const accessModes = t.raw("accessModes");
  const travelTimeRows = t.raw("travelTimeRows");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
            transform: translateX(-25%) translateZ(0) scaleY(0.9);
          }
          100% {
            transform: translateX(-50%) translateZ(0) scaleY(1);
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

      <main className="bg-white">
        <section className="relative w-full z-10 min-h-[50vh] md:min-h-[85vh] flex items-end">
          <img
            src="/images/index/31bf0df3-fbb7-4dc8-9a6e-437e64553efc.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-8 pb-32 md:pb-44 lg:pb-52 pt-32">
            <Copy animateOnScroll>
              <p className="text-white/80 text-xs tracking-[0.3em] m-0 mb-4">
                {t("hero.tag")}
              </p>
              <h1 className="text-white font-serif text-3xl md:text-5xl tracking-[0.08em] leading-snug m-0 mb-4 whitespace-pre-line">
                {t("hero.title")}
              </h1>
              <p className="text-white/85 text-sm md:text-base font-light tracking-wide leading-[2] m-0 max-w-lg">
                {t("hero.subtitle")}
              </p>
            </Copy>
          </div>
          <WaveDivider />
        </section>

        <section className="w-[95%] max-w-[1400px] mx-auto mt-20 bg-white">
          <img
            src={HERO_IMAGE}
            alt={t("heroImage.alt")}
            className="w-full h-auto block object-cover"
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-gray-100">
          <SanuSectionHeader
            num="02."
            title={t("sections.s02.title")}
            description={t("sections.s02.description")}
            delay={0.05}
          />

          <div className="max-w-[1100px] mx-auto">
            <div>
              <div className="flex flex-wrap items-end gap-8 md:gap-12 mb-8">
                <div className="overflow-hidden">
                  <Copy animateOnScroll delay={0.1}>
                    <p className="m-0 flex items-end gap-2">
                      <span
                        className="font-serif text-6xl md:text-7xl leading-none"
                        style={{ color: ACCENT }}
                      >
                        3
                      </span>
                      <span className="text-base md:text-lg pb-2 text-gray-800">
                        {t("sections.s02.routesLabel")}
                      </span>
                    </p>
                  </Copy>
                </div>
                <div className="overflow-hidden">
                  <Copy animateOnScroll delay={0.15}>
                    <p className="m-0 flex items-end gap-2">
                      <span
                        className="font-serif text-6xl md:text-7xl leading-none"
                        style={{ color: ACCENT }}
                      >
                        {t("sections.s02.nearestWalkMinutes")}
                      </span>
                      <span className="text-base md:text-lg pb-2 text-gray-800">
                        {t("sections.s02.minutesLabel")}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 m-0">
                      {t("sections.s02.nearestWalkNote")}
                    </p>
                  </Copy>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 tracking-wider m-0 mb-6">
                {t("sections.s02.footnote")}
              </p>

              <span
                className="inline-block text-white text-xs tracking-[0.2em] px-4 py-2 mb-6"
                style={{ backgroundColor: TAG_BG }}
              >
                {t("sections.s02.walkStationsTag")}
              </span>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-[15px] text-gray-800 tracking-wide">
                <ul className="space-y-2 m-0 p-0 list-none">
                  {stationAreasCol1.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <ul className="space-y-2 m-0 p-0 list-none">
                  {stationAreasCol2.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 md:px-8 bg-white border-b border-gray-100">
          <SanuSectionHeader
            num="03."
            title={t("sections.s03.title")}
            description={t("sections.s03.description")}
            delay={0.05}
          />

          <div className="max-w-[640px] mx-auto flex flex-col items-center">
            <Copy animateOnScroll delay={0.12}>
              <div className="flex flex-col items-center mb-6">
                <span style={{ color: ACCENT }} aria-hidden>
                  <svg
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    className="w-12 h-12"
                  >
                    <path d="M24 4L4 20v24h16V30h8v14h16V20L24 4z" />
                  </svg>
                </span>
                <p
                  className="text-sm tracking-[0.15em] mt-3 m-0 font-medium"
                  style={{ color: ACCENT }}
                >
                  {t("sections.s03.accessLabel")}
                </p>
              </div>
            </Copy>

            <div
              className="w-px h-10 mb-2"
              style={{ backgroundColor: ACCENT }}
              aria-hidden
            />

            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              {transportNodes.map((node, index) => (
                <Copy
                  key={node.label}
                  animateOnScroll
                  delay={0.18 + index * 0.06}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center text-center px-2"
                      style={{ borderColor: ACCENT }}
                    >
                      <span className="text-sm md:text-base font-medium tracking-widest text-gray-800">
                        {node.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 m-0 tracking-wider">
                      {node.sub}
                    </p>
                  </div>
                </Copy>
              ))}
            </div>

            <Copy animateOnScroll delay={0.35}>
              <Link
                href="#access"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-gray-800 text-sm tracking-[0.12em] hover:bg-gray-50 transition-colors"
              >
                {t("sections.s03.cta")}
                <span aria-hidden>→</span>
              </Link>
            </Copy>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto text-center mb-12 overflow-hidden">
            <Copy animateOnScroll>
              <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em] m-0 mb-4">
                {t("sections.gallery.title")}
              </h2>
              <p className="text-sm text-gray-600 leading-[2] font-light m-0 max-w-xl mx-auto">
                {t("sections.gallery.description")}
              </p>
            </Copy>
          </div>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {photoGallery.map((card, index) => (
              <figure key={card.caption}>
                <div className="aspect-[4/3] overflow-hidden bg-[#f4f4f4] mb-3">
                  <img
                    src={PHOTO_GALLERY_IMAGES[index]}
                    alt={card.caption}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="overflow-hidden">
                  <Copy animateOnScroll delay={index * 0.08}>
                    <figcaption className="text-xs text-gray-600 tracking-widest font-light text-left px-1 m-0">
                      {card.caption}
                    </figcaption>
                  </Copy>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section
          id="access"
          className="scroll-mt-24 py-20 md:py-28 px-6 md:px-8 bg-white"
        >
          <div className="max-w-[1100px] mx-auto mb-14 md:mb-20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[72px_1fr] gap-6 items-start">
              <SectionNum>04.</SectionNum>
              <Copy animateOnScroll>
                <h2 className="font-serif text-5xl md:text-7xl tracking-[0.1em] m-0 mb-4 text-gray-900">
                  {t("sections.s04.title")}
                </h2>
                <p className="text-sm md:text-base text-gray-600 tracking-[0.12em] font-light m-0">
                  {t("sections.s04.description")}
                </p>
              </Copy>
            </div>
          </div>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
              <img
                src="/images/transportation/003.png"
                alt={t("sections.s04.accessImageAlt")}
                className="w-full h-full object-cover block"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-12 lg:pt-4">
              {accessModes.map((mode, index) => (
                <div key={mode.label} className="overflow-hidden">
                  <Copy animateOnScroll delay={index * 0.08}>
                    <h3 className="text-xs font-bold tracking-[0.3em] mb-5 m-0 text-gray-900">
                      {mode.label}
                    </h3>
                    <ul className="space-y-4 m-0 p-0 list-none">
                      {mode.items.map((line) => (
                        <li
                          key={line}
                          className="text-sm text-gray-600 leading-[1.95] tracking-wide font-light border-b border-gray-100 pb-4"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </Copy>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fafafa] border-y border-gray-100">
          <div className="max-w-[560px] mx-auto">
            <Copy animateOnScroll>
              <h3 className="text-center font-serif text-lg md:text-xl tracking-[0.15em] m-0 mb-12 text-gray-900">
                {t("sections.travelTime.title")}
              </h3>
            </Copy>
            <ul className="space-y-5 m-0 p-0 list-none">
              {travelTimeRows.map((row, index) => (
                <li key={row.from} className="overflow-hidden">
                  <Copy animateOnScroll delay={index * 0.05}>
                    <p className="flex items-baseline gap-3 m-0 text-sm md:text-base tracking-widest">
                      <span className="text-gray-900 shrink-0">{row.from}</span>
                      <span className="flex-1 border-b border-dotted border-gray-300 min-w-[20px] mb-1" />
                      <span className="text-gray-500 font-light shrink-0">
                        {row.time}
                      </span>
                    </p>
                  </Copy>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 px-6 md:px-8 bg-white">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={getLocalizedPath("/location", locale)}
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-300 text-xs tracking-[0.2em] hover:border-gray-800 transition-colors"
            >
              {t("links.toLocation")}
              <span style={{ color: ACCENT }}>→</span>
            </Link>
            <Link
              href={getLocalizedPath("/amenities", locale)}
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-300 text-xs tracking-[0.2em] hover:border-gray-800 transition-colors"
            >
              {t("links.toAmenities")}
              <span style={{ color: ACCENT }}>→</span>
            </Link>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 z-50 shadow-lg"
        style={{ backgroundColor: ACCENT }}
        aria-label={t("links.backToTop")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
