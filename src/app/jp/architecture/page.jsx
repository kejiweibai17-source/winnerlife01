import ArchitecturePage from "../../../../components/ArchitecturePage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.architecture);

export default function JpArchitecture() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.architecture)} />
      <ArchitecturePage />
    </>
  );
}
