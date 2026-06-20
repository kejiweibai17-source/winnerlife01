import ConceptPage from "../../../components/ConceptPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.concept);

export default function Concept() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.concept)} />
      <ConceptPage />
    </>
  );
}
