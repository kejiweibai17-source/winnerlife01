import type { Metadata } from "next";
import { getHomeDescription, getHomePageTitle, siteConfig } from "@/lib/site";
import { getGeoMetaOther } from "@/lib/seo/geo";
import { getLocalizedPath, SITE_LOCALES, type SiteLocale } from "@/lib/locale-path";

const OG_LOCALE: Record<SiteLocale, string> = {
  zh: "zh_TW",
  jp: "ja_JP",
  en: "en_US",
};

/** hreflang map shared by every homepage variant so each points at all three. */
export function getHomeLanguageAlternates() {
  return {
    ...Object.fromEntries(
      SITE_LOCALES.map((l) => [l.htmlLang, getLocalizedPath("/", l.code)])
    ),
    "x-default": "/",
  };
}

export function getHomeMetadata(locale: SiteLocale): Metadata {
  const title = getHomePageTitle(locale);
  const description = getHomeDescription(locale);
  const path = getLocalizedPath("/", locale);

  return {
    title,
    description,
    keywords: [...(locale === "en" ? siteConfig.keywordsEn : siteConfig.keywords)],
    alternates: {
      canonical: path,
      languages: getHomeLanguageAlternates(),
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
      locale: OG_LOCALE[locale],
      alternateLocale: SITE_LOCALES.filter((l) => l.code !== locale).map(
        (l) => OG_LOCALE[l.code]
      ),
      url: path,
      siteName: "OK PRIME",
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.ogImageAlt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    other: getGeoMetaOther(),
  };
}
