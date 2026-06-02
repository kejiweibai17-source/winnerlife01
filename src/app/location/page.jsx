"use client";

import Image from "next/image";
import Link from "next/link";
import Copy from "../../../components/Copy";

const overviewItems = [
  {
    id: "geo",
    num: "01",
    title: "地理位置",
    body: "白金高輪・港南エリア。都心の利便性と水辺の開放感が調和する、進化し続けるロケーション。",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    id: "access",
    num: "02",
    title: "交通（電車站＆機場）",
    body: "複数路線の駅と羽田・成田へのアクセス。都心・空港・国際都市をつなぐ交通の核。",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <rect x="3" y="10" width="18" height="8" rx="1" />
        <path d="M7 10V6a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: "facilities",
    num: "03",
    title: "設施＋移動時間",
    body: "商業・医療・公園まで徒歩圏。日常の買い物から憩いの緑まで、移動時間とともにご紹介。",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    id: "summary",
    num: "04",
    title: "交通簡述",
    body: "駅・空港・生活施設へのアクセスを一覧で整理。日々の移動イメージをすばやく把握できます。",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
];

const trainAndAirportItems = [
  {
    name: "白金高輪駅",
    time: "徒歩約6分",
    distance: "約480m",
    image: "/images/index/659caf7f-6f74-462b-9485-2967b742dfc2.png",
  },
  {
    name: "天王洲アイル駅",
    time: "徒歩約6分",
    distance: "約490m",
    image: "/images/index/a96de8c2-9540-43c1-80fb-e44c3be0d651.png",
  },
  {
    name: "品川駅",
    time: "徒歩約15分",
    distance: "約1,200m",
    image: "/images/index/cd78a1ca-c3db-4c12-a8b2-413e62181b4f.png",
  },
];

const airportItems = [
  {
    name: "羽田空港",
    time: "車約20分",
    distance: "※目安",
    image: "/images/index/9adca514-b1df-4095-b86e-8ceaed137441.png",
  },
  {
    name: "成田空港",
    time: "車約60分",
    distance: "※目安",
    image: "/images/index/c3ba1316-d87a-412b-ae7a-378fbaae4d2c.png",
  },
];

const facilityItems = [
  {
    name: "白金アエルシティ",
    time: "徒歩約3分",
    distance: "約240m",
    image: "/images/index/白金アエルシティ.png",
  },
  {
    name: "品川シーズンテラス",
    time: "徒歩約15分",
    distance: "約1,200m",
    image: "/images/index/grid-02.png",
  },
  {
    name: "芝公園",
    time: "徒歩約20分",
    distance: "約1,600m",
    image: "/images/index/芝公園.png",
  },
];

const accessSummaryRows = [
  { label: "白金高輪駅", detail: "南北線・三田線　徒歩約6分" },
  { label: "天王洲アイル駅", detail: "りんかい線・東京モノレール　徒歩約6分" },
  { label: "品川駅", detail: "JR・京急　徒歩約15分" },
  { label: "羽田空港", detail: "車約20分（目安）" },
  { label: "成田空港", detail: "車約60分（目安）" },
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
          <linearGradient id="loc-wave-gradient" x1="0" y1="0" x2="0" y2="1">
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
          <p className="text-center text-sm md:text-base tracking-[0.12em] text-white/90 font-light m-0">
            {name}
          </p>
          <p className="text-center text-white/60 text-xs md:text-sm tracking-[0.12em] font-light m-0 mt-1">
            （{time}・{distance}）
          </p>
        </Copy>
      </div>
    </figure>
  );
}

