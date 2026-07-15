"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { SiLine } from "react-icons/si";
import { getLocalizedPath } from "@/lib/locale-path";

const LINE_URL =
  "https://page.line.me/qoi6885d?oat_content=url&openQrModal=true";

export default function FixedSideActions() {
  const pathname = usePathname();
  const lenis = useLenis();
  const t = useTranslations("sideActions");
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const contactHref = getLocalizedPath("/contact", locale);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setShowTop(y > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.15 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      className="fixed right-0 z-[120] flex flex-col items-end gap-1.5 top-[62%] -translate-y-0 md:top-1/2 md:-translate-y-1/2 md:gap-2"
      aria-label={t("ariaLabel")}
    >
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-9 flex-col items-center justify-center gap-0.5 bg-[#06C755] text-white shadow-lg transition hover:brightness-105 md:h-[5.25rem] md:w-[3.15rem] md:gap-1"
        aria-label={t("line")}
      >
        <SiLine className="h-3.5 w-3.5 shrink-0 md:h-5 md:w-5" aria-hidden />
        <span className="text-[8px] font-medium tracking-wider leading-none md:text-[10px]">
          LINE
        </span>
      </a>

      <Link
        href={contactHref}
        className="group flex h-[4.75rem] w-9 flex-col items-center justify-center gap-1 bg-[#0d417b] text-white shadow-lg transition hover:brightness-110 md:h-[6.25rem] md:w-[3.15rem] md:gap-1.5"
        aria-label={t("contact")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4"
          aria-hidden
        >
          <path
            d="M4 6h16v12H4zM4 8l8 6 8-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-[9px] font-medium tracking-[0.14em] leading-tight md:text-[11px] md:tracking-[0.18em]"
          style={{ writingMode: "vertical-rl" }}
        >
          {t("contact")}
        </span>
      </Link>

      <button
        type="button"
        onClick={goTop}
        className={`flex h-9 w-9 flex-col items-center justify-center gap-0.5 bg-[#1a1a1a] text-white shadow-lg transition-all duration-300 md:h-12 md:w-[3.15rem] ${
          showTop
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-3 opacity-0"
        }`}
        aria-label={t("goTop")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-3 w-3 md:h-3.5 md:w-3.5"
          aria-hidden
        >
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[8px] tracking-[0.1em] leading-none md:text-[9px] md:tracking-[0.12em]">
          TOP
        </span>
      </button>
    </aside>
  );
}
