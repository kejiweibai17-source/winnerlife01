"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import { SiLine } from "react-icons/si";
import { getLocalizedPath } from "@/lib/locale-path";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "#",
    Icon: FaFacebookF,
  },
  {
    label: "LINE",
    href: "#",
    Icon: SiLine,
  },
];

function NavColumn({ items, locale }) {
  return (
    <ul className="flex flex-col gap-3 md:gap-4">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href ? getLocalizedPath(item.href, locale) : "#"}
            className="text-[11px] md:text-xs tracking-[0.22em] text-white/90 hover:text-white transition-colors duration-300 leading-relaxed"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const currentLocale = isJp ? "jp" : "zh";
  const homeHref = getLocalizedPath("/", currentLocale);
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const footerNav = navT.raw("items");
  const storyNavItem = footerNav[8];
  const navColumns = [
    footerNav.slice(0, 4),
    footerNav.slice(4, 7),
    footerNav.slice(7, 10),
  ];
  const storyHref = storyNavItem?.href
    ? getLocalizedPath(storyNavItem.href, currentLocale)
    : getLocalizedPath("/story", currentLocale);

  const { address, taipeiPhoneDisplay, email, corporateUrl, license } =
    siteConfig;
  const fullAddress = `${address.addressLocality}${address.streetAddress}`;

  return (
    <footer className="w-full bg-[#1a1a1a] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-14 md:pt-20 pb-10 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-2">
            <Link href={homeHref} className="inline-block group">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] text-white group-hover:opacity-80 transition-opacity">
                {t("brand")}
              </span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 md:gap-8 lg:pl-4">
            {navColumns.map((column, index) => (
              <NavColumn key={index} items={column} locale={currentLocale} />
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-6">
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="text-white hover:opacity-70 transition-opacity duration-300"
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </Link>
                );
              })}
            </div>
            <Link
              href="#"
              className="text-[10px] md:text-[11px] tracking-[0.28em] text-white/80 hover:text-white transition-colors duration-300 uppercase"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>

        <div className="mt-14 md:mt-20 max-w-2xl">
          <p className="text-[11px] md:text-xs tracking-[0.12em] text-white/75 leading-[2] font-light m-0">
            {fullAddress}
            <br />
            TEL. {taipeiPhoneDisplay}
            <br />
            E-MAIL{" "}
            <Link
              href={`mailto:${email}`}
              className="hover:text-white transition-colors duration-300"
            >
              {email}
            </Link>
            <br />
            <Link
              href={corporateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              {corporateUrl.replace(/^https?:\/\//, "")}
            </Link>
          </p>
        </div>

        <div className="mt-14 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-2 text-[10px] md:text-[11px] tracking-[0.2em] text-white/50">
            <p className="m-0">© {siteConfig.name}</p>
            <p className="m-0">{license}</p>
            <a href="https://www.jeek-webdesign.com.tw" target="_blank">
              <p className="m-0 text-white/40 tracking-[0.15em]">
                {t("designBy")}{" "}
                <span className="text-white/60">{t("designer")}</span>
              </p>
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 md:ml-auto">
            <Link
              href={storyHref}
              className="block overflow-hidden border border-white/30 hover:border-white/50 transition-colors duration-300"
            >
              <Image
                src="/images/story/news3-1280x850.png"
                alt={storyNavItem?.label ?? t("brand")}
                width={128}
                height={85}
                className="w-20 md:w-24 h-auto object-cover"
              />
            </Link>
            <div className="flex flex-col items-start md:items-end gap-1">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={120}
                height={48}
                className="w-[100px] md:w-[120px] h-auto opacity-90 brightness-0 invert"
              />
              <span className="text-[8px] tracking-[0.35em] text-white/40 uppercase">
                Premium Midsize Office
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
