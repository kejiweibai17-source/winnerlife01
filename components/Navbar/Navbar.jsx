"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath, switchLocalePath } from "@/lib/locale-path";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const navItems = t.raw("items");

  const isJp = pathname.startsWith("/jp");
  const currentLocale = isJp ? "jp" : "zh";

  function switchLocale(targetLocale) {
    if (targetLocale === currentLocale) return;
    setIsOpen(false);
    window.location.href = switchLocalePath(pathname, targetLocale);
  }

  // 鎖定背景滾動：當選單打開時，防止背景頁面滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // 頁面跳轉後自動收起選單
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // PageTransition 會在 capture 階段攔截 Link，選單內 onClick 不一定觸發
  useEffect(() => {
    if (!isOpen) return;

    const handleLinkClick = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [isOpen]);

  // Framer Motion 動畫配置
  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 菜單項交錯淡入動畫
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const homeHref = getLocalizedPath("/", currentLocale);
  const contactHref = getLocalizedPath("/contact", currentLocale);

  function NavLink({ item, className = "", onClick }) {
    const href = item.href
      ? getLocalizedPath(item.href, currentLocale)
      : "#";
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`relative group/nav inline-block text-center leading-tight pb-1 ${className}`}
      >
        <span className="group-hover/nav:opacity-70 transition-opacity duration-300">
          {item.label}
        </span>
        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transition-transform duration-300 ease-out origin-right scale-x-0 group-hover/nav:origin-left group-hover/nav:scale-x-100" />
      </Link>
    );
  }

  return (
    <>
      {/* 頂部靜態導覽列 Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none text-white transition-all duration-300">
        <div
          className="absolute top-0 left-0 w-full h-[135px] pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(11, 31, 60, 0.95) 0%,
              rgba(11, 31, 60, 0.8) 25%,
              rgba(11, 31, 60, 0.5) 50%,
              rgba(11, 31, 60, 0.2) 75%,
              rgba(11, 31, 60, 0) 100%
            )`,
          }}
        />
        <div className="relative flex items-center justify-between px-6 py-3 md:px-10 md:py-4 pointer-events-auto">
          {/* 左側 Logo */}
          <div className="w-[20%] shrink-0">
            <Link href={homeHref} className="z-50 flex items-center group">
              <Image
                src="/images/company-logo.svg"
                alt="忠訓地產"
                width={260}
                height={65}
                className="h-[2.75rem] sm:h-[3rem] md:h-[3.25rem] w-auto"
                priority
              />
            </Link>
          </div>

          {/* 中間大螢幕導覽列 — 中日文共用相同排版 */}
          <div className="w-[60%] flex justify-center min-w-0">
            <nav className="hidden xl:flex items-center justify-center flex-wrap gap-x-[clamp(0.5rem,1.2vw,1.25rem)] gap-y-1 max-w-full px-1 text-[clamp(9px,0.72vw,13px)] tracking-[clamp(0.06em,0.12vw,0.18em)] opacity-90">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </nav>
          </div>

          <div className="flex w-[20%] shrink-0 justify-end items-center">
            <div className="hidden md:flex items-center gap-1 mr-8 text-[11px] tracking-widest">
              <button
                onClick={() => switchLocale("zh")}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  currentLocale === "zh"
                    ? "border border-white bg-white/15"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                中文
              </button>
              <button
                onClick={() => switchLocale("jp")}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  currentLocale === "jp"
                    ? "border border-white bg-white/15"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                日本語
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <span className="text-sm tracking-widest hidden sm:block uppercase">
                {isOpen ? t("close") : t("menu")}
              </span>
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-white transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[7.5px]" : ""}`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-white transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 全螢幕展開選單 Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[#161616] text-white flex flex-col px-6 md:px-16 pt-32 pb-12 overflow-y-auto"
          >
            {/* 上半部：三欄式俐落排版 */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 max-w-[1400px] mx-auto w-full mt-10">
              {/* 第一欄 (前 5 個項目) */}
              <div className="flex flex-col gap-6 text-xl md:text-2xl lg:text-3xl font-medium tracking-widest">
                {navItems.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      item={item}
                      className="pb-1 group-hover/link:opacity-70"
                      onClick={() => setIsOpen(false)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* 第二欄 (後 5 個項目) */}
              <div className="flex flex-col gap-6 text-xl md:text-2xl lg:text-3xl font-medium tracking-widest lg:pl-10">
                {navItems.slice(5, 10).map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index + 5}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      item={item}
                      className="pb-1 group-hover/link:opacity-70"
                      onClick={() => setIsOpen(false)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* 第三欄：語言選擇與 CTA 按鈕 */}
              <motion.div
                custom={10}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="flex flex-col items-start gap-5 lg:pl-10"
              >
                <div className="flex items-center gap-1 text-xs border border-white/30 rounded-full p-1 mb-4">
                  <button
                    onClick={() => switchLocale("zh")}
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${
                      currentLocale === "zh" ? "bg-white/20" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    中文
                  </button>
                  <button
                    onClick={() => switchLocale("jp")}
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${
                      currentLocale === "jp" ? "bg-white/20" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    日本語
                  </button>
                </div>
                <Link
                  href={contactHref}
                  className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white/30 transition text-center"
                >
                  {t("download")}
                </Link>
                <Link
                  href={contactHref}
                  className="w-full sm:w-auto bg-[#4fb8b3] text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-[#3ea09b] transition text-center"
                >
                  {t("reserve")}
                </Link>
              </motion.div>
            </div>

            {/* 下半部：聯絡資訊與 Slogan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-8 border-t border-white/20 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10"
            >
              <div className="flex flex-col gap-4">
                <p className="text-xs tracking-widest opacity-60">
                  {t("phoneInquiries")}
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <div>
                    <p className="text-[10px] opacity-60 mb-1">
                      {t("taipeiOffice")}
                    </p>
                    <a
                      href={`tel:${siteConfig.taipeiPhone}`}
                      className="text-xl md:text-2xl font-light tracking-wider hover:opacity-80 transition-opacity"
                    >
                      {siteConfig.taipeiPhoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-60 mb-1">
                      {t("japanHotline")}
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-xl md:text-2xl font-light tracking-wider hover:opacity-80 transition-opacity"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-end pb-1 lg:max-w-xs">
                    <p className="text-[10px] opacity-40">
                      {t("businessHours")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4">
                <p className="text-xs md:text-sm tracking-widest opacity-80">
                  {t("slogan")}
                </p>
                <div className="flex flex-col items-end opacity-80">
                  <span className="font-serif text-3xl md:text-4xl tracking-[0.18em] leading-none">
                    {siteConfig.name}
                  </span>
                  <span className="text-[8px] md:text-[10px] tracking-[0.2em] mt-2 opacity-70">
                    {siteConfig.parentBrand}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
