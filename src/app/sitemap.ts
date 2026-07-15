import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { landingPage01Path } from "@/lib/landing-page-01-path";

/**
 * zh path paired with its jp counterpart. `/story` and `/jp/developer` are
 * the same page under different slugs, so they're paired explicitly.
 */
const localizedPaths: Array<{ zh: string; jp: string; priority: number }> = [
  { zh: "/", jp: "/jp", priority: 1 },
  { zh: "/concept", jp: "/jp/concept", priority: 0.9 },
  { zh: "/amenities", jp: "/jp/amenities", priority: 0.9 },
  { zh: "/location", jp: "/jp/location", priority: 0.9 },
  { zh: "/transportation", jp: "/jp/transportation", priority: 0.85 },
  { zh: "/architecture", jp: "/jp/architecture", priority: 0.8 },
  { zh: "/summary", jp: "/jp/summary", priority: 0.8 },
  { zh: "/interior", jp: "/jp/interior", priority: 0.8 },
  { zh: "/equipment", jp: "/jp/equipment", priority: 0.8 },
  { zh: "/equipment/toilet", jp: "/jp/equipment/toilet", priority: 0.65 },
  { zh: "/equipment/bathroom", jp: "/jp/equipment/bathroom", priority: 0.65 },
  { zh: "/equipment/kitchen", jp: "/jp/equipment/kitchen", priority: 0.65 },
  { zh: "/equipment/security", jp: "/jp/equipment/security", priority: 0.65 },
  { zh: "/story", jp: "/jp/developer", priority: 0.75 },
  { zh: "/contact", jp: "/jp/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();
  const abs = (path: string) => `${base}${path}`;

  const localizedEntries: MetadataRoute.Sitemap = localizedPaths.flatMap(
    ({ zh, jp, priority }) => [
      {
        url: abs(zh),
        lastModified,
        changeFrequency: zh === "/" ? "weekly" : "monthly",
        priority,
        alternates: {
          languages: {
            "zh-TW": abs(zh),
            ja: abs(jp),
          },
        },
      },
      {
        url: abs(jp),
        lastModified,
        changeFrequency: jp === "/jp" ? "weekly" : "monthly",
        priority,
        alternates: {
          languages: {
            "zh-TW": abs(zh),
            ja: abs(jp),
          },
        },
      },
    ]
  );

  const landingEntry: MetadataRoute.Sitemap = [
    {
      url: abs(landingPage01Path),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return [...localizedEntries, ...landingEntry];
}
