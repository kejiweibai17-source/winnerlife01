"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";

// 我們只需要一張非常寬的圖片，或者幾張圖片拼成的長條圖。
// 為了無縫平移，將四張圖片拼在同一個容器裡。
const slides = [
  {
    id: 1,
    image: "/images/index/27c79940-b46e-4b55-a382-5d9efc2415ff.png",
  },
  {
    id: 2,
    image: "/images/659caf7f-6f74-462b-9485-2967b742dfc2.png",
  },
  {
    id: 3,
    image:
      "/images/index/XkREhAhg66PHPQxHcFQTjB4nzG0c0C8pS1QgzKD7-c9Uagm9MqqBTROfvXu6KHXBLna7xIA4xt_sX1r_iYNmL0JRK7JdK_Whz-zOteMrIDXc8VuzGbJCW2OknTAWtt50z-l8wzGQwHLkU5ioxg2GJw==.png",
  },
  {
    id: 4,
    image: "/images/dffa9397-8348-40b3-aa98-33001a5da44e.png",
  },
  {
    id: 5,
    image: "/images/index/31bf0df3-fbb7-4dc8-9a6e-437e64553efc.png",
  },
  {
    id: 6,
    image: "/images/index/03-521d8c49-8f42-4237-a9e0-23a655a1b5d0.png",
  },
];

export default function WovenStory() {
  const t = useTranslations("woven");
  const pathname = usePathname();
  const locale = pathname.startsWith("/jp") ? "jp" : "zh";
  const moreHref = getLocalizedPath("/concept", locale);
  return (
    <section className="relative w-full h-[50svh] min-h-[22rem] max-h-[28rem] overflow-hidden bg-[#111] md:h-[100svh] md:min-h-0 md:max-h-none">
      {/* 🔴 關鍵修改 1：無限平移背景 (Infinite Marquee) */}
      <div className="absolute inset-0 z-0 flex w-[200vw] sm:w-[300vw] h-full animate-marquee">
        {/* 為了無縫銜接，我們渲染兩組一模一樣的圖片陣列 */}
        {[...slides, ...slides].map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="relative h-full w-1/4 shrink-0"
          >
            {/* 漸層遮罩：壓暗圖片讓文字清晰 */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src={slide.image}
              alt="Background"
              fill
              className="object-cover"
              priority={index < slides.length}
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
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-5 py-7 sm:px-6 sm:py-9 md:justify-between md:px-16 md:py-24 pointer-events-none">
        {/* 上半部：桌機留白 */}
        <div className="hidden flex-1 md:block" />

        {/* 中下半部：日系不對稱排版 */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-3 sm:gap-5 md:gap-0 h-auto md:h-full pb-1 md:pb-10">
          {/* 右側：內文與直式標題 */}
          <div className="flex w-full flex-col-reverse md:flex-row items-end md:items-start gap-3 sm:gap-5 md:gap-16 ml-auto pointer-events-auto z-20">
            {/* 內文與 More 按鈕 */}
            <div className="flex w-full flex-col gap-3.5 sm:gap-5 max-w-md md:mt-24 md:max-w-sm md:gap-10">
              <p className="text-white text-[clamp(0.7rem,2.8vw,0.875rem)] leading-[1.7] tracking-[0.1em] font-light text-justify drop-shadow-md sm:leading-[1.85] sm:tracking-[0.12em] md:text-sm md:leading-[2.2] md:tracking-[0.15em] md:text-left">
                {t("body")}
              </p>

              <Link
                href={moreHref}
                className="group inline-flex items-center gap-3 text-white hover:opacity-70 transition-opacity w-fit drop-shadow-md md:gap-4"
              >
                <span className="text-[clamp(0.9rem,3.6vw,1.125rem)] font-serif tracking-[0.18em] md:text-lg md:tracking-widest">
                  {t("more")}
                </span>
                <span className="h-[1px] w-8 bg-white group-hover:w-16 transition-all duration-500 ease-out md:w-12 md:group-hover:w-24" />
              </Link>
            </div>

            {/* 直式標題 */}
            <h3
              className="text-white text-3xl md:text-4xl font-serif tracking-[0.3em] leading-loose hidden md:block drop-shadow-lg whitespace-pre-line"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {t("titleV")}
            </h3>
            <h3 className="w-full text-right text-white font-serif drop-shadow-lg whitespace-pre-line text-[clamp(1.05rem,4.2vw,1.35rem)] leading-[1.55] tracking-[0.22em] md:hidden">
              {t("titleV")}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
