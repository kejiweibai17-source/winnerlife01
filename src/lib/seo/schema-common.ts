import {
  absoluteUrl,
  getBuildingDisplayName,
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

export function listingId(locale: Locale = "zh") {
  return `${absoluteUrl(homePath(locale))}#listing`;
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
          opens: "10:00",
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
      opens: "10:00",
      closes: "18:00",
    },
    priceRange: "$$$$",
    currenciesAccepted: "TWD, JPY",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    knowsAbout: [
      "日本不動產",
      "東京住宅",
      "海外置產",
      getBuildingDisplayName(),
      "品川",
      "港区",
      "白金高輪",
      "EL FARO+",
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
        ? "忠訓地產は EL FARO+ 白金高輪の日本不動産マーケティング・見学予約・投資相談を担当する不動産エージェントです。"
        : "忠訓地產為 EL FARO+ 白金高輪日本建案之官方行銷代理，提供日本置產、賞屋預約與投資諮詢服務。",
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
            description: "EL FARO+ 白金高輪のモデルルーム見学予約・現地案内。",
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
            description: "EL FARO+ 白金高輪樣品屋參觀預約與現地導覽。",
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
  const pageUrl = absoluteUrl(homePath(locale));
  const navLinks = homeSitelinks[locale];
  const sitelinksId = `${pageUrl}#sitelinks`;

  return {
    "@type": "ItemList",
    "@id": sitelinksId,
    name: locale === "jp" ? "EL FARO+ 白金高輪 主要ページ" : "EL FARO+ 白金高輪 主要頁面",
    description:
      locale === "jp"
        ? "公式サイトの主要セクション：コンセプト・立地・交通・建築・設備・お問い合わせ"
        : "官方網站主要章節：建案理念、地段、交通、建築、設備與聯絡諮詢",
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

export function buildPropertyListing(locale: Locale, pageUrl: string) {
  const ogImage = absoluteUrl(siteConfig.ogImage);
  return {
    "@type": "RealEstateListing",
    "@id": `${pageUrl}#listing`,
    name: getBuildingDisplayName(),
    description:
      locale === "jp"
        ? "東京港区・白金高輪の賃貸レジデンス。233戸、運河ビュー、ALSOK防犯。"
        : "東京港區・白金高輪出租公寓。233戶、運河景觀、ALSOK 保全。",
    url: pageUrl,
    image: [ogImage, absoluteUrl(siteConfig.icons.icon512)],
    inLanguage: localeLang(locale),
    datePosted: "2024-01-01",
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
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
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
  };
}

export function buildApartmentComplex(locale: Locale, pageUrl: string) {
  const residenceDescription =
    locale === "jp"
      ? "233戸の住まいが緑と水に囲まれ、南に運河を望む。天王洲アイル駅徒歩圏、品川・港区のコア生活圏。"
      : "233戶住宅環繞綠意與水景，向南可眺望運河。鄰近天王洲艾爾站，品川・港區核心生活圈。";

  return {
    "@type": ["ApartmentComplex", "Residence", "Accommodation"],
    "@id": `${pageUrl}#residence`,
    name: getBuildingDisplayName(),
    alternateName: [siteConfig.buildingName, "EL FARO+ SHIROKANE-TAKANAWA"],
    description: residenceDescription,
    url: pageUrl,
    image: absoluteUrl(siteConfig.ogImage),
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    numberOfAccommodationUnits: 233,
    numberOfBedrooms: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3 },
    petsAllowed: false,
    smokingAllowed: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "ALSOK ホームセキュリティ", value: true },
      { "@type": "LocationFeatureSpecification", name: "IoT スマートホーム", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "jp" ? "運河ビュー" : "運河景觀",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: locale === "jp" ? "天王洲アイル駅徒歩圏" : "天王洲艾爾站步行圈",
        value: true,
      },
    ],
    containedInPlace: getPropertyPlace(locale),
    publicAccess: false,
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
