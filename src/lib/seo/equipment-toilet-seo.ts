import type { Metadata } from "next";
import zhMessages from "../../../messages/zh.json";
import jpMessages from "../../../messages/jp.json";
import { absoluteUrl, getBuildingDisplayName, siteConfig } from "@/lib/site";
import {
  getGeoMetaOther,
  getPropertyGeo,
  getPropertyGeoGraph,
  getPropertyPostalAddress,
} from "@/lib/seo/geo";

type Locale = "zh" | "jp";

type FaqItem = { question: string; answer: string };

function getSeoContent(locale: Locale) {
  const page =
    locale === "jp"
      ? jpMessages.equipmentToiletPage
      : zhMessages.equipmentToiletPage;
  return page.seo;
}

function getFaqItems(locale: Locale): FaqItem[] {
  const page =
    locale === "jp"
      ? jpMessages.equipmentToiletPage
      : zhMessages.equipmentToiletPage;
  return page.faq.items;
}

function getPagePath(locale: Locale) {
  return locale === "jp" ? "/jp/equipment/toilet" : "/equipment/toilet";
}

function getEquipmentPath(locale: Locale) {
  return locale === "jp" ? "/jp/equipment" : "/equipment";
}

function getHomePath(locale: Locale) {
  return locale === "jp" ? "/jp" : "/";
}

export function getEquipmentToiletMetadata(locale: Locale): Metadata {
  const seo = getSeoContent(locale);
  const path = getPagePath(locale);
  const ogImage = absoluteUrl(seo.ogImage);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: path,
      languages: {
        "zh-TW": "/equipment/toilet",
        ja: "/jp/equipment/toilet",
        "x-default": "/equipment/toilet",
      },
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
      locale: locale === "jp" ? "ja_JP" : "zh_TW",
      url: path,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    other: getGeoMetaOther(),
  };
}

export function getEquipmentToiletJsonLd(locale: Locale) {
  const seo = getSeoContent(locale);
  const page =
    locale === "jp"
      ? jpMessages.equipmentToiletPage
      : zhMessages.equipmentToiletPage;
  const faqItems = getFaqItems(locale);

  const pageUrl = absoluteUrl(getPagePath(locale));
  const homeUrl = absoluteUrl(getHomePath(locale));
  const equipmentUrl = absoluteUrl(getEquipmentPath(locale));
  const ogImage = absoluteUrl(seo.ogImage);
  const inLanguage = locale === "jp" ? "ja" : "zh-TW";

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: page.breadcrumb.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumb.equipment,
        item: equipmentUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.breadcrumb.current,
        item: pageUrl,
      },
    ],
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: getBuildingDisplayName(),
      url: absoluteUrl("/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    breadcrumb: { "@id": breadcrumb["@id"] },
    contentLocation: { "@id": `${absoluteUrl("/")}#property-place` },
    spatialCoverage: { "@id": `${absoluteUrl("/")}#property-place` },
    about: { "@id": `${pageUrl}#product` },
    publisher: {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    workTranslation: {
      "@type": "WebPage",
      url: absoluteUrl(locale === "jp" ? "/equipment/toilet" : "/jp/equipment/toilet"),
      inLanguage: locale === "jp" ? "zh-TW" : "ja",
    },
  };

  const product = {
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: seo.productName,
    description: page.hero.description,
    image: ogImage,
    brand: {
      "@type": "Brand",
      name: page.hero.brand,
    },
    model: page.hero.model,
    category: page.hero.category,
    isRelatedTo: {
      "@type": "RealEstateListing",
      name: getBuildingDisplayName(),
      url: absoluteUrl("/"),
      address: getPropertyPostalAddress(),
      geo: getPropertyGeo(),
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, ...getPropertyGeoGraph(locale), product, faqPage],
  };
}
