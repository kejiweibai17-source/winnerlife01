import {
  absoluteUrl,
  getBuildingDisplayName,
  getHomeDescription,
  getHomePageTitle,
  homeSitelinks,
  siteConfig,
} from "@/lib/site";

type Locale = "zh" | "jp";

export function getHomeJsonLd(locale: Locale = "zh") {
  const pagePath = locale === "jp" ? "/jp" : "/";
  const pageUrl = absoluteUrl(pagePath);
  const siteUrl = absoluteUrl("/");
  const ogImage = absoluteUrl(siteConfig.ogImage);
  const logoUrl = absoluteUrl(siteConfig.logo);
  const inLanguage = locale === "jp" ? "ja" : "zh-TW";
  const homeLabel = locale === "jp" ? "トップ" : "首頁";
  const title = getHomePageTitle(locale);
  const description = getHomeDescription(locale);
  const residenceDescription =
    locale === "jp"
      ? "233戸の住まいが緑と水に囲まれ、南に運河を望む。天王洲アイル駅徒歩圏、品川・港区のコア生活圏。"
      : "233戶住宅環繞綠意與水景，向南可眺望運河。鄰近天王洲艾爾站，品川・港區核心生活圈。";

  const orgId = `${siteUrl}#organization`;
  const agentId = `${siteUrl}#realestate-agent`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const listingId = `${pageUrl}#listing`;
  const residenceId = `${pageUrl}#residence`;
  const sitelinksId = `${pageUrl}#sitelinks`;

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };

  const propertyAddress = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.propertyAddress.addressLocality,
    addressRegion: siteConfig.propertyAddress.addressRegion,
    addressCountry: siteConfig.propertyAddress.addressCountry,
  };

  const organization = {
    "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.legalName, "WinnerLife", "OK忠訓國際集團", "忠訓地產開發有限公司"],
    url: siteUrl,
    mainEntityOfPage: { "@id": webpageId },
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}#logo`,
      url: logoUrl,
      contentUrl: logoUrl,
    },
    image: logoUrl,
    email: siteConfig.email,
    telephone: [siteConfig.taipeiPhone, siteConfig.phone],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.taipeiPhone,
        contactType: locale === "jp" ? "customer service" : "customer service",
        areaServed: "TW",
        availableLanguage: ["zh-TW", "ja", "en"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "JP",
        availableLanguage: ["ja", "zh-TW"],
      },
    ],
    address: postalAddress,
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
    priceRange: "$$$$",
    knowsAbout: [
      "日本不動產",
      "東京住宅",
      "海外置產",
      "EL FARO+ 白金高輪",
      "品川",
      "港区",
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
    sameAs: [siteConfig.corporateUrl],
    description:
      locale === "jp"
        ? "忠訓地產は EL FARO+ 白金高輪の日本不動産マーケティング・見学予約・投資相談を担当する不動産エージェントです。"
        : "忠訓地產為 EL FARO+ 白金高輪日本建案之官方行銷代理，提供日本置產、賞屋預約與投資諮詢服務。",
  };

  const realEstateAgent = {
    "@type": "RealEstateAgent",
    "@id": agentId,
    name: siteConfig.name,
    url: siteUrl,
    image: logoUrl,
    telephone: siteConfig.taipeiPhone,
    email: siteConfig.email,
    address: postalAddress,
    areaServed: propertyAddress,
    parentOrganization: { "@id": orgId },
    makesOffer: { "@id": listingId },
  };

  const navLinks = homeSitelinks[locale];

  const siteNavigationElements = navLinks.map((link, index) => ({
    "@type": "SiteNavigationElement",
    "@id": `${pageUrl}#nav-${index + 1}`,
    name: link.name,
    description: link.description,
    url: absoluteUrl(link.path),
    position: index + 1,
    isPartOf: { "@id": websiteId },
  }));

  const sitelinksList = {
    "@type": "ItemList",
    "@id": sitelinksId,
    name: locale === "jp" ? "EL FARO+ 白金高輪 主要ページ" : "EL FARO+ 白金高輪 主要頁面",
    description:
      locale === "jp"
        ? "忠訓地產 EL FARO+ 白金高輪 公式サイトの主要セクション"
        : "忠訓地產 EL FARO+ 白金高輪 官方網站主要導覽",
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
        "@id": absoluteUrl(link.path),
        name: link.name,
        description: link.description,
        url: absoluteUrl(link.path),
        isPartOf: { "@id": websiteId },
      },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: getBuildingDisplayName(),
    alternateName: [siteConfig.buildingName, "EL FARO+ SHIROKANE-TAKANAWA"],
    description,
    publisher: { "@id": orgId },
    copyrightHolder: { "@id": orgId },
    inLanguage: ["zh-TW", "ja"],
    about: { "@id": listingId },
    hasPart: { "@id": sitelinksId },
    mainEntity: { "@id": listingId },
  };

  const webPage = {
    "@type": ["WebPage", "CollectionPage"],
    "@id": webpageId,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    about: [{ "@id": listingId }, { "@id": orgId }],
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
      contentUrl: ogImage,
    },
    inLanguage,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    hasPart: [{ "@id": sitelinksId }, ...siteNavigationElements.map((el) => ({ "@id": el["@id"] }))],
    significantLink: navLinks.map((link) => absoluteUrl(link.path)),
    mainEntity: { "@id": listingId },
    publisher: { "@id": orgId },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-title"],
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: pageUrl,
      },
    ],
  };

  const listing = {
    "@type": "RealEstateListing",
    "@id": listingId,
    name: getBuildingDisplayName(),
    description,
    url: pageUrl,
    image: [ogImage],
    inLanguage,
    datePosted: "2019-01-01",
    address: propertyAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6431,
      longitude: 139.7402,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      priceCurrency: "JPY",
      seller: { "@id": agentId },
      offeredBy: { "@id": orgId },
    },
    broker: { "@id": agentId },
    provider: { "@id": orgId },
  };

  const residence = {
    "@type": ["ApartmentComplex", "Residence"],
    "@id": residenceId,
    name: getBuildingDisplayName(),
    alternateName: siteConfig.buildingName,
    description: residenceDescription,
    url: pageUrl,
    image: ogImage,
    address: propertyAddress,
    numberOfAccommodationUnits: 233,
    numberOfBedrooms: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3 },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "ALSOK ホームセキュリティ", value: true },
      { "@type": "LocationFeatureSpecification", name: "IoT スマートホーム", value: true },
      { "@type": "LocationFeatureSpecification", name: locale === "jp" ? "運河ビュー" : "運河景觀", value: true },
    ],
    containedInPlace: {
      "@type": "Place",
      name: locale === "jp" ? "白金高輪・港南エリア" : "白金高輪・港南區域",
      address: propertyAddress,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      realEstateAgent,
      website,
      sitelinksList,
      ...siteNavigationElements,
      webPage,
      breadcrumb,
      listing,
      residence,
    ],
  };
}
