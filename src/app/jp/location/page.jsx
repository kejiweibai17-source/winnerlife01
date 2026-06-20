import LocationPage from "../../../../components/LocationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.location);

export default function JpLocation() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.location)} />
      <LocationPage />
    </>
  );
}
