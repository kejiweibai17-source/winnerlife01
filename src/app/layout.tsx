import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ContentGrid from "../../components/ContentGrid";
import { ReactLenis } from "lenis/react";

// 配置思源宋體
const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif-tc",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        // 👇 加入 font-sans 呼叫 Tailwind 配置，強制覆蓋全站字體
        className={`${notoSerifTC.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ReactLenis
          root
          options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}
        >
          <Nav />
          {children}
        </ReactLenis>
        <ContentGrid />
        <Footer />
      </body>
    </html>
  );
}
