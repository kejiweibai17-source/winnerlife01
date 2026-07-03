import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { landingPage01Path } from "@/lib/landing-page-01-path";

const marketingPaths = [
  "/",
  "/jp",
  "/concept",
  "/jp/concept",
  "/amenities",
  "/jp/amenities",
  "/location",
  "/jp/location",
  "/transportation",
  "/jp/transportation",
  "/architecture",
  "/jp/architecture",
  "/summary",
  "/jp/summary",
  "/interior",
  "/jp/interior",
  "/equipment",
  "/jp/equipment",
  "/equipment/toilet",
  "/jp/equipment/toilet",
  "/equipment/bathroom",
  "/jp/equipment/bathroom",
  "/equipment/kitchen",
  "/jp/equipment/kitchen",
  "/equipment/security",
  "/jp/equipment/security",
  "/story",
  "/jp/developer",
  "/contact",
  "/jp/contact",
  landingPage01Path,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  return marketingPaths.map((path, index) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/jp" ? "weekly" : "monthly",
    priority: path === "/" || path === "/jp" ? 1 : index < 4 ? 0.9 : 0.75,
  }));
}
