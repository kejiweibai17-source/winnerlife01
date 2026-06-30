"use client";

import { useCallback, useRef, useState } from "react";
import {
  Building2,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import Copy from "../Copy";
import { TOKYO_CORE } from "./data";

const ICON_MAP = {
  trendingUp: TrendingUp,
  shoppingBag: ShoppingBag,
  users: Users,
  building: Building2,
};

function ClosingIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.2" />
      <ellipse
        cx="24"
        cy="26"
        rx="14"
        ry="6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M10 26c0-7.7 6.3-14 14-14s14 6.3 14 14"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18 34V22l6-4 6 4v12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M22 30h4v4h-4z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ConditionCard({ card, index, isActive, onSelect }) {
  const Icon = ICON_MAP[card.icon] ?? TrendingUp;
  const delay = index * 0.08;

  return (
    <button
      type="button"
      className={`lp-tc-card ${isActive ? "is-active" : ""}`}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      aria-label={`${card.title}：${card.subtitle}`}
    >
      <div className="lp-tc-card-header">
        <span className="lp-tc-card-number-badge">{card.number}</span>
        <span className="lp-tc-card-icon-badge" aria-hidden="true">
          <Icon size={20} strokeWidth={1.35} />
        </span>
        <div className="lp-tc-card-titles">
          <Copy animateOnScroll delay={delay}>
            <h3 className="lp-tc-card-title">{card.title}</h3>
          </Copy>
          <Copy animateOnScroll delay={delay + 0.05}>
            <p className="lp-tc-card-subtitle">{card.subtitle}</p>
          </Copy>
        </div>
      </div>

      <Copy animateOnScroll delay={delay + 0.1}>
        <p className="lp-tc-card-body">{card.body}</p>
      </Copy>

      <div className="lp-tc-card-media">
        <div className="lp-tc-card-media-fade" aria-hidden="true" />
        <img src={card.image} alt="" loading="lazy" />
      </div>
    </button>
  );
}

function IntroPanel({ panel, animateOnScroll }) {
  return (
    <div className="lp-tc-intro-panel">
      <Copy animateOnScroll={animateOnScroll} delay={0.12}>
        <h2 className="lp-tc-intro-headline">
          {panel.headline.map((line) => (
            <span key={line} className="lp-tc-intro-line">
              {line}
            </span>
          ))}
          <span className="lp-tc-intro-line">
            {panel.headlineLine2.before}
            <span className="lp-tc-platinum">{panel.headlineLine2.highlight}</span>
            {panel.headlineLine2.after}
          </span>
        </h2>
      </Copy>

      <span className="lp-tc-intro-rule" aria-hidden="true" />

      <Copy animateOnScroll={animateOnScroll} delay={0.28}>
        <p className="lp-tc-intro-sub">
          {panel.sub.map((line) => (
            <span key={line} className="lp-tc-intro-sub-line">
              {line}
            </span>
          ))}
        </p>
      </Copy>
    </div>
  );
}

export default function TokyoCoreSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [bgVisible, setBgVisible] = useState(true);
  const introRef = useRef(null);
  const { intro, cards, closing } = TOKYO_CORE;
  const rows = [cards.slice(0, 2), cards.slice(2, 4)];

  const activePanel =
    activeCardIndex === null ? intro : cards[activeCardIndex].panel;

  const handleCardSelect = useCallback((index) => {
    if (index === activeCardIndex) {
      introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setBgVisible(false);
    window.setTimeout(() => {
      setActiveCardIndex(index);
      setBgVisible(true);
      introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
  }, [activeCardIndex]);

  return (
    <div className="lp-tc" id="TokyoCore">
      <section
        ref={introRef}
        className="lp-tc-intro"
        aria-label="東京核心地段"
      >
        <img
          key={activePanel.bg}
          className={`lp-tc-intro-bg ${bgVisible ? "is-visible" : ""}`}
          src={activePanel.bg}
          alt=""
          loading="eager"
        />
        <div className="lp-tc-intro-bg-fade" aria-hidden="true" />
        <div className="lp-tc-intro-overlay" aria-hidden="true" />
        <div className="lp-tc-intro-bottom-fade" aria-hidden="true" />

        <div className="lp-container lp-tc-stage">
          <div className="lp-tc-intro-content">
            <IntroPanel
              key={activeCardIndex ?? "default"}
              panel={activePanel}
              animateOnScroll={false}
            />
          </div>
        </div>
      </section>

      <section className="lp-tc-cards" aria-label="四個條件">
        <div className="lp-container lp-tc-stage">
          <div className="lp-tc-cards-rows">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="lp-tc-cards-row">
                {row.map((card, cardIndex) => {
                  const index = rowIndex * 2 + cardIndex;
                  return (
                    <ConditionCard
                      key={card.number}
                      card={card}
                      index={index}
                      isActive={activeCardIndex === index}
                      onSelect={handleCardSelect}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Closing" className="lp-tc-closing" aria-label="品牌理念">
        <img
          className="lp-tc-closing-bg"
          src={closing.bg}
          alt=""
          loading="lazy"
        />
        <div className="lp-tc-closing-bg-fade" aria-hidden="true" />
        <div className="lp-tc-closing-overlay" aria-hidden="true" />

        <div className="lp-container lp-tc-closing-inner">
          <div className="lp-tc-closing-layout">
            <div className="lp-tc-closing-icon-wrap" aria-hidden="true">
              <ClosingIcon className="lp-tc-closing-icon" />
            </div>

            <div className="lp-tc-closing-text">
              <Copy animateOnScroll delay={0.15}>
                <h2 className="lp-tc-closing-headline">
                  {closing.headline.before}
                  <span className="lp-tc-platinum">
                    {closing.headline.highlight}
                  </span>
                  {closing.headline.after}
                </h2>
              </Copy>
              <Copy animateOnScroll delay={0.25}>
                <p className="lp-tc-closing-sub">{closing.sub}</p>
              </Copy>
            </div>
          </div>

          <div className="lp-tc-scroll" aria-hidden="true">
            <span className="lp-tc-scroll-chevron" />
            <span className="lp-tc-scroll-label">{closing.scrollLabel}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
