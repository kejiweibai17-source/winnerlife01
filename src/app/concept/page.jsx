"use client";

import React, { useEffect, useState } from "react";
import HeroSlider from "../../../components/HeroSlider/page";

export default function Concept() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* --- 修正點 1：加入 transform-origin: bottom 強制底部貼齊 --- */}
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
        {/* --- 修正點 2：加入 z-10 確保此區塊蓋住下一個 Section --- */}
        <section className="relative w-full z-10">
          <HeroSlider />

          {/* --- 修正點 3：使用 -bottom-[2px] 往下延伸 2px，完美填補任何渲染縫隙 --- */}
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
              ></path>

              <path
                className="animate-wave-mid"
                d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
                fill="#ffffff"
                opacity="0.4"
              ></path>

              <path
                className="animate-wave-fast"
                d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
                fill="url(#wave-gradient-animated)"
              ></path>
            </svg>
          </div>
        </section>

        {/* --- Section 2 --- */}
        {/* 這裡加入 z-0，讓上方的 Slider 與波浪能順理成章蓋在它的頂端 --- */}
        <section className="relative w-full z-0 pt-16 md:pt-32 pb-24 px-4 bg-gradient-to-b from-[#a4b8c9] via-[#f4f7f9] to-white flex flex-col items-center text-center">
          <div className="mb-10">
            <h3 className="font-serif text-2xl md:text-4xl text-gray-700 tracking-[0.1em] mb-2">
              By The
            </h3>
            <h2 className="font-serif text-5xl md:text-7xl text-gray-800 tracking-[0.15em]">
              Water Front
            </h2>
          </div>

          <h4 className="text-xl md:text-2xl font-light text-gray-800 tracking-[0.2em] mb-12">
            運河に臨む、開放のウォーターフロントへ。
          </h4>

          <div className="space-y-6 text-sm md:text-base text-gray-700 font-light tracking-[0.15em] leading-[2.2]">
            <p>
              港区アドレスにありながら、再開発の機運に沸く品川エリアの
              <br className="hidden md:block" />
              その進化の最前線を感じて暮らすことのできる可能性に満ちたロケーション。
            </p>
            <p>
              天王洲アイル駅と品川駅を使いこなし、都心を軽やかに駆け抜けながら
              <br className="hidden md:block" />
              開放感あふれる南方面のウォーターフロントをかなえる日常へ。
            </p>
            <p className="pt-8">
              先進と自然が溶け合うベイエリアに新たな価値を創造する、全233邸。
              <br className="hidden md:block" />
              ブランズシティ品川ルネ キャナル、いよいよ始動。
            </p>
          </div>
        </section>

        {/* --- Section 3：無限跑馬燈 --- */}
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

          {/* 第一排：向左跑 */}
          <div className="marquee-wrapper mb-3 overflow-hidden">
            <div className="marquee-track marquee-track-1">
              {[...Array(2)]
                .flatMap(() => [
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/09/eye-catch01-5-690x460.jpg",
                    label: "Hakata Station (15min・徒步)",
                    alt: "Hakata Station",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/05/desk-catcage01-690x460.jpg",
                    label: "LaLaport Fukuoka (7min・徒步)",
                    alt: "LaLaport",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/05/oandm01-690x460.jpg",
                    label: "FOLEO Hakata (7min・徒步)",
                    alt: "FOLEO",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/05/medical-shibaura01-690x460.jpg",
                    label: "JR Takeshita Station (8min・徒步)",
                    alt: "Takeshita",
                  },
                ])
                .map((item, i) => (
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

          {/* 第二排：向右跑（反向） */}
          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-track marquee-track-2">
              {[...Array(2)]
                .flatMap(() => [
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2025/04/oyamacho-eye-catch02-690x460.jpg",
                    label: "博多周邊生活圈",
                    alt: "Area",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/05/yakumo01-690x460.jpg",
                    label: "都市便利・綠意生活",
                    alt: "Green",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/05/oandm01-690x460.jpg",
                    label: "商業設施・餐飲娛樂",
                    alt: "Shop",
                  },
                  {
                    src: "https://monarchitects.jp/wp-content/uploads/2024/09/eye-catch01-5-690x460.jpg",
                    label: "高速道路・交通動線便利",
                    alt: "Access",
                  },
                ])
                .map((item, i) => (
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

        {/* --- Section 4 --- */}
        <section className="py-24 bg-[#f3f5f6] w-full flex flex-col items-center px-4 relative">
          <div className="w-full max-w-6xl mx-auto text-left md:text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-[#3b4c6b] tracking-[0.15em] mb-6">
              CANAL & GREEN
            </h2>
            <p className="text-gray-700 text-sm md:text-base font-light tracking-[0.15em]">
              南方面を運河に臨む開放感。発展を遂げる都心の中で、緑と水辺に彩られた風景がここに。
            </p>
          </div>

          <div className="w-full max-w-5xl shadow-2xl relative">
            <img
              src="/images/index/slider03.png"
              alt="Area Map"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-[60%] right-[25%] bg-red-600 w-12 h-16 md:w-20 md:h-24 opacity-90 shadow-lg border border-white"></div>
            <div className="absolute top-[52%] right-[22%] bg-[#182848] text-white text-[10px] md:text-sm px-3 py-2 shadow-lg tracking-wider font-serif">
              ブランズシティ品川ルネ
              <br />
              キャナル
              <div className="absolute -bottom-2 left-10 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#182848]"></div>
            </div>
          </div>
        </section>

        {/* --- Section 5 --- */}
        <section className="py-24 bg-[#f3f5f6] w-full border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-gray-700 text-sm md:text-base font-light tracking-[0.15em] mb-16">
              瑞々しい緑と水辺風景、そして洗練された文化が息づく街並みが日常の舞台になる。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col">
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src="https://monarchitects.jp/wp-content/uploads/2026/04/%E3%81%8A%E4%B8%B8%E5%B1%B1%E3%83%9B%E3%83%86%E3%83%AB%E5%AE%A2%E5%AE%A4eye-catch01-690x460.jpg"
                    alt="Park"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-xs text-gray-600 tracking-wider">
                  品川シーズンテラス (15min・約1,200m)
                </p>
              </div>

              <div className="flex flex-col">
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src="https://monarchitects.jp/wp-content/uploads/2026/04/%E5%94%90%E6%B2%A2%E3%82%B4%E3%83%AB%E3%83%9501-690x460.jpg"
                    alt="Building exterior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-xs text-gray-600 tracking-wider">
                  品川インターシティ (14min・約1,060m)
                </p>
              </div>

              <div className="flex flex-col">
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src="https://monarchitects.jp/wp-content/uploads/2025/11/SavortheMatcha-1-690x460.jpg"
                    alt="Waterfront walkway"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-xs text-gray-600 tracking-wider">
                  天王洲アイル水辺広場 (7min・約490m)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- 返回頂部按鈕 --- */}
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
