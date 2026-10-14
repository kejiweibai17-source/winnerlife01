import TransportationPage from "../../../../components/TransportationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.transportation);

export default function EnTransportation() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.transportation)} />
      <TransportationPage />
    </>
  );
}
