import DeveloperPage from "../../../components/DeveloperPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.story);

export default function Story() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.story)} />
      <DeveloperPage />
    </>
  );
}
