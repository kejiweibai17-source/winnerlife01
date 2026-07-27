import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import AppShell from "../../components/AppShell";
import { getHomeDescription, getHomePageTitle, siteConfig } from "@/lib/site";

const GTM_ID = "GTM-T84JXCM4";

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
  title: { default: getHomePageTitle("zh"), template: `%s` },
  description: getHomeDescription("zh"),
  icons: {
    icon: [
      { url: siteConfig.icons.icon48, sizes: "48x48", type: "image/png" },
      { url: siteConfig.icons.icon96, sizes: "96x96", type: "image/png" },
      { url: siteConfig.icons.icon192, sizes: "192x192", type: "image/png" },
      { url: siteConfig.icons.icon512, sizes: "512x512", type: "image/png" },
      { url: siteConfig.icons.favicon, sizes: "any" },
    ],
    shortcut: siteConfig.icons.favicon,
    apple: [{ url: siteConfig.icons.apple, sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: true, email: true },
  other: {
    "geo.region": "JP-13",
    "geo.placename": "Minato City, Tokyo",
    "geo.position": `${siteConfig.propertyGeo.latitude};${siteConfig.propertyGeo.longitude}`,
    ICBM: `${siteConfig.propertyGeo.latitude}, ${siteConfig.propertyGeo.longitude}`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";
  const isJp = pathname.startsWith("/jp");

  return (
    <html lang={isJp ? "ja" : "zh-TW"}>
      <body
        className={`${notoSerifTC.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
