import type { PageSeoConfig } from "./page-seo";

export const seoPageConfigs = {
  concept: {
    messageKey: "concept",
    zhPath: "/concept",
    jpPath: "/jp/concept",
  },
  amenities: {
    messageKey: "amenitiesPage",
    zhPath: "/amenities",
    jpPath: "/jp/amenities",
    faqKey: "faq",
  },
  location: {
    messageKey: "location",
    zhPath: "/location",
    jpPath: "/jp/location",
    seoKey: "page.seo",
    breadcrumbKey: "page.breadcrumb",
  },
  transportation: {
    messageKey: "transportation",
    zhPath: "/transportation",
    jpPath: "/jp/transportation",
  },
  architecture: {
    messageKey: "architecture",
    zhPath: "/architecture",
    jpPath: "/jp/architecture",
  },
  summary: {
    messageKey: "summary",
    zhPath: "/summary",
    jpPath: "/jp/summary",
  },
  interior: {
    messageKey: "interiorPage",
    zhPath: "/interior",
    jpPath: "/jp/interior",
  },
  equipment: {
    messageKey: "equipmentPage",
    zhPath: "/equipment",
    jpPath: "/jp/equipment",
  },
  story: {
    messageKey: "developer",
    zhPath: "/story",
    jpPath: "/jp/developer",
  },
  contact: {
    messageKey: "contactPage",
    zhPath: "/contact",
    jpPath: "/jp/contact",
  },
} as const satisfies Record<string, PageSeoConfig>;
