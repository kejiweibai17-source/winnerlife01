import TransportationPage from "../../../../components/TransportationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.transportation);

export default function JpTransportation() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.transportation)} />
      <TransportationPage />
    </>
  );
}
