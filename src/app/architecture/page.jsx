import ArchitecturePage from "../../../components/ArchitecturePage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.architecture);

export default function Architecture() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.architecture)} />
      <ArchitecturePage />
    </>
  );
}
