"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EcospireHero from "./EcospireHero";
import FramevoHero from "./FramevoHero";
import HeroFeatureSection from "./HeroFeatureSection";
import LandingContactSection from "./LandingContactSection";
import LandingNavbar from "./LandingNavbar";
import LandingScrollSnap from "./LandingScrollSnap";
import SeminarRegistrationSection from "./SeminarRegistrationSection";
import SeminarSection from "./SeminarSection";
import SnapSection from "./SnapSection";
import StickyCardsSection from "./StickyCardsSection";
import TokyoCoreSection from "./TokyoCoreSection";
import "./landing-page-01.css";

export default function LandingPage01() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <div className="lp-page">
      <LandingNavbar />
      <LandingScrollSnap />

      <SnapSection
        tall
        hideTail
        className="lp-snap-section--hero"
        viewportClassName="lp-snap-section__viewport--hero"
      >
        <FramevoHero />
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--pin">
        <div className="lp-hero-stage">
          <EcospireHero />
          <HeroFeatureSection />
        </div>
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--tokyo-core">
        <TokyoCoreSection />
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--sticky-cards">
        <StickyCardsSection />
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--seminar">
        <SeminarSection />
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--registration">
        <SeminarRegistrationSection />
      </SnapSection>

      <SnapSection hideTail className="lp-snap-section--contact">
        <LandingContactSection />
      </SnapSection>
    </div>
  );
}
