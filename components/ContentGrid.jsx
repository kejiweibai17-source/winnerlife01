"use client";

import React from "react";
import Copy from "./Copy"; // 載入您提供的 GSAP 元件

// 每張卡片有獨立科技色系遮罩
const gridData = [
  {
    id: 1,
    title: "交通連結",
    subtitle: "Transportation",
    bgImage: "/images/index/wall/交通連結.png",
    hoverText: "都市核心・現代美學・沉穩居所",
    // 深海藍
    maskFrom: "rgba(4,18,45,0.88)",
    maskVia: "rgba(6,28,70,0.55)",
    maskTo: "rgba(10,40,90,0.18)",
  },
  {
    id: 2,
    title: "區域再開發",
    subtitle: "Area Redevelopment",
    bgImage: "/images/index/wall/都更計畫.png",
    hoverText: "核心地段・增值潛力・未來規劃",
    // 電光青藍
    maskFrom: "rgba(0,25,55,0.90)",
    maskVia: "rgba(0,60,100,0.52)",
    maskTo: "rgba(0,90,140,0.16)",
  },
  {
    id: 3,
    title: "建築外觀",
    subtitle: "Architecture",
    bgImage: "/images/index/wall/建築設計.png",
    hoverText: "都市更新・全新街廓・帶動發展",
    // 靛紫藍
    maskFrom: "rgba(15,10,50,0.90)",
    maskVia: "rgba(35,20,90,0.55)",
    maskTo: "rgba(55,30,110,0.18)",
  },
  {
    id: 4,
    title: "共用空間",
    subtitle: "Common Area",
    bgImage: "/images/index/wall/共用空間.png",
    hoverText: "多鐵共構・連接機場・四通八達",
    // 蒼青藍
    maskFrom: "rgba(0,30,50,0.90)",
    maskVia: "rgba(0,65,90,0.55)",
    maskTo: "rgba(0,100,120,0.18)",
  },
  {
    id: 5,
    title: "室內情境",
    subtitle: "Common Area",
    bgImage: "/images/index/wall/房型規劃.png",
    hoverText: "公園綠地・完善機能・優質學區",
    // 暗藍灰
    maskFrom: "rgba(8,18,38,0.92)",
    maskVia: "rgba(18,35,65,0.55)",
    maskTo: "rgba(28,50,90,0.18)",
  },
  {
    id: 6,
    title: "生活圈",
    subtitle: "Lifestyle",
    bgImage: "/images/index/wall/生活圈.png",
    hoverText: "大師操刀・簡約外觀・工藝細節",
    // 深橘棕科技
    maskFrom: "rgba(40,15,5,0.90)",
    maskVia: "rgba(80,35,10,0.55)",
    maskTo: "rgba(110,55,15,0.18)",
  },
  {
    id: 7,
    title: "設備與家電",
    subtitle: "equipment",
    bgImage: "/images/index/wall/設備與家電.png",
    hoverText: "四季植栽・自然和諧・私密庭園",
    // 深邃綠藍
    maskFrom: "rgba(0,25,25,0.90)",
    maskVia: "rgba(0,55,50,0.52)",
    maskTo: "rgba(0,80,70,0.18)",
  },
  {
    id: 8,
    title: "IoT系統與保全設備",
    subtitle: "間取り",
    bgImage: "/images/index/wall/IoT系統與保全設備.png",
    hoverText: "高坪效・採光通風・多元房型",
    // 鋼鐵藍灰
    maskFrom: "rgba(10,14,28,0.92)",
    maskVia: "rgba(22,30,55,0.55)",
    maskTo: "rgba(35,48,80,0.18)",
  },
  {
    id: 9,
    title: "地段核心",
    subtitle: "Location Value",
    bgImage: "/images/index/wall/地段核心.png",
    hoverText: "頂級建材・情境展示・專業導覽",
    // 琥珀橘金
    maskFrom: "rgba(35,18,0,0.90)",
    maskVia: "rgba(75,40,5,0.55)",
    maskTo: "rgba(110,65,10,0.18)",
  },
  {
    id: 10,
    title: "建商與設計師介紹",
    subtitle: "設備仕様",
    bgImage:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    hoverText: "智慧系統・頂級設備・全方位安全",
    // 電藍科技
    maskFrom: "rgba(0,10,40,0.92)",
    maskVia: "rgba(0,30,80,0.55)",
    maskTo: "rgba(0,55,120,0.18)",
  },
];

export default function ContentGrid() {
  return (
    <section className="w-full bg-[#0c0f1c]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
        {gridData.map((item, index) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer border-[0.5px] border-white/[0.08]"
          >
            {/* 背景圖：hover 放大 */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            />

            {/* 常態遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1c]/90 via-[#111729]/55 to-[#1a2240]/15 transition-opacity duration-500 group-hover:opacity-80" />

            {/* 內容：置中排列 */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
              {/* 主標題 */}
              <Copy animateOnScroll delay={index * 0.05}>
                <h2 className="text-white text-base md:text-lg font-semibold tracking-[0.18em] leading-none mb-3 uppercase">
                  {item.title}
                </h2>
              </Copy>

              {/* 細橫線：hover 時延伸 */}
              <div className="h-px bg-white/40 w-8 group-hover:w-14 transition-all duration-500 ease-out mb-3" />

              {/* 日文副標 */}
              <Copy animateOnScroll delay={index * 0.05 + 0.1}>
                <p className="text-white/55 text-[11px] tracking-[0.2em]">
                  {item.subtitle}
                </p>
              </Copy>

              {/* Hover 單行文字：line-mask 滑入 */}
              <div className="overflow-hidden mt-4">
                <p className="text-[10px] text-white/70 tracking-[0.15em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
                  {item.hoverText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
