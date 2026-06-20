import AmenitiesPage from "../../../components/AmenitiesPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.amenities);

export default function Amenities() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.amenities)} />
      <AmenitiesPage />
    </>
  );
}
