import { permanentRedirect } from "next/navigation";
import { landingPage01Path } from "@/lib/landing-page-01-path";

export default function LegacyLandingPage01Redirect() {
  permanentRedirect(landingPage01Path);
}
