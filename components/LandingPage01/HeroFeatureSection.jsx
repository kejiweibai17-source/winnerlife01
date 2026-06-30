"use client";

import {
  MapPin,
  ShoppingBag,
  TrainFront,
  TrendingUp,
} from "lucide-react";
import Copy from "../Copy";
import { HERO_FEATURES } from "./data";

const ICON_MAP = {
  mapPin: MapPin,
  train: TrainFront,
  shoppingBag: ShoppingBag,
  trendingUp: TrendingUp,
};

function FeatureCard({ card, index }) {
  const Icon = ICON_MAP[card.icon] ?? MapPin;
  const delay = index * 0.08;

  return (
    <article className="lp-hero-feature-card">
      <img
        className="lp-hero-feature-card-bg"
        src={card.image}
        alt=""
        loading="lazy"
      />
      <div className="lp-hero-feature-card-overlay" aria-hidden="true" />

      <div className="lp-hero-feature-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <div className="lp-hero-feature-card-content">
        <Copy animateOnScroll delay={delay}>
          <h3 className="lp-hero-feature-title">{card.title}</h3>
        </Copy>
        <Copy animateOnScroll delay={delay + 0.06}>
          <p className="lp-hero-feature-desc">{card.description}</p>
        </Copy>
      </div>
    </article>
  );
}

export default function HeroFeatureSection() {
  const { cards } = HERO_FEATURES;
  const rows = [cards.slice(0, 2), cards.slice(2, 4)];

  return (
    <section className="lp-hero-features" aria-label="地段優勢">
      <div className="lp-hero-features-bridge" aria-hidden="true" />

      <div className="lp-container lp-hero-features-inner">
        <div className="lp-hero-features-rows">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="lp-hero-features-row">
              {row.map((card, cardIndex) => (
                <FeatureCard
                  key={card.title}
                  card={card}
                  index={rowIndex * 2 + cardIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
