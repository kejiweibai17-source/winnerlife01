import {
  absoluteUrl,
  getBuildingDisplayName,
  getHomePageTitle,
  siteConfig,
} from "@/lib/site";

export function getHomeJsonLd() {
  const pageUrl = absoluteUrl("/");
  const ogImage = absoluteUrl(siteConfig.ogImage);
  const logoUrl = absoluteUrl(siteConfig.logo);

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.corporateUrl}/#organization`,
    name: siteConfig.legalName,
    alternateName: [siteConfig.name, "WinnerLife", "OK忠訓國際集團"],
    url: siteConfig.corporateUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    email: siteConfig.email,
    telephone: siteConfig.taipeiPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentBrand,
    },
  };

  const realEstateAgent = {
    "@type": "RealEstateAgent",
    "@id": `${pageUrl}#agent`,
    name: siteConfig.name,
    url: siteConfig.corporateUrl,
    telephone: siteConfig.taipeiPhone,
    email: siteConfig.email,
    image: logoUrl,
    address: organization.address,
    parentOrganization: {
      "@id": organization["@id"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${pageUrl}#website`,
    url: pageUrl,
    name: getBuildingDisplayName(),
    description: siteConfig.description,
    publisher: { "@id": organization["@id"] },
    inLanguage: siteConfig.locale,
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: getHomePageTitle(),
    description: siteConfig.description,
    isPartOf: { "@id": website["@id"] },
    about: { "@id": `${pageUrl}#listing` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    inLanguage: siteConfig.locale,
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: pageUrl,
      },
    ],
  };

  const listing = {
    "@type": "RealEstateListing",
    "@id": `${pageUrl}#listing`,
    name: getBuildingDisplayName(),
    description: siteConfig.description,
    url: pageUrl,
    image: [ogImage],
    inLanguage: siteConfig.locale,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.propertyAddress.addressLocality,
      addressRegion: siteConfig.propertyAddress.addressRegion,
      addressCountry: siteConfig.propertyAddress.addressCountry,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      seller: { "@id": realEstateAgent["@id"] },
    },
    broker: { "@id": realEstateAgent["@id"] },
  };

  const residence = {
    "@type": "ApartmentComplex",
    "@id": `${pageUrl}#residence`,
    name: siteConfig.buildingName,
    description:
      "233戶住宅，環繞綠意與水景，向南可眺望運河。鄰近天王洲艾爾站，品川・港區核心生活圈。",
    url: pageUrl,
    image: ogImage,
    address: listing.address,
    numberOfAccommodationUnits: 233,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      realEstateAgent,
      website,
      webPage,
      breadcrumb,
      listing,
      residence,
    ],
  };
}
