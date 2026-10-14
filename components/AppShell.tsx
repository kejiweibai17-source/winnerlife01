"use client";

import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import zhMessages from "../messages/zh.json";
import jpMessages from "../messages/jp.json";
import enMessages from "../messages/en.json";
import Nav from "./Navbar/Navbar";
import Footer from "./Footer";
import ContentGrid from "./ContentGrid";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";
import PageTransition from "./PageTransition";
import FixedSideActions from "./FixedSideActions";
import {
  landingPage01Path,
  legacyLandingPage01Path,
} from "@/lib/landing-page-01-path";
import { captureLeadAttributionFromUrl } from "@/lib/lead-attribution";
import {
  getHtmlLang,
  getLocaleFromPathname,
  type SiteLocale,
} from "@/lib/locale-path";

/** en only translates shared UI + homepage so far; zh fills untranslated namespaces. */
const MESSAGES = {
  zh: zhMessages,
  jp: jpMessages,
  en: { ...zhMessages, ...enMessages },
} satisfies Record<SiteLocale, unknown>;

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage =
    pathname.startsWith(landingPage01Path) ||
    pathname.startsWith(legacyLandingPage01Path);
  const isBareChrome =
    pathname.startsWith("/admin") || pathname.startsWith("/studio");
  const locale = getLocaleFromPathname(pathname);
  const messages = MESSAGES[locale];

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale);
  }, [locale]);

  useEffect(() => {
    captureLeadAttributionFromUrl();
  }, [pathname]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Taipei"
    >
      <ReactLenis
        root
        options={
          isLandingPage
            ? {
                lerp: 0.055,
                duration: 1.35,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.15,
              }
            : { lerp: 0.08, duration: 1.2, smoothWheel: true }
        }
      >
        <ScrollToTopOnNavigate />
        {!isLandingPage && !isBareChrome && <Nav />}
        <PageTransition>{children}</PageTransition>
        {!isBareChrome && <FixedSideActions />}
      </ReactLenis>
      {!isLandingPage && !isBareChrome && <ContentGrid />}
      {!isLandingPage && !isBareChrome && <Footer />}
    </NextIntlClientProvider>
  );
}
