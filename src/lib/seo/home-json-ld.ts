import {
  absoluteUrl,
  getBuildingDisplayName,
  getHomeDescription,
  getHomePageTitle,
  homeFaqItems,
  homeSitelinks,
  siteConfig,
} from "@/lib/site";
import { getPropertyGeoGraph } from "@/lib/seo/geo";
import {
  buildAgencyServices,
  buildApartmentComplex,
  buildOrganization,
  buildPropertyListing,
  buildRealEstateAgentStub,
  buildSiteNavigationElements,
  buildSitelinksItemList,
  homePath,
  localeLang,
  orgId,
  propertyPlaceId,
  websiteId,
  type Locale,
} from "@/lib/seo/schema-common";

export function getHomeJsonLd(locale: Locale = "zh") {
  const pagePath = homePath(locale);
  const pageUrl = absoluteUrl(pagePath);
  const altPath = locale === "jp" ? "/" : "/jp";
  const altUrl = absoluteUrl(altPath);
  const siteUrl = absoluteUrl("/");
  const ogImage = absoluteUrl(siteConfig.ogImage);
  const inLanguage = localeLang(locale);
  const homeLabel = locale === "jp" ? "トップ" : "首頁";
  const title = getHomePageTitle(locale);
  const description = getHomeDescription(locale);

  const org = buildOrganization(locale);
  const agent = {
    ...buildRealEstateAgentStub(),
    makesOffer: { "@id": `${pageUrl}#listing` },
  };

  const navLinks = homeSitelinks[locale];
  const sitelinksList = buildSitelinksItemList(locale);
  const siteNavigationElements = buildSiteNavigationElements(locale);
  const services = buildAgencyServices(locale);
  const listing = buildPropertyListing(locale, pageUrl);
  const residence = buildApartmentComplex(locale, pageUrl);
  const geoGraph = getPropertyGeoGraph(locale);

  const website = {
    "@type": "WebSite",
    "@id": websiteId(),
    url: siteUrl,
    name: getBuildingDisplayName(),
    alternateName: [siteConfig.buildingName, "EL FARO+ SHIROKANE-TAKANAWA", siteConfig.name],
    description,
    publisher: { "@id": orgId() },
    copyrightHolder: { "@id": orgId() },
    inLanguage: ["zh-TW", "ja"],
    about: [{ "@id": `${pageUrl}#listing` }, { "@id": propertyPlaceId() }],
    hasPart: [
      { "@id": `${pageUrl}#sitelinks` },
      ...navLinks.map((link) => ({ "@id": `${absoluteUrl(link.path)}#webpage` })),
    ],
    mainEntity: { "@id": `${pageUrl}#listing` },
    significantLink: navLinks.slice(0, 6).map((link) => absoluteUrl(link.path)),
    relatedLink: [altUrl, ...navLinks.slice(0, 6).map((link) => absoluteUrl(link.path))],
  };

  const webPage = {
    "@type": ["WebPage", "CollectionPage", "RealEstateListing"],
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": websiteId() },
    about: [{ "@id": `${pageUrl}#listing` }, { "@id": orgId() }, { "@id": propertyPlaceId() }],
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: ogImage,
      contentUrl: ogImage,
      width: siteConfig.ogImageWidth,
      height: siteConfig.ogImageHeight,
      caption: siteConfig.ogImageAlt[locale === "jp" ? "jp" : "zh"],
    },
    image: {
      "@type": "ImageObject",
      url: ogImage,
      width: siteConfig.ogImageWidth,
      height: siteConfig.ogImageHeight,
    },
    inLanguage,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    hasPart: [
      { "@id": `${pageUrl}#sitelinks` },
      ...siteNavigationElements.map((el) => ({ "@id": el["@id"] })),
      ...services.map((s) => ({ "@id": s["@id"] })),
    ],
    significantLink: navLinks.slice(0, 6).map((link) => absoluteUrl(link.path)),
    relatedLink: navLinks.map((link) => absoluteUrl(link.path)),
    mainEntity: { "@id": `${pageUrl}#listing` },
    publisher: { "@id": orgId() },
    contentLocation: { "@id": propertyPlaceId() },
    spatialCoverage: { "@id": propertyPlaceId() },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-seo-speakable]"],
    },
    workTranslation: {
      "@type": "WebPage",
      "@id": `${altUrl}#webpage`,
      url: altUrl,
      inLanguage: locale === "jp" ? "zh-TW" : "ja",
      name: getHomePageTitle(locale === "jp" ? "zh" : "jp"),
    },
    isAccessibleForFree: true,
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

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage,
    mainEntity: homeFaqItems[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const imageObject = {
    "@type": "ImageObject",
    "@id": `${siteUrl}#og-image`,
    url: ogImage,
    contentUrl: ogImage,
    width: siteConfig.ogImageWidth,
    height: siteConfig.ogImageHeight,
    caption: getBuildingDisplayName(),
    representativeOfPage: true,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      agent,
      ...geoGraph,
      website,
      sitelinksList,
      ...siteNavigationElements,
      ...services,
      webPage,
      breadcrumb,
      listing,
      residence,
      faqPage,
      imageObject,
    ],
  };
}
