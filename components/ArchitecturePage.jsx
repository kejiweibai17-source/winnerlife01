"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Copy from "./Copy";
import { getLocalizedPath } from "@/lib/locale-path";

const NAVY = "#0d417b";
const HERO_IMAGE = "/images/76333f51-a994-4281-b2d2-513ce5235265.png";

/* ── images from SK Kaken (downloaded to /public/images/architecture/) ── */
const SK_IMAGES = {
  premium:   "/images/architecture/sk-premium.jpg",
  building01:"/images/architecture/sk-building-01.jpg",
  building02:"/images/architecture/sk-building-02.jpg",
  building03:"/images/architecture/sk-building-03.jpg",
  building04:"/images/architecture/sk-building-04.jpg",
  building05:"/images/architecture/sk-building-05.jpg",
  biomass:   "/images/architecture/sk-biomass.jpg",
  hs:        "/images/architecture/sk-hs.jpg",
};

/* each highlight gets an image from SK Kaken site */
const HIGHLIGHT_IMAGES = [
  SK_IMAGES.building01,
  SK_IMAGES.building02,
  SK_IMAGES.building03,
  SK_IMAGES.building04,
];

/* building material gallery — from SK Kaken website */
const GALLERY = [
  { src: "/images/architecture/sk-material-01.jpg", captionZh: "外牆塗裝面 — 超低汙染・超耐候",     captionJp: "外壁塗装面 — 超低汚染・超耐候" },
  { src: "/images/architecture/sk-material-02.jpg", captionZh: "スーパーセラタイトF 外牆系統",    captionJp: "スーパーセラタイトF 外壁システム" },
  { src: "/images/architecture/sk-material-03.jpg", captionZh: "水性セラタイトF 耐久塗料",        captionJp: "水性セラタイトF 耐久塗料" },
  { src: "/images/architecture/sk-material-04.jpg", captionZh: "水性セラタイトSi 系列",           captionJp: "水性セラタイトSi シリーズ" },
  { src: "/images/architecture/sk-material-05.jpg", captionZh: "エスケープレミアムシリコン",      captionJp: "エスケープレミアムシリコン" },
  { src: "/images/architecture/sk-material-06.jpg", captionZh: "水性セラミシリコン 外牆塗料",     captionJp: "水性セラミシリコン 外壁塗料" },
  { src: "/images/architecture/sk-material-07.jpg", captionZh: "エスケープレミアム無機シリーズ",  captionJp: "エスケープレミアム無機シリーズ" },
  { src: "/images/architecture/sk-material-08.jpg", captionZh: "超低汚染性 — 親水性塗膜",         captionJp: "超低汚染性 — 親水性塗膜" },
  { src: "/images/architecture/sk-material-09.jpg", captionZh: "超耐候性 — 無機ハイブリッド技術", captionJp: "超耐候性 — 無機ハイブリッド技術" },
  { src: "/images/architecture/sk-material-11.jpg", captionZh: "マンション長寿命化仕様",          captionJp: "マンション長寿命化仕様" },
  { src: "/images/architecture/sk-building-01.jpg", captionZh: "採用事例 — 高級集合住宅",       captionJp: "採用事例 — 高級マンション" },
  { src: "/images/architecture/sk-building-05.jpg", captionZh: "採用事例 — 大型複合施設",       captionJp: "採用事例 — 大型複合施設" },
];

/* spec table */
const SPEC_ROWS = [
  { labelZh: "磁磚名稱",  labelJp: "タイル名称",  value: "EL FARO+ 外牆磁磚" },
  { labelZh: "尺寸規格",  labelJp: "サイズ",      value: "95 × 45 mm（50二丁）" },
  { labelZh: "出貨方式",  labelJp: "出荷仕様",    value: "材貼網拼 300 × 300 mm" },
  { labelZh: "磁磚類型",  labelJp: "種別",        value: "BI類（磁器質）" },
  { labelZh: "吸水率",    labelJp: "吸水率",      value: "< 1%（頂級規格）" },
  { labelZh: "燒結溫度",  labelJp: "焼成温度",    value: "1,200°C 以上" },
  { labelZh: "耐凍害性",  labelJp: "耐凍害性",    value: "◎（日本高寒地區認證）" },
  { labelZh: "顏色比例",  labelJp: "色調比率",    value: "濃：中：淡 ＝ 5:9:4" },
  { labelZh: "工藝產地",  labelJp: "産地",        value: "岐阜縣 美濃燒（長江陶業）" },
];

