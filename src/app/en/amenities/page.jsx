import AmenitiesPage from "../../../../components/AmenitiesPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.amenities);

export default function EnAmenities() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.amenities)} />
      <AmenitiesPage />
    </>
  );
}
