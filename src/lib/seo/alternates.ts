import { absoluteUrl } from "@/lib/site";
import {
  getHtmlLang,
  getLocalizedPath,
  hasEnglishVersion,
  type SiteLocale,
} from "@/lib/locale-path";

export const OG_LOCALE: Record<SiteLocale, string> = {
  zh: "zh_TW",
  jp: "ja_JP",
  en: "en_US",
};

/** Locales that actually have this page (en only once it's translated). */
export function getAvailableLocales(zhPath: string): SiteLocale[] {
  return hasEnglishVersion(zhPath) ? ["zh", "jp", "en"] : ["zh", "jp"];
}

export function getLocalePagePath(locale: SiteLocale, zhPath: string, jpPath: string) {
  if (locale === "jp") return jpPath;
  if (locale === "en") return getLocalizedPath(zhPath, "en");
  return zhPath;
}

export function getPageLanguageAlternates(zhPath: string, jpPath: string) {
  return {
    ...Object.fromEntries(
      getAvailableLocales(zhPath).map((l) => [
        getHtmlLang(l),
        getLocalePagePath(l, zhPath, jpPath),
      ])
    ),
    "x-default": zhPath,
  };
}

export function getOgAlternateLocales(locale: SiteLocale, zhPath: string) {
  return getAvailableLocales(zhPath)
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l]);
}

/** schema.org `workTranslation` entries pointing at the page's other language versions. */
export function getWorkTranslations(locale: SiteLocale, zhPath: string, jpPath: string) {
  return getAvailableLocales(zhPath)
    .filter((l) => l !== locale)
    .map((l) => {
      const url = absoluteUrl(getLocalePagePath(l, zhPath, jpPath));
      return {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        inLanguage: getHtmlLang(l),
      };
    });
}
