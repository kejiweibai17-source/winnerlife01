"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function AnimatedText({
  as: Tag = "p",
  className = "",
  children,
  split = "chars",
  animateOnScroll = true,
  delay = 0,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || !children) return;

      const instance = SplitText.create(ref.current, {
        type: split === "lines" ? "lines" : "chars,words",
        charsClass: "lp-split-char",
        wordsClass: "lp-split-word",
        linesClass: "lp-split-line",
      });

      const targets =
        split === "lines" ? instance.lines : instance.chars;

      gsap.set(targets, { opacity: 0, y: split === "lines" ? "100%" : 12 });

      const tween = {
        opacity: 1,
        y: 0,
        duration: split === "lines" ? 0.9 : 0.6,
        stagger: split === "lines" ? 0.08 : 0.015,
        ease: "power3.out",
        delay,
      };

      if (animateOnScroll) {
        gsap.to(targets, {
          ...tween,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      } else {
        gsap.to(targets, tween);
      }

      return () => instance.revert();
    },
    { scope: ref, dependencies: [children, split, animateOnScroll, delay] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 40,
  as: Tag = "div",
  animateOnScroll = true,
  style,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const tween = {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
      };

      if (animateOnScroll) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y },
          {
            ...tween,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      } else {
        gsap.fromTo(ref.current, { opacity: 0, y }, tween);
      }
    },
    { scope: ref, dependencies: [delay, y, animateOnScroll] },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
