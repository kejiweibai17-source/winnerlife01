import { summaryPageDataJp } from "./jp";
import { summaryPageDataZh } from "./zh";

export type SummaryPageData = typeof summaryPageDataJp;

export function getSummaryPageData(locale: "zh" | "jp"): SummaryPageData {
  return locale === "jp" ? summaryPageDataJp : summaryPageDataZh;
}
