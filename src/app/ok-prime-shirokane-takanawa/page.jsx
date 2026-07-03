import LandingPage01 from "../../../components/LandingPage01/LandingPage01";
import JsonLd from "@/components/JsonLd";
import {
  getLandingPage01JsonLd,
  landingPage01Metadata,
} from "@/lib/seo/landing-page-01-seo";

export const metadata = landingPage01Metadata;

export default function OkPrimeShirokaneTakanawaPage() {
  return (
    <>
      <JsonLd data={getLandingPage01JsonLd()} />
      <LandingPage01 />
    </>
  );
}
