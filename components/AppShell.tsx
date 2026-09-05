"use client";

import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import zhMessages from "../messages/zh.json";
import jpMessages from "../messages/jp.json";
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
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const messages = isJp ? jpMessages : zhMessages;

  useEffect(() => {
    document.documentElement.lang = isJp ? "ja" : "zh-TW";
  }, [isJp]);

  useEffect(() => {
    captureLeadAttributionFromUrl();
  }, [pathname]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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
