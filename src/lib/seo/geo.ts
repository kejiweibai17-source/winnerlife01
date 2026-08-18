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

/** Tokyo → Minato → Mita / Shirokane-Takanawa place hierarchy */
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
    name: "東京都",
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

export function getMitaNeighborhood(locale: "zh" | "jp" = "zh") {
  return {
    "@type": "Place" as const,
    "@id": `${absoluteUrl("/")}#mita`,
    name: locale === "jp" ? "三田" : "三田",
    alternateName: ["Mita", "港区三田", "港區三田"],
    containedInPlace: { "@id": `${absoluteUrl("/")}#minato` },
  };
}

export function getShirokaneTakanawaNeighborhood(locale: "zh" | "jp" = "zh") {
  return {
    "@type": "Place" as const,
    "@id": `${absoluteUrl("/")}#shirokane-takanawa`,
    name: "白金高輪",
    alternateName: ["Shirokane-Takanawa", "白金高輪"],
    containedInPlace: { "@id": `${absoluteUrl("/")}#minato` },
  };
}

export function getNearbyStations(locale: "zh" | "jp" = "zh") {
  const minato = { "@id": `${absoluteUrl("/")}#minato` };
  return [
    {
      "@type": "TrainStation" as const,
      "@id": `${absoluteUrl("/")}#station-shirokane-takanawa`,
      name: locale === "jp" ? "白金高輪駅" : "白金高輪站",
      alternateName: ["Shirokane-takanawa Station", "白金高輪駅"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.64315,
        longitude: 139.73435,
      },
      containedInPlace: minato,
      sameAs: ["https://en.wikipedia.org/wiki/Shirokane-takanawa_Station"],
      additionalProperty: {
        "@type": "PropertyValue",
        name: locale === "jp" ? "徒歩" : "步行",
        value: locale === "jp" ? "約5分" : "約5分",
      },
    },
    {
      "@type": "TrainStation" as const,
      "@id": `${absoluteUrl("/")}#station-mita`,
      name: locale === "jp" ? "三田駅" : "三田站",
      alternateName: ["Mita Station", "三田駅"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.64805,
        longitude: 139.7487,
      },
      containedInPlace: minato,
      sameAs: ["https://en.wikipedia.org/wiki/Mita_Station"],
    },
    {
      "@type": "TrainStation" as const,
      "@id": `${absoluteUrl("/")}#station-tamachi`,
      name: locale === "jp" ? "田町駅" : "田町站",
      alternateName: ["Tamachi Station", "田町駅"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.64573,
        longitude: 139.74758,
      },
      containedInPlace: minato,
      sameAs: ["https://en.wikipedia.org/wiki/Tamachi_Station_(Tokyo)"],
    },
  ];
}

export function getPropertyPlace(locale: "zh" | "jp" = "zh") {
  return {
    "@type": ["Place", "Residence"] as string[],
    "@id": `${absoluteUrl("/")}#property-place`,
    name:
      locale === "jp"
        ? `${getBuildingDisplayName()}（港区三田・白金高輪）`
        : `${getBuildingDisplayName()}（港區三田・白金高輪）`,
    alternateName: [
      "OK PRIME",
      "OK PRIME 白金高輪",
      "OK PRIME SHIROKANE TAKANAWA",
      "OK PRIME+ SHIROKANE-TAKANAWA",
      "5-5-10 Mita, Minato City, Tokyo",
      locale === "jp" ? "港区三田5-5-10" : "港區三田5-5-10",
    ],
    description:
      locale === "jp"
        ? "東京都港区三田5-5-10（〒108-0073）。白金高輪駅徒歩約5分。三田・田町・泉岳寺も徒歩圏の港区コア立地。"
        : "東京都港區三田5-5-10（〒108-0073）。白金高輪站步行約5分，三田・田町・泉岳寺亦在步行圈內的港區核心立地。",
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
    latitude: siteConfig.propertyGeo.latitude,
    longitude: siteConfig.propertyGeo.longitude,
    containedInPlace: { "@id": `${absoluteUrl("/")}#mita` },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "nearestStation",
        value:
          locale === "jp"
            ? "白金高輪駅（徒歩約5分）・三田駅・田町駅"
            : "白金高輪站（步行約5分）・三田站・田町站",
      },
      {
        "@type": "PropertyValue",
        name: "units",
        value: "14",
      },
      {
        "@type": "PropertyValue",
        name: "postalCode",
        value: siteConfig.propertyAddress.postalCode,
      },
    ],
  };
}

/** Full geo graph nodes to embed on pages that need location richness */
export function getPropertyGeoGraph(locale: "zh" | "jp" = "zh") {
  return [
    getJapanCountry(),
    getTokyoRegion(locale),
    getMinatoCity(locale),
    getMitaNeighborhood(locale),
    getShirokaneTakanawaNeighborhood(locale),
    ...getNearbyStations(locale),
    getPropertyPlace(locale),
  ];
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

/** Opening days matching siteConfig.businessHoursDisplay (Sat–Sun closed) */
export const officeOpenDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
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
