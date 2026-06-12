import type { Metadata } from "next";
import HomePage from "../../../components/HomePage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `白金高輪 プレミアムミッドサイズオフィス｜${siteConfig.name}`,
  description:
    "白金高輪—品川エリアを生活圏に持つ港区の住宅プロジェクト。233戸の住まいが緑と水を囲む。",
  alternates: {
    canonical: "/jp",
    languages: { "zh-TW": "/", ja: "/jp" },
  },
};

export default function JpHome() {
  return <HomePage />;
}
