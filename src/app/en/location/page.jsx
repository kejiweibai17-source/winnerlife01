import LocationPage from "../../../../components/LocationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.location);

export default function EnLocation() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.location)} />
      <LocationPage />
    </>
  );
}
