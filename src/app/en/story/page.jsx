import DeveloperPage from "../../../../components/DeveloperPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.story);

export default function EnDeveloper() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.story)} />
      <DeveloperPage />
    </>
  );
}
