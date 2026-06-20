import PropertySummaryPage from "../../../../components/PropertySummaryPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.summary);

export default function JpSummary() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.summary)} />
      <PropertySummaryPage />
    </>
  );
}
