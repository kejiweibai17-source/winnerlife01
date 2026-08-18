import {
  absoluteUrl,
  getBuildingDisplayName,
  getHomeDescription,
  getHomePageTitle,
  getProjectAlternateNames,
  homeFaqItems,
  homeSitelinks,
  siteConfig,
} from "@/lib/site";
import { landingPage01Path } from "@/lib/landing-page-01-path";
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
  const listing = buildPropertyListing(locale);
  const residence = buildApartmentComplex(locale);
  const agent = {
    ...buildRealEstateAgentStub(),
    makesOffer: { "@id": listing["@id"] },
  };

  const navLinks = homeSitelinks[locale];
  const sitelinksList = buildSitelinksItemList(locale);
  const siteNavigationElements = buildSiteNavigationElements(locale);
  const services = buildAgencyServices(locale);
  const geoGraph = getPropertyGeoGraph(locale);

  const website = {
    "@type": "WebSite",
    "@id": websiteId(),
    url: siteUrl,
    name: "OK PRIME",
    alternateName: [...getProjectAlternateNames(), siteConfig.name],
    description,
    publisher: { "@id": orgId() },
    copyrightHolder: { "@id": orgId() },
    inLanguage: ["zh-TW", "ja"],
    about: [{ "@id": listing["@id"] }, { "@id": propertyPlaceId() }],
    hasPart: [
      { "@id": `${pageUrl}#sitelinks` },
      ...navLinks.map((link) => ({ "@id": `${absoluteUrl(link.path)}#webpage` })),
    ],
    mainEntity: { "@id": listing["@id"] },
    significantLink: [
      ...navLinks.slice(0, 6).map((link) => absoluteUrl(link.path)),
      absoluteUrl(landingPage01Path),
    ],
    relatedLink: [
      altUrl,
      absoluteUrl(landingPage01Path),
      ...navLinks.slice(0, 6).map((link) => absoluteUrl(link.path)),
    ],
  };

  const webPage = {
    "@type": ["WebPage", "CollectionPage", "RealEstateListing"],
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": websiteId() },
    about: [{ "@id": listing["@id"] }, { "@id": orgId() }, { "@id": propertyPlaceId() }],
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
    mainEntity: { "@id": listing["@id"] },
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
