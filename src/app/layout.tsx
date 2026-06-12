import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import AppShell from "../../components/AppShell";
import { siteConfig } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s｜${siteConfig.name}` },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  formatDetection: { telephone: true, email: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSerifTC.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
