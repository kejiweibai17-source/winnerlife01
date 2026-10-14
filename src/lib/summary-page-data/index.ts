import type { SiteLocale } from "@/lib/locale-path";
import { summaryPageDataEn } from "./en";
import { summaryPageDataJp } from "./jp";
import { summaryPageDataZh } from "./zh";

export type SummaryPageData = typeof summaryPageDataJp;

export function getSummaryPageData(locale: SiteLocale): SummaryPageData {
  if (locale === "jp") return summaryPageDataJp;
  if (locale === "en") return summaryPageDataEn;
  return summaryPageDataZh;
}
