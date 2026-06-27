import ContactPage from "../../../components/ContactPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.contact);

export default function Contact() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.contact)} />
      <ContactPage />
    </>
  );
}
