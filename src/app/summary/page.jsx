import PropertySummaryPage from "../../../components/PropertySummaryPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.summary);

export default function Summary() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.summary)} />
      <PropertySummaryPage />
    </>
  );
}
