"use client";

import WovenStory from "./WovenStory";
import Image from "next/image";
import Link from "next/link";
import Hero from "./Slider01";
import Slider from "./Slider/Slider";
import ShowCase from "./CollectionShowcase";
import ParallaxImage from "./ParallaxImage/page";
import HomeBottomPromo from "./HomeBottomPromo";
import { useTranslations } from "next-intl";

const CARD_IMAGES = [
  "/images/index/grid-02.png",
  "/images/index/659caf7f-6f74-462b-9485-2967b742dfc2.png",
  "/images/index/a96de8c2-9540-43c1-80fb-e44c3be0d651.png",
];

export default function HomePage() {
  const t = useTranslations();

  const cards = CARD_IMAGES.map((image, i) => ({
    id: i + 1,
    title: t(`cards.${i}.title`),
    image,
  }));

  return (
    <>
      <Hero />

      <section className="relative w-full bg-[#fbfcfd] text-[#333] pt-24 pb-32 px-6 md:px-12 lg:px-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1a2c4e]/5 to-transparent pointer-events-none" />

        <div className="max-w-[1280px] mx-auto flex flex-col gap-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="flex flex-col gap-8">
              <h2 className="text-sm tracking-[0.2em] font-serif border-b border-gray-300 pb-4 inline-block w-full max-w-[200px]">
                {t("info.title")}
              </h2>
              <ul className="flex flex-col gap-4 text-sm md:text-base tracking-widest leading-relaxed font-medium">
                <li>{t("info.items.0")}</li>
                <li>{t("info.items.1")}</li>
                <li>{t("info.items.2")}</li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <Link
                href="#"
                className="group bg-[#16294d] text-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 hover:bg-[#203968] transition-colors duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-lg tracking-widest font-medium">
                    {t("info.register.label")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm tracking-widest leading-relaxed opacity-80">
                  {t("info.register.desc")}
                </p>
              </Link>

              <Link
                href="#"
                className="group bg-[#b29759] text-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 hover:bg-[#c7ab6b] transition-colors duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                  <span className="text-lg tracking-widest font-medium">
                    {t("info.reserve.label")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm tracking-widest leading-relaxed opacity-80">
                  {t("info.reserve.desc")}
                </p>
              </Link>

              <div className="bg-white border border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
                <p className="text-xs tracking-widest text-gray-600">
                  {t("info.contact.label")}
                </p>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-3xl md:text-5xl font-serif tracking-wider text-gray-900">
                    0120-109-230
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mt-2">
                  {t("info.contact.hours")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card) => (
              <Link
                key={card.id}
                href="#"
                className="group relative w-full aspect-[4/5] overflow-hidden bg-gray-200"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-4">
                  <h3 className="text-white text-base md:text-lg font-medium leading-loose tracking-widest whitespace-pre-line drop-shadow-md">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-80">
                      Read More
                    </span>
                    <span className="text-white opacity-80 transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ShowCase />

      <Link
        href="#"
        className="block relative w-full overflow-hidden group cursor-pointer"
      >
        <div className="transition-transform duration-700 ease-out">
          <ParallaxImage
            src="/images/index/ChatGPT Image 2026年5月29日 下午12_10_20.png"
            alt={t("parallax.title")}
            tag={t("parallax.tag")}
            title={t("parallax.title")}
            body={t("parallax.body")}
            navyOverlay
          />
        </div>
      </Link>

      <WovenStory />
      <Slider />
      <HomeBottomPromo />
    </>
  );
}
