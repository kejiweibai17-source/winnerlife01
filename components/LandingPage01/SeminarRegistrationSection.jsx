"use client";

import { useState } from "react";
import Copy from "../Copy";
import { SEMINAR_REGISTRATION } from "./data";
import { siteConfig } from "@/lib/site";

function RegIcon({ type, className = "" }) {
  const icons = {
    calendar: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <rect x="6" y="8" width="28" height="26" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 16h28M14 4v6M26 4v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    mapPin: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path
          d="M20 34s10-9.5 10-18a10 10 0 10-20 0c0 8.5 10 18 10 18z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="26" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M6 30c0-4.5 3.5-7 8-7s8 2.5 8 7M18 30c0-4.5 3.5-7 8-7s8 2.5 8 7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    yen: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 14h16M12 20h16M16 14v12M24 14v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    buildings: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path d="M6 34V14l14-8 14 8v20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 34V22h4v12M22 34V18h4v16" stroke="currentColor" strokeWidth="1.4" />
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
        <path d="M20 14v8M17 17h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
    user: (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.5 4h3l1.5 5-2 1.5a11 11 0 005 5l1.5-2 5 1.5v3a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 014 5.5 1.5 1.5 0 015.5 4z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M7 4h10l4 4v14H7V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M17 4v4h4M10 12h8M10 16h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[type] ?? null;
}

function SectionDivider({ title }) {
  return (
    <div className="lp-sr-divider">
      <span className="lp-sr-divider-line" aria-hidden="true" />
      <h3 className="lp-sr-divider-title">{title}</h3>
      <span className="lp-sr-divider-line" aria-hidden="true" />
    </div>
  );
}

export default function SeminarRegistrationSection() {
  const { hero, details, benefits, form } = SEMINAR_REGISTRATION;
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    guests: form.guestOptions[0],
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;

    const body = [
      `姓名：${formState.name}`,
      `電話：${formState.phone}`,
      formState.email ? `電子郵件：${formState.email}` : "",
      `參加人數：${formState.guests}`,
      formState.note ? `備註：${formState.note}` : "",
    ]
      .filter(Boolean)
      .join("%0D%0A");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.mailSubject)}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="lp-sr" id="SeminarRegistration" aria-label="海外置產說明會預約">
      <div className="lp-sr-hero">
        {/* Right-side image with gradient fade */}
        <div className="lp-sr-hero-media" aria-hidden="true">
          <img src={hero.bg} alt="" loading="lazy" />
        </div>

        {/* Left-side text */}
        <div className="lp-container lp-sr-hero-body">
          <div className="lp-sr-hero-text">
            <Copy animateOnScroll delay={0.04}>
              <p className="lp-sr-label">{hero.title.label}</p>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <h2 className="lp-sr-heading">{hero.title.heading}</h2>
            </Copy>
            <Copy animateOnScroll delay={0.18}>
              <p className="lp-sr-sub">{hero.subtitle}</p>
            </Copy>
            <div className="lp-sr-desc-wrap">
              {hero.descLines.map((line) => (
                <p key={line} className="lp-sr-desc">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lp-sr-body">
        <div className="lp-container lp-sr-content">
          <ul className="lp-sr-details">
            {details.map((item) => (
              <li key={item.icon} className="lp-sr-detail">
                <RegIcon type={item.icon} className="lp-sr-detail-icon" />
                <div className="lp-sr-detail-text">
                  {item.lines.map((line) => (
                    <p
                      key={line.text}
                      className={[
                        "lp-sr-detail-line",
                        line.accent ? `lp-sr-detail-line--${line.accent}` : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <SectionDivider title={benefits.title} />

          <div className="lp-sr-benefits">
            {benefits.items.map((item) => (
              <div key={item.line1} className="lp-sr-benefit">
                <div className="lp-sr-benefit-icon-wrap">
                  <RegIcon type={item.icon} className="lp-sr-benefit-icon" />
                </div>
                <p className="lp-sr-benefit-text">
                  <span>{item.line1}</span>
                  <span>{item.line2}</span>
                </p>
              </div>
            ))}
          </div>

          <div id="SeminarRegistrationForm" className="lp-sr-form-block">
            <SectionDivider title={form.title} />

          {submitted ? (
            <p className="lp-sr-success">感謝您的預約，我們將盡快與您聯繫確認。</p>
          ) : (
            <form className="lp-sr-form" onSubmit={handleSubmit}>
              <div className="lp-sr-form-grid">
                <label className="lp-sr-field">
                  <RegIcon type="user" className="lp-sr-field-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder={form.fields.name}
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="lp-sr-field">
                  <RegIcon type="phone" className="lp-sr-field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={form.fields.phone}
                    value={formState.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="lp-sr-field">
                  <RegIcon type="mail" className="lp-sr-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder={form.fields.email}
                    value={formState.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="lp-sr-field">
                  <RegIcon type="users" className="lp-sr-field-icon" />
                  <select
                    name="guests"
                    value={formState.guests}
                    onChange={handleChange}
                    aria-label={form.fields.guests}
                  >
                    {form.guestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="lp-sr-field lp-sr-field--full">
                  <RegIcon type="note" className="lp-sr-field-icon" />
                  <input
                    type="text"
                    name="note"
                    placeholder={form.fields.note}
                    value={formState.note}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <button type="submit" className="lp-sr-submit">
                {form.submit}
                <span aria-hidden="true">→</span>
              </button>
              <p className="lp-sr-form-note">{form.disclaimer}</p>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