export default function LocationPage() {
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
            src="/images/location/location-01.png"
            alt="周邊環境"
            className="w-full block"
          />
          <WaveDivider />
        </section>

        {/* Intro */}
        <section className="relative w-full z-10 bg-gradient-to-b from-[#a4b8c9] via-[#f4f7f9] to-white">
          <div className="max-w-[1300px] mx-auto px-4 pt-16 md:pt-28 pb-12 md:pb-16">
            <div className="overflow-hidden mb-10">
              <Copy animateOnScroll>
                <h1 className="font-serif text-5xl md:text-7xl text-gray-800 tracking-[0.15em] m-0">
                  LOCATION
                </h1>
              </Copy>
            </div>
            <div className="overflow-hidden mb-10">
              <Copy animateOnScroll delay={0.1}>
                <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] m-0">
                  運河に臨む、開放のウォーターフロントへ。
                </h2>
              </Copy>
            </div>
            <div className="max-w-3xl overflow-hidden">
              <Copy animateOnScroll delay={0.15}>
                <p className="text-sm md:text-base font-light tracking-[0.15em] leading-[2.2] text-gray-700 m-0 mb-6">
                  港区アドレスにありながら、再開発の機運に沸く品川エリアの進化の最前線を感じて暮らすことのできる、可能性に満ちたロケーション。
                </p>
                <p className="text-sm md:text-base font-light tracking-[0.15em] leading-[2.2] text-gray-700 m-0">
                  天王洲アイル駅と品川駅を使いこなし、都心を軽やかに駆け抜けながら、開放感あふれる南方面のウォーターフロントをかなえる日常へ。
                </p>
              </Copy>
            </div>
          </div>
          <div className="relative z-10 w-full">
            <img
              src="/images/location/location-02.png"
              alt="運河に臨むウォーターフロント"
              width={1920}
              height={800}
              className="w-full  "
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        {/* 01 章節導覽 — 2×2 網格（參考圖 1） */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#ececec]">
          <div className="max-w-[1100px] mx-auto text-center mb-12 md:mb-16 overflow-hidden">
            <Copy animateOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] mb-4 m-0">
                周邊環境のご案内
              </h2>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <p className="text-sm md:text-base text-gray-600 tracking-widest font-light m-0">
                地理位置・交通・施設・交通概要をご紹介します
              </p>
            </Copy>
          </div>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-300/90">
            {overviewItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative flex gap-6 p-8 md:p-10 bg-[#ececec] hover:bg-[#e4e4e4] transition-colors"
              >
                <span className="absolute top-4 right-5 text-xs text-gray-400 tracking-widest">
                  {item.num}
                </span>
                <div className="shrink-0 w-12 h-12 bg-white flex items-center justify-center text-gray-800">
                  {item.icon}
                </div>
                <div className="text-left pr-8 flex-1 overflow-hidden">
                  <Copy animateOnScroll delay={index * 0.08}>
                    <h3 className="font-bold text-base md:text-lg tracking-wider mb-3 m-0 group-hover:text-[#16294d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed tracking-wide font-light m-0">
                      {item.body}
                    </p>
                  </Copy>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 02 地理位置 — 左右分欄（參考圖 2） */}
        <section
          id="geo"
          className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 lg:items-stretch min-h-0 lg:min-h-[520px]"
        >
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-white order-2 lg:order-1">
            <div className="overflow-hidden mb-6">
              <Copy animateOnScroll>
                <p className="text-[10px] tracking-[0.35em] text-gray-400 m-0">
                  TOP　|　周邊環境　|　地理位置
                </p>
              </Copy>
            </div>
            <div className="overflow-hidden mb-2">
              <Copy animateOnScroll delay={0.08}>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[0.12em] m-0">
                  地理位置
                </h2>
              </Copy>
            </div>
            <div className="overflow-hidden mb-8">
              <Copy animateOnScroll delay={0.12}>
                <p className="text-lg md:text-xl font-light text-gray-400 tracking-[0.2em] m-0">
                  Location
                </p>
              </Copy>
            </div>
            <div className="overflow-hidden mb-6">
              <Copy animateOnScroll delay={0.18}>
                <p className="text-base md:text-lg font-medium tracking-widest text-gray-800 m-0">
                  白金高輪・港南—都心と水辺が交わるアドレス。
                </p>
              </Copy>
            </div>
            <div className="overflow-hidden">
              <Copy animateOnScroll delay={0.24}>
                <p className="text-sm md:text-base text-gray-600 leading-[2.2] tracking-widest font-light m-0">
                  東京都港区に位置し、品川エリアの再開発が進む港南地区。運河沿いのウォーターフロントと、落ち着いた住宅街の雰囲気が共存する、将来性の高いロケーションです。ビジネス・文化・生活がバランスよく整う街並みが広がります。
                </p>
              </Copy>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 min-h-[280px] sm:min-h-[360px] lg:min-h-[520px] h-full">
            <Image
              src="/images/location/location-02.png"
              alt="白金高輪・港南エリア"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </section>

        {/* 03 交通（電車站＆機場）— 深色三欄（參考圖 4 / 6） */}
        <section
          id="access"
          className="scroll-mt-24 bg-gradient-to-b from-[#0b1f3c] to-[#16294d] text-white py-20 md:py-28 px-4 md:px-8"
        >
          <div className="max-w-[1200px] mx-auto text-center mb-14 overflow-hidden">
            <Copy animateOnScroll>
              <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-4 m-0">
                交通
              </h2>
            </Copy>
            <div className="w-px h-10 bg-white/40 mx-auto mb-6" />
            <Copy animateOnScroll delay={0.12}>
              <p className="text-sm md:text-base tracking-[0.15em] leading-[2] text-white/80 max-w-2xl mx-auto font-light m-0">
                複数路線の駅を徒歩で使いこなし、羽田・成田へもスムーズにアクセス。都心と空港をつなぐ、利便性の高い交通環境です。
              </p>
            </Copy>
          </div>

          <div className="overflow-hidden mb-8">
            <Copy animateOnScroll delay={0.1}>
              <h3 className="text-center text-xs md:text-sm tracking-[0.3em] text-white/50 m-0">
                電車站
              </h3>
            </Copy>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
            {trainAndAirportItems.map((item, index) => (
              <GalleryCard
                key={item.name}
                {...item}
                delay={0.15 + index * 0.08}
              />
            ))}
          </div>

          <div className="overflow-hidden mb-8">
            <Copy animateOnScroll delay={0.1}>
              <h3 className="text-center text-xs md:text-sm tracking-[0.3em] text-white/50 m-0">
                機場
              </h3>
            </Copy>
          </div>
          <div className="max-w-[800px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {airportItems.map((item, index) => (
              <GalleryCard
                key={item.name}
                {...item}
                delay={0.2 + index * 0.08}
              />
            ))}
          </div>
        </section>

        {/* 04 設施＋移動時間 — 深色三欄（參考圖 6） */}
        <section
          id="facilities"
          className="scroll-mt-24 bg-[#0f2848] text-white py-20 md:py-28 px-4 md:px-8"
        >
          <div className="max-w-[1200px] mx-auto mb-14 text-center overflow-hidden">
            <Copy animateOnScroll>
              <h2 className="font-serif text-4xl md:text-5xl tracking-[0.15em] mb-4 m-0">
                設施
              </h2>
            </Copy>
            <div className="w-px h-10 bg-white/40 mx-auto mb-6" />
            <Copy animateOnScroll delay={0.12}>
              <p className="text-sm md:text-base tracking-[0.15em] leading-[2] text-white/80 max-w-2xl mx-auto font-light m-0">
                商業・医療・公園まで徒歩圏。日常の買い物から憩いのひとときまで、移動時間とともにご確認いただけます。
              </p>
            </Copy>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {facilityItems.map((item, index) => (
              <GalleryCard
                key={item.name}
                {...item}
                delay={0.15 + index * 0.08}
              />
            ))}
          </div>
        </section>

        {/* 05 交通簡述 — 上圖下文＋列表（參考圖 3） */}
        <section
          id="summary"
          className="scroll-mt-24 py-16 md:py-24 px-4 bg-white"
        >
          <div className="max-w-[900px] mx-auto">
            <div className="relative aspect-[21/9] md:aspect-[2.5/1] overflow-hidden mb-12 md:mb-16">
              <Image
                src="/images/index/wall/交通連結.png"
                alt="交通アクセス"
                fill
                className="object-cover"
                sizes="900px"
              />
            </div>
            <div className="overflow-hidden mb-4">
              <Copy animateOnScroll>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[0.15em] m-0">
                  交通簡述
                </h2>
              </Copy>
            </div>
            <div className="overflow-hidden mb-10">
              <Copy animateOnScroll delay={0.1}>
                <p className="text-sm md:text-base text-gray-600 tracking-widest leading-[2] font-light m-0">
                  主要駅・空港へのアクセスをまとめました。日々の通勤・出張・旅行のイメージにお役立てください。
                </p>
              </Copy>
            </div>
            <ul className="border-t border-gray-200">
              {accessSummaryRows.map((row, index) => (
                <li
                  key={row.label}
                  className="py-5 border-b border-gray-200 text-sm md:text-base tracking-widest overflow-hidden"
                >
                  <Copy animateOnScroll delay={0.08 + index * 0.06}>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 m-0">
                      <span className="sm:w-40 shrink-0 font-medium text-gray-900">
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
            <div className="flex justify-center mt-14 overflow-hidden">
              <Copy animateOnScroll delay={0.2}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 px-8 py-3 border border-gray-300 text-sm tracking-[0.2em] hover:border-[#16294d] hover:text-[#16294d] transition-colors"
                >
                  トップページへ
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
