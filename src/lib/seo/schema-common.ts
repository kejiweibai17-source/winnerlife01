import {
  absoluteUrl,
  getBuildingDisplayName,
  getProjectAlternateNames,
  homeSitelinks,
  siteConfig,
} from "@/lib/site";
import {
  getPropertyGeo,
  getPropertyPlace,
  getPropertyPostalAddress,
  getTaipeiOfficeAddress,
  getTaipeiOfficeGeo,
  officeOpenDays,
} from "@/lib/seo/geo";

export type Locale = "zh" | "jp";

export function localeLang(locale: Locale) {
  return locale === "jp" ? "ja" : "zh-TW";
}

export function homePath(locale: Locale) {
  return locale === "jp" ? "/jp" : "/";
}

export function alternateHomePath(locale: Locale) {
  return locale === "jp" ? "/" : "/jp";
}

export function orgId() {
  return `${absoluteUrl("/")}#organization`;
}

export function websiteId() {
  return `${absoluteUrl("/")}#website`;
}

/** Canonical listing / residence live on the zh homepage so inner pages do not mint duplicates. */
export function listingId(_locale: Locale = "zh") {
  return `${absoluteUrl("/")}#listing`;
}

export function residenceId() {
  return `${absoluteUrl("/")}#residence`;
}

export function buildWebsiteStub() {
  return {
    "@type": "WebSite" as const,
    "@id": websiteId(),
    name: "OK PRIME",
    alternateName: getProjectAlternateNames(),
    url: absoluteUrl("/"),
  };
}

export function propertyPlaceId() {
  return `${absoluteUrl("/")}#property-place`;
}

/** Full Organization + RealEstateAgent + LocalBusiness for Google local/knowledge */
export function buildOrganization(locale: Locale) {
  const siteUrl = absoluteUrl("/");
  const logoUrl = absoluteUrl(siteConfig.logo);
  const iconUrl = absoluteUrl(siteConfig.icons.icon512);
  const ogImage = absoluteUrl(siteConfig.ogImage);

  return {
    "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
    "@id": orgId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [
      siteConfig.legalName,
      "WinnerLife",
      siteConfig.parentBrand,
      "Jung Shing Real Estate",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}#logo`,
      url: iconUrl,
      contentUrl: iconUrl,
      width: 512,
      height: 512,
      caption: siteConfig.name,
    },
    image: [iconUrl, logoUrl, ogImage],
    email: siteConfig.email,
    telephone: [siteConfig.taipeiPhone, siteConfig.phone],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.taipeiPhone,
        contactType: "customer service",
        areaServed: ["TW", "JP"],
        availableLanguage: ["zh-TW", "ja", "en"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...officeOpenDays],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
        areaServed: "JP",
        availableLanguage: ["ja", "zh-TW"],
      },
    ],
    address: getTaipeiOfficeAddress(),
    geo: getTaipeiOfficeGeo(),
    hasMap: `https://maps.google.com/?q=${siteConfig.officeGeo.latitude},${siteConfig.officeGeo.longitude}`,
    areaServed: [
      ...siteConfig.areaServed.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      { "@id": propertyPlaceId() },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...officeOpenDays],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$$$",
    currenciesAccepted: "TWD, JPY",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    knowsAbout: [
      "OK PRIME",
      "OK PRIME 白金高輪",
      getBuildingDisplayName(),
      "日本不動產",
      "東京住宅",
      "海外置產",
      "品川",
      "港区",
      "白金高輪",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: locale === "jp" ? "不動産仲介業免許" : "不動產仲介業執照",
      name: siteConfig.license,
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentBrand,
      url: siteConfig.corporateUrl,
    },
    sameAs: [...siteConfig.sameAs],
    description:
      locale === "jp"
        ? "忠訓地產は OK PRIME+ 白金高輪の日本不動産マーケティング・見学予約・投資相談を担当する不動産エージェントです。"
        : "忠訓地產為 OK PRIME+ 白金高輪日本建案之官方行銷代理，提供日本置產、賞屋預約與投資諮詢服務。",
  };
}

export function buildRealEstateAgentStub() {
  return {
    "@type": "RealEstateAgent",
    "@id": `${absoluteUrl("/")}#realestate-agent`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(siteConfig.logo),
    telephone: siteConfig.taipeiPhone,
    email: siteConfig.email,
    address: getTaipeiOfficeAddress(),
    geo: getTaipeiOfficeGeo(),
    areaServed: [{ "@id": propertyPlaceId() }, getPropertyPostalAddress()],
    parentOrganization: { "@id": orgId() },
  };
}

/** Consulting / viewing services offered by the agency */
export function buildAgencyServices(locale: Locale) {
  const services =
    locale === "jp"
      ? [
          {
            name: "モデルルーム見学予約",
            description: "OK PRIME+ 白金高輪のモデルルーム見学予約・現地案内。",
            url: absoluteUrl("/jp/contact"),
          },
          {
            name: "住戸登録・資料請求",
            description: "物件登録者限定の資料・最新情報のご案内。",
            url: absoluteUrl("/jp/contact"),
          },
          {
            name: "日本不動産投資相談",
            description: "東京港区物件の投資・税務・資産配置のご相談。",
            url: absoluteUrl("/jp/contact"),
          },
        ]
      : [
          {
            name: "樣品屋參觀預約",
            description: "OK PRIME+ 白金高輪樣品屋參觀預約與現地導覽。",
            url: absoluteUrl("/contact"),
          },
          {
            name: "房源登記・資料索取",
            description: "登記後取得專屬資料與最新房源資訊。",
            url: absoluteUrl("/contact"),
          },
          {
            name: "日本置產諮詢",
            description: "東京港區物件投資、稅務與資產配置諮詢。",
            url: absoluteUrl("/contact"),
          },
        ];

  return services.map((service, index) => ({
    "@type": "Service",
    "@id": `${absoluteUrl(homePath(locale))}#service-${index + 1}`,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { "@id": orgId() },
    areaServed: { "@id": propertyPlaceId() },
    serviceType: "RealEstateBrokerage",
  }));
}

