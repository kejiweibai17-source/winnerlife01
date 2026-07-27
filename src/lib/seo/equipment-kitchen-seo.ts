import type { Metadata } from "next";
import zhMessages from "../../../messages/zh.json";
import jpMessages from "../../../messages/jp.json";
import { absoluteUrl, getBuildingDisplayName, siteConfig } from "@/lib/site";
import {
  getGeoMetaOther,
  getPropertyGeo,
  getPropertyPlace,
  getPropertyPostalAddress,
} from "@/lib/seo/geo";

type Locale = "zh" | "jp";

type FaqItem = { question: string; answer: string };

function getPageContent(locale: Locale) {
  return locale === "jp"
    ? jpMessages.equipmentKitchenPage
    : zhMessages.equipmentKitchenPage;
}

function getFaqItems(locale: Locale): FaqItem[] {
  return getPageContent(locale).faq.items;
}

function getPagePath(locale: Locale) {
  return locale === "jp" ? "/jp/equipment/kitchen" : "/equipment/kitchen";
}

function getEquipmentPath(locale: Locale) {
  return locale === "jp" ? "/jp/equipment" : "/equipment";
}

function getHomePath(locale: Locale) {
  return locale === "jp" ? "/jp" : "/";
}

export function getEquipmentKitchenMetadata(locale: Locale): Metadata {
  const page = getPageContent(locale);
  const seo = page.seo;
  const path = getPagePath(locale);
  const ogImage = absoluteUrl(seo.ogImage);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: path,
      languages: {
        "zh-TW": "/equipment/kitchen",
        ja: "/jp/equipment/kitchen",
        "x-default": "/equipment/kitchen",
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

export function getEquipmentKitchenJsonLd(locale: Locale) {
  const page = getPageContent(locale);
  const seo = page.seo;
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
    contentLocation: getPropertyPlace(locale),
    about: { "@id": `${pageUrl}#product` },
    publisher: {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const product = {
    "@type": "Product",
    "@id": `${pageUrl}#product`,
    name: seo.productName,
    description: seo.description,
    image: ogImage,
    brand: {
      "@type": "Brand",
      name: page.hero.brand,
    },
    category: "Kitchen",
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
    "@graph": [webPage, breadcrumb, getPropertyPlace(locale), product, faqPage],
  };
}
