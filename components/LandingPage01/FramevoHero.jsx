"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy";
import { FadeIn } from "./AnimatedText";
import { FRAMEVO_HERO } from "./data";

function BuildingOverlayCopy({ overlay }) {
  return (
    <div className="lp-fv-right-copy">
      <h2 className="lp-fv-right-copy-title">{overlay.title}</h2>
      <p className="lp-fv-right-copy-subtitle">{overlay.subtitle}</p>
      <span className="lp-fv-right-copy-divider" aria-hidden="true" />
      {overlay.body.map((line) => (
        <p key={line} className="lp-fv-right-copy-line">
          {line}
        </p>
      ))}
    </div>
  );
}

export default function FramevoHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const areaRef = useRef(null);
  const slideRefs = useRef([]);

  const switchSlide = (index) => {
    if (index === activeIndex || isFading) return;

    const current = slideRefs.current[activeIndex];
    const next = slideRefs.current[index];
    if (!current || !next) return;

    setIsFading(true);
    gsap
      .timeline({
        onComplete: () => {
          setActiveIndex(index);
          setIsFading(false);
        },
      })
      .to(current, { opacity: 0, duration: 0.75, ease: "power2.inOut" }, 0)
      .fromTo(
        next,
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: "power2.inOut" },
        0,
      );
  };

  useGSAP(
    () => {
      if (!areaRef.current) return;

      slideRefs.current.forEach((slide, index) => {
        gsap.set(slide, { opacity: index === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        areaRef.current.querySelectorAll(".lp-fv-hero-bg-slide"),
        { scale: 1.06, duration: 1.2 },
        0,
      ).from(
        areaRef.current.querySelectorAll(".lp-fv-thumb"),
        { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 },
        0.75,
      );
    },
    { scope: areaRef },
  );

  const { headline, rightCopy } = FRAMEVO_HERO;

  return (
    <div ref={areaRef} className="lp-fv-home-area" id="FramevoHero">
      <div className="lp-fv-hero-bg-stack" aria-hidden="true">
        {FRAMEVO_HERO.gallery.map((slide, index) => (
          <img
            key={slide.src}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="lp-fv-hero-bg-slide"
            src={slide.src}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="lp-fv-blend" aria-hidden="true" />
      <div className="lp-fv-bottom-fade" aria-hidden="true" />

      <section className="lp-fv-hero" aria-label="港區精品住宅">
        <div className="lp-container lp-fv-hero-container">
          <div className="lp-fv-hero-content">
            <Copy animateOnScroll={false} delay={0.15}>
              <h1 className="lp-fv-headline">
                <span className="lp-fv-headline-line lp-fv-headline-line--red">
                  {headline.line1}
                </span>
                <span className="lp-fv-headline-line lp-fv-headline-line--light">
                  {headline.line2.before}
                  <span className="lp-fv-headline-highlight">
                    {headline.line2.highlight}
                  </span>
                  {headline.line2.after}
                </span>
                <span className="lp-fv-headline-line lp-fv-headline-line--light">
                  {headline.line3}
                </span>
              </h1>
            </Copy>

            <div className="lp-fv-thumbs" role="tablist" aria-label="主視覺輪播">
              {FRAMEVO_HERO.gallery.map((slide, index) => (
                <div key={slide.src} className="lp-fv-thumb-item">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    aria-label={slide.label}
                    className={`lp-fv-thumb ${activeIndex === index ? "active" : ""}`}
                    onClick={() => switchSlide(index)}
                  >
                    <img src={slide.src} alt="" loading="lazy" />
                  </button>
                  <span className="lp-fv-thumb-label">{slide.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-fv-right-copy-wrap">
            <FadeIn animateOnScroll={false} delay={0.48}>
              <BuildingOverlayCopy overlay={rightCopy} />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
