import InteriorPage from "../../../../components/InteriorPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.interior);

export default function JpInterior() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.interior)} />
      <InteriorPage />
    </>
  );
}
