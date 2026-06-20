import LocationPage from "../../../components/LocationPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.location);

export default function Location() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.location)} />
      <LocationPage />
    </>
  );
}
