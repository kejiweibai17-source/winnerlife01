import type { Metadata } from "next";
import zhMessages from "../../../messages/zh.json";
import jpMessages from "../../../messages/jp.json";
import { absoluteUrl, getBuildingDisplayName, siteConfig } from "@/lib/site";
import {
  getOrganizationStub,
  getPropertyGeo,
  getPropertyPlace,
  getPropertyPostalAddress,
} from "@/lib/seo/geo";

export type Locale = "zh" | "jp";

type FaqItem = { question: string; answer: string };

export type PageSeoConfig = {
  messageKey: string;
  zhPath: string;
  jpPath: string;
  seoKey?: string;
  breadcrumbKey?: string;
  faqKey?: string;
  /** Attach Tokyo property Place + GeoCoordinates */
  includePropertyGeo?: boolean;
};

const GEO_PAGE_KEYS = new Set([
  "location",
  "amenitiesPage",
  "transportation",
  "contactPage",
  "architecture",
  "summary",
  "concept",
  "interiorPage",
  "equipmentPage",
  "developer",
]);

function getMessages(locale: Locale) {
  return locale === "jp" ? jpMessages : zhMessages;
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function getPagePath(locale: Locale, config: PageSeoConfig) {
  return locale === "jp" ? config.jpPath : config.zhPath;
}

function getSeoData(locale: Locale, config: PageSeoConfig) {
  const messages = getMessages(locale);
  const seo = getByPath(messages as Record<string, unknown>, `${config.messageKey}.${config.seoKey ?? "seo"}`);
  if (!seo || typeof seo !== "object") {
    throw new Error(`Missing SEO for ${config.messageKey}`);
  }
  return seo as {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    ogImageAlt?: string;
  };
}

function getBreadcrumb(locale: Locale, config: PageSeoConfig) {
  const messages = getMessages(locale);
  const breadcrumb = getByPath(
    messages as Record<string, unknown>,
    `${config.messageKey}.${config.breadcrumbKey ?? "breadcrumb"}`
  );
  if (!breadcrumb || typeof breadcrumb !== "object") return null;
  return breadcrumb as Record<string, string>;
}

function getFaqItems(locale: Locale, config: PageSeoConfig): FaqItem[] {
  if (!config.faqKey) return [];
  const messages = getMessages(locale);
  const faq = getByPath(messages as Record<string, unknown>, `${config.messageKey}.${config.faqKey}`);
  if (!faq || typeof faq !== "object") return [];
  const items = (faq as { items?: FaqItem[] }).items;
  return Array.isArray(items) ? items : [];
}

function shouldIncludeGeo(config: PageSeoConfig) {
  return config.includePropertyGeo !== false && GEO_PAGE_KEYS.has(config.messageKey);
}

export function getPageMetadata(locale: Locale, config: PageSeoConfig): Metadata {
  const seo = getSeoData(locale, config);
  const path = getPagePath(locale, config);
  const ogImage = absoluteUrl(seo.ogImage ?? siteConfig.ogImage);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: path,
      languages: {
        "zh-TW": config.zhPath,
        ja: config.jpPath,
        "x-default": config.zhPath,
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
          alt: seo.ogImageAlt ?? seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    other: {
      "geo.region": "JP-13",
      "geo.placename": "Minato City, Tokyo",
      "geo.position": `${siteConfig.propertyGeo.latitude};${siteConfig.propertyGeo.longitude}`,
      ICBM: `${siteConfig.propertyGeo.latitude}, ${siteConfig.propertyGeo.longitude}`,
    },
  };
}

export function getPageJsonLd(locale: Locale, config: PageSeoConfig) {
  const seo = getSeoData(locale, config);
  const breadcrumbData = getBreadcrumb(locale, config);
  const faqItems = getFaqItems(locale, config);
  const pageUrl = absoluteUrl(getPagePath(locale, config));
  const homeUrl = absoluteUrl(locale === "jp" ? "/jp" : "/");
  const ogImage = absoluteUrl(seo.ogImage ?? siteConfig.ogImage);
  const inLanguage = locale === "jp" ? "ja" : "zh-TW";
  const includeGeo = shouldIncludeGeo(config);
  const propertyPlace = getPropertyPlace(locale);
  const propertyPlaceId = propertyPlace["@id"];

  const breadcrumbItems = breadcrumbData
    ? Object.entries(breadcrumbData)
        .filter(([key]) => key !== "ariaLabel")
        .map(([, name], index, arr) => {
          const isLast = index === arr.length - 1;
          return {
            "@type": "ListItem",
            position: index + 1,
            name,
            item: isLast ? pageUrl : index === 0 ? homeUrl : undefined,
          };
        })
    : [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "jp" ? "トップ" : "首頁",
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.title.split("｜")[0],
          item: pageUrl,
        },
      ];

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  const webPage: Record<string, unknown> = {
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
      publisher: getOrganizationStub(),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": breadcrumb["@id"] },
    about: {
      "@type": "RealEstateListing",
      "@id": `${absoluteUrl("/")}#listing`,
      name: getBuildingDisplayName(),
      url: absoluteUrl("/"),
      address: getPropertyPostalAddress(),
      geo: getPropertyGeo(),
    },
    publisher: getOrganizationStub(),
    mainEntity: {
      "@type": "RealEstateListing",
      name: getBuildingDisplayName(),
      url: absoluteUrl("/"),
      address: getPropertyPostalAddress(),
      geo: getPropertyGeo(),
    },
  };

  if (includeGeo) {
    webPage.contentLocation = { "@id": propertyPlaceId };
    webPage.spatialCoverage = { "@id": propertyPlaceId };
  }

  const graph: Record<string, unknown>[] = [webPage, breadcrumb];

  if (includeGeo) {
    graph.push(propertyPlace);
  }

  if (faqItems.length > 0) {
    graph.push({
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
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
