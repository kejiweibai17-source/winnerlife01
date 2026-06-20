import TransportationPage from "../../../components/TransportationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.transportation);

export default function Transportation() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.transportation)} />
      <TransportationPage />
    </>
  );
}
