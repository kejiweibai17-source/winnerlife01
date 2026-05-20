"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // 鎖定背景滾動：當選單打開時，防止背景頁面滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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

  const navItems = [
    { label: "建案理念", href: "/concept" },
    { label: "都更計畫", href: "/redevelopment" },
    { label: "建築設計", href: "/design" },
    { label: "房型規劃", href: "/room-plan" },
    { label: "室內效果圖", href: "/model-room" },
    { label: "設備規格", href: "/equipment" },
    { label: "周邊環境", href: "/location" },
    { label: "交通位置", href: "/access" },
    { label: "品牌介紹", href: "/brand" },
  ];

  return (
    <>
      {/* 頂部靜態導覽列 Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none text-white transition-all duration-300">
        {/* 🔴 關鍵修改：獨立的漸層背景層 */}
        {/* 給予足夠的高度 (h-[140px] 到 md:h-[180px])，讓漸層有極長的空間可以完美淡出 */}
        {/* 使用 to-[#0b1f3c]/0 確保在任何瀏覽器都不會產生灰色斷層 */}
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
        {/* 🔴 加上 relative 確保內容浮在獨立背景層之上 */}
        <div className="relative flex items-center justify-between px-6 py-5 md:px-10 pointer-events-auto">
          {/* 左側 Logo */}
          <div className="w-[20%]">
            <Link href="/" className="z-50 flex items-center gap-2 group">
              <Image
                src="/images/js_logo_h1.png"
                width={130}
                height={70}
                className="w-[120px]"
                priority
              ></Image>
              <span className="text-[10px] mt-3 tracking-widest hidden md:block mb-1 opacity-80">
                PREMIUM MIDSIZE OFFICE
              </span>
            </Link>
          </div>

          {/* 中間大螢幕導覽列 */}
          <div className="w-[60%] flex justify-center">
            <nav className="hidden xl:flex items-center gap-5 text-[13px] tracking-widest opacity-90">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative group/nav inline-block pb-1"
                >
                  <span className="group-hover/nav:opacity-70 transition-opacity duration-300">
                    {item.label}
                  </span>
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transition-transform duration-300 ease-out origin-right scale-x-0 group-hover/nav:origin-left group-hover/nav:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex w-[20%] justify-end items-center">
            <div className="flex items-center gap-2 mr-8">
              <span>JAPANESE</span>
              <span className="border border-white px-3 py-1 rounded-full text-[10px]">
                ENGLISH
              </span>
            </div>
            {/* 右側 Menu 按鈕與漢堡圖標 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <span className="text-sm tracking-widest hidden sm:block uppercase">
                {isOpen ? "Close" : "Menu"}
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
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative group/link inline-block pb-1"
                    >
                      <span className="transition-opacity duration-300 group-hover/link:opacity-70">
                        {item.label}
                      </span>
                      <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-white transition-transform duration-300 ease-out origin-right scale-x-0 group-hover/link:origin-left group-hover/link:scale-x-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* 第二欄 (後 4 個項目) */}
              <div className="flex flex-col gap-6 text-xl md:text-2xl lg:text-3xl font-medium tracking-widest lg:pl-10">
                {navItems.slice(5, 9).map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index + 5}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative group/link inline-block pb-1"
                    >
                      <span className="transition-opacity duration-300 group-hover/link:opacity-70">
                        {item.label}
                      </span>
                      <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-white transition-transform duration-300 ease-out origin-right scale-x-0 group-hover/link:origin-left group-hover/link:scale-x-100" />
                    </Link>
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
                <div className="flex items-center gap-2 text-xs border border-white/30 rounded-full p-1 mb-4">
                  <span className="px-3 py-1 cursor-pointer">JAPANESE</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full cursor-pointer">
                    ENGLISH
                  </span>
                </div>
                <Link
                  href="#"
                  className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white/30 transition text-center"
                >
                  下載建案資料
                </Link>
                <Link
                  href="#"
                  className="w-full sm:w-auto bg-[#4fb8b3] text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-[#3ea09b] transition text-center"
                >
                  預約賞屋與諮詢
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
                  Telephone inquiries and consultations
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <div>
                    <p className="text-[10px] opacity-60 mb-1">
                      Kanto Area Office
                    </p>
                    <p className="text-xl md:text-2xl font-light tracking-wider">
                      0120-557-088
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-60 mb-1">
                      Kansai Area Office
                    </p>
                    <p className="text-xl md:text-2xl font-light tracking-wider">
                      06-4391-3220
                    </p>
                  </div>
                  <div className="flex items-end pb-1 lg:max-w-xs">
                    <p className="text-[10px] opacity-40">
                      Business hours: 9:00-17:40 (closed on weekends and
                      holidays)
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4">
                <p className="text-xs md:text-sm tracking-widest opacity-80">
                  このオフィスと、未来を。
                </p>
                <div className="flex flex-col items-end opacity-50">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                    pmo
                  </span>
                  <span className="text-[8px] md:text-[10px] tracking-[0.3em] mt-1">
                    PREMIUM MIDSIZE OFFICE
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
