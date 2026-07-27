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

export function getPropertyPlace(locale: "zh" | "jp" = "zh") {
  return {
    "@type": "Place" as const,
    "@id": `${absoluteUrl("/")}#property-place`,
    name:
      locale === "jp"
        ? `${getBuildingDisplayName()}（白金高輪・港南）`
        : `${getBuildingDisplayName()}（白金高輪・港南）`,
    address: getPropertyPostalAddress(),
    geo: getPropertyGeo(),
    hasMap: siteConfig.propertyGeo.mapUrl,
  };
}

export function getOrganizationStub() {
  return {
    "@type": ["Organization", "RealEstateAgent"] as string[],
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
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
