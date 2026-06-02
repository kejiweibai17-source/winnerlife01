"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Copy from "../../../components/Copy";

const ACCENT = "#c41e3a";

const pickUpItems = [
  {
    title: "白金アエルシティで日常の買い物を",
    body: "スーパー・専門店・カフェが揃う複合施設。帰宅前のちょっとしたお買い物にも便利です。",
    image: "/images/amenities/002.png",
    tags: ["Shopping", "商業施設"],
    href: "#shopping",
  },
  {
    title: "品川駅—新幹線・空港アクセスの玄関口",
    body: "東海道新幹線・京急・JR各線が集まるターミナル。ビジネス・旅行の起点としても頼れる存在です。",
    image: "/images/amenities/009.png",
    tags: ["Station", "電車站"],
    href: "#shinagawa",
  },
  {
    title: "天王洲アイル—運河沿いのウォーターフロント",
    body: "再開発が進む水辺エリア。商業・オフィス・イベント空間が集まり、休日の散策にも最適です。",
    image: "/images/amenities/012.png",
    tags: ["Lifestyle", "生活圈"],
    href: "#tennozu",
  },
  {
    title: "白金高輪駅—南北線・三田線の交差",
    body: "都心南部を縦横に結ぶ2路線。六本木・大手町・目黒方面へ、乗り換え少なくアクセスできます。",
    image: "/images/amenities/006.png",
    tags: ["Station", "電車站"],
    href: "#shirokane",
  },
];

const spotlightSections = [
  {
    id: "shopping",
    titleEn: "Shirokane Aercity",
    minutes: "3",
    showBike: false,
    lead: "日々の買い物は白金アエルシティへ。",
    body: "日用品から生鮮食品、飲食、サービス施設まで、毎日に必要な店舗が徒歩圏に豊富に揃うライフラインです。",
    note: "白金アエルシティ",
    noteDetail: "徒歩約3分［約240m］",
    imageMain: "/images/amenities/002.png",
    imageSub1: "/images/amenities/004.png",
    imageSub1Label: "",
    imageSub2: "/images/amenities/005.png",
    imageSub2Label: "",
  },
  {
    id: "shirokane",
    titleEn: "Shirokane-Takanawa Station",
    minutes: "6",
    showBike: false,
    lead: "約6分で白金高輪駅へアクセス、都心各所へスムーズに。",
    body: "東京メトロ南北線・都営三田線の2路線が利用可能。ビジネスや遊び、どんなシーンでも便利で理想的な拠点となるポテンシャルを秘めています。",
    note: "東京メトロ南北線・都営三田線「白金高輪」駅",
    noteDetail: "徒歩約6分［約480m］",
    imageMain: "/images/amenities/006.png",
    imageSub1: "/images/amenities/007.png",
    imageSub1Label: "",
    imageSub2: "/images/amenities/008.png",
    imageSub2Label: "",
  },
  {
    id: "shinagawa",
    titleEn: "Shinagawa Station",
    minutes: "15",
    showBike: true,
    lead: "首都圏最大級のターミナル駅としてだけでなく",
    body: "品川駅前の商業施設やアトレ、駅ナカのショッピングエリアとしても、買い物・外食・出張のニーズに充分に応えてくれる場所です。",
    note: "JR・京急「品川」駅",
    noteDetail: "徒歩約15分［約1,200m］※1",
    imageMain: "/images/amenities/009.png",
    imageSub1: "/images/amenities/010.png",
    imageSub1Label: "",
    imageSub2: "/images/amenities/011.png",
    imageSub2Label: "",
  },
];

const stationGridItems = [
  {
    name: "白金高輪",
    lines: "南北線・三田線",
    time: "徒歩約6分",
    image: "/images/amenities/006.png",
  },
  {
    name: "天王洲アイル",
    lines: "りんかい線",
    time: "徒歩約6分",
    image: "/images/amenities/007.png",
  },
  {
    name: "品川",
    lines: "JR・京急",
    time: "徒歩約15分",
    image: "/images/amenities/009.png",
  },
  {
    name: "田町",
    lines: "JR山手線",
    time: "徒歩約18分",
    image: "/images/amenities/010.png",
  },
  {
    name: "五反田",
    lines: "JR・東急",
    time: "車約8分",
    image: "/images/amenities/011.png",
  },
  {
    name: "浜松町",
    lines: "JR・モノレール",
    time: "車約10分",
    image: "/images/amenities/013.png",
  },
];

