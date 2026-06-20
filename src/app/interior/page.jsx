import InteriorPage from "../../../components/InteriorPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.interior);

export default function Interior() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.interior)} />
      <InteriorPage />
    </>
  );
}
