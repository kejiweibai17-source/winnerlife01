"use client";
import React, { useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Copy from "../Copy";
import "./style.css";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt, tag, title, body }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // 視差滾動
  useEffect(() => {
    const updateBounds = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkIfMobile();
    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("resize", checkIfMobile);

    const animate = () => {
      if (imageRef.current && !isMobile) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1,
        );
        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.1)`;
        }
      } else if (imageRef.current && isMobile) {
        imageRef.current.style.transform = "none";
      }
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("resize", checkIfMobile);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  useLenis(({ scroll }) => {
    if (!bounds.current || isMobile) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * 0.2;
  });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          transform: isMobile ? "none" : "translateY(0) scale(1.1)",
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      {/* 深色漸層遮罩 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 文字覆蓋層 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          left: 0,
          right: 0,
          padding: "0 2rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {tag && (
          <Copy delay={0}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {tag}
            </p>
          </Copy>
        )}
        {title && (
          <Copy delay={0.1}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: 1.5,
                marginBottom: "1.2rem",
              }}
            >
              {title}
            </h2>
          </Copy>
        )}
        {body && (
          <Copy delay={0.2}>
            <p
              style={{
                fontSize: "clamp(12px, 1.3vw, 14px)",
                letterSpacing: "0.15em",
                lineHeight: 2.2,
              }}
            >
              {body}
            </p>
          </Copy>
        )}
      </div>
    </div>
  );
};

export default ParallaxImage;