const featureGridItems = [
  { title: "ショッピングモール", image: "/images/amenities/002.png" },
  { title: "スーパー・日用品", image: "/images/amenities/004.png" },
  { title: "飲食・カフェ", image: "/images/amenities/005.png" },
  { title: "複数路線の駅", image: "/images/amenities/006.png" },
  { title: "公園・緑地", image: "/images/amenities/012.png" },
  { title: "医療・公共", image: "/images/amenities/013.png" },
];

const carouselSlides = [
  {
    title: "白金アエルシティ",
    caption: "徒歩約3分・日常の買い物",
    image: "/images/amenities/002.png",
  },
  {
    title: "品川シーズンテラス",
    caption: "徒歩約15分・大型商業",
    image: "/images/amenities/005.png",
  },
  {
    title: "天王洲アイル",
    caption: "徒歩約6分・運河沿い",
    image: "/images/amenities/012.png",
  },
  {
    title: "白金高輪駅",
    caption: "徒歩約6分・2路線",
    image: "/images/amenities/008.png",
  },
  {
    title: "品川駅",
    caption: "徒歩約15分・ターミナル",
    image: "/images/amenities/009.png",
  },
];

const facilitySummaryRows = [
  { label: "白金アエルシティ", detail: "商業施設　徒歩約3分" },
  { label: "品川シーズンテラス", detail: "商業・オフィス　徒歩約15分" },
  { label: "白金高輪駅", detail: "南北線・三田線　徒歩約6分" },
  { label: "天王洲アイル駅", detail: "りんかい線・東京モノレール　徒歩約6分" },
  { label: "品川駅", detail: "JR・京急　徒歩約15分" },
  { label: "芝公園", detail: "緑地・散策　徒歩約20分" },
];

function WaveDivider() {
  return (
    <div className="absolute -bottom-[2px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg
        className="relative block h-[100px] md:h-[180px] lg:h-[250px] animate-wave-slow"
        style={{ width: "200%" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="amen-wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#f5f5f5" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.2"
        />
        <path
          d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.4"
        />
        <path
          d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
          fill="url(#amen-wave-gradient)"
        />
      </svg>
    </div>
  );
}

function RedCircleIcon({ children }) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0"
      style={{ backgroundColor: ACCENT }}
    >
      {children}
    </span>
  );
}

function SectionRedIcon({ label, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <RedCircleIcon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </RedCircleIcon>
      <h3 className="text-base md:text-lg font-bold tracking-widest m-0">
        {title}
      </h3>
      <span className="sr-only">{label}</span>
    </div>
  );
}

function PickUpRow({ title, body, image, tags, href, delay = 0 }) {
  const content = (
    <article className="group grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] gap-5 md:gap-8 py-8 md:py-10 border-b border-gray-200 last:border-b-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="200px"
        />
      </div>
      <div className="overflow-hidden min-w-0">
        <Copy animateOnScroll delay={delay}>
          <p
            className="text-[11px] font-semibold tracking-[0.2em] mb-2 m-0"
            style={{ color: ACCENT }}
          >
            Pick Up!
          </p>
          <h4 className="text-sm md:text-base font-bold tracking-wide text-gray-900 m-0 mb-3 leading-relaxed">
            {title}
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 rounded-full bg-[#3d3d3d] text-white tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-600 leading-[1.9] tracking-wide font-light m-0 line-clamp-3 md:line-clamp-none">
            {body}
          </p>
        </Copy>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }
  return content;
}

function WalkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden
    >
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3 3.7c.9-.3 1.5-1.1 1.5-2.1V7h-2v.1c0 .6-.4 1.1-1 1.3l-3.2 1.1v2.5h2l1.2 4.5-2.1 1.2 1.2 2.1 3.3-1.9c.6-.3 1-.9 1-1.6l-.3-3.2 2.4-.8 1.5 5.5 2.3-.6-2.2-8.2-2.5.8z" />
    </svg>
  );
}

function BikeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden
    >
      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 14l-1-4H2v2h1.2l1.1 3.4c-.2.6.2 1.2.8 1.4l4.5 1.5 1.5-2.3-3.6-1.2L5 14zm14.5 0c-.8 0-1.5.7-1.5 1.5S18.7 17 19.5 17 21 16.3 21 15.5 20.3 14 19.5 14zm-9 0C9.7 14 9 14.7 9 15.5S9.7 17 10.5 17 12 16.3 12 15.5 11.3 14 10.5 14zM19 8h-2.8l-2 4H12v2h3.5l2.5-5H19V8z" />
    </svg>
  );
}

