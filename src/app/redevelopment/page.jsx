"use client";

import React, { useEffect, useState } from "react";
import HeroSlider from "../../../components/HeroSlider/page";

export default function Redevelopment() {
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
      {/* --- 加入波浪動畫的 Keyframes 設定 --- */}
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
        {/* --- Section 1: Hero Slider (加入 z-10 與波浪遮罩) --- */}
        <section className="relative w-full z-10">
          <HeroSlider />

          {/* 動態波浪切線容器 (利用 -bottom-[2px] 消除縫隙) */}
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
                  id="wave-gradient-redev"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
                  {/* 底部完美銜接 Section 2 的 #f8f9fa */}
                  <stop offset="100%" stopColor="#f8f9fa" stopOpacity="1" />
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
                fill="url(#wave-gradient-redev)"
              ></path>
            </svg>
          </div>
        </section>

        {/* --- Section 2: 6宮格開發要點 --- */}
        {/* 加入 z-0 與 pt-32，讓上方波浪有足夠空間流暢過渡進這個區塊 --- */}
        <section className="relative z-0 pt-32 pb-24 bg-[#f8f9fa] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-serif tracking-[0.2em] text-[#182848]">
                進化する未来は、もうすぐそこに。
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                {
                  num: "1",
                  title: "TAKANAWA GATEWAY CITY",
                  desc: "延床面積約84萬㎡、都心最大級の複合開発",
                },
                {
                  num: "2",
                  title: "品川駅北周辺地区再開発",
                  desc: "新たなビジネス・文化の交流拠点を目指す",
                },
                {
                  num: "3",
                  title: "品川駅北周辺地区再開発",
                  desc: "街の利便性と魅力を高める都市基盤整備",
                },
                {
                  num: "4",
                  title: "泉岳寺周辺地区再開発",
                  desc: "歴史と未来が交差する、新たな街の顔",
                },
                {
                  num: "5",
                  title: "環狀4號線延伸",
                  desc: "都心部の交通網を強化する新たな動脈",
                },
                {
                  num: "6",
                  title: "品川駅西口開発計画",
                  desc: "國際交流拠点としての機能を拡充",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative aspect-video overflow-hidden cursor-pointer"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 border border-white/10">
                    <span className="text-5xl font-serif opacity-40 mb-2">
                      {item.num}
                    </span>
                    <h3 className="text-lg font-bold tracking-widest text-center mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-center font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        className="text-white"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="19"
                          stroke="currentColor"
                          fill="none"
                        />
                        <path
                          d="M15 20h10M22 17l3 3-3 3"
                          stroke="currentColor"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 3: Global Gateway Area (參考圖 5) --- */}
        <section className="relative w-full py-32 px-6 overflow-hidden bg-white text-center">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl md:text-6xl font-serif text-[#b5a38a] tracking-widest mb-6">
              GLOBAL GATEWAY AREA
            </h2>
            <p className="text-gray-600 font-light tracking-[0.15em] leading-relaxed">
              「Global
              Gateway」を開発コンセプトに、日本各地と世界をつなぐ国際交流拠点となる先進の街づくり。
              <br />
              今まさに、都心を代表する新たなビジネス・文化拠点が生まれようとしています。
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <img
              src="https://monarchitects.jp/wp-content/uploads/2024/05/kozen01-690x460.jpg"
              className="w-full h-auto grayscale-[30%]"
            />
            {/* 標籤標記 */}
            <div className="absolute top-[40%] left-[45%] flex flex-col items-center">
              <div className="bg-white/90 text-[#182848] w-10 h-10 flex items-center justify-center font-bold shadow-xl mb-2">
                1
              </div>
              <div className="w-[1px] h-16 bg-white shadow-lg"></div>
            </div>
            <div className="absolute top-[60%] left-[20%] flex flex-col items-center">
              <div className="bg-white/90 text-[#182848] w-10 h-10 flex items-center justify-center font-bold shadow-xl mb-2">
                2
              </div>
              <div className="w-[1px] h-24 bg-white shadow-lg"></div>
            </div>
          </div>
        </section>

        {/* --- Section 4: Takanawa Gateway City 願景 (參考圖 4) --- */}
        <section className="py-24 bg-[#f3f5f6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-l-[1px] border-gray-400 pl-8 mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-[#182848] tracking-widest mb-6 uppercase italic">
                TAKANAWA GATEWAY CITY
              </h2>
              <p className="text-gray-700 text-sm font-light tracking-widest leading-loose">
                街全體を「100年先の豊かな暮らしのための實驗場」と位置づけ、
                <br />
                新しいビジネスや文化が生まれ続ける「國際交流拠点・品川」の実現を目指します。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <img
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800"
                  className="w-full aspect-video object-cover"
                />
                <h3 className="text-xl font-bold border-b border-gray-300 pb-4 tracking-widest">
                  「TAKANAWA GATEWAY CITY」
                  <br />
                  2025年3月、まちびらき
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  JR東日本が進める大規模プロジェクト。オフィス、ホテル、商業施設が集積し、次世代の都市インフラを備えたスマートシティが誕生します。
                </p>
              </div>
              <div className="space-y-6">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
                  className="w-full aspect-video object-cover"
                />
                <h3 className="text-xl font-bold border-b border-gray-300 pb-4 tracking-widest">
                  新の文化・活動のシンボルとなる
                  <br />
                  複合文化施設
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  建築家・隈研吾氏らが設計に攜わる、日本文化を世界へ発信する拠点。展示ホールや次世代ライブラリーなど、多様なプログラムを展開。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 5: 三欄式品川站整合 (參考圖 2) --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-serif tracking-[0.2em] mb-12 text-gray-300">
              SHINAGAWA.Sta
            </h2>
            <div className="max-w-3xl mb-16">
              <p className="text-gray-700 font-light tracking-widest leading-relaxed">
                品川駅を中心に日本全國エリアの回遊性を高め、多様な賑わいにあふれる次世代ターミナルへ。
                <br />
                多彩な交通網の整備とともに、駅の利便性や魅力が大きく広がります。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "高輪ゲートウェイ・品川",
                  subtitle: "歩行者ネットワーク",
                  img: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
                },
                {
                  title: "東京メトロ南北線",
                  subtitle: "白金高輪・品川間延伸工事",
                  img: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6",
                },
                {
                  title: "京急品川駅地平化",
                  subtitle: "JRとの相互利用利便化",
                  img: "https://images.unsplash.com/photo-1532105956690-db9140938671",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-4 group">
                  <div className="overflow-hidden bg-gray-100 aspect-[4/3]">
                    <img
                      src={`${item.img}?q=80&w=600`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-bold text-lg tracking-widest">
                    {item.title}
                    <br />
                    <span className="text-sm font-light text-gray-500">
                      {item.subtitle}
                    </span>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 6: 生活機能網格 (參考圖 3) --- */}
        <section className="py-24 bg-[#0a1633] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "新しい体験・情熱を創出",
                  desc: "職住近接の新しいライフスタイルを提案",
                },
                {
                  title: "次世代の新しい商業施設",
                  desc: "約200店舗のショップが集積する大型エリア",
                },
                {
                  title: "都心最大級の自然豊かな緑",
                  desc: "約4公頃の広大な緑地とオープンスペース",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="aspect-square bg-gray-800 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=${idx}`}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <h3 className="text-xl font-serif tracking-widest border-l-2 border-white pl-4">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light opacity-70 leading-loose tracking-widest">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 7: 地圖示意圖 (參考圖 1) --- */}
        <section className="py-24 bg-[#f3f5f6]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative w-full aspect-[21/9] bg-white p-8 shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[2px] bg-gray-200 rotate-[10deg]"></div>
                <div className="w-[100px] h-[100px] bg-red-500/20 rounded-full blur-2xl absolute left-1/4"></div>
                <div className="w-[120px] h-[40px] bg-[#182848] text-white flex items-center justify-center text-[10px] tracking-widest absolute right-1/4 top-1/3">
                  品川駅周辺開発
                </div>
              </div>
              <div className="relative z-10 text-[10px] font-bold text-[#182848]">
                DEVELOPMENT MAP / AREA 2025-2030
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- 返回頂部 --- */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#182848]/90 text-white rounded-full flex items-center justify-center hover:bg-[#182848] transition-all z-50 shadow-2xl backdrop-blur-sm"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <footer className="bg-[#182848] text-white py-12 text-center text-[10px] tracking-[0.3em] opacity-60">
        © TOKYU LAND CORPORATION / BRANZ CITY SHINAGAWA
      </footer>
    </div>
  );
}
