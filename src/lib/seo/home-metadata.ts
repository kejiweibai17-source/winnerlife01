import type { Metadata } from "next";
import { absoluteUrl, getBuildingDisplayName, getHomePageTitle, siteConfig } from "@/lib/site";

const title = getHomePageTitle();
const description = siteConfig.description;

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
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${getBuildingDisplayName()} 建案主視覺`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  other: {
    "geo.region": "JP-13",
    "geo.placename": "Minato City, Tokyo",
  },
};
