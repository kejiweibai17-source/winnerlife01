import type { Metadata } from "next";
import { absoluteUrl, getHomeDescription, getHomePageTitle, siteConfig } from "@/lib/site";
import { getGeoMetaOther } from "@/lib/seo/geo";

const title = getHomePageTitle();
const description = getHomeDescription("zh");

export const homeMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s｜${siteConfig.name}`,
  },
  description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.corporateUrl }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "real estate",
  alternates: {
    canonical: "/",
    languages: {
      "zh-TW": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "OK PRIME",
    title,
    description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.ogImageAlt.zh,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  other: getGeoMetaOther(),
};
