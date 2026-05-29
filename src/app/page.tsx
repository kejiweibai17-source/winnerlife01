import HomePage from "../../components/HomePage";
import JsonLd from "@/components/JsonLd";
import { homeMetadata } from "@/lib/seo/home-metadata";
import { getHomeJsonLd } from "@/lib/seo/home-json-ld";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <HomePage />
    </>
  );
}
