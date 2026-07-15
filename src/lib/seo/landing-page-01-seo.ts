import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { landingPage01Path } from "@/lib/landing-page-01-path";

export { landingPage01Path } from "@/lib/landing-page-01-path";

export const landingPage01OgImage = "/images/og/landing.jpg";

const brandName = "OK PRIME";
const projectName = "OK PRIME 白金高輪";
const projectSubtitle = "SHIROKANE TAKANAWA";

export const landingPage01Seo = {
  title: `${projectName}｜東京港區精品住宅・海外置產說明會｜${siteConfig.name}`,
  description:
    "港區・白金高輪精品住宅，坐落東京核心黃金地段。探索品川生活圈、運河水岸與質感生活圈，掌握日本不動產市場趨勢、稅務與資產配置策略。免費參加海外置產說明會，由忠訓地產專家親自講解，協助您做出穩健的海外置產決策。",
  keywords: [
    "OK PRIME",
    "白金高輪",
    "東京港區",
    "精品住宅",
    "海外置產",
    "日本不動產",
    "品川生活圈",
    "質感生活圈",
    "海外置產說明會",
    "東京投資",
    "忠訓地產",
    "WinnerLife",
    "SHIROKANE TAKANAWA",
    "東京核心地段",
    "日本置產",
  ],
  ogImageAlt: "OK PRIME 白金高輪 質感生活圈—東京港區精品住宅生活情境",
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

const seminarLocation = {
  name: "忠訓地產台北服務中心",
  streetAddress: "南京東路四段1號4樓",
  addressLocality: "松山區",
  addressRegion: "台北市",
  postalCode: "105",
  addressCountry: "TW",
};

const seminarSessions = [
  { date: "2026-07-08", label: "7/08(三)" },
  { date: "2026-07-15", label: "7/15(三)" },
  { date: "2026-07-30", label: "7/30(四)" },
  { date: "2026-07-31", label: "7/31(五)" },
] as const;

const faqItems = [
  {
    question: "海外置產說明會是否免費參加？",
    answer: "是的，海外置產說明會免費參加，名額有限，建議提前預約席次。",
  },
  {
    question: "說明會在哪裡舉辦？",
    answer: "說明會於台北市松山區南京東路四段1號4樓（台北小巨蛋站）舉辦，場次時間為每週六 13:30–15:00。",
  },
  {
    question: "說明會會分享哪些內容？",
    answer:
      "說明會將解析日本不動產市場最新趨勢、稅務與持有成本、收益與風險評估，並由海外置產專家提供資產配置與自住投資並行的規劃建議。",
  },
  {
    question: "OK PRIME 白金高輪位於哪裡？",
    answer:
      "OK PRIME 白金高輪位於東京港區白金高輪一帶，鄰近白金高輪站，享有品川生活圈、運河水岸與港區核心地段等優勢，是兼具生活質感與資產價值的精品住宅選擇。",
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
const orgId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const webpageId = `${pageUrl}#webpage`;
const listingId = `${pageUrl}#listing`;
const residenceId = `${pageUrl}#residence`;

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
    "geo.region": "JP-13",
    "geo.placename": "Minato City, Tokyo",
  },
};

export function getLandingPage01JsonLd() {
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
        name: projectName,
        item: pageUrl,
      },
    ],
  };

  const webPage = {
    "@type": ["WebPage", "CollectionPage"],
    "@id": webpageId,
    url: pageUrl,
    name: landingPage01Seo.title,
    description: landingPage01Seo.description,
    inLanguage: "zh-TW",
    isPartOf: { "@id": websiteId },
    about: [{ "@id": listingId }, { "@id": orgId }],
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
      "@id": orgId,
      name: siteConfig.name,
      url: siteUrl,
    },
    significantLink: pageSections.map((section) => `${pageUrl}${section.url}`),
    hasPart: pageSections.map((section, index) => ({
      "@type": "WebPageElement",
      "@id": `${pageUrl}#section-${index + 1}`,
      name: section.name,
      url: `${pageUrl}${section.url}`,
    })),
    mainEntity: { "@id": listingId },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".lp-fv-headline", ".lp-sr-heading"],
    },
  };

  const listing = {
    "@type": "RealEstateListing",
    "@id": listingId,
    name: projectName,
    alternateName: [brandName, projectSubtitle, "白金高輪精品住宅"],
    description: landingPage01Seo.description,
    url: pageUrl,
    image: [ogImageUrl, absoluteUrl("/images/landing-page/港區核心.png")],
    inLanguage: "zh-TW",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.propertyAddress.addressLocality,
      addressRegion: siteConfig.propertyAddress.addressRegion,
      addressCountry: siteConfig.propertyAddress.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6431,
      longitude: 139.7402,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${pageUrl}#SeminarRegistrationForm`,
      priceCurrency: "JPY",
      seller: { "@id": orgId },
      offeredBy: { "@id": orgId },
    },
    broker: { "@id": orgId },
    provider: { "@id": orgId },
  };

  const residence = {
    "@type": ["Residence", "ApartmentComplex"],
    "@id": residenceId,
    name: projectName,
    description:
      "坐落東京港區白金高輪核心，兼具品川生活圈、運河水岸與質感生活圈的稀有精品住宅，適合長期自住與資產配置。",
    url: pageUrl,
    image: ogImageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "港區",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6431,
      longitude: 139.7402,
    },
    containedInPlace: {
      "@type": "Place",
      name: "白金高輪",
      address: {
        "@type": "PostalAddress",
        addressLocality: "港區",
        addressRegion: "東京都",
        addressCountry: "JP",
      },
    },
  };

  const seminarEvents = seminarSessions.map((session, index) => ({
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
      name: seminarLocation.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: seminarLocation.streetAddress,
        addressLocality: seminarLocation.addressLocality,
        addressRegion: seminarLocation.addressRegion,
        postalCode: seminarLocation.postalCode,
        addressCountry: seminarLocation.addressCountry,
      },
    },
    organizer: {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      telephone: siteConfig.taipeiPhone,
    },
    performer: {
      "@type": "Organization",
      "@id": orgId,
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
    about: { "@id": listingId },
  }));

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
      ...seminarEvents,
      faqPage,
      contactPoint,
    ],
  };
}