/* consultant chat bubbles */
const BUBBLES_ZH = [
  "採用日本傳統工藝美濃燒，1300 年窯燒技術的傳承。",
  "外牆磁磚是頂級 BI 類磁器質，吸水率不到 1%，耐久性極強。",
  "5:9:4 黃金混色比例，讓牆面在不同光線下呈現細膩立體感。",
];
const BUBBLES_JP = [
  "日本の伝統工芸・美濃焼を採用。1300年の窯焼き技術の継承です。",
  "外壁タイルはトップグレードのBI類磁器質。吸水率1%未満の高耐久仕様。",
  "5:9:4 の黄金混色比率により、光の変化で繊細な奥行きが生まれます。",
];

/* ─ helpers ─ */
function CopyBlock({ children, delay = 0, className = "", heading = false }) {
  return (
    <div className={`${heading ? "overflow-visible pb-2" : "overflow-hidden"} ${className}`}>
      <Copy animateOnScroll delay={delay}>{children}</Copy>
    </div>
  );
}

/* ════════════════════════════════════════ */
export default function ArchitecturePage() {
  const t = useTranslations("architecture");
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";

  const highlights = t.raw("highlights");
  const advantages = t.raw("advantages.items");
  const bubbles    = isJp ? BUBBLES_JP : BUBBLES_ZH;
  const consultantName = isJp ? "OK PRIME 担当" : "OK PRIME 顧問";

  return (
    <div className="relative w-full min-h-screen bg-white font-sans text-gray-800">

      {/* ── layout wrapper ── */}
      <div className="flex pt-20 md:pt-24 min-h-screen justify-center">

        {/* ── MAIN CONTENT ── */}
        <main className="w-[85%] max-w-[1400px] min-w-0 px-0 pb-24">

          {/* breadcrumb */}
          <nav
            className="pt-6 pb-4 text-[11px] tracking-[0.08em] text-gray-400 flex items-center gap-1.5"
            aria-label="breadcrumb"
          >
            <Link href={getLocalizedPath("/", locale)} className="hover:text-gray-700 transition-colors">
              {isJp ? "ホーム" : "首頁"}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-gray-700">{t("hero.title")}</span>
          </nav>

          {/* page title + subtitle */}
          <CopyBlock heading className="mb-1">
            <h1
              className="m-0 font-serif text-xl md:text-2xl lg:text-[26px] tracking-[0.06em] text-gray-900"
              style={{ lineHeight: "1.35" }}
            >
              {t("hero.subtitle")}
            </h1>
          </CopyBlock>

          {/* tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-3">
            {(isJp
              ? ["美濃焼", "BI類磁器質", "5:9:4混色", "50二丁"]
              : ["美濃燒", "BI類磁器質", "5:9:4混色", "50二丁"]
            ).map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-[11px] tracking-[0.1em] px-2.5 py-1 border border-gray-300 text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* hero image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8 border border-gray-100">
            <Image
              src={HERO_IMAGE}
              alt={t("hero.imageAlt")}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>

          {/* ── two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">

            {/* ── LEFT: description + highlights ── */}
            <div>

              {/* ── intro + consultant chat ── */}
              <div className="mb-10 pb-10 border-b border-gray-100">
                <CopyBlock heading>
                  <h2
                    className="m-0 mb-6 font-serif text-base md:text-lg lg:text-xl tracking-[0.06em] text-gray-900"
                    style={{ lineHeight: "1.35" }}
                  >
                    {t("intro.heading")}
                  </h2>
                </CopyBlock>

                <div className="border-t border-dashed border-gray-200 mb-6" />

                {/* consultant avatar + bubbles */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-[10px] tracking-wide font-medium"
                      style={{ backgroundColor: NAVY }}
                    >
                      OK
                    </div>
                    <span className="text-xs text-gray-500 tracking-[0.06em]">{consultantName}</span>
                  </div>
                  {bubbles.map((bubble, i) => (
                    <CopyBlock key={i} delay={i * 0.06} className="ml-10">
                      <div
                        className="inline-block max-w-[420px] px-4 py-2.5 rounded-[14px] rounded-tl-[4px] text-sm leading-[1.9] text-white"
                        style={{ backgroundColor: "#444" }}
                      >
                        {bubble}
                      </div>
                    </CopyBlock>
                  ))}
                </div>

                <CopyBlock delay={0.2} className="mt-6">
                  <p className="m-0 text-sm leading-[2.2] text-gray-600 font-light">
                    {t("intro.body")}
                  </p>
                </CopyBlock>
              </div>

              {/* ── highlights 01–04 ── */}
              <div className="space-y-0">
                {highlights.map((hl, index) => (
                  <div
                    key={index}
                    className="pb-12 mb-2 border-b border-gray-100 last:border-b-0"
                  >
                    {/* label row */}
                    <CopyBlock delay={0.04}>
                      <p className="m-0 mb-2 text-[10px] tracking-[0.22em] uppercase text-gray-400">
                        {hl.num} — {hl.tag}
                      </p>
                    </CopyBlock>

                    {/* heading */}
                    <CopyBlock heading delay={0.08}>
                      <h3
                        className="m-0 mb-5 font-serif text-base md:text-[17px] tracking-[0.04em] text-gray-900"
                        style={{ lineHeight: "1.35" }}
                      >
                        {hl.title}
                      </h3>
                    </CopyBlock>

                    {/* image + body side by side on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 items-start">
                      {/* SK Kaken building photo */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                        <Image
                          src={HIGHLIGHT_IMAGES[index]}
                          alt={hl.tag}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                        {/* SK Kaken credit badge */}
                        <span className="absolute bottom-1.5 right-2 text-[9px] text-white/70 tracking-wide">
                          © SK KAKEN
                        </span>
                      </div>

                      <CopyBlock delay={0.12}>
                        <p className="m-0 text-sm leading-[2.2] text-gray-600 font-light">
                          {hl.body}
                        </p>
                      </CopyBlock>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: sticky info panel ── */}
            <div className="lg:sticky lg:top-28 space-y-5">

              {/* SK product image */}
              <div className="relative w-full aspect-[16/7] overflow-hidden border border-gray-100">
                <Image
                  src={SK_IMAGES.premium}
                  alt={isJp ? "エスケープレミアムシリーズ" : "SK 化研 Premium 系列"}
                  fill
                  className="object-cover object-center"
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                  <p className="m-0 text-[10px] tracking-[0.1em] text-white/90">
                    {isJp ? "エスケー化研 プレミアムシリーズ" : "SK 化研 Premium 塗料系列"}
                  </p>
                </div>
              </div>

              {/* spec table card */}
              <div className="border border-gray-200 bg-white shadow-sm">
                <div
                  className="px-5 py-3 text-[11px] tracking-[0.15em] text-white uppercase"
                  style={{ backgroundColor: NAVY }}
                >
                  {isJp ? "基本仕様" : "基本規格"}
                </div>
                <div className="divide-y divide-gray-100">
                  {SPEC_ROWS.map((row, i) => (
                    <div key={i} className="grid grid-cols-[110px_1fr] text-sm">
                      <div className="px-4 py-3 text-gray-500 font-light text-[12px] bg-gray-50 flex items-start">
                        {isJp ? row.labelJp : row.labelZh}
                      </div>
                      <div className="px-4 py-3 text-gray-800 text-[12px] leading-relaxed">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="border border-gray-200 bg-white p-5 space-y-3">
                <p className="text-[11px] tracking-[0.1em] text-gray-400 m-0">
                  {isJp ? "この物件が気になる方は…" : "想了解更多？"}
                </p>
                <Link
                  href="#"
                  className="block w-full py-3 text-center text-sm tracking-[0.1em] text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#06c755" }}
                >
                  LINE {isJp ? "で相談する" : "立即諮詢"}
                </Link>
                <Link
                  href={getLocalizedPath("/summary", locale)}
                  className="block w-full py-3 text-center text-sm tracking-[0.1em] border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
                >
                  {isJp ? "物件概要を見る" : "查看物件概要"}
                </Link>
              </div>

              {/* advantages mini-list */}
              <div className="border border-gray-200 bg-white">
                <div
                  className="px-5 py-3 text-[11px] tracking-[0.15em] text-white"
                  style={{ backgroundColor: "#555" }}
                >
                  {isJp ? "製品の優位性" : "產品優勢"}
                </div>
                <ul className="divide-y divide-gray-100">
                  {advantages.map((adv, i) => (
                    <li key={i} className="px-5 py-3">
                      <CopyBlock delay={i * 0.03}>
                        <p className="m-0 text-[12px] font-medium text-gray-800 mb-0.5">
                          {adv.title}
                        </p>
                      </CopyBlock>
                      <p className="m-0 text-[11px] text-gray-500 leading-relaxed font-light">
                        {adv.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── SK Kaken case study gallery ── */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <CopyBlock>
              <p className="m-0 mb-1 text-[10px] tracking-[0.25em] uppercase text-gray-400">
                CASE STUDY
              </p>
            </CopyBlock>
            <CopyBlock heading delay={0.06} className="mb-8">
              <h2
                className="m-0 font-serif text-lg md:text-xl tracking-[0.06em] text-gray-900"
                style={{ lineHeight: "1.35" }}
              >
                {isJp ? "エスケー化研 建材採用事例" : "SK 化研建材採用案例"}
              </h2>
            </CopyBlock>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY.map((item, i) => (
                <div key={i} className="group relative overflow-hidden bg-gray-100 aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={isJp ? item.captionJp : item.captionZh}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="m-0 text-[11px] text-white leading-snug">
                      {isJp ? item.captionJp : item.captionZh}
                    </p>
                  </div>
                  <span className="absolute bottom-1.5 right-2 text-[9px] text-white/60 tracking-wide">
                    © SK KAKEN
                  </span>
                </div>
              ))}
            </div>

            {/* SK Kaken brand attribution */}
            <div className="mt-8 flex items-start gap-4 border border-gray-100 bg-gray-50 p-5">
              <div className="relative w-[80px] aspect-[4/3] shrink-0 overflow-hidden">
                <Image
                  src={SK_IMAGES.hs}
                  alt="SK KAKEN"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <CopyBlock>
                  <p className="m-0 mb-1 text-[10px] tracking-[0.15em] uppercase text-gray-400">
                    MATERIAL PARTNER
                  </p>
                </CopyBlock>
                <CopyBlock delay={0.05}>
                  <p className="m-0 text-sm font-medium text-gray-800 tracking-wide">
                    エスケー化研株式会社 (SK KAKEN Co., Ltd.)
                  </p>
                </CopyBlock>
                <CopyBlock delay={0.1}>
                  <p className="m-0 mt-1 text-[12px] text-gray-500 leading-relaxed font-light">
                    {isJp
                      ? "1955年創業。建築仕上塗材・外壁タイルの国内シェアNo.1メーカー。EL FARO+ 白金高輪の外装仕上材として採用。"
                      : "創業於 1955 年，日本建築仕上塗材・外牆磁磚國內市佔率 No.1，為 EL FARO+ 白金高輪指定外牆建材合作夥伴。"}
                  </p>
                </CopyBlock>
              </div>
            </div>
          </div>

          {/* back link */}
          <div className="mt-14 pt-8 border-t border-gray-100 text-center">
            <Link
              href={getLocalizedPath("/", locale)}
              className="text-[12px] tracking-[0.14em] text-gray-400 hover:text-gray-700 transition-colors"
            >
              {isJp ? "← 一覧へ" : "← 返回首頁"}
            </Link>
          </div>
        </main>
      </div>


      {/* back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white shadow transition-opacity hover:opacity-80"
        style={{ backgroundColor: NAVY }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
