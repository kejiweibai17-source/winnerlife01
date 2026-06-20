import EquipmentBathroomPage from "../../../../../components/EquipmentBathroomPage";
import JsonLd from "@/components/JsonLd";
import {
  getEquipmentBathroomJsonLd,
  getEquipmentBathroomMetadata,
} from "@/lib/seo/equipment-bathroom-seo";

export const metadata = getEquipmentBathroomMetadata("jp");

export default function EquipmentBathroom() {
  return (
    <>
      <JsonLd data={getEquipmentBathroomJsonLd("jp")} />
      <EquipmentBathroomPage />
    </>
  );
}
