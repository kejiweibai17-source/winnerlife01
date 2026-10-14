import EquipmentPage from "../../../../components/EquipmentPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("en", seoPageConfigs.equipment);

export default function EnEquipment() {
  return (
    <>
      <JsonLd data={getPageJsonLd("en", seoPageConfigs.equipment)} />
      <EquipmentPage />
    </>
  );
}
