"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 引用外部 Carousel
import Carousel from "../components/EmblaCarousel06/index.jsx";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. 單一繁中語系內容
// ==========================================
const content = {
  headerTitle: "LOCATION",
  headerSub: "(Life Imfomation)",
  headerTag: "都市の利便と、穏やかな住環境が調和する街",
  headerDesc:
    "白金高輪駅周辺には、日常の買い物に便利な商業施設や多彩な飲食店が揃い、暮らしを支える生活利便性が充実しています。また、近隣には公園や緑豊かな街並みが点在し、都心でありながら落ち着いた住環境を確保。都市の機能性と心地よい静けさを兼ね備えた快適な日常を享受できるエリアです。",
  tagFeatured: "アルファステイツ博多サウス",
  btnReadMore: "DISCOVER MORE",
  cases: [
    {
      id: "style-01",
      caseNumber: "KEIO",
      role: "Univercuty",
      name: "慶應義塾大学至近という文教エリアならではの価値",
      description:
        "“慶應義塾大学まで徒歩5分。”都心でありながら、由緒ある文教エリアの落ち着きと知的な雰囲気を日常に感じられる、希少性の高い住環境です。",
      image: "/images/index/ChatGPT Image 2026年5月29日 上午11_34_05.png",
      blockTitle: "【周邊環境】都會便捷與質感綠意的美好交會",
      blockDesc:
        "多元便捷的交通網絡，為日常注入活力與機動性。大型購物設施、高速道路與交通動線便利，工作、購物、娛樂、休閒皆齊備，打造真正宜居的都會生活圈。",
      customProducts: [
        {
          id: "prod_01",
          title: "白金アエルシティ",
          slug: "hakata-station",
          price:
            "白金高輪駅直結の大規模複合施設。商業・医療が揃う街のランドマークとなっています。",
          image: "/images/index/白金アエルシティ.png",
          stepNum: "15 min",
        },
        {
          id: "prod_02",
          title: "東京都済生会中央病院",
          slug: "takeshita-station",
          price:
            "100年以上の歴史を持つ総合病院。救急医療にも対応する街の中核施設です。",
          image: "/images/index/東京都済生会中央病院.png",
          stepNum: "8 min",
        },
        {
          id: "prod_03",
          title: "芝公園",
          slug: "lalaport-fukuoka",
          price:
            "日本最古級の歴史を持つ公園。東京タワーの眺めと豊かな緑、運動施設が整う憩いの場。",
          image: "/images/index/芝公園.png",
          stepNum: "7 min",
        },
      ],
    },
    {
      id: "style-02",
      caseNumber: "白金高輪",
      role: "SHIROKANE TAKANAWA",
      name: "都市機能が一新される大規模再開発の進行",
      description:
        "歴史と品格を受け継ぐ白金高輪は今、街全体の機能更新とともに新たな進化の局面を迎えています。住宅整備に加え、商業施設や飲食店、オフィス、生活利便施設が計画的に整い、暮らし・働く・憩うが身近で完結する都市環境へ。将来にわたり価値を育み続ける街、それが白金高輪です。",
      image: "/images/index/ChatGPT Image 2026年5月29日 上午11_52_53.png",
      blockTitle:
        "ゆとりある暮らしを楽しむためのIoT搭載マンション。為從容生活而生的智慧宅。",
      blockDesc:
        "用智慧遙控打造舒適空間，自動開關與居家安全管理讓生活更安心。可集中控制燈光與家電的多功能按鍵、一鍵打造舒適生活的智慧照明、可遠端通話的智慧攝影機，更支援語音控制家電與住宅設備。使用手機即可輕鬆控制窗簾與百葉窗，多種 IoT 設備整合，為您的每一天省時提效，成就真正有餘裕的理想生活。",
      bigImage: "/images/index/ChatGPT Image 2026年5月29日 上午11_28_42.png",
    },
  ],
};

export default function CollectionShowcase() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
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
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-black font-sans"
    >
      {/* 頂部標題 */}
      <div className="w-full pt-28 pb-5 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-widest flex items-start justify-center gap-1 mb-2">
            {content.headerTitle}
            <span className="text-[15px] lg:text-[15px] font-bold mt-2 tracking-normal uppercase">
              {content.headerSub}
            </span>
          </h2>
          <p className="text-sm md:text-base font-bold tracking-[0.2em] uppercase">
            {content.headerTag}
          </p>
        </div>
        <p className="text-[12px] md:text-[14px] text-gray-700 leading-[2.5] tracking-[0.15em] whitespace-pre-line max-w-3xl">
          {content.headerDesc}
        </p>
      </div>

      {content.cases.map((item, index) => {
        const isEven = index % 2 !== 0;

        return (
          <div
            key={item.id}
            className={`flex flex-col lg:flex-row w-full h-auto lg:h-[100svh] ${
              isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* 左側：資訊展示區 */}
            <div className="w-full lg:w-[50%] h-full overflow-hidden flex flex-col items-center justify-center bg-white z-10 relative py-12 lg:py-0">
              <div className="text-center mb-8 max-w-lg px-4">
                <h3 className="text-[20px] lg:text-[24px] font-bold leading-[1.8] mb-4 whitespace-pre-line text-gray-900 tracking-wider">
                  {item.blockTitle}
                </h3>
                <p className="text-[11px] lg:text-[12px] leading-[2.2] text-gray-500 whitespace-pre-line tracking-[0.1em]">
                  {item.blockDesc}
                </p>
                <div className="mt-6 inline-block border border-gray-300 rounded-full px-5 py-1.5">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-gray-600 uppercase">
                    {content.tagFeatured}
                  </span>
                </div>
              </div>

              {/* 🚀 下半部：如果是 STYLE 02 則顯示大圖，否則顯示 Carousel */}
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

            {/* 右側：視覺背景區 */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>

              <div className="absolute bottom-12 w-full flex flex-col items-center text-center text-white z-20 px-6">
                <span className="border border-white/40 rounded-full px-5 py-1.5 text-[10px] font-bold tracking-[0.15em] mb-4 backdrop-blur-md">
                  {item.caseNumber}
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] mb-2 opacity-80 uppercase">
                  {item.role}
                </span>
                <h2 className="text-3xl lg:text-[32px] font-bold tracking-widest w-[75%] max-w-[800px] mb-4">
                  {item.name}
                </h2>
                <div className="w-6 h-[1px] bg-white/50 mb-6"></div>
                <p className="text-[15px] tracking-widest w-[65%] mx-auto mb-8 opacity-90">
                  {item.description}
                </p>
                <div className="bg-[#fd4e27] text-white border border-white text-[10px] font-bold tracking-[0.2em] uppercase px-12 py-4 hover:bg-white hover:text-black transition-colors duration-300">
                  {content.btnReadMore}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