export function buildSitelinksItemList(locale: Locale) {
  /** Google sitelinks typically surface ~6; keep the primary set focused */
  const navLinks = homeSitelinks[locale].slice(0, 6);
  const pageUrl = absoluteUrl(homePath(locale));
  const sitelinksId = `${pageUrl}#sitelinks`;

  return {
    "@type": "ItemList",
    "@id": sitelinksId,
    name: locale === "jp" ? "OK PRIME+ 白金高輪 主要ページ" : "OK PRIME+ 白金高輪 主要頁面",
    description:
      locale === "jp"
        ? "公式サイトの主要セクション：立地・交通・物件概要・設備・お問い合わせ"
        : "官方網站主要章節：地段、交通、物件概要、設備與聯絡諮詢",
    numberOfItems: navLinks.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: navLinks.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.name,
      description: link.description,
      url: absoluteUrl(link.path),
      item: {
        "@type": "WebPage",
        "@id": `${absoluteUrl(link.path)}#webpage`,
        name: link.name,
        description: link.description,
        url: absoluteUrl(link.path),
        isPartOf: { "@id": websiteId() },
        inLanguage: localeLang(locale),
      },
    })),
  };
}

export function buildSiteNavigationElements(locale: Locale) {
  const pageUrl = absoluteUrl(homePath(locale));
  /** Full crawlable nav set (HTML sr-only + JSON-LD); ItemList uses top 6 */
  return homeSitelinks[locale].map((link, index) => ({
    "@type": "SiteNavigationElement",
    "@id": `${pageUrl}#nav-${index + 1}`,
    name: link.name,
    description: link.description,
    url: absoluteUrl(link.path),
    position: index + 1,
    isPartOf: { "@id": websiteId() },
  }));
}

export function buildPropertyListingRef() {
  return {
    "@type": "RealEstateListing" as const,
    "@id": listingId(),
    name: getBuildingDisplayName(),
    alternateName: getProjectAlternateNames(),
    url: absoluteUrl("/"),
    brand: { "@type": "Brand", name: "OK PRIME" },
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
    contentLocation: { "@id": propertyPlaceId() },
  };
}

export function buildPropertyListing(locale: Locale) {
  const ogImage = absoluteUrl(siteConfig.ogImage);
  const canonicalUrl = absoluteUrl("/");
  return {
    "@type": "RealEstateListing",
    "@id": listingId(),
    name: getBuildingDisplayName(),
    alternateName: getProjectAlternateNames(),
    description:
      locale === "jp"
        ? "東京港区三田5-5-10の賃貸レジデンス。全14戸。白金高輪駅徒歩約5分、ALSOK防犯。"
        : "東京港區三田5-5-10出租公寓。全案14戶。白金高輪站步行約5分、ALSOK 保全。",
    url: canonicalUrl,
    image: [ogImage, absoluteUrl(siteConfig.icons.icon512)],
    inLanguage: localeLang(locale),
    datePosted: "2024-01-01",
    brand: { "@type": "Brand", name: "OK PRIME" },
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
    contentLocation: { "@id": propertyPlaceId() },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(locale === "jp" ? "/jp/contact" : "/contact"),
      priceCurrency: "JPY",
      category: "ApartmentRental",
      seller: { "@id": `${absoluteUrl("/")}#realestate-agent` },
      offeredBy: { "@id": orgId() },
    },
    broker: { "@id": `${absoluteUrl("/")}#realestate-agent` },
    provider: { "@id": orgId() },
    mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
  };
}

export function buildApartmentComplex(locale: Locale) {
  const canonicalUrl = absoluteUrl("/");
  const residenceDescription =
    locale === "jp"
      ? "全14戸。港区三田5-5-10、白金高輪駅徒歩約5分。三田・田町・泉岳寺も徒歩圏。ALSOK防犯・スマート設備完備。"
      : "全案14戶。港區三田5-5-10，白金高輪站步行約5分。三田・田町・泉岳寺亦在步行圈。ALSOK 保全與智慧設備完備。";

  return {
    "@type": ["ApartmentComplex", "Residence", "Accommodation"],
    "@id": residenceId(),
    name: getBuildingDisplayName(),
    alternateName: getProjectAlternateNames(),
    description: residenceDescription,
    url: canonicalUrl,
    image: absoluteUrl(siteConfig.ogImage),
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    numberOfAccommodationUnits: 14,
    numberOfBedrooms: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3 },
    petsAllowed: false,
    smokingAllowed: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "ALSOK ホームセキュリティ", value: true },
      { "@type": "LocationFeatureSpecification", name: "IoT スマートホーム", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "jp" ? "白金高輪駅徒歩約5分" : "白金高輪站步行約5分",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "jp" ? "三田・田町駅徒歩圏" : "三田・田町站步行圈",
        value: true,
      },
    ],
    containedInPlace: getPropertyPlace(locale),
    publicAccess: false,
    hasMap: siteConfig.propertyGeo.mapUrl,
  };
}

export function buildTranslationLink(locale: Locale, zhPath: string, jpPath: string) {
  const selfPath = locale === "jp" ? jpPath : zhPath;
  const otherPath = locale === "jp" ? zhPath : jpPath;
  const otherLang = locale === "jp" ? "zh-TW" : "ja";

  return {
    workTranslation: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(otherPath)}#webpage`,
      url: absoluteUrl(otherPath),
      inLanguage: otherLang,
    },
    mainEntityOfPage: absoluteUrl(selfPath),
  };
}
