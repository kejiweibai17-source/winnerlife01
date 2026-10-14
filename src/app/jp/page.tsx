import type { Metadata } from "next";
import HomePage from "../../../components/HomePage";
import JsonLd from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/seo/home-json-ld";
import { getHomeMetadata } from "@/lib/seo/home-metadata";

export const metadata: Metadata = getHomeMetadata("jp");

export default function JpHome() {
  return (
    <>
      <JsonLd data={getHomeJsonLd("jp")} />
      <HomePage />
    </>
  );
}
