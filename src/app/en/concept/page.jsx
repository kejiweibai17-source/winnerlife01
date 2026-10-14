import ConceptPage from "../../../../components/ConceptPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.concept);

export default function EnConcept() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.concept)} />
      <ConceptPage />
    </>
  );
}
