export type SiteLocale = "zh" | "jp" | "en";

export const SITE_LOCALES: ReadonlyArray<{
  code: SiteLocale;
  label: string;
  htmlLang: string;
}> = [
  { code: "zh", label: "中文", htmlLang: "zh-TW" },
  { code: "jp", label: "日本語", htmlLang: "ja" },
  { code: "en", label: "English", htmlLang: "en" },
];

/**
 * Pages that already have an English version under `/en`. Any other path
 * falls back to the zh page until it is translated — add it here once
 * `src/app/en/<path>` exists.
 */
const EN_TRANSLATED_PATHS = new Set<string>([
  "/",
  "/concept",
  "/amenities",
  "/location",
  "/transportation",
  "/architecture",
  "/summary",
  "/interior",
  "/equipment",
  "/equipment/toilet",
  "/equipment/bathroom",
  "/equipment/kitchen",
  "/equipment/security",
  "/story",
  "/contact",
]);

/**
 * Paths that are not a simple `/jp` + zhPath mirror.
 * zh `/story` ↔ jp `/jp/developer`
 */
const PATH_ALIASES: Record<string, { zh: string; jp: string }> = {
  "/story": { zh: "/story", jp: "/jp/developer" },
  "/developer": { zh: "/story", jp: "/jp/developer" },
};

function normalizePath(path: string): string {
  const clean = path ? (path.startsWith("/") ? path : `/${path}`) : "/";
  // Drop query/hash for mapping; callers that need hash re-append separately
  return clean.split(/[?#]/)[0] || "/";
}

export function getLocaleFromPathname(pathname: string | null | undefined): SiteLocale {
  if (!pathname) return "zh";
  if (/^\/jp(?=\/|$)/.test(pathname)) return "jp";
  if (/^\/en(?=\/|$)/.test(pathname)) return "en";
  return "zh";
}

export function getHtmlLang(locale: SiteLocale): string {
  return SITE_LOCALES.find((l) => l.code === locale)?.htmlLang ?? "zh-TW";
}

export function stripLocalePrefix(pathname: string): string {
  const path = pathname.replace(/^\/(jp|en)(?=\/|$)/, "") || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function hasEnglishVersion(path: string): boolean {
  const key = normalizePath(path);
  return EN_TRANSLATED_PATHS.has(PATH_ALIASES[key]?.zh ?? key);
}

export function getLocalizedPath(path: string, locale: SiteLocale): string {
  const [pathnamePart, queryHash = ""] = (() => {
    const raw = path ? (path.startsWith("/") ? path : `/${path}`) : "/";
    const match = raw.match(/^([^?#]*)(.*)$/);
    return [match?.[1] || "/", match?.[2] || ""];
  })();

  const key = normalizePath(pathnamePart);
  const alias = PATH_ALIASES[key];

  if (locale === "en") {
    const enKey = alias ? alias.zh : key;
    if (!EN_TRANSLATED_PATHS.has(enKey)) {
      return getLocalizedPath(path, "zh");
    }
    return enKey === "/" ? `/en${queryHash}` : `/en${enKey}${queryHash}`;
  }

  if (alias) {
    return `${locale === "jp" ? alias.jp : alias.zh}${queryHash}`;
  }

  if (locale === "jp") {
    return pathnamePart === "/" ? `/jp${queryHash}` : `/jp${pathnamePart}${queryHash}`;
  }
  return `${pathnamePart}${queryHash}`;
}

export function switchLocalePath(pathname: string, targetLocale: SiteLocale): string {
  const pathWithoutLocale = stripLocalePrefix(pathname);
  if (targetLocale === "en" && !hasEnglishVersion(pathWithoutLocale)) {
    return "/en";
  }
  // /jp/developer → strip → /developer → alias maps correctly
  return getLocalizedPath(pathWithoutLocale, targetLocale);
}
