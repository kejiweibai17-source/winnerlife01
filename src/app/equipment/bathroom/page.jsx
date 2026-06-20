import EquipmentBathroomPage from "../../../../components/EquipmentBathroomPage";
import JsonLd from "@/components/JsonLd";
import {
  getEquipmentBathroomJsonLd,
  getEquipmentBathroomMetadata,
} from "@/lib/seo/equipment-bathroom-seo";

export const metadata = getEquipmentBathroomMetadata("zh");

export default function EquipmentBathroom() {
  return (
    <>
      <JsonLd data={getEquipmentBathroomJsonLd("zh")} />
      <EquipmentBathroomPage />
    </>
  );
}
