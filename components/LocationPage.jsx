"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Copy from "./Copy";
import LocationDesignSections from "./LocationDesignSections";
import { getLocalizedPath } from "@/lib/locale-path";

const TRAIN_IMAGES = {
  shirokane: "/images/index/659caf7f-6f74-462b-9485-2967b742dfc2.png",
  tennozu: "/images/index/a96de8c2-9540-43c1-80fb-e44c3be0d651.png",
  shinagawa: "/images/index/cd78a1ca-c3db-4c12-a8b2-413e62181b4f.png",
};

const AIRPORT_IMAGES = {
  haneda: "/images/index/9adca514-b1df-4095-b86e-8ceaed137441.png",
  narita: "/images/index/c3ba1316-d87a-412b-ae7a-378fbaae4d2c.png",
};

const FACILITY_IMAGES = {
  ael: "/images/index/白金アエルシティ.png",
  season: "/images/index/grid-02.png",
  shiba: "/images/index/芝公園.png",
};

const OVERVIEW_ICONS = {
  geo: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  access: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <rect x="3" y="10" width="18" height="8" rx="1" />
      <path d="M7 10V6a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  facilities: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  summary: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
};

function WaveDivider() {
  return (
    <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 w-full overflow-hidden leading-[0]">
      <svg
        className="relative block h-[100px] md:h-[180px] lg:h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ width: "200%", marginLeft: 0 }}
      >
        <defs>
          <linearGradient id="loc-wave-gradient" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#loc-wave-gradient)"
        />
      </svg>
    </div>
  );
}

function GalleryCard({ name, time, distance, image, delay = 0 }) {
  return (
    <figure className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a2c4e]/40">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-4 overflow-hidden">
        <Copy animateOnScroll delay={delay}>
          <p className="m-0 text-center text-sm font-light tracking-[0.12em] text-white/90 md:text-base">
            {name}
          </p>
          <p className="m-0 mt-1 text-center text-xs font-light tracking-[0.12em] text-white/60 md:text-sm">
            （{time}・{distance}）
          </p>
        </Copy>
      </div>
    </figure>
  );
}

