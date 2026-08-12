import type { Metadata } from "next";
import zhMessages from "../../../messages/zh.json";
import jpMessages from "../../../messages/jp.json";
import { absoluteUrl, getBuildingDisplayName, siteConfig } from "@/lib/site";
import {
  getGeoMetaOther,
  getOrganizationStub,
  getPropertyGeo,
  getPropertyGeoGraph,
  getPropertyPostalAddress,
  getTaipeiOfficeAddress,
  getTaipeiOfficeGeo,
  officeOpenDays,
} from "@/lib/seo/geo";
import {
  buildApartmentComplex,
  localeLang,
  orgId,
  propertyPlaceId,
  websiteId,
  type Locale,
} from "@/lib/seo/schema-common";

export type { Locale };

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
  /**
   * Schema.org @type for the page node.
   * Defaults inferred from messageKey when omitted.
   */
  pageType?: string | string[];
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

/** Middle breadcrumb labels → absolute path (locale-aware) */
const BREADCRUMB_PATH_MAP: Record<string, { zh: string; jp: string }> = {
  equipment: { zh: "/equipment", jp: "/jp/equipment" },
  amenities: { zh: "/amenities", jp: "/jp/amenities" },
  location: { zh: "/location", jp: "/jp/location" },
};

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

function resolvePageType(config: PageSeoConfig): string | string[] {
  if (config.pageType) return config.pageType;
  switch (config.messageKey) {
    case "contactPage":
      return "ContactPage";
    case "developer":
      return "AboutPage";
    case "interiorPage":
    case "amenitiesPage":
    case "equipmentPage":
      return ["WebPage", "CollectionPage"];
    case "location":
    case "transportation":
      return ["WebPage", "CollectionPage"];
    default:
      return "WebPage";
  }
}

function resolveBreadcrumbItemUrl(
  locale: Locale,
  config: PageSeoConfig,
  key: string,
  index: number,
  total: number,
  homeUrl: string,
  pageUrl: string
) {
  if (index === 0 || key === "home") return homeUrl;
  if (index === total - 1 || key === "current") return pageUrl;
  const mapped = BREADCRUMB_PATH_MAP[key];
  if (mapped) return absoluteUrl(locale === "jp" ? mapped.jp : mapped.zh);
  // Fallback: keep crawlable URL (same page) rather than omitting item
  return pageUrl;
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
    other: getGeoMetaOther(),
  };
}

export function getPageJsonLd(locale: Locale, config: PageSeoConfig) {
  const seo = getSeoData(locale, config);
  const breadcrumbData = getBreadcrumb(locale, config);
  const faqItems = getFaqItems(locale, config);
  const pageUrl = absoluteUrl(getPagePath(locale, config));
  const altUrl = absoluteUrl(locale === "jp" ? config.zhPath : config.jpPath);
  const homeUrl = absoluteUrl(locale === "jp" ? "/jp" : "/");
  const ogImage = absoluteUrl(seo.ogImage ?? siteConfig.ogImage);
  const inLanguage = localeLang(locale);
  const includeGeo = shouldIncludeGeo(config);
  const pageType = resolvePageType(config);

  const breadcrumbEntries = breadcrumbData
    ? Object.entries(breadcrumbData).filter(([key]) => key !== "ariaLabel")
    : null;

  const breadcrumbItems = breadcrumbEntries
    ? breadcrumbEntries.map(([key, name], index, arr) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: resolveBreadcrumbItemUrl(locale, config, key, index, arr.length, homeUrl, pageUrl),
      }))
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

  const listingRef = {
    "@type": "RealEstateListing",
    "@id": `${absoluteUrl("/")}#listing`,
    name: getBuildingDisplayName(),
    url: absoluteUrl("/"),
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
    contentLocation: { "@id": propertyPlaceId() },
  };

  const webPage: Record<string, unknown> = {
    "@type": pageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      "@id": websiteId(),
      name: getBuildingDisplayName(),
      url: absoluteUrl("/"),
      publisher: getOrganizationStub(),
      inLanguage: ["zh-TW", "ja"],
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
      contentUrl: ogImage,
      width: 1200,
      height: 630,
      caption: seo.ogImageAlt ?? seo.title,
    },
    image: {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": breadcrumb["@id"] },
    about: [listingRef, { "@id": orgId() }],
    publisher: getOrganizationStub(),
    mainEntity: listingRef,
    isAccessibleForFree: true,
    workTranslation: {
      "@type": "WebPage",
      "@id": `${altUrl}#webpage`,
      url: altUrl,
      inLanguage: locale === "jp" ? "zh-TW" : "ja",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  };

  if (includeGeo) {
    webPage.contentLocation = { "@id": propertyPlaceId() };
    webPage.spatialCoverage = { "@id": propertyPlaceId() };
    (webPage.about as unknown[]).push({ "@id": propertyPlaceId() });
  }

  if (config.messageKey === "contactPage") {
    webPage.mainEntity = {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      "@id": orgId(),
      name: siteConfig.name,
      telephone: siteConfig.taipeiPhone,
      email: siteConfig.email,
      url: absoluteUrl(locale === "jp" ? "/jp/contact" : "/contact"),
      address: getTaipeiOfficeAddress(),
      geo: getTaipeiOfficeGeo(),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...officeOpenDays],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: [{ "@id": propertyPlaceId() }],
    };
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
      "@id": orgId(),
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logo),
      telephone: siteConfig.taipeiPhone,
      email: siteConfig.email,
      address: getTaipeiOfficeAddress(),
      geo: getTaipeiOfficeGeo(),
      sameAs: [...siteConfig.sameAs],
      areaServed: [{ "@id": propertyPlaceId() }],
    },
    webPage,
    breadcrumb,
    listingRef,
  ];

  if (includeGeo) {
    graph.push(...getPropertyGeoGraph(locale));
    graph.push(buildApartmentComplex(locale, pageUrl));
  }

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage,
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
