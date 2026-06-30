"use client";

import { Building2 } from "lucide-react";
import Copy from "../Copy";
import { HERO_FEATURES } from "./data";

export default function HeroClosingSection() {
  const { tagline, closingBg, scrollLabel } = HERO_FEATURES;
  const { headline, headlineHighlight, location, sub } = tagline;

  return (
    <section
      id="Closing"
      className="lp-hero-features-closing"
      aria-label="品牌理念"
    >
      <img
        className="lp-hero-features-closing-bg"
        src={closingBg}
        alt=""
        loading="lazy"
      />
      <div className="lp-hero-features-closing-overlay" aria-hidden="true" />

      <div className="lp-container lp-hero-features-closing-content">
        <div className="lp-hero-features-closing-badge" aria-hidden="true">
          <div className="lp-hero-features-closing-emblem">
            <Building2 size={17} strokeWidth={1.35} />
          </div>
          <span className="lp-hero-features-closing-badge-rule" />
        </div>

        <Copy animateOnScroll delay={0.18}>
          <h2 className="lp-hero-features-closing-headline">
            {headline.map((line) => (
              <span key={line} className="lp-hero-features-closing-line">
                {line}
              </span>
            ))}
            <span className="lp-hero-features-closing-line">
              {headlineHighlight.before}
              <span className="lp-hero-features-closing-highlight">
                {headlineHighlight.highlight}
              </span>
              {headlineHighlight.after}
            </span>
          </h2>
        </Copy>

        <Copy animateOnScroll delay={0.28}>
          <p className="lp-hero-features-closing-location">{location}</p>
        </Copy>

        <Copy animateOnScroll delay={0.38}>
          <p className="lp-hero-features-closing-sub">{sub}</p>
        </Copy>

        <div className="lp-hero-features-scroll" aria-hidden="true">
          <span className="lp-hero-features-scroll-chevron" />
          <span className="lp-hero-features-scroll-label">{scrollLabel}</span>
        </div>
      </div>
    </section>
  );
}
