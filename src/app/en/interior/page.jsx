import InteriorPage from "../../../../components/InteriorPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.interior);

export default function EnInterior() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.interior)} />
      <InteriorPage />
    </>
  );
}
