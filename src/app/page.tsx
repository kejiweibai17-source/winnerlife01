import type { Metadata } from "next";
import HomePage from "../../components/HomePage";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/seo/home-json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `白金高輪 Premium Midsize Office｜${siteConfig.name}`,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: { "zh-TW": "/", ja: "/jp" },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <HomePage />
    </>
  );
}
