import EquipmentPage from "../../../components/EquipmentPage";
import JsonLd from "@/components/JsonLd";
import { seoPageConfigs } from "@/lib/seo/seo-config";
import { getPageJsonLd, getPageMetadata } from "@/lib/seo/page-seo";

export const metadata = getPageMetadata("zh", seoPageConfigs.equipment);

export default function Equipment() {
  return (
    <>
      <JsonLd data={getPageJsonLd("zh", seoPageConfigs.equipment)} />
      <EquipmentPage />
    </>
  );
}
