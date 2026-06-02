"use client";

import Link from "next/link";
import Copy from "../../../components/Copy";

const ACCENT = "#d4622a";
const TAG_BG = "#4a3f35";
const BEIGE = "#f0ebe3";

const stationAreasCol1 = ["白金高輪", "天王洲アイル", "品川", "田町"];
const stationAreasCol2 = ["六本木一丁目", "大手町", "羽田空港", "首都高速"];

const accessModes = [
  {
    label: "BY TRAIN",
    items: [
      "東京メトロ南北線・都営三田線「白金高輪」駅　徒歩約6分（約480m）",
      "りんかい線・東京モノレール「天王洲アイル」駅　徒歩約6分（約490m）",
      "JR・京急「品川」駅　徒歩約15分（約1,200m）",
    ],
  },
  {
    label: "BY CAR",
    items: [
      "首都高速「芝公園」出入口　車約5分（約1.5km）※",
      "羽田空港　車約20分（約15km）※",
      "成田空港　車約60分（約70km）※",
    ],
  },
  {
    label: "BY MONORAIL",
    items: [
      "東京モノレール「天王洲アイル」駅　徒歩約6分",
      "羽田空港第3ターミナル　モノレール約13分※",
    ],
  },
];

const travelTimeRows = [
  { from: "東京駅", time: "約15分" },
  { from: "六本木一丁目駅", time: "約10分" },
  { from: "大手町駅", time: "約12分" },
  { from: "品川駅", time: "徒歩約15分" },
  { from: "羽田空港", time: "車約20分" },
  { from: "成田空港", time: "車約60分" },
];

/** フォルダ内 003–007 をすべて使用（各1回） */
const photoGallery = [
  {
    image: "/images/transportation/004.png",
    caption: "白金高輪エリアの駅周辺",
  },
  {
    image: "/images/transportation/005.png",
    caption: "品川方面の商業・駅前",
  },
  {
    image: "/images/transportation/006.png",
    caption: "天王洲アイル駅前　徒歩約6分",
  },
  {
    image: "/images/transportation/007.png",
    caption: "港南地区の街路景観",
  },
];