export default function LocationPage() {
  const t = useTranslations("location.page");
  const pathname = usePathname();
  const locale = pathname.startsWith("/jp") ? "jp" : "zh";
  const homeHref = getLocalizedPath("/", locale);

  const overviewItems = t.raw("overview.items").map((item) => ({
    ...item,
    icon: OVERVIEW_ICONS[item.id],
  }));

  const trainItems = t
    .raw("access.trainItems")
    .map((item) => ({ ...item, image: TRAIN_IMAGES[item.id] }));

  const airportItems = t
    .raw("access.airportItems")
    .map((item) => ({ ...item, image: AIRPORT_IMAGES[item.id] }));

  const facilityItems = t
    .raw("facilities.items")
    .map((item) => ({ ...item, image: FACILITY_IMAGES[item.id] }));

  const introParagraphs = t.raw("intro.paragraphs");
  const summaryRows = t.raw("summary.rows");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full overflow-x-hidden bg-white font-sans text-gray-800">
      <style jsx global>{`
        @keyframes waveSlow {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) scaleY(0.8);
          }
          100% {
            transform: translateX(-50%) scaleY(1);
          }
        }
        @keyframes waveMid {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-15%) scaleY(1.1);
          }
          100% {
            transform: translateX(-30%) scaleY(1);
          }
        }
        @keyframes waveFast {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-20%) scaleY(0.9);
          }
          100% {
            transform: translateX(-40%) scaleY(1);
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
        <section className="relative z-10 h-[85vh] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/index/c2de02b1-7105-4795-ab74-c45b00505a7b.png"
              alt={t("heroAlt")}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <WaveDivider />
        </section>

        <section className="relative z-10 w-full">
          <div className="mx-auto max-w-[1300px] px-4 pt-16 pb-12 md:pt-28 md:pb-16">
            <div className="mb-10 overflow-hidden">
              <Copy animateOnScroll>
                <h1 className="m-0 font-serif text-5xl tracking-[0.15em] text-gray-800 md:text-7xl">
                  {t("intro.title")}
                </h1>
              </Copy>
            </div>
            <div className="mb-10 overflow-hidden">
              <Copy animateOnScroll delay={0.1}>
                <h2 className="m-0 text-xl font-light tracking-[0.2em] md:text-2xl">
                  {t("intro.subtitle")}
                </h2>
              </Copy>
            </div>
            <div className="max-w-3xl overflow-hidden">
              {introParagraphs.map((paragraph, index) => (
                <Copy key={index} animateOnScroll delay={0.15 + index * 0.05}>
                  <p
                    className={`m-0 text-sm font-light leading-[2.2] tracking-[0.15em] text-gray-700 md:text-base ${index < introParagraphs.length - 1 ? "mb-6" : ""}`}
                  >
                    {paragraph}
                  </p>
                </Copy>
              ))}
            </div>
          </div>
        </section>

        <LocationDesignSections />

        <section className="bg-[#ececec] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto mb-12 max-w-[1100px] overflow-hidden text-center md:mb-16">
            <Copy animateOnScroll>
              <h2 className="m-0 mb-4 text-2xl font-bold tracking-[0.2em] md:text-3xl">
                {t("overview.title")}
              </h2>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <p className="m-0 text-sm font-light tracking-widest text-gray-600 md:text-base">
                {t("overview.subtitle")}
              </p>
            </Copy>
          </div>
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-px bg-gray-300/90 md:grid-cols-2">
            {overviewItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative flex gap-6 bg-[#ececec] p-8 transition-colors hover:bg-[#e4e4e4] md:p-10"
              >
                <span className="absolute top-4 right-5 text-xs tracking-widest text-gray-400">
                  {item.num}
                </span>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-gray-800">
                  {item.icon}
                </div>
                <div className="flex-1 overflow-hidden pr-8 text-left">
                  <Copy animateOnScroll delay={index * 0.08}>
                    <h3 className="m-0 mb-3 text-base font-bold tracking-wider transition-colors group-hover:text-[#16294d] md:text-lg">
                      {item.title}
                    </h3>
                    <p className="m-0 text-xs leading-relaxed font-light tracking-wide text-gray-600 md:text-sm">
                      {item.body}
                    </p>
                  </Copy>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="geo"
          className="grid min-h-0 scroll-mt-24 grid-cols-1 lg:min-h-[520px] lg:grid-cols-2 lg:items-stretch"
        >
          <div className="order-2 flex flex-col justify-center bg-white px-8 py-16 md:px-16 md:py-24 lg:order-1 lg:px-20">
            <div className="mb-6 overflow-hidden">
              <Copy animateOnScroll>
                <p className="m-0 text-[10px] tracking-[0.35em] text-gray-400">
                  {t("geo.breadcrumb")}
                </p>
              </Copy>
            </div>
            <div className="mb-2 overflow-hidden">
              <Copy animateOnScroll delay={0.08}>
                <h2 className="m-0 text-3xl font-bold tracking-[0.12em] md:text-4xl">
                  {t("geo.title")}
                </h2>
              </Copy>
            </div>
            <div className="mb-8 overflow-hidden">
              <Copy animateOnScroll delay={0.12}>
                <p className="m-0 text-lg font-light tracking-[0.2em] text-gray-400 md:text-xl">
                  {t("geo.subtitle")}
                </p>
              </Copy>
            </div>
            <div className="mb-6 overflow-hidden">
              <Copy animateOnScroll delay={0.18}>
                <p className="m-0 text-base font-medium tracking-widest text-gray-800 md:text-lg">
                  {t("geo.tagline")}
                </p>
              </Copy>
            </div>
            <div className="overflow-hidden">
              <Copy animateOnScroll delay={0.24}>
                <p className="m-0 text-sm font-light leading-[2.2] tracking-widest text-gray-600 md:text-base">
                  {t("geo.body")}
                </p>
              </Copy>
            </div>
          </div>
        </section>

        <section
          id="access"
          className="scroll-mt-24 bg-gradient-to-b from-[#0b1f3c] to-[#16294d] px-4 py-20 text-white md:px-8 md:py-28"
        >
          <div className="mx-auto mb-14 max-w-[1200px] overflow-hidden text-center">
            <Copy animateOnScroll>
              <h2 className="m-0 mb-4 font-serif text-4xl tracking-[0.2em] md:text-6xl">
                {t("access.title")}
              </h2>
            </Copy>
            <div className="mx-auto mb-6 h-10 w-px bg-white/40" />
            <Copy animateOnScroll delay={0.12}>
              <p className="m-0 mx-auto max-w-2xl text-sm font-light leading-[2] tracking-[0.15em] text-white/80 md:text-base">
                {t("access.description")}
              </p>
            </Copy>
          </div>

          <div className="mb-8 overflow-hidden">
            <Copy animateOnScroll delay={0.1}>
              <h3 className="m-0 text-center text-xs tracking-[0.3em] text-white/50 md:text-sm">
                {t("access.trainLabel")}
              </h3>
            </Copy>
          </div>
          <div className="mx-auto mb-16 grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-3 md:mb-20 md:gap-10">
            {trainItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                name={item.name}
                time={item.time}
                distance={item.distance}
                image={item.image}
                delay={0.15 + index * 0.08}
              />
            ))}
          </div>

          <div className="mb-8 overflow-hidden">
            <Copy animateOnScroll delay={0.1}>
              <h3 className="m-0 text-center text-xs tracking-[0.3em] text-white/50 md:text-sm">
                {t("access.airportLabel")}
              </h3>
            </Copy>
          </div>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
            {airportItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                name={item.name}
                time={item.time}
                distance={item.distance}
                image={item.image}
                delay={0.2 + index * 0.08}
              />
            ))}
          </div>
        </section>

        <section
          id="facilities"
          className="scroll-mt-24 bg-[#0f2848] px-4 py-20 text-white md:px-8 md:py-28"
        >
          <div className="mx-auto mb-14 max-w-[1200px] overflow-hidden text-center">
            <Copy animateOnScroll>
              <h2 className="m-0 mb-4 font-serif text-4xl tracking-[0.15em] md:text-5xl">
                {t("facilities.title")}
              </h2>
            </Copy>
            <div className="mx-auto mb-6 h-10 w-px bg-white/40" />
            <Copy animateOnScroll delay={0.12}>
              <p className="m-0 mx-auto max-w-2xl text-sm font-light leading-[2] tracking-[0.15em] text-white/80 md:text-base">
                {t("facilities.description")}
              </p>
            </Copy>
          </div>
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10">
            {facilityItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                name={item.name}
                time={item.time}
                distance={item.distance}
                image={item.image}
                delay={0.15 + index * 0.08}
              />
            ))}
          </div>
        </section>

        <section
          id="summary"
          className="scroll-mt-24 bg-white px-4 py-16 md:py-24"
        >
          <div className="mx-auto max-w-[900px]">
            <div className="relative mb-12 aspect-[21/9] overflow-hidden md:mb-16 md:aspect-[2.5/1]">
              <Image
                src="/images/index/wall/交通連結.png"
                alt={t("summary.imageAlt")}
                fill
                className="object-cover"
                sizes="900px"
              />
            </div>
            <div className="mb-4 overflow-hidden">
              <Copy animateOnScroll>
                <h2 className="m-0 text-2xl font-bold tracking-[0.15em] md:text-3xl">
                  {t("summary.title")}
                </h2>
              </Copy>
            </div>
            <div className="mb-10 overflow-hidden">
              <Copy animateOnScroll delay={0.1}>
                <p className="m-0 text-sm font-light leading-[2] tracking-widest text-gray-600 md:text-base">
                  {t("summary.description")}
                </p>
              </Copy>
            </div>
            <ul className="border-t border-gray-200">
              {summaryRows.map((row, index) => (
                <li
                  key={row.label}
                  className="overflow-hidden border-b border-gray-200 py-5 text-sm tracking-widest md:text-base"
                >
                  <Copy animateOnScroll delay={0.08 + index * 0.06}>
                    <p className="m-0 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
                      <span className="shrink-0 font-medium text-gray-900 sm:w-40">
                        {row.label}
                      </span>
                      <span className="font-light text-gray-600">
                        {row.detail}
                      </span>
                    </p>
                  </Copy>
                </li>
              ))}
            </ul>
            <div className="mt-14 flex justify-center overflow-hidden">
              <Copy animateOnScroll delay={0.2}>
                <Link
                  href={homeHref}
                  className="inline-flex items-center gap-3 border border-gray-300 px-8 py-3 text-sm tracking-[0.2em] transition-colors hover:border-[#16294d] hover:text-[#16294d]"
                >
                  {t("summary.backToTop")}
                  <span className="text-[#3d7ab5]">›</span>
                </Link>
              </Copy>
            </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed right-8 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
        aria-label={t("backToTop")}
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
