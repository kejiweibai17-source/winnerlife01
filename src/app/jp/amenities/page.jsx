import AmenitiesPage from "../../../../components/AmenitiesPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.amenities);

export default function JpAmenities() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.amenities)} />
      <AmenitiesPage />
    </>
  );
}
