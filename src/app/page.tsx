import type { Metadata } from "next";
import HomePage from "../../components/HomePage";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/seo/home-json-ld";
import { getGeoMetaOther } from "@/lib/seo/geo";
import { getHomeDescription, getHomePageTitle, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: getHomePageTitle("zh"),
  description: getHomeDescription("zh"),
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
    languages: { "zh-TW": "/", ja: "/jp", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "OK PRIME",
    title: getHomePageTitle("zh"),
    description: getHomeDescription("zh"),
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.ogImageAlt.zh,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getHomePageTitle("zh"),
    description: getHomeDescription("zh"),
    images: [siteConfig.ogImage],
  },
  other: getGeoMetaOther(),
};

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLd("zh")} />
      <HomePage />
    </>
  );
}
