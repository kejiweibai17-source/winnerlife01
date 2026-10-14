import PropertySummaryPage from "../../../../components/PropertySummaryPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.summary);

export default function EnSummary() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.summary)} />
      <PropertySummaryPage />
    </>
  );
}
