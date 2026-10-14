import ArchitecturePage from "../../../../components/ArchitecturePage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.architecture);

export default function EnArchitecture() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.architecture)} />
      <ArchitecturePage />
    </>
  );
}
