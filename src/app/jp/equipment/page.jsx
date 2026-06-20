import EquipmentPage from "../../../../components/EquipmentPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("jp", seoPageConfigs.equipment);

export default function JpEquipment() {
  return (
    <>
      <JsonLd data={getPageJsonLd("jp", seoPageConfigs.equipment)} />
      <EquipmentPage />
    </>
  );
}
