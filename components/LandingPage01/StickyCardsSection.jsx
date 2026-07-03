"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STICKY_CARDS } from "./data";

gsap.registerPlugin(ScrollTrigger);

function BadgeIcon({ type, className = "" }) {
  if (type === "tree") {
    return (
      <svg viewBox="0 0 40 48" fill="none" className={className} aria-hidden="true">
        <path
          d="M20 4L8 24h7l-3 20h16l-3-20h7L20 4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "waves") {
    return (
      <svg viewBox="0 0 48 28" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 18c4-6 8-6 12 0s8 6 12 0 8-6 12 0"
          stroke="#1e4a7a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 24c4-6 8-6 12 0s8 6 12 0 8-6 12 0"
          stroke="#c9a962"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "coffee") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path
          d="M10 14h18v14a6 6 0 01-6 6H16a6 6 0 01-6-6V14z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M28 18h4a4 4 0 010 8h-4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8c0 3 2 5 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "shopping") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 12h24l-2 20H10L8 12z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M14 12V9a6 6 0 0112 0v3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 34V18l12-8 12 8v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 34v-10h8v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IntroPanel({ intro }) {
  return (
    <div className="lp-sc-intro-panel">
      <h2 className="lp-sc-intro-headline">
        {intro.lines.map((line) => (
          <span key={line} className="lp-sc-intro-line">
            {line.includes(intro.highlight) ? (
              <>
                {line.slice(0, line.indexOf(intro.highlight))}
                <span className="lp-sc-gold">{intro.highlight}</span>
                {line.slice(line.indexOf(intro.highlight) + intro.highlight.length)}
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </h2>
      <p className="lp-sc-intro-tags">{intro.tags}</p>
      <p className="lp-sc-intro-sub">{intro.sub}</p>
    </div>
  );
}

function ClosingPanel({ closing }) {
  return (
    <div className="lp-sc-closing">
      <div className="lp-sc-closing-fade" aria-hidden="true" />
      <p className="lp-sc-closing-text">
        {closing.before}
        <span className="lp-sc-gold">{closing.highlight}</span>
        {closing.after}
      </p>
      <div className="lp-sc-scroll" aria-hidden="true">
        <span className="lp-sc-scroll-chevron" />
        <span className="lp-sc-scroll-label">{closing.scrollLabel}</span>
      </div>
    </div>
  );
}

export default function StickyCardsSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray(
        sectionRef.current.querySelectorAll(".lp-sc-card"),
      );

      const triggers = [];

      cards.forEach((card, index) => {
        if (index >= cards.length - 1) return;

        const cardInner = card.querySelector(".lp-sc-card-inner");
        const nextCard = cards[index + 1];

        triggers.push(
          gsap.fromTo(
            cardInner,
            {
              y: "0%",
              z: 0,
              rotationX: 0,
            },
            {
              y: "-50%",
              z: -250,
              rotationX: 45,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top 85%",
                end: "top -75%",
                scrub: true,
                pin: card,
                pinSpacing: false,
              },
            },
          ).scrollTrigger,
        );

        triggers.push(
          gsap.to(cardInner, {
            "--lp-sc-overlay": 1,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 75%",
              end: "top -25%",
              scrub: true,
            },
          }).scrollTrigger,
        );
      });

      return () => {
        triggers.forEach((trigger) => trigger?.kill());
      };
    },
    { scope: sectionRef, dependencies: [] },
  );

  const { intro, closing, cards } = STICKY_CARDS;

  return (
    <div ref={sectionRef} className="lp-sc" id="StickyCards">
      <div className="lp-sc-cards">
        {cards.map((card, index) => (
          <article key={card.id} className="lp-sc-card" id={card.id}>
            <div className="lp-sc-card-inner">
              <img
                className="lp-sc-card-bg"
                src={card.image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="lp-sc-card-overlay" aria-hidden="true" />

              {index === 0 ? <IntroPanel intro={intro} /> : null}

              <div
                className={`lp-sc-badge lp-sc-badge--${card.badgeSide}`}
                style={{ "--lp-sc-title-color": card.titleColor }}
              >
                <BadgeIcon type={card.icon} className="lp-sc-badge-icon" />
                <span className="lp-sc-badge-number">{card.number}</span>
                <h3 className="lp-sc-badge-title">{card.title}</h3>
                <p className="lp-sc-badge-desc">
                  {card.description.map((line) => (
                    <span key={line} className="lp-sc-badge-desc-line">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {index === cards.length - 1 ? (
                <ClosingPanel closing={closing} />
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
