"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/locale-path";
import Copy from "./Copy";

const gridMeta = [
  {
    id: 1,
    href: "/concept",
    bgImage: "/images/index/wall/交通連結.png",
    maskFrom: "rgba(4,18,45,0.88)",
    maskVia: "rgba(6,28,70,0.55)",
    maskTo: "rgba(10,40,90,0.18)",
  },
  {
    id: 2,
    href: "/amenities",
    bgImage: "/images/amenities/001.png",
    maskFrom: "rgba(0,25,55,0.90)",
    maskVia: "rgba(0,60,100,0.52)",
    maskTo: "rgba(0,90,140,0.16)",
  },
  {
    id: 9,
    href: "/location",
    bgImage: "/images/index/wall/地段核心.png",
    maskFrom: "rgba(35,18,0,0.90)",
    maskVia: "rgba(75,40,5,0.55)",
    maskTo: "rgba(110,65,10,0.18)",
  },
  {
    id: 6,
    href: "/transportation",
    bgImage: "/images/index/wall/生活圈.png",
    maskFrom: "rgba(40,15,5,0.90)",
    maskVia: "rgba(80,35,10,0.55)",
    maskTo: "rgba(110,55,15,0.18)",
  },
  {
    id: 3,
    href: "",
    bgImage: "/images/index/wall/建築設計.png",
    maskFrom: "rgba(15,10,50,0.90)",
    maskVia: "rgba(35,20,90,0.55)",
    maskTo: "rgba(55,30,110,0.18)",
  },
  {
    id: 4,
    href: "/summary",
    bgImage: "/images/index/wall/共用空間.png",
    maskFrom: "rgba(0,30,50,0.90)",
    maskVia: "rgba(0,65,90,0.55)",
    maskTo: "rgba(0,100,120,0.18)",
  },
  {
    "id": 5,
    href: "/interior",
    bgImage: "/images/index/wall/房型規劃.png",
    maskFrom: "rgba(8,18,38,0.92)",
    maskVia: "rgba(18,35,65,0.55)",
    maskTo: "rgba(28,50,90,0.18)",
  },
  {
    id: 7,
    href: "",
    bgImage: "/images/index/wall/設備與家電.png",
    maskFrom: "rgba(0,25,25,0.90)",
    maskVia: "rgba(0,55,50,0.52)",
    maskTo: "rgba(0,80,70,0.18)",
  },
  {
    id: 8,
    href: "",
    bgImage: "/images/index/wall/IoT系統與保全設備.png",
    maskFrom: "rgba(10,14,28,0.92)",
    maskVia: "rgba(22,30,55,0.55)",
    maskTo: "rgba(35,48,80,0.18)",
  },
  {
    id: 10,
    href: "/story",
    maskFrom: "rgba(0,10,40,0.92)",
    maskVia: "rgba(0,30,80,0.55)",
    maskTo: "rgba(0,55,120,0.18)",
  },
];

export default function ContentGrid() {
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const currentLocale = isJp ? "jp" : "zh";
  const t = useTranslations("contentGrid");
  const items = t.raw("items");

  return (
    <section className="w-full bg-[#0c0f1c]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
        {gridMeta.map((meta, index) => {
          const item = items[index];
          return (
            <Link
              key={meta.id}
              href={
                meta.href ? getLocalizedPath(meta.href, currentLocale) : "#"
              }
              className="group relative block aspect-[4/3] overflow-hidden cursor-pointer border-[0.5px] border-white/[0.08]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                style={{ backgroundImage: `url(${meta.bgImage})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1c]/90 via-[#111729]/55 to-[#1a2240]/15 transition-opacity duration-500 group-hover:opacity-80" />

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <Copy animateOnScroll delay={index * 0.05}>
                  <b className="text-white text-base font-semibold tracking-[0.18em] leading-none mb-3 uppercase">
                    {item.title}
                  </b>
                </Copy>

                <div className="h-px bg-white/40 w-8 group-hover:w-14 transition-all duration-500 ease-out mb-3" />

                <Copy animateOnScroll delay={index * 0.05 + 0.1}>
                  <p className="text-white/55 text-[11px] tracking-[0.2em]">
                    {item.subtitle}
                  </p>
                </Copy>

                <div className="overflow-hidden mt-4">
                  <p className="text-[10px] text-white/70 tracking-[0.15em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
                    {item.hoverText}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
