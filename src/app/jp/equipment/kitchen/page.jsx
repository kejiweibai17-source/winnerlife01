import EquipmentKitchenPage from "../../../../../components/EquipmentKitchenPage";
import JsonLd from "@/components/JsonLd";
import {
  getEquipmentKitchenJsonLd,
  getEquipmentKitchenMetadata,
} from "@/lib/seo/equipment-kitchen-seo";

export const metadata = getEquipmentKitchenMetadata("jp");

export default function EquipmentKitchen() {
  return (
    <>
      <JsonLd data={getEquipmentKitchenJsonLd("jp")} />
      <EquipmentKitchenPage />
    </>
  );
}
