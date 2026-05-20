"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// 我們只需要一張非常寬的圖片，或者幾張圖片拼成的長條圖。
// 為了示範無縫平移，我們將這三張圖片拼在同一個容器裡。
const slides = [
  {
    id: 1,
    image: "https://neie.jp/wp-content/uploads/2025/10/img_mv_obu.jpg",
  },
  {
    id: 2,
    image: "https://neie.jp/wp-content/uploads/2025/10/img_mv_toyama.jpg",
  },
  {
    id: 3,
    image: "https://neie.jp/wp-content/uploads/2025/10/img_mv_meito.jpg",
  },
];

export default function WovenStory() {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#111]">
      {/* 🔴 關鍵修改 1：無限平移背景 (Infinite Marquee) */}
      <div className="absolute inset-0 z-0 flex w-[200vw] sm:w-[300vw] h-full animate-marquee">
        {/* 為了無縫銜接，我們渲染兩組一模一樣的圖片陣列 */}
        {[...slides, ...slides].map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="relative h-full w-[33.333%] shrink-0"
          >
            {/* 漸層遮罩：壓暗圖片讓文字清晰 */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src={slide.image}
              alt="Background"
              fill
              className="object-cover"
              priority={index < 3} // 前三張優先載入
            />
          </div>
        ))}
      </div>

      {/* 🔴 關鍵修改 2：加入 Tailwind 的自訂動畫 (需要寫在 globals.css 或 tailwind.config) 
          這裡我直接用 inline style 的方式注入 keyframes，讓你不用去改設定檔就能直接看到效果！ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `,
        }}
      />

      {/* 2. 上層內容區塊 (保持優雅的不對稱排版) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-8 py-12 md:px-16 md:py-24 pointer-events-none">
        {/* 上半部：留白 */}
        <div className="flex-1" />

        {/* 中下半部：日系不對稱排版 */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0 h-full pb-10">
          {/* 左下角：巨大的浮水印英文字 (Woven Story) */}

          {/* 右側：內文與直式標題 */}
          <div className="flex flex-col-reverse md:flex-row items-end md:items-start gap-8 md:gap-16 ml-auto pointer-events-auto z-20">
            {/* 內文與 More 按鈕 */}
            <div className="flex flex-col gap-10 max-w-sm md:mt-24">
              <p className="text-white text-sm leading-[2.2] tracking-[0.15em] font-light text-justify md:text-left drop-shadow-md">
                自幼看著身為園藝師的父親的身影長大，心中始終銘記著「希望能透過造園為人們帶來喜悅」這份信念。經過多年的磨練，我始終秉持著將客戶的理想融入每一座庭園的使命，持續前行。
              </p>

              <Link
                href="#"
                className="group inline-flex items-center gap-4 text-white hover:opacity-70 transition-opacity w-fit drop-shadow-md"
              >
                <span className="text-lg font-serif tracking-widest">More</span>
                <span className="h-[1px] w-12 bg-white group-hover:w-24 transition-all duration-500 ease-out" />
              </Link>
            </div>

            {/* 直式標題 */}
            <h3
              className="text-white text-3xl md:text-4xl font-serif tracking-[0.3em] leading-loose hidden md:block drop-shadow-lg"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              與庭院一同編織
              <br />
              我們的足跡
            </h3>
            {/* 手機版標題 */}
            <h3 className="text-white text-2xl font-serif tracking-[0.3em] leading-loose md:hidden text-right w-full drop-shadow-lg">
              與庭院一同編織
              <br />
              我們的足跡
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
