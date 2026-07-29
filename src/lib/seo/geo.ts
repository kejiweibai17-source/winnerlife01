import { absoluteUrl, getBuildingDisplayName, siteConfig } from "@/lib/site";

/** Shared geo / place schema helpers for homepage and inner pages */

export function getTaipeiOfficeAddress() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };
}

export function getPropertyPostalAddress() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: siteConfig.propertyAddress.streetAddress,
    addressLocality: siteConfig.propertyAddress.addressLocality,
    addressRegion: siteConfig.propertyAddress.addressRegion,
    postalCode: siteConfig.propertyAddress.postalCode,
    addressCountry: siteConfig.propertyAddress.addressCountry,
  };
}

export function getPropertyGeo() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: siteConfig.propertyGeo.latitude,
    longitude: siteConfig.propertyGeo.longitude,
  };
}

export function getTaipeiOfficeGeo() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: siteConfig.officeGeo.latitude,
    longitude: siteConfig.officeGeo.longitude,
  };
}

/** Tokyo → Minato → Konan / Shirokane-Takanawa place hierarchy */
export function getJapanCountry() {
  return {
    "@type": "Country" as const,
    "@id": `${absoluteUrl("/")}#country-jp`,
    name: "Japan",
    alternateName: ["日本", "日本国"],
  };
}

export function getTokyoRegion(locale: "zh" | "jp" = "zh") {
  return {
    "@type": "AdministrativeArea" as const,
    "@id": `${absoluteUrl("/")}#tokyo`,
    name: locale === "jp" ? "東京都" : "東京都",
    alternateName: ["Tokyo", "Tokyo Metropolis"],
    containedInPlace: { "@id": `${absoluteUrl("/")}#country-jp` },
  };
}

export function getMinatoCity(locale: "zh" | "jp" = "zh") {
  return {
    "@type": "City" as const,
    "@id": `${absoluteUrl("/")}#minato`,
    name: locale === "jp" ? "港区" : "港區",
    alternateName: ["Minato City", "Minato-ku", "港区"],
    containedInPlace: { "@id": `${absoluteUrl("/")}#tokyo` },
  };
}

export function getPropertyPlace(locale: "zh" | "jp" = "zh") {
  return {
    "@type": ["Place", "Residence"] as string[],
    "@id": `${absoluteUrl("/")}#property-place`,
    name:
      locale === "jp"
        ? `${getBuildingDisplayName()}（白金高輪・港南）`
        : `${getBuildingDisplayName()}（白金高輪・港南）`,
    alternateName: [
      "EL FARO+ SHIROKANE-TAKANAWA",
      locale === "jp" ? "白金高輪・港南" : "白金高輪・港南",
    ],
    description:
      locale === "jp"
        ? "東京都港区港南エリア。運河沿いの水辺景観と品川・白金高輪の都市機能が近接する立地。"
        : "東京都港區港南地區。運河濱水景觀與品川・白金高輪都市機能近接的立地。",
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
    latitude: siteConfig.propertyGeo.latitude,
    longitude: siteConfig.propertyGeo.longitude,
    containedInPlace: { "@id": `${absoluteUrl("/")}#minato` },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "nearestStation",
        value: locale === "jp" ? "天王洲アイル駅・白金高輪駅" : "天王洲艾爾站・白金高輪站",
      },
      {
        "@type": "PropertyValue",
        name: "units",
        value: "233",
      },
    ],
  };
}

/** Full geo graph nodes to embed on pages that need location richness */
export function getPropertyGeoGraph(locale: "zh" | "jp" = "zh") {
  return [getJapanCountry(), getTokyoRegion(locale), getMinatoCity(locale), getPropertyPlace(locale)];
}

export function getOrganizationStub() {
  return {
    "@type": ["Organization", "RealEstateAgent"] as string[],
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.icons.icon512),
    telephone: siteConfig.taipeiPhone,
    email: siteConfig.email,
    address: getTaipeiOfficeAddress(),
  };
}

/** Opening days matching siteConfig.businessHoursDisplay (Wed–Fri closed) */
export const officeOpenDays = [
  "Monday",
  "Tuesday",
  "Saturday",
  "Sunday",
] as const;

/** HTML geo meta tags for page Metadata.other */
export function getGeoMetaOther() {
  return {
    "geo.region": "JP-13",
    "geo.placename": "Minato City, Tokyo",
    "geo.position": `${siteConfig.propertyGeo.latitude};${siteConfig.propertyGeo.longitude}`,
    ICBM: `${siteConfig.propertyGeo.latitude}, ${siteConfig.propertyGeo.longitude}`,
  } as const;
}