const transportNodes = [
  { label: "電車", sub: "複数路線" },
  { label: "車", sub: "高速・空港" },
  { label: "モノレール", sub: "羽田直結" },
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
          <linearGradient id="trans-wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          className="animate-wave-slow"
          d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.3"
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
        .animate-wave-fast {
          animation: waveFast 8s linear infinite;
          transform-origin: bottom;
        }
      `}</style>

      <main className="bg-white">
        {/* Hero — 全幅圖 + 左側白字（參考 SANU 森林 Hero） */}
        <section className="relative w-full z-10 min-h-[50vh] md:min-h-[85vh] flex items-end">
          <img
            src="/images/transportation/001.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-8 pb-16 md:pb-24 pt-32">
            <Copy animateOnScroll>
              <p className="text-white/80 text-xs tracking-[0.3em] m-0 mb-4">
                TRANSPORTATION
              </p>
              <h1 className="text-white font-serif text-3xl md:text-5xl tracking-[0.08em] leading-snug m-0 mb-4">
                都心と空港をつなぐ、
                <br />
                軽やかな交通のしなやかさ。
              </h1>
              <p className="text-white/85 text-sm md:text-base font-light tracking-wide leading-[2] m-0 max-w-lg">
                白金高輪・天王洲アイル・品川—徒歩圏の駅と羽田アクセス。
              </p>
            </Copy>
          </div>
          <WaveDivider />
        </section>

        {/* 01 — 編號 + 左右文案 */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-b border-gray-100">
          <SanuSectionHeader
            num="01."
            title="複数路線が交わる、港南の交通ハブ。"
            description="東京メトロ・都営地下鉄・JR・京急・りんかい線・東京モノレール。都心の主要駅から羽田空港まで、暮らしのシーンに合わせて最適なルートを選べます。"
          />
          <img
            src="/images/transportation/2e1db6cf-3af3-452a-bc95-9e240c728533.png"
            className="w-full mx-auto max-w-[1100px]"
            alt=""
          />
        </section>

        {/* 02 — 大數字 + 展開エリア + 地圖（參考 SANU 36拠点 / 地圖） */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-gray-100">
          <SanuSectionHeader
            num="02."
            title="白金高輪エリアから、都心・空港へスムーズに。"
            description="徒歩圏に3つの主要駅が集結。品川ターミナルや羽田空港へも、電車・車・モノレールで快適にアクセスできます。"
            delay={0.05}
          />

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                        路線
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
                        15
                      </span>
                      <span className="text-base md:text-lg pb-2 text-gray-800">
                        分
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 m-0">
                      品川駅まで（徒歩）
                    </p>
                  </Copy>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 tracking-wider m-0 mb-6">
                ※2026年5月時点の目安
              </p>

              <span
                className="inline-block text-white text-xs tracking-[0.2em] px-4 py-2 mb-6"
                style={{ backgroundColor: TAG_BG }}
              >
                徒歩圏の駅
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

            <div
              className="aspect-[4/3] lg:aspect-square overflow-hidden flex items-center justify-center p-4 md:p-6"
              style={{ backgroundColor: BEIGE }}
            >
              <img
                src="/images/transportation/map01.png"
                alt="周邊交通地圖"
                className="w-full h-full object-contain block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* 交通連結図 — 白底 */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-[#fafafa] border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto">
            <div className="w-full aspect-[16/10] md:aspect-[2/1] mb-6 flex items-center justify-center bg-[#fafafa]">
              <img
                src="/images/transportation/map02.png"
                alt="交通連結図"
                className="w-full h-full object-contain block"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider text-center m-0 leading-relaxed">
              ※所要時間・距離は目安です。道路状況・乗換等により異なります。
            </p>
          </div>
        </section>

        {/* 03 — フロー図（參考 SANU 04 不動産資産） */}
        <section className="py-20 md:py-32 px-6 md:px-8 bg-white border-b border-gray-100">
          <SanuSectionHeader
            num="03."
            title="電車も、車も、モノレールも—シーンに合わせて選べる。"
            description="通勤は地下鉄、出張は品川から新幹線、空港へは羽田直結。移動手段の組み合わせで、都心ライフを軽やかに支えます。"
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
                  交通アクセス
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
                交通の詳細をもっと知る
                <span aria-hidden>→</span>
              </Link>
            </Copy>
          </div>
        </section>

        {/* 三欄圖片（參考 資料請求カード） */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto text-center mb-12 overflow-hidden">
            <Copy animateOnScroll>
              <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em] m-0 mb-4">
                交通の魅力を、写真で。
              </h2>
              <p className="text-sm text-gray-600 leading-[2] font-light m-0 max-w-xl mx-auto">
                駅・街並み・空港アクセスまで。港南エリアの交通環境をご覧ください。
              </p>
            </Copy>
          </div>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {photoGallery.map((card, index) => (
              <figure key={card.caption}>
                <div className="aspect-[4/3] overflow-hidden bg-[#f4f4f4] mb-3">
                  <img
                    src={card.image}
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

        {/* 04 ACCESS */}
        <section
          id="access"
          className="scroll-mt-24 py-20 md:py-28 px-6 md:px-8 bg-white"
        >
          <div className="max-w-[1100px] mx-auto mb-14 md:mb-20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[72px_1fr] gap-6 items-start">
              <SectionNum>04.</SectionNum>
              <Copy animateOnScroll>
                <h2 className="font-serif text-5xl md:text-7xl tracking-[0.1em] m-0 mb-4 text-gray-900">
                  ACCESS
                </h2>
                <p className="text-sm md:text-base text-gray-600 tracking-[0.12em] font-light m-0">
                  都心・品川・空港へ—複数の移動手段でつながるロケーション。
                </p>
              </Copy>
            </div>
          </div>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
              <img
                src="/images/transportation/003.png"
                alt="バス・路線交通"
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

        {/* 所要時間 */}
        <section className="py-16 md:py-24 px-6 bg-[#fafafa] border-y border-gray-100">
          <div className="max-w-[560px] mx-auto">
            <Copy animateOnScroll>
              <h3 className="text-center font-serif text-lg md:text-xl tracking-[0.15em] m-0 mb-12 text-gray-900">
                主要目的地までの目安
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
              href="/location"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-300 text-xs tracking-[0.2em] hover:border-gray-800 transition-colors"
            >
              周邊環境へ
              <span style={{ color: ACCENT }}>→</span>
            </Link>
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-300 text-xs tracking-[0.2em] hover:border-gray-800 transition-colors"
            >
              周邊設施へ
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
