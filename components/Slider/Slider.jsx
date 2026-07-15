"use client";

import React, { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";
import { getIsMobileViewport } from "@/lib/use-is-mobile";

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
  "/images/002.png",
  "/images/index/cd78a1ca-c3db-4c12-a8b2-413e62181b4f.png",
  "/images/index/8f2716f6-12ae-4ff6-b310-1bfb8b3c20a7.png",
  "/images/index/4e8ee07e-5f3d-4a04-9b30-078ba9c7fb8c.png",
  "/images/index/03.png",
];

function normalizeSrc(src) {
  return src.startsWith("/") ? src : `/${src}`;
}

export default function Slider() {
  const t = useTranslations("transportSlider");

  const slides = useMemo(
    () =>
      SLIDE_IMAGES.map((image, i) => ({
        subtitle: t(`slides.${i}.subtitle`),
        title: t(`slides.${i}.title`).replace(/\n/g, "<br/>"),
        description: t(`slides.${i}.description`),
        subtext: t(`slides.${i}.subtext`),
        image: normalizeSrc(image),
      })),
    [t],
  );

  const sliderRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const textContainerRef = useRef(null);
  const sliderIndicesRef = useRef(null);
  const progressBarRef = useRef(null);
  const slidesRef = useRef(slides);
  slidesRef.current = slides;

  useGSAP(
    () => {
      const isMobile = getIsMobileViewport();
      const slidesNow = slidesRef.current;
      let activeSlide = 0;
      let splits = [];
      let slideToken = 0;
      let visibleImg = sliderImagesRef.current?.querySelector("img") || null;

      const pinDistance = window.innerHeight * Math.max(slidesNow.length, 1);

      slidesNow.forEach((slide) => {
        const preload = new window.Image();
        preload.decoding = "async";
        preload.src = slide.image;
      });

      function createIndices() {
        if (!sliderIndicesRef.current) return;
        sliderIndicesRef.current.innerHTML = "";

        slidesNow.forEach((_, index) => {
          const indexNum = (index + 1).toString().padStart(2, "0");
          const indicatorElement = document.createElement("p");
          indicatorElement.dataset.index = String(index);
          indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
          sliderIndicesRef.current.appendChild(indicatorElement);

          const isActive = index === 0;
          gsap.set(indicatorElement.querySelector(".index"), {
            opacity: isActive ? 1 : 0.35,
          });
          gsap.set(indicatorElement.querySelector(".marker"), {
            scaleX: isActive ? 1 : 0,
          });
        });
      }

      function prunePending(except) {
        const container = sliderImagesRef.current;
        if (!container) return;
        [...container.querySelectorAll("img")].forEach((img) => {
          if (img === except || img === visibleImg) return;
          gsap.killTweensOf(img);
          img.onload = null;
          img.onerror = null;
          img.remove();
        });
      }

      function promoteImage(img, token) {
        if (token !== slideToken || !sliderImagesRef.current?.contains(img)) {
          return;
        }

        gsap.killTweensOf(img);
        gsap.set(img, {
          opacity: 0,
          scale: isMobile ? 1 : 1.05,
          force3D: true,
        });

        gsap.to(img, {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.65 : 0.8,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            if (token !== slideToken) return;
            const container = sliderImagesRef.current;
            if (!container) return;

            [...container.querySelectorAll("img")].forEach((old) => {
              if (old === img) return;
              gsap.killTweensOf(old);
              old.onload = null;
              old.onerror = null;
              old.remove();
            });
            visibleImg = img;
            img.style.willChange = "auto";
          },
        });
      }

      function animateNewSlide(index) {
        const container = sliderImagesRef.current;
        const slide = slidesNow[index];
        if (!container || !slide) return;

        const token = ++slideToken;
        prunePending(visibleImg);

        // Same image already visible — only refresh text/indicators
        if (visibleImg?.getAttribute("src") === slide.image) {
          gsap.set(visibleImg, { opacity: 1 });
          animateNewText(index);
          animateIndicators(index);
          return;
        }

        const newSliderImage = document.createElement("img");
        newSliderImage.src = slide.image;
        newSliderImage.alt = `Slide ${index + 1}`;
        newSliderImage.className =
          "absolute inset-0 h-full w-full object-cover";
        newSliderImage.decoding = "async";
        newSliderImage.setAttribute("data-slide", String(index));
        // Ensure hardware layer; helps iOS not drop frames to blank
        newSliderImage.style.willChange = "opacity, transform";
        newSliderImage.style.transform = "translateZ(0)";

        gsap.set(newSliderImage, { opacity: 0, force3D: true });
        container.appendChild(newSliderImage);

        const finish = () => promoteImage(newSliderImage, token);

        // Preloaded/cached images: fade immediately to keep scrub feel continuous
        if (newSliderImage.complete && newSliderImage.naturalWidth > 0) {
          finish();
        } else {
          newSliderImage.onload = finish;
          newSliderImage.onerror = () => {
            if (token === slideToken) newSliderImage.remove();
          };
        }

        animateNewText(index);
        animateIndicators(index);
      }

      function animateIndicators(index) {
        if (!sliderIndicesRef.current) return;
        const indicators = sliderIndicesRef.current.querySelectorAll("p");

        indicators.forEach((indicator, i) => {
          const markerElement = indicator.querySelector(".marker");
          const indexElement = indicator.querySelector(".index");
          const active = i === index;

          gsap.to(indexElement, {
            opacity: active ? 1 : 0.35,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(markerElement, {
            scaleX: active ? 1 : 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        });
      }

      function animateNewText(index) {
        if (!textContainerRef.current || !slidesNow[index]) return;

        splits.forEach((split) => split.revert());
        splits = [];

        const slide = slidesNow[index];
        textContainerRef.current.innerHTML = `
          ${slide.subtitle ? `<p class="slide-text-element ${TEXT_CLASSES.subtitle}">${slide.subtitle}</p>` : ""}
          <h1 class="slide-text-element ${TEXT_CLASSES.title}">${slide.title}</h1>
          ${slide.description ? `<div class="slide-text-element ${TEXT_CLASSES.description}">${slide.description}</div>` : ""}
          ${slide.subtext ? `<p class="slide-text-element ${TEXT_CLASSES.subtext}">${slide.subtext}</p>` : ""}
        `;

        const elementsToAnimate = textContainerRef.current.querySelectorAll(
          ".slide-text-element",
        );

        // Mobile keeps the same line-reveal feel, but slightly lighter timings
        let globalDelay = 0;
        elementsToAnimate.forEach((el) => {
          const split = new SplitText(el, {
            type: "lines",
            linesClass: "overflow-hidden",
          });
          const innerSplit = new SplitText(split.lines, {
            type: "lines",
            linesClass: "line-inner",
          });

          splits.push(split, innerSplit);
          gsap.set(innerSplit.lines, { yPercent: 100, opacity: 0 });
          gsap.to(innerSplit.lines, {
            yPercent: 0,
            opacity: 1,
            duration: isMobile ? 0.55 : 0.8,
            stagger: isMobile ? 0.06 : 0.1,
            delay: globalDelay,
            ease: "power3.out",
            overwrite: true,
          });
          globalDelay += isMobile ? 0.1 : 0.15;
        });
      }

      createIndices();
      animateNewText(0);

      // Ensure first image is definitely painted
      if (visibleImg) {
        gsap.set(visibleImg, { opacity: 1, force3D: true });
      }

      const trigger = ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${pinDistance}px`,
        // Keep same scrub feel as desktop for smooth scroll-linked transitions
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleY: self.progress });
          }

          const currentSlide = Math.min(
            slidesNow.length - 1,
            Math.floor(self.progress * slidesNow.length),
          );

          if (activeSlide !== currentSlide) {
            activeSlide = currentSlide;
            animateNewSlide(activeSlide);
          }
        },
      });

      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("orientationchange", onResize);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("orientationchange", onResize);
        window.removeEventListener("resize", onResize);
        splits.forEach((split) => split.revert());
        trigger.kill();
      };
    },
    // Avoid remounting when useIsMobile flips false→true (was causing mobile blanks)
    { scope: sliderRef, dependencies: [] },
  );

  return (
    <section
      className="relative section-slider w-full h-[100svh] overflow-hidden bg-[#0a0a0a]"
      ref={sliderRef}
    >
      <div
        className="absolute inset-0 z-0 h-full w-full bg-[#0a0a0a]"
        ref={sliderImagesRef}
      >
        <img
          src={slides[0].image}
          alt="Slide 1"
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/25 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full max-w-4xl flex-col justify-center pl-8 md:pl-24 lg:pl-32">
        <div ref={textContainerRef} className="flex flex-col items-start" />
      </div>

      <div className="relative z-10 slider-indicator">
        <div className="slider-indices" ref={sliderIndicesRef}></div>
        <div className="slider-progress-bar">
          <div className="slider-progress" ref={progressBarRef}></div>
        </div>
      </div>
    </section>
  );
}
