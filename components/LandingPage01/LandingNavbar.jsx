"use client";

import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { LANDING_NAV } from "./data";

export default function LandingNavbar() {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logo, logoAlt, links, cta, ctaShort, ctaHref } = LANDING_NAV;

  const scrollToAnchor = useCallback(
    (href) => {
      const id = href.replace(/^#/, "");
      const target = document.getElementById(id);
      if (!target) return;

      const offset = -(parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--lp-nav-h")
      ) || 72);

      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setMenuOpen(false);
    },
    [lenis]
  );

  const handleAnchorClick = (event, href) => {
    event.preventDefault();
    scrollToAnchor(href);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="lp-nav">
      <div className="lp-container lp-nav-inner">
        <a
          href="#FramevoHero"
          className="lp-nav-brand"
          aria-label="首頁"
          onClick={(event) => handleAnchorClick(event, "#FramevoHero")}
        >
          <img
            src={logo}
            alt={logoAlt}
            className="lp-nav-brand-logo"
            width={260}
            height={65}
            decoding="async"
          />
        </a>

        <nav className="lp-nav-links" aria-label="頁面導覽">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lp-nav-link"
              onClick={(event) => handleAnchorClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="lp-nav-actions">
          <a
            href={ctaHref}
            className="lp-nav-cta"
            onClick={(event) => handleAnchorClick(event, ctaHref)}
          >
            <span className="lp-nav-cta__label lp-nav-cta__label--full">{cta}</span>
            <span className="lp-nav-cta__label lp-nav-cta__label--short">
              {ctaShort}
            </span>
            <span className="lp-nav-cta__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <button
            type="button"
            className={`lp-nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="開啟選單"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`lp-nav-mobile ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="lp-nav-mobile-inner" aria-label="行動版導覽">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lp-nav-mobile-link"
              onClick={(event) => handleAnchorClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
