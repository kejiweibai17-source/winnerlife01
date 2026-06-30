"use client";

import { LANDING_CONTACT } from "./data";

function ContactIcon({ type, className = "" }) {
  const icons = {
    headset: (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path
          d="M10 28v-6a14 14 0 0128 0v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 28h6a3 3 0 003 3v4a3 3 0 01-3 3H8v-10zM40 28h-6a3 3 0 00-3 3v4a3 3 0 003 3h6v-10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M24 14v11l7 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    privacy: (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path
          d="M24 6l16 6.5v11c0 10.5-7.5 17.5-16 19-8.5-1.5-16-8.5-16-19V12.5L24 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 18l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L24 18z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return icons[type] ?? null;
}

function ContactLine({ line }) {
  const className = `lp-lc-line${line.accent ? " lp-lc-line--accent" : ""}`;

  if (line.href) {
    return (
      <a href={line.href} className={className}>
        {line.text}
      </a>
    );
  }

  return <p className={className}>{line.text}</p>;
}

export default function LandingContactSection() {
  const { columns, bannerImage, bannerHeadline, bannerBrand } = LANDING_CONTACT;

  return (
    <section className="lp-lc" id="Contact" aria-label="聯絡資訊">
      <div className="lp-lc-contact">
        <div className="lp-lc-contact-inner">
          {columns.map((column) => (
            <div key={column.title} className="lp-lc-col">
              <ContactIcon type={column.icon} className="lp-lc-icon" />
              <h3 className="lp-lc-col-title">{column.title}</h3>
              <div className="lp-lc-col-body">
                {column.lines.map((line) => (
                  <ContactLine key={line.text} line={line} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-lc-banner">
        <div
          className="lp-lc-banner-media"
          style={{ backgroundImage: `url(${bannerImage})` }}
          role="img"
          aria-label="東京黃昏天際線"
        />
        <div className="lp-lc-banner-bar">
          <p className="lp-lc-banner-headline">{bannerHeadline}</p>
          <p className="lp-lc-banner-brand">{bannerBrand}</p>
        </div>
      </div>
    </section>
  );
}
