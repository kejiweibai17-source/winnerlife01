import ContactPage from "../../../../components/ContactPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.contact);

export default function JpContact() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.contact)} />
      <ContactPage />
    </>
  );
}
