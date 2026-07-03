"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ECOSPIRE_HERO, HERO_BG } from "./data";

gsap.registerPlugin(SplitText, ScrollTrigger);

function MarqueeLine({ text }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const split = SplitText.create(ref.current, {
        type: "chars",
        charsClass: "lp-eco-split-char",
      });
      gsap.set(split.chars, { y: "-1em" });

      const onEnter = () => {
        gsap.to(split.chars, {
          y: 0,
          duration: 0.45,
          stagger: 0.012,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(split.chars, {
          y: "-1em",
          duration: 0.35,
          stagger: 0.008,
          ease: "power3.in",
        });
      };

      ref.current.addEventListener("mouseenter", onEnter);
      ref.current.addEventListener("mouseleave", onLeave);

      return () => {
        ref.current?.removeEventListener("mouseenter", onEnter);
        ref.current?.removeEventListener("mouseleave", onLeave);
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="lp-eco-marquee-line">
      {text}
    </p>
  );
}

function DisplayTitleLine({ text, row }) {
  const isEven = row === 2;
  return (
    <div
      className={`lp-eco-title-wrap lp-eco-title-wrap--${isEven ? "even" : "odd"}`}
    >
      <span className="lp-eco-title-char">{text}</span>
    </div>
  );
}

function HeroCopyBlock({ copy }) {
  return (
    <div className="lp-eco-copy">
      <div className="lp-eco-copy-headline">
        {copy.headline.map((line) => (
          <span key={line} className="lp-eco-copy-line">
            {line}
          </span>
        ))}
        <span className="lp-eco-copy-line">
          {copy.headlineHighlight.before}
          <span className="lp-eco-copy-highlight">
            {copy.headlineHighlight.highlight}
          </span>
          {copy.headlineHighlight.after}
        </span>
      </div>
      <p className="lp-eco-copy-line lp-eco-copy-lead">{copy.lead}</p>
      <p className="lp-eco-copy-line lp-eco-copy-sub">{copy.sub}</p>
    </div>
  );
}

export default function EcospireHero() {
  const stickyRef = useRef(null);
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const copyRef = useRef(null);
  const foregroundRef = useRef(null);
  const mountainsRef = useRef(null);

  useGSAP(
    () => {
      if (!stickyRef.current || !heroRef.current || !copyRef.current) return;

      const wrapsOdd = heroRef.current.querySelectorAll(
        ".lp-eco-title-wrap--odd",
      );
      const wrapsEven = heroRef.current.querySelectorAll(
        ".lp-eco-title-wrap--even",
      );

      gsap.set(wrapsOdd, { yPercent: 100 });
      gsap.set(wrapsEven, { yPercent: -100 });
      gsap.set(marqueeRef.current, { yPercent: 300, opacity: 0 });
      gsap.set(contentRef.current, { yPercent: 52, opacity: 0 });
      gsap.set(copyRef.current, { opacity: 0, y: 28 });
      gsap.set(
        copyRef.current?.querySelectorAll(".lp-eco-copy-line") ?? [],
        { opacity: 0, y: 18 },
      );
      gsap.set(foregroundRef.current, { yPercent: 40 });
      gsap.set(mountainsRef.current, { yPercent: 20, opacity: 0 });

      const loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      loadTl
        .to(marqueeRef.current, { yPercent: 0, opacity: 1, duration: 1.1 }, 0)
        .to(
          contentRef.current,
          { yPercent: 0, opacity: 1, duration: 1.2 },
          0.15,
        )
        .to(wrapsOdd, { yPercent: 0, duration: 1, stagger: 0.06 }, 0.25)
        .to(wrapsEven, { yPercent: 0, duration: 1, stagger: 0.06 }, 0.3)
        .to(
          mountainsRef.current,
          { yPercent: 0, opacity: 1, duration: 1 },
          0.45,
        )
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.95)
        .to(
          copyRef.current?.querySelectorAll(".lp-eco-copy-line") ?? [],
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 },
          1.05,
        );

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      const copyLines = copyRef.current?.querySelectorAll(".lp-eco-copy-line");

      pinTl
        .to(
          marqueeRef.current,
          { yPercent: -80, opacity: 0.4, ease: "none" },
          0,
        )
        .to(contentRef.current, { yPercent: -14, ease: "none" }, 0)
        .to(copyRef.current, { y: -56, opacity: 0, ease: "none" }, 0)
        .to(
          copyLines ?? [],
          { y: -24, stagger: 0.04, ease: "none" },
          0,
        )
        .to(foregroundRef.current, { yPercent: -6, ease: "none" }, 0)
        .to(mountainsRef.current, { yPercent: -8, ease: "none" }, 0)
        .to(heroRef.current.querySelector(".lp-eco-hero-bg"), {
          scale: 1.08,
          ease: "none",
        }, 0);

      return () => {
        loadTl.kill();
        pinTl.kill();
      };
    },
    { scope: stickyRef },
  );

  return (
    <div ref={stickyRef} className="lp-eco-sticky" id="Hero">
      <section ref={heroRef} className="lp-eco-hero" aria-label="OK PRIME 白金高輪">
        <div className="lp-eco-hero-inner">
          <img
            className="lp-eco-hero-bg"
            src={HERO_BG}
            alt=""
            loading="eager"
          />
          <div className="lp-eco-hero-overlay" aria-hidden="true" />

          <div ref={marqueeRef} className="lp-eco-marquee" aria-hidden="true">
            <MarqueeLine text={ECOSPIRE_HERO.marquee} />
            <MarqueeLine text={ECOSPIRE_HERO.marquee} />
          </div>

          <div ref={contentRef} className="lp-eco-hero-content">
            <div className="lp-eco-title" aria-label="港區。白金高輪">
              {ECOSPIRE_HERO.titleLines.map((item) => (
                <DisplayTitleLine
                  key={item.text}
                  text={item.text}
                  row={item.row}
                />
              ))}
            </div>

            <div ref={copyRef}>
              <HeroCopyBlock copy={ECOSPIRE_HERO.copy} />
            </div>
          </div>

          <div ref={foregroundRef} className="lp-eco-foreground">
            <div ref={mountainsRef} className="lp-eco-foreground-image">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={ECOSPIRE_HERO.foregroundMobile}
                />
                <img src={ECOSPIRE_HERO.foreground} alt="" loading="lazy" />
              </picture>
            </div>
          </div>

          <div className="lp-eco-hero-seam" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