function AmenitySpotlight({
  id,
  titleEn,
  minutes,
  showBike,
  lead,
  body,
  note,
  noteDetail,
  imageMain,
  imageSub1,
  imageSub1Label,
  imageSub2,
  imageSub2Label,
  delay = 0,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 bg-[#0a0a0a] text-white border-t border-white/10"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,38%)_1fr] gap-0">
        <div className="px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center">
          <Copy animateOnScroll delay={delay}>
            <h2 className="font-serif text-2xl md:text-3xl tracking-wide m-0 mb-6">
              {titleEn}
            </h2>
            <div className="flex items-end gap-3 mb-6">
              <span className="font-serif text-6xl md:text-7xl leading-none tracking-tight">
                {minutes}
              </span>
              <span className="text-lg md:text-xl font-light pb-2">min</span>
              <span className="flex items-center gap-2 pb-3 ml-2 text-white/90">
                <WalkIcon />
                {showBike && (
                  <>
                    <span className="text-white/50">+</span>
                    <BikeIcon />
                  </>
                )}
              </span>
            </div>
            <div className="w-full h-px bg-white/30 mb-8" />
            <p className="text-sm md:text-base tracking-wide leading-[2] font-light m-0 mb-2">
              {lead}
            </p>
            <p className="text-sm md:text-base tracking-wide leading-[2] text-white/75 font-light m-0 mb-10">
              {body}
            </p>
            <p className="text-xs tracking-widest text-white/50 m-0">{note}</p>
            <p className="text-xs tracking-widest text-white/50 m-0 mt-1">
              {noteDetail}
            </p>
          </Copy>
        </div>

        <div className="grid grid-cols-[1fr_minmax(140px,34%)] grid-rows-2 gap-1 min-h-[280px] md:min-h-[360px]">
          <div className="relative row-span-2 overflow-hidden">
            <Image
              src={imageMain}
              alt={titleEn}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 66vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={imageSub1}
              alt={imageSub1Label || titleEn}
              fill
              className="object-cover"
              sizes="200px"
            />
            {imageSub1Label && (
              <span className="absolute bottom-2 right-2 text-[10px] bg-black/50 px-2 py-0.5 tracking-wider">
                {imageSub1Label}
              </span>
            )}
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={imageSub2}
              alt={imageSub2Label || titleEn}
              fill
              className="object-cover"
              sizes="200px"
            />
            {imageSub2Label && (
              <span className="absolute bottom-2 right-2 text-[10px] bg-black/50 px-2 py-0.5 tracking-wider">
                {imageSub2Label}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ title, image, delay = 0 }) {
  return (
    <div className="flex flex-col items-center px-4 py-8 md:py-10 border-b border-r border-gray-200 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0">
      <div
        className="w-10 h-[3px] mb-6"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="relative w-full aspect-[4/3] max-w-[220px] overflow-hidden rounded-md mb-5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="220px"
        />
      </div>
      <Copy animateOnScroll delay={delay}>
        <p className="font-serif text-sm md:text-base tracking-[0.12em] text-center text-gray-800 m-0 flex items-center justify-center gap-2">
          {title}
          <span className="inline-flex w-4 h-4 rounded-full border border-gray-300 text-[10px] text-gray-400 items-center justify-center shrink-0">
            ?
          </span>
        </p>
      </Copy>
    </div>
  );
}

function FacilityCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-[#fafafa]">
      <div className="max-w-[1100px] mx-auto px-4 text-center mb-10 overflow-hidden">
        <Copy animateOnScroll>
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.15em] m-0 mb-5">
            周邊施設ギャラリー
          </h2>
          <p className="text-xs md:text-sm text-gray-600 tracking-[0.2em] leading-[2.2] font-light m-0 max-w-xl mx-auto">
            商場・電車站・公園など、徒歩圏の主要施設をご紹介します。
            写真をスライドして、街の魅力をご覧ください。
          </p>
        </Copy>
      </div>

      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex justify-end items-center gap-4 mb-4">
          <span className="text-xs tracking-widest text-gray-500 tabular-nums">
            {selectedIndex + 1} | {carouselSlides.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="w-9 h-9 border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
              aria-label="上一張"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="w-9 h-9 border border-gray-800 bg-gray-900 text-white flex items-center justify-center"
              aria-label="下一張"
            >
              ›
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-4 md:-ml-6">
            {carouselSlides.map((slide) => (
              <div
                key={slide.title}
                className="flex-[0_0_78%] sm:flex-[0_0_62%] md:flex-[0_0_48%] min-w-0 pl-4 md:pl-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white shadow-sm">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 78vw, 48vw"
                  />
                </div>
                <p className="text-center text-sm tracking-[0.15em] mt-4 text-gray-800 font-medium m-0">
                  {slide.title}
                </p>
                <p className="text-center text-xs tracking-widest mt-1 text-gray-500 m-0">
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AmenitiesPage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full bg-white font-sans text-gray-800 overflow-x-hidden">
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
        {/* Hero */}
        <section className="relative w-full z-10">
          <img
            src="/images/amenities/c282249a-d722-45f4-95d5-03e6a1bb9f52.png"
            alt="周邊設施"
            className="w-full block"
          />
          <WaveDivider />
        </section>

        {/* 頁首標題 — ShaMaison 居中標題 */}
        <section className="py-14 md:py-20 px-4 bg-white text-center overflow-hidden">
          <Copy animateOnScroll>
            <h1 className="font-serif text-3xl md:text-5xl tracking-[0.12em] text-gray-900 m-0">
              周邊の施設を知る
            </h1>
          </Copy>
        </section>

        {/* 左滿版背景圖 + 右 Pick Up 列表 */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(280px,42%)_1fr] min-h-0">
          <div className="relative text-white px-8 py-14 md:py-20 flex flex-col justify-between min-h-[420px] lg:min-h-[560px] overflow-hidden">
            <img
              src="/images/amenities/001.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
              <p className="text-xs tracking-[0.25em] text-white/85 m-0 mb-3">
                商場・電車站・生活施設をご紹介
              </p>
              <p className="font-serif text-3xl md:text-4xl tracking-[0.15em] m-0">
                AMENITIES
              </p>
            </div>
            <a
              href="#summary"
              className="relative z-10 flex items-center justify-center gap-4 pt-4 border-t border-white/20 hover:opacity-90 transition-opacity"
            >
              <span className="text-xs tracking-[0.2em] text-white/90">
                すべての施設
              </span>
              <span
                className="w-10 h-10 flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              >
                ›
              </span>
            </a>
          </div>

          <div className="bg-white px-6 md:px-12 py-10 md:py-14">
            <div className="max-w-xl mb-6 overflow-hidden">
              <Copy animateOnScroll>
                <p className="text-sm md:text-base text-gray-600 leading-[2.2] tracking-wide font-light m-0">
                  白金高輪・天王洲アイルエリアには、日常を支える商業施設や複数路線の駅、公園・医療などが徒歩圏に揃っています。買い物から通勤、週末のお出かけまで—都心の利便性を、バランスよく享受できる環境です。
                </p>
              </Copy>
            </div>
            {pickUpItems.map((item, index) => (
              <PickUpRow key={item.title} {...item} delay={index * 0.06} />
            ))}
          </div>
        </section>

        {/* 施設 Spotlight — 左文案 + 右三圖（參考 FOLEO / 駅） */}
        {spotlightSections.map((section, index) => (
          <AmenitySpotlight key={section.id} {...section} delay={index * 0.05} />
        ))}

        {/* 電車站一覧グリッド */}
        <section
          id="tennozu"
          className="scroll-mt-24 border-t border-gray-200 px-6 md:px-12 py-12 md:py-16 bg-[#fafafa]"
        >
          <SectionRedIcon label="stations" title="周辺の主な電車站" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 rounded-lg overflow-hidden mb-5 max-w-[900px] mx-auto">
            {stationGridItems.map((station) => (
              <div
                key={station.name}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={station.image}
                  alt={station.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="150px"
                />
                <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white p-1 text-center">
                  <span className="text-[10px] md:text-xs font-bold tracking-wider">
                    {station.name}
                  </span>
                  <span className="text-[9px] opacity-80 mt-0.5">
                    {station.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-600 text-center tracking-[0.15em] leading-[2] font-light m-0">
            複数路線の駅が徒歩圏に。都心・空港・横浜方面へもスムーズにつながります。
          </p>
        </section>

        {/* 三欄特色格 — 紅線 + 圓角圖（參考 選ばれる理由） */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-white border-t border-gray-200">
          <div className="max-w-[1000px] mx-auto text-center mb-8 md:mb-12 overflow-hidden">
            <Copy animateOnScroll>
              <p
                className="text-xs tracking-[0.3em] font-medium m-0 mb-3"
                style={{ color: ACCENT }}
              >
                周邊設施の魅力
              </p>
              <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em] m-0 mb-4">
                暮らしを支える、身近なインフラ
              </h2>
              <p className="text-sm text-gray-600 tracking-widest leading-[2] font-light m-0 max-w-2xl mx-auto">
                買い物・交通・緑と医療まで。港区港南エリアで叶う、バランスの取れた日常。
              </p>
            </Copy>
          </div>
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t border-l border-gray-200">
            {featureGridItems.map((item, index) => (
              <FeatureCell key={item.title} {...item} delay={index * 0.05} />
            ))}
          </div>
        </section>

        {/* 滿版 CTA 橫幅 — 白卡片疊圖 */}
        <section className="relative w-full min-h-[320px] md:min-h-[420px] flex items-center">
          <img
            src="/images/amenities/014.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a4a8a]/30" />
          <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 md:px-10 py-16">
            <div className="bg-white max-w-md px-8 md:px-12 py-10 md:py-14 shadow-lg">
              <Copy animateOnScroll>
                <h2 className="text-xl md:text-2xl font-bold tracking-[0.1em] m-0 mb-5">
                  周邊環境の詳細
                </h2>
                <p className="text-sm text-gray-600 leading-[2] tracking-wide font-light m-0 mb-8">
                  地理位置・交通・空港アクセスなど、ロケーションの詳しい情報は周邊環境ページでご覧いただけます。
                </p>
                <Link
                  href="/location"
                  className="inline-flex items-center gap-4 text-sm tracking-[0.15em] group"
                >
                  詳細をみる
                  <span
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#1a4a8a] group-hover:border-[#1a4a8a] transition-colors"
                  >
                    ›
                  </span>
                </Link>
              </Copy>
            </div>
          </div>
        </section>

        <FacilityCarousel />

        {/* 底部支援列 + 一覧 */}
        <section className="border-t border-gray-200">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200">
            <div className="overflow-hidden">
              <Copy animateOnScroll>
                <p className="text-lg md:text-xl font-bold tracking-[0.12em] m-0">
                  施設までの目安時間
                </p>
                <p className="text-xs text-gray-500 tracking-widest mt-2 m-0">
                  徒歩・車の目安です。実際の時間は道路状況等により異なります。
                </p>
              </Copy>
            </div>
            <Link
              href="#summary"
              className="inline-flex items-center gap-3 text-sm tracking-[0.15em] shrink-0 group"
            >
              一覧を見る
              <span
                className="w-10 h-10 flex items-center justify-center text-white"
                style={{ backgroundColor: ACCENT }}
              >
                ›
              </span>
            </Link>
          </div>

          <div id="summary" className="scroll-mt-24 max-w-[800px] mx-auto px-4 py-12 md:py-16">
            <ul className="border-t border-gray-200">
              {facilitySummaryRows.map((row, index) => (
                <li
                  key={row.label}
                  className="py-4 border-b border-gray-200 text-sm tracking-widest overflow-hidden"
                >
                  <Copy animateOnScroll delay={index * 0.05}>
                    <p className="flex flex-col sm:flex-row sm:gap-8 m-0">
                      <span className="sm:w-40 font-medium text-gray-900 shrink-0">
                        {row.label}
                      </span>
                      <span className="text-gray-600 font-light">
                        {row.detail}
                      </span>
                    </p>
                  </Copy>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-400 tracking-wider mt-8 m-0 leading-relaxed">
              ※1　距離・所要時間は地図上の直線距離および徒歩80m＝1分で算出した目安です。実際の時間は道路状況等により異なります。
            </p>
            <div className="flex justify-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-3 border border-gray-300 text-sm tracking-[0.2em] hover:border-gray-800 transition-colors"
              >
                トップページへ
                <span style={{ color: ACCENT }}>›</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors z-50 backdrop-blur-sm shadow-lg"
        aria-label="返回頂部"
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
