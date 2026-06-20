import type { Metadata } from "next";
import HomePage from "../../../components/HomePage";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/seo/home-json-ld";
import { getHomeDescription, getHomePageTitle, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: getHomePageTitle("jp"),
  description: getHomeDescription("jp"),
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/jp",
    languages: { "zh-TW": "/", ja: "/jp" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/jp",
    siteName: siteConfig.name,
    title: getHomePageTitle("jp"),
    description: getHomeDescription("jp"),
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.ogImageAlt.jp,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getHomePageTitle("jp"),
    description: getHomeDescription("jp"),
    images: [siteConfig.ogImage],
  },
};

export default function JpHome() {
  return (
    <>
      <JsonLd data={getHomeJsonLd("jp")} />
      <HomePage />
    </>
  );
}
