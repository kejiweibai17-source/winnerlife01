"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/lib/use-is-mobile";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TEXT_CLASSES = {
  subtitle:
    "text-sm md:text-base font-light tracking-[0.2em] text-white/80 mb-2 uppercase",
  title:
    "text-4xl md:text-6xl lg:text-7xl font-serif tracking-widest leading-tight text-white mb-6",
  description:
    "text-sm md:text-base font-light tracking-[0.1em] leading-loose text-white/90 max-w-xl",
  subtext:
    "text-xs md:text-sm font-light tracking-widest text-white/60 mt-4 uppercase",
};

const SLIDE_IMAGES = [
  "images/index/cd78a1ca-c3db-4c12-a8b2-413e62181b4f.png",
  "/images/index/8f2716f6-12ae-4ff6-b310-1bfb8b3c20a7.png",
  "images/index/4e8ee07e-5f3d-4a04-9b30-078ba9c7fb8c.png",
  "images/index/c3ba1316-d87a-412b-ae7a-378fbaae4d2c.png",
  "images/index/9adca514-b1df-4095-b86e-8ceaed137441.png",
];

export default function Slider() {
  const t = useTranslations("transportSlider");

  const slides = SLIDE_IMAGES.map((image, i) => ({
    subtitle: t(`slides.${i}.subtitle`),
    title: t(`slides.${i}.title`).replace(/\n/g, "<br/>"),
    description: t(`slides.${i}.description`),
    subtext: t(`slides.${i}.subtext`),
    image,
  }));

  const sliderRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const textContainerRef = useRef(null);
  const sliderIndicesRef = useRef(null);
  const progressBarRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      let activeSlide = 0;
      let splits = [];

      const pinDistance = window.innerHeight * slides.length;

      // 創建右側的指示器 (Indicators)
      function createIndices() {
        if (sliderIndicesRef.current) {
          sliderIndicesRef.current.innerHTML = "";

          slides.forEach((_, index) => {
            const indexNum = (index + 1).toString().padStart(2, "0");
            const indicatorElement = document.createElement("p");
            indicatorElement.dataset.index = index;
            indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
            sliderIndicesRef.current.appendChild(indicatorElement);

            if (index === 0) {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 1,
              });
              gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 1,
              });
            } else {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 0.35,
              });
              gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 0,
              });
            }
          });
        }
      }

      // 切換圖片
      function animateNewSlide(index) {
        if (!sliderImagesRef.current) return;

        const newSliderImage = document.createElement("img");
        newSliderImage.src = slides[index].image;
        newSliderImage.alt = `Slide ${index + 1}`;
        newSliderImage.className =
          "absolute inset-0 object-cover w-full h-full";

        gsap.set(newSliderImage, { opacity: 0, scale: 1 });
        sliderImagesRef.current.appendChild(newSliderImage);

        gsap.to(newSliderImage, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });
        if (!isMobile) {
          gsap.set(newSliderImage, { scale: 1.05 });
          gsap.to(newSliderImage, {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          });
        }

        // 清理舊圖片，避免 DOM 過於肥大
        const allImages = sliderImagesRef.current.querySelectorAll("img");
        if (allImages.length > 3) {
          const removeCount = allImages.length - 3;
          for (let i = 0; i < removeCount; i++) {
            sliderImagesRef.current.removeChild(allImages[i]);
          }
        }

        animateNewText(index);
        animateIndicators(index);
      }

      // 切換指示器動畫
      function animateIndicators(index) {
        if (!sliderIndicesRef.current) return;
        const indicators = sliderIndicesRef.current.querySelectorAll("p");

        indicators.forEach((indicator, i) => {
          const markerElement = indicator.querySelector(".marker");
          const indexElement = indicator.querySelector(".index");

          if (i === index) {
            gsap.to(indexElement, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(markerElement, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(indexElement, {
              opacity: 0.35,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(markerElement, {
              scaleX: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }

      // 核心：切換文字與執行 SplitText 動畫
      function animateNewText(index) {
        if (!textContainerRef.current) return;

        // 1. 清理先前的 SplitText 實例
        splits.forEach((split) => split.revert());
        splits = [];

        const slide = slides[index];

        // 2. 更新 DOM 內容 (包含各個層次的標題)
        textContainerRef.current.innerHTML = `
          ${slide.subtitle ? `<p class="slide-text-element ${TEXT_CLASSES.subtitle}">${slide.subtitle}</p>` : ""}
          <h1 class="slide-text-element ${TEXT_CLASSES.title}">${slide.title}</h1>
          ${slide.description ? `<div class="slide-text-element ${TEXT_CLASSES.description}">${slide.description}</div>` : ""}
          ${slide.subtext ? `<p class="slide-text-element ${TEXT_CLASSES.subtext}">${slide.subtext}</p>` : ""}
        `;

        // 3. 獲取剛剛產生的 DOM 元素
        const elementsToAnimate = textContainerRef.current.querySelectorAll(
          ".slide-text-element",
        );

        // 4. 對每個元素進行 SplitText 處理與動畫
        let globalDelay = 0;

        elementsToAnimate.forEach((el, i) => {
          // 使用 lines 來切割，即使有 <br> 也能正確分為多行
          const split = new SplitText(el, {
            type: "lines",
            linesClass: "overflow-hidden",
          });
          const innerSplit = new SplitText(split.lines, {
            type: "lines",
            linesClass: "line-inner",
          });

          splits.push(split, innerSplit);

          // 設定初始狀態 (向下位移且透明)
          gsap.set(innerSplit.lines, { yPercent: 100, opacity: 0 });

          // 執行進場動畫
          gsap.to(innerSplit.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: globalDelay,
            ease: "power3.out",
          });

          // 稍微錯開每個段落的進場時間
          globalDelay += 0.15;
        });
      }

      // 初始化
      createIndices();
      animateNewText(0);

      // ScrollTrigger 設定
      ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleY: self.progress });
          }

          const currentSlide = Math.floor(self.progress * slides.length);

          if (activeSlide !== currentSlide && currentSlide < slides.length) {
            activeSlide = currentSlide;
            animateNewSlide(activeSlide);
          }
        },
      });

      return () => {
        splits.forEach((split) => split.revert());
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sliderRef, dependencies: [isMobile] },
  );

  return (
    <section
      className="relative section-slider w-full h-[100svh] overflow-hidden bg-[#0a0a0a]"
      ref={sliderRef}
    >
      {/* 圖片容器 */}
      <div className="absolute inset-0 w-full h-full" ref={sliderImagesRef}>
        <img
          src={slides[0].image}
          alt="Slide 1"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* 深色遮罩，讓文字更易讀 */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 文字容器：靠左對齊，並加入 padding 避免貼齊邊緣 */}
      <div className="relative z-10 flex flex-col justify-center h-full w-full pl-12 md:pl-24 lg:pl-32 max-w-4xl">
        <div ref={textContainerRef} className="flex flex-col items-start">
          {/* 內容由 GSAP 動態填入 */}
        </div>
      </div>

      {/* 右側指示器與進度條 */}
      <div className="relative z-10 slider-indicator">
        <div className="slider-indices" ref={sliderIndicesRef}></div>
        <div className="slider-progress-bar">
          <div className="slider-progress" ref={progressBarRef}></div>
        </div>
      </div>
    </section>
  );
}
