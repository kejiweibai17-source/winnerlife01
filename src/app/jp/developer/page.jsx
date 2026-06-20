import DeveloperPage from "../../../../components/DeveloperPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.story);

export default function JpDeveloper() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.story)} />
      <DeveloperPage />
    </>
  );
}
