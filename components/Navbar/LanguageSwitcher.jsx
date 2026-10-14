"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_LOCALES } from "@/lib/locale-path";

function GlobeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}

/**
 * @param {{
 *   currentLocale: import("@/lib/locale-path").SiteLocale,
 *   onSelect: (locale: import("@/lib/locale-path").SiteLocale) => void,
 *   label: string,
 *   variant?: "header" | "menu",
 * }} props
 */
export default function LanguageSwitcher({
  currentLocale,
  onSelect,
  label,
  variant = "header",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const current =
    SITE_LOCALES.find((l) => l.code === currentLocale) ?? SITE_LOCALES[0];
  const isMenu = variant === "menu";

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function choose(code) {
    setOpen(false);
    onSelect(code);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${current.label}`}
        className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border transition-colors duration-200 ${
          isMenu
            ? "border-white/30 px-4 py-2 text-xs hover:border-white/60"
            : "border-white/60 bg-white/10 px-3 py-1 text-[11px] hover:bg-white/20"
        } tracking-widest`}
      >
        <GlobeIcon className={isMenu ? "h-4 w-4" : "h-3.5 w-3.5"} />
        <span>{current.label}</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`h-2.5 w-2.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <path d="M2 4.5l4 3 4-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full z-[60] mt-2 min-w-[150px] overflow-hidden border border-white/15 py-1 shadow-2xl backdrop-blur-md ${
              isMenu ? "left-0 bg-[#242424]/95" : "right-0 bg-[#0b1f3c]/95"
            }`}
          >
            {SITE_LOCALES.map((locale) => {
              const selected = locale.code === currentLocale;
              return (
                <li key={locale.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    lang={locale.htmlLang}
                    onClick={() => choose(locale.code)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-xs tracking-widest transition-colors duration-200 ${
                      selected
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{locale.label}</span>
                    {selected && (
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-3 w-3"
                        aria-hidden
                      >
                        <path
                          d="M2.5 6.5l2.5 2.5 4.5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
