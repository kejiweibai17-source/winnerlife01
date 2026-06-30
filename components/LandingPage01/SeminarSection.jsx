"use client";

import Copy from "../Copy";
import { SEMINAR } from "./data";

function SeminarIcon({ type, className = "" }) {
  const icons = {
    buildings: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path d="M6 34V14l14-8 14 8v20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 34V22h4v12M22 34V18h4v16" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    yen: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 14h16M12 20h16M16 14v12M24 14v12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path
          d="M20 4l14 6v10c0 8.5-6 14.5-14 16-8-1.5-14-7.5-14-16V10l14-6z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M20 14v8M17 17h6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="30" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M28 12h4M30 10v4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    experts: (
      <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="34" cy="10" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M4 28c0-5 4.5-8 10-8s10 3 10 8M24 28c0-5 4.5-8 10-8s10 3 10 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    report: (
      <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 6h14l6 6v22H8V6z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M22 6v6h6M12 18h12M12 23h12M12 28h8" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    qa: (
      <svg viewBox="0 0 40 32" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 8h18v10H10l-4 6V8z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M18 12h18v10H24l-4 6V12z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
    limited: (
      <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
        <rect x="6" y="16" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M10 16V12a6 6 0 0112 0v4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="16" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  };

  return icons[type] ?? icons.buildings;
}

function HubCard({ item, delay }) {
  return (
    <article className={`lp-sm-hub-card lp-sm-hub-card--${item.id}`}>
      <SeminarIcon type={item.icon} className="lp-sm-hub-icon" />
      <Copy animateOnScroll delay={delay}>
        <p className="lp-sm-hub-text">
          <span className="lp-sm-hub-line">{item.line1}</span>
          <span className="lp-sm-hub-line">{item.line2}</span>
        </p>
      </Copy>
    </article>
  );
}

function FeatureItem({ item, delay }) {
  return (
    <div className="lp-sm-feature">
      <SeminarIcon type={item.icon} className="lp-sm-feature-icon" />
      <Copy animateOnScroll delay={delay}>
        <p className="lp-sm-feature-text">
          <span className="lp-sm-feature-line">{item.line1}</span>
          <span className="lp-sm-feature-line">{item.line2}</span>
        </p>
      </Copy>
    </div>
  );
}

export default function SeminarSection() {
  const {
    bg,
    headline,
    sub,
    hub,
    center,
    features,
    featureImage,
    disclaimer,
    scrollLabel,
  } = SEMINAR;

  return (
    <div className="lp-sm lp-tc" id="Seminar">
      <section className="lp-sm-section" aria-label="海外置產說明會">
        <img className="lp-sm-bg" src={bg} alt="" loading="lazy" />
        <div className="lp-sm-bg-fade" aria-hidden="true" />
        <div className="lp-sm-overlay" aria-hidden="true" />
        <div className="lp-sm-bottom-fade" aria-hidden="true" />

        <div className="lp-container lp-sm-inner">
          <header className="lp-sm-header">
            <Copy animateOnScroll delay={0.1}>
              <h2 className="lp-sm-headline">
                <span className="lp-sm-headline-line">
                  {headline.lines[0].before}
                  <span className="lp-tc-platinum">{headline.lines[0].highlight}</span>
                </span>
                <span className="lp-sm-headline-line">{headline.lines[1]}</span>
              </h2>
            </Copy>
            <Copy animateOnScroll delay={0.22}>
              <p className="lp-sm-sub">{sub}</p>
            </Copy>
          </header>

          <div className="lp-sm-hub">
            <HubCard item={hub[0]} delay={0.15} />
            <HubCard item={hub[1]} delay={0.23} />

            <article className="lp-sm-hub-center">
              <SeminarIcon type={center.icon} className="lp-sm-hub-center-icon" />
              <Copy animateOnScroll delay={0.35}>
                <p className="lp-sm-hub-center-text">
                  <span className="lp-sm-hub-line">{center.line1}</span>
                  <span className="lp-sm-hub-line">{center.line2}</span>
                </p>
              </Copy>
            </article>

            <HubCard item={hub[2]} delay={0.31} />
            <HubCard item={hub[3]} delay={0.39} />
          </div>

          <div className="lp-sm-features-wrap">
            <div className="lp-sm-features">
              {features.map((item, index) => (
                <FeatureItem
                  key={item.line1}
                  item={item}
                  delay={0.45 + index * 0.08}
                />
              ))}
            </div>
            <div className="lp-sm-features-media">
              <img src={featureImage} alt="" loading="lazy" />
            </div>
          </div>

          <footer className="lp-sm-footer">
            <Copy animateOnScroll delay={0.55}>
              <p className="lp-sm-disclaimer">{disclaimer}</p>
            </Copy>

            <div className="lp-tc-scroll" aria-hidden="true">
              <span className="lp-tc-scroll-chevron" />
              <span className="lp-tc-scroll-label">{scrollLabel}</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
