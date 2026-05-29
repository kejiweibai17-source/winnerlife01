"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Copy from "./Copy";

/**
 * Hero 輪播設定（在此自訂即可）
 * - image:      圖片路徑（放在 public 下，以 / 開頭）
 * - titleLine1: 主標題（大字，第一行）
 * - titleLine2: 副標題（第二行；不需要可設為 ""）
 */
const slides = [
  {
    image: "/images/index/ChatGPT Image 2026年5月29日 上午10_52_50.png",
    titleLine1: "Exquisite Detail",
    titleLine2: "Exceptional Quality.",
  },
  {
    image: "/images/index/ChatGPT Image 2026年5月29日 上午11_28_42.png",
    titleLine1: "Premium Location",
    titleLine2: "品川・港區核心生活圈。",
  },
  {
    image: "/images/index/ChatGPT Image 2026年5月29日 上午10_59_00.png",
    titleLine1: "Timeless Design",
    titleLine2: "洗鍊質感與溫潤氛圍並存。",
  },
];

export default function Slider() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const indicatorsRef = useRef([]);
  const timerRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const setTextIndexRef = useRef(setTextIndex);
  setTextIndexRef.current = setTextIndex;

  useGSAP(
    () => {
      let currentIndex = 0;
      let isAnimating = false;

      const slideDuration = 4; // 自動輪播停留時間 (秒)
      const transitionDuration = 1.5; // 淡入淡出過場時間 (秒)
      const scaleDuration = 12; // 圖片持續收縮時間
      const scaleStart = 1.08; // 🔥 收縮幅度加大 (從 1.08 縮小到 1)

      function animateSlide(nextIndex) {
        if (isAnimating || nextIndex === currentIndex) return;

        // 🔥 防呆 1：確保要操作的圖片真的存在，避免跳頁時 DOM 消失導致報錯
        const currentImg = imagesRef.current[currentIndex];
        const nextImg = imagesRef.current[nextIndex];
        if (!currentImg || !nextImg) return;

        isAnimating = true;

        // 這是「切換」的時間軸，不包含圖片縮放
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
            currentIndex = nextIndex;
            startAutoplay(); // 切換過場一結束，立刻開始倒數下一張
          },
        });

        // 圖片層級設定
        gsap.set(nextImg, { zIndex: 2 });
        gsap.set(currentImg, { zIndex: 1 });

        // 舊圖片淡出 (此時舊圖片的 scale 動畫仍在獨立運行，不會靜止)
        tl.to(
          currentImg,
          { opacity: 0, duration: transitionDuration, ease: "power2.inOut" },
          0,
        );

        // 新圖片設定為較明顯的放大 (1.08)，並淡入
        gsap.set(nextImg, { scale: scaleStart, opacity: 0 });
        tl.to(
          nextImg,
          { opacity: 1, duration: transitionDuration, ease: "power2.inOut" },
          0,
        );

        // 使用獨立的 gsap.to 控制收縮，讓它突破時間軸的限制，持續收縮！
        gsap.to(nextImg, { scale: 1, duration: scaleDuration, ease: "none" });

        // 文字：Copy 元件逐行上浮（與圖片切換同步）
        setTextIndexRef.current(nextIndex);

        // ==========================================
        // 右側導覽圓點動畫
        // ==========================================
        indicatorsRef.current.forEach((ind, i) => {
          // 🔥 防呆 3：確保 indicator DOM 真的存在
          if (!ind) return;
          const ring = ind.querySelector(".ring");
          if (!ring) return;

          if (i === nextIndex) {
            gsap.to(ind, { opacity: 1, duration: 0.3 }, 0);
            gsap.to(
              ring,
              { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
              0,
            );
          } else {
            gsap.to(ind, { opacity: 0.4, duration: 0.3 }, 0);
            gsap.to(ring, { scale: 0, opacity: 0, duration: 0.3 }, 0);
          }
        });
      }

      function startAutoplay() {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          animateSlide((currentIndex + 1) % slides.length);
        }, slideDuration * 1000);
      }

      // ==========================================
      // 初始化第一張設定
      // ==========================================
      // 🔥 防呆 4：確保 imagesRef[0] 存在再進行初始化
      if (imagesRef.current[0]) {
        gsap.set(imagesRef.current, { opacity: 0 });
        gsap.set(imagesRef.current[0], {
          opacity: 1,
          scale: scaleStart,
          zIndex: 2,
        });

        // 第一張圖開始獨立的緩慢收縮
        gsap.to(imagesRef.current[0], {
          scale: 1,
          duration: scaleDuration,
          ease: "none",
        });
      }

      // 導覽圓點初始化
      indicatorsRef.current.forEach((ind, i) => {
        if (!ind) return;
        const ring = ind.querySelector(".ring");
        if (!ring) return;

        if (i === 0) {
          gsap.set(ind, { opacity: 1 });
          gsap.set(ring, { scale: 1, opacity: 1 });
        } else {
          gsap.set(ind, { opacity: 0.4 });
          gsap.set(ring, { scale: 0, opacity: 0 });
        }
      });

      startAutoplay();

      return () => {
        clearTimeout(timerRef.current);
      };
    },
    { scope: containerRef },
  );

  return (
    <>
      <style>{`
        .hero-container {
          position: relative;
          width: 100%;
          height: 100svh;
          overflow: hidden;
          background-color: #000;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #fff;
        }

        .slide-image {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          will-change: transform, opacity;
        }
        .slide-image img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(11, 31, 60, 0.62) 0%,
            rgba(11, 31, 60, 0.32) 42%,
            rgba(0, 0, 0, 0.18) 100%
          );
          z-index: 10;
          pointer-events: none;
        }

        /* 左上角 Logo */
        .top-left-logo {
          position: absolute;
          top: 2.5rem; left: 3rem;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .top-left-logo .logo-main {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: 0.05em;
        }
        .top-left-logo .logo-sub {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          opacity: 0.8;
        }

        /* 右上角 藍色標籤 */
        .top-right-badge {
          position: absolute;
          top: 2.5rem; right: 0;
          z-index: 20;
          background-color: #2b65f6;
          padding: 0.6rem 1.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        /* 左側標題（參照 Sha Maison 版型） */
        .hero-title {
          position: absolute;
          left: clamp(1.5rem, 5vw, 4rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: min(92%, 44rem);
          min-height: clamp(7rem, 16vw, 12rem);
          text-align: left;
          pointer-events: none;
        }
        .hero-title [data-copy-wrapper="true"] {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .title-line {
          display: block;
          font-family: var(--font-noto-serif-tc), Georgia, "Times New Roman", serif;
          color: #fff;
          margin: 0;
        }
        .title-line-1 {
          font-size: clamp(2.25rem, 5.2vw, 4.25rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          line-height: 1.12;
          margin-bottom: 0.35rem;
        }
        .title-line-2 {
          font-size: clamp(1.5rem, 3.2vw, 2.75rem);
          font-weight: 400;
          letter-spacing: 0.06em;
          line-height: 1.25;
          opacity: 0.95;
        }

        /* 左下角 */
        .bottom-left-text {
          position: absolute;
          bottom: 2.5rem; left: 3rem;
          z-index: 20;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        .bottom-left-text .underline {
          border-bottom: 1px solid #fff;
          padding-bottom: 2px;
          margin-right: 6px;
        }

        /* 右下角 Scroll */
        .bottom-right-scroll {
          position: absolute;
          bottom: 2.5rem; right: 3rem;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
        .bottom-right-scroll .arrow-circle {
          width: 24px; height: 24px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
        }

        /* 右側中央 導覽點 */
        .side-indicators {
          position: absolute;
          right: 3rem; top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .indicator-item {
          position: relative;
          width: 16px; height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .indicator-item .dot {
          width: 3px; height: 3px;
          background-color: #fff;
          border-radius: 50%;
        }
        .indicator-item .ring {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .top-left-logo { top: 1.5rem; left: 1.5rem; }
          .top-right-badge { top: 1.5rem; padding: 0.4rem 1rem; }
          .hero-title {
            left: 1.5rem;
            top: auto;
            bottom: 28%;
            transform: none;
            width: calc(100% - 3rem);
          }
          .bottom-left-text { bottom: 1.5rem; left: 1.5rem; font-size: 0.65rem; }
          .bottom-right-scroll { display: none; }
          .side-indicators { right: 1.5rem; }
        }
      `}</style>

      <section className="hero-container" ref={containerRef}>
        <div className="images-wrapper">
          {slides.map((slide, idx) => (
            <div
              key={`img-${idx}`}
              className="slide-image"
              ref={(el) => (imagesRef.current[idx] = el)}
            >
              <img src={slide.image} alt="Hero Banner" />
            </div>
          ))}
        </div>
        <div className="overlay"></div>

        <div className="hero-title">
          <Copy
            key={`hero-title-${textIndex}`}
            animateOnScroll={false}
            delay={0.2}
          >
            {slides[textIndex].titleLine1 ? (
              <p className="title-line title-line-1">
                {slides[textIndex].titleLine1}
              </p>
            ) : null}
            {slides[textIndex].titleLine2 ? (
              <p className="title-line title-line-2">
                {slides[textIndex].titleLine2}
              </p>
            ) : null}
          </Copy>
        </div>

        <div className="bottom-left-text">
          <span className="underline">NEW WORK STYLE</span>
          <span>
            from <strong> by Kesh</strong>
          </span>
        </div>

        <div className="bottom-right-scroll">
          SCROLL FOR CONTENTS
          <div className="arrow-circle">↓</div>
        </div>

        <div className="side-indicators">
          {slides.map((_, idx) => (
            <div
              key={`ind-${idx}`}
              className="indicator-item"
              ref={(el) => (indicatorsRef.current[idx] = el)}
            >
              <div className="dot"></div>
              <div className="ring"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
