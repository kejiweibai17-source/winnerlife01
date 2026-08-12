import type { PageSeoConfig } from "./page-seo";

export const seoPageConfigs = {
  concept: {
    messageKey: "concept",
    zhPath: "/concept",
    jpPath: "/jp/concept",
    pageType: "WebPage",
  },
  amenities: {
    messageKey: "amenitiesPage",
    zhPath: "/amenities",
    jpPath: "/jp/amenities",
    faqKey: "faq",
    pageType: ["WebPage", "CollectionPage"],
  },
  location: {
    messageKey: "location",
    zhPath: "/location",
    jpPath: "/jp/location",
    seoKey: "page.seo",
    breadcrumbKey: "page.breadcrumb",
    faqKey: "page.faq",
    pageType: ["WebPage", "CollectionPage"],
  },
  transportation: {
    messageKey: "transportation",
    zhPath: "/transportation",
    jpPath: "/jp/transportation",
    faqKey: "faq",
    pageType: ["WebPage", "CollectionPage"],
  },
  architecture: {
    messageKey: "architecture",
    zhPath: "/architecture",
    jpPath: "/jp/architecture",
    pageType: "WebPage",
  },
  summary: {
    messageKey: "summary",
    zhPath: "/summary",
    jpPath: "/jp/summary",
    pageType: "WebPage",
  },
  interior: {
    messageKey: "interiorPage",
    zhPath: "/interior",
    jpPath: "/jp/interior",
    pageType: ["WebPage", "CollectionPage", "ImageGallery"],
  },
  equipment: {
    messageKey: "equipmentPage",
    zhPath: "/equipment",
    jpPath: "/jp/equipment",
    pageType: ["WebPage", "CollectionPage"],
  },
  story: {
    messageKey: "developer",
    zhPath: "/story",
    jpPath: "/jp/developer",
    pageType: "AboutPage",
  },
  contact: {
    messageKey: "contactPage",
    zhPath: "/contact",
    jpPath: "/jp/contact",
    faqKey: "faq",
    pageType: "ContactPage",
  },
} as const satisfies Record<string, PageSeoConfig>;
