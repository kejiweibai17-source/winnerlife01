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

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isJp = pathname.startsWith("/jp");
  const locale = isJp ? "jp" : "zh";
  const messages = isJp ? jpMessages : zhMessages;

  useEffect(() => {
    document.documentElement.lang = isJp ? "ja" : "zh-TW";
  }, [isJp]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactLenis
        root
        options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}
      >
        <ScrollToTopOnNavigate />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </ReactLenis>
      <ContentGrid />
      <Footer />
    </NextIntlClientProvider>
  );
}
