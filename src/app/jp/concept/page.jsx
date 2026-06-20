import ConceptPage from "../../../../components/ConceptPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.concept);

export default function JpConcept() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.concept)} />
      <ConceptPage />
    </>
  );
}
