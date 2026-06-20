import EquipmentToiletPage from "../../../../components/EquipmentToiletPage";
import JsonLd from "@/components/JsonLd";
import { getEquipmentToiletJsonLd, getEquipmentToiletMetadata } from "@/lib/seo/equipment-toilet-seo";

export const metadata = getEquipmentToiletMetadata("zh");

export default function EquipmentToilet() {
  return (
    <>
      <JsonLd data={getEquipmentToiletJsonLd("zh")} />
      <EquipmentToiletPage />
    </>
  );
}
