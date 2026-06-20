import EquipmentSecurityPage from "../../../../../components/EquipmentSecurityPage";
import JsonLd from "@/components/JsonLd";
import {
  getEquipmentSecurityJsonLd,
  getEquipmentSecurityMetadata,
} from "@/lib/seo/equipment-security-seo";

export const metadata = getEquipmentSecurityMetadata("jp");

export default function EquipmentSecurity() {
  return (
    <>
      <JsonLd data={getEquipmentSecurityJsonLd("jp")} />
      <EquipmentSecurityPage />
    </>
  );
}
