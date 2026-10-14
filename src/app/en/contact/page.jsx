import ContactPage from "../../../../components/ContactPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.contact);

export default function EnContact() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.contact)} />
      <ContactPage />
    </>
  );
}
