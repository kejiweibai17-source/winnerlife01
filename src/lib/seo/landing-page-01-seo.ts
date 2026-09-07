import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { landingPage01Path } from "@/lib/landing-page-01-path";
import { getGeoMetaOther, getPropertyGeoGraph } from "@/lib/seo/geo";
import {
  buildApartmentComplex,
  buildPropertyListingRef,
  listingId,
  orgId,
  propertyPlaceId,
  websiteId,
} from "@/lib/seo/schema-common";

export { landingPage01Path } from "@/lib/landing-page-01-path";

export const landingPage01OgImage = "/images/og/landing.jpg";

const projectName = "OK PRIME 白金高輪";

export const landingPage01Seo = {
  title: `海外置產說明會｜${projectName}｜東京港區精品住宅｜${siteConfig.name}`,
  description:
    "免費參加海外置產說明會，掌握日本不動產市場趨勢、稅務與資產配置。OK PRIME 白金高輪位於港區三田5-5-10（〒108-0073），白金高輪站步行約5分，串聯三田・田町・品川與羽田。由忠訓地產專家親自講解。",
  keywords: [
    "海外置產說明會",
    "日本置產說明會",
    "OK PRIME",
    "白金高輪",
    "東京港區",
    "三田5-5-10",
    "精品住宅",
    "海外置產",
    "日本不動產",
    "品川生活圈",
    "忠訓地產",
    "WinnerLife",
    "SHIROKANE TAKANAWA",
    "東京投資",
  ],
  ogImageAlt: "OK PRIME 白金高輪 海外置產說明會—東京港區精品住宅",
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

const seminarVenues = {
  taipei: {
    name: "忠訓地產台北服務中心",
    streetAddress: "南京東路四段1號4樓",
    addressLocality: "松山區",
    addressRegion: "台北市",
    postalCode: "105",
    addressCountry: "TW",
  },
  taichung: {
    name: "忠訓集團（中港經貿大樓）",
    streetAddress: "台灣大道二段573號11樓E室",
    addressLocality: "西區",
    addressRegion: "台中市",
    postalCode: "403",
    addressCountry: "TW",
  },
  kaohsiung: {
    name: "高雄說明會場地",
    streetAddress: "請依報名通知為準",
    addressLocality: "高雄市",
    addressRegion: "高雄市",
    postalCode: "800",
    addressCountry: "TW",
  },
} as const;

const seminarSessions = [
  { date: "2026-09-13", label: "9/13（日）台北場", venue: "taipei" as const },
  { date: "2026-09-18", label: "9/18（五）台北場", venue: "taipei" as const },
  { date: "2026-09-19", label: "9/19（六）高雄場", venue: "kaohsiung" as const },
  { date: "2026-09-20", label: "9/20（日）台中場", venue: "taichung" as const },
  { date: "2026-09-30", label: "9/30（三）台北場", venue: "taipei" as const },
] as const;

const faqItems = [
  {
    question: "海外置產說明會是否免費參加？",
    answer: "是的，海外置產說明會免費參加，名額有限，建議提前預約席次。",
  },
  {
    question: "說明會在哪裡舉辦？",
    answer:
      "台北場於忠訓地產會議廳（南京東路四段1號4樓）舉辦；台中場於忠訓集團中港經貿大樓（台灣大道二段573號11樓E室）。請以頁面公告場次為準。",
  },
  {
    question: "說明會會分享哪些內容？",
    answer:
      "說明會將解析日本不動產市場最新趨勢、稅務與持有成本、收益與風險評估，並由海外置產專家提供資產配置與自住投資並行的規劃建議。",
  },
  {
    question: "OK PRIME 白金高輪位於哪裡？",
    answer:
      "OK PRIME（OK PRIME+ 白金高輪）官方資訊見官網首頁。物件位於東京都港區三田5-5-10（〒108-0073），鄰近白金高輪站（步行約5分），亦可利用三田・田町・泉岳寺站。",
  },
  {
    question: "如何預約說明會或諮詢？",
    answer: `可於本頁填寫預約表單，或致電 ${siteConfig.taipeiPhoneDisplay}、來信 ${siteConfig.email}，專員將盡快與您聯繫確認。`,
  },
] as const;

const pageSections = [
  { name: "港區物件", url: "#FramevoHero" },
  { name: "精品住宅", url: "#Hero" },
  { name: "東京核心", url: "#TokyoCore" },
  { name: "理想生活", url: "#StickyCards" },
  { name: "說明會", url: "#Seminar" },
  { name: "預約表單", url: "#SeminarRegistrationForm" },
  { name: "聯絡資訊", url: "#Contact" },
] as const;

const ogImageUrl = absoluteUrl(landingPage01OgImage);
const pageUrl = absoluteUrl(landingPage01Path);
const homeUrl = absoluteUrl("/");
const siteUrl = absoluteUrl("/");
const webpageId = `${pageUrl}#webpage`;

export const landingPage01Metadata: Metadata = {
  title: landingPage01Seo.title,
  description: landingPage01Seo.description,
  keywords: [...landingPage01Seo.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.corporateUrl }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "real estate",
  alternates: {
    canonical: landingPage01Path,
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
    locale: "zh_TW",
    url: landingPage01Path,
    siteName: siteConfig.name,
    title: landingPage01Seo.title,
    description: landingPage01Seo.description,
    images: [
      {
        url: ogImageUrl,
        width: landingPage01Seo.ogImageWidth,
        height: landingPage01Seo.ogImageHeight,
        alt: landingPage01Seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: landingPage01Seo.title,
    description: landingPage01Seo.description,
    images: [ogImageUrl],
  },
  other: {
    ...getGeoMetaOther(),
  },
};

export function getLandingPage01JsonLd() {
  const listing = buildPropertyListingRef();
  const residence = buildApartmentComplex("zh");

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "海外置產說明會",
        item: pageUrl,
      },
    ],
  };

  const seminarEvents = seminarSessions.map((session, index) => {
    const venue = seminarVenues[session.venue];
    return {
      "@type": "BusinessEvent",
      "@id": `${pageUrl}#seminar-${index + 1}`,
      name: `海外置產說明會｜${session.label}`,
      description:
        "90 分鐘專業解析東京不動產市場、稅務與持有成本、資產配置策略，由海外置產專家親自講解。",
      startDate: `${session.date}T13:30:00+08:00`,
      endDate: `${session.date}T15:00:00+08:00`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: ogImageUrl,
      url: `${pageUrl}#SeminarRegistrationForm`,
      location: {
        "@type": "Place",
        name: venue.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: venue.streetAddress,
          addressLocality: venue.addressLocality,
          addressRegion: venue.addressRegion,
          postalCode: venue.postalCode,
          addressCountry: venue.addressCountry,
        },
      },
      organizer: {
        "@type": "Organization",
        "@id": orgId(),
        name: siteConfig.name,
        url: siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.taipeiPhone,
      },
      performer: {
        "@type": "Organization",
        "@id": orgId(),
        name: siteConfig.name,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "TWD",
        availability: "https://schema.org/LimitedAvailability",
        url: `${pageUrl}#SeminarRegistrationForm`,
        validFrom: "2026-06-01",
      },
      isAccessibleForFree: true,
      inLanguage: "zh-TW",
      about: [{ "@id": listingId() }, { "@id": propertyPlaceId() }],
    };
  });

  const seminarList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#seminars`,
    name: "海外置產說明會場次",
    numberOfItems: seminarEvents.length,
    itemListElement: seminarEvents.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@id": event["@id"] },
    })),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": webpageId,
    url: pageUrl,
    name: landingPage01Seo.title,
    description: landingPage01Seo.description,
    inLanguage: "zh-TW",
    isPartOf: { "@id": websiteId() },
    about: [{ "@id": listingId() }, { "@id": orgId() }, { "@id": propertyPlaceId() }],
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primary-image`,
      url: ogImageUrl,
      contentUrl: ogImageUrl,
      width: landingPage01Seo.ogImageWidth,
      height: landingPage01Seo.ogImageHeight,
      caption: landingPage01Seo.ogImageAlt,
    },
    breadcrumb: { "@id": breadcrumb["@id"] },
    publisher: {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": orgId(),
      name: siteConfig.name,
      url: siteUrl,
    },
    contentLocation: { "@id": propertyPlaceId() },
    spatialCoverage: { "@id": propertyPlaceId() },
    significantLink: [homeUrl, ...pageSections.map((section) => `${pageUrl}${section.url}`)],
    hasPart: pageSections.map((section, index) => ({
      "@type": "WebPageElement",
      "@id": `${pageUrl}#section-${index + 1}`,
      name: section.name,
      url: `${pageUrl}${section.url}`,
    })),
    mainEntity: { "@id": seminarList["@id"] },
    relatedLink: [homeUrl],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".lp-fv-headline", ".lp-sr-heading"],
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

  const contactPoint = {
    "@type": "ContactPoint",
    "@id": `${pageUrl}#contact`,
    contactType: "customer service",
    telephone: siteConfig.taipeiPhone,
    email: siteConfig.email,
    areaServed: ["TW", "JP"],
    availableLanguage: ["zh-TW", "ja"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      breadcrumb,
      listing,
      residence,
      ...getPropertyGeoGraph("zh"),
      seminarList,
      ...seminarEvents,
      faqPage,
      contactPoint,
    ],
  };
}
