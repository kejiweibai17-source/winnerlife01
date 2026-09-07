export type SiteLocale = "zh" | "jp";

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

export function stripLocalePrefix(pathname: string): string {
  const path = pathname.replace(/^\/jp(?=\/|$)/, "") || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(path: string, locale: SiteLocale): string {
  const [pathnamePart, queryHash = ""] = (() => {
    const raw = path ? (path.startsWith("/") ? path : `/${path}`) : "/";
    const match = raw.match(/^([^?#]*)(.*)$/);
    return [match?.[1] || "/", match?.[2] || ""];
  })();

  const key = normalizePath(pathnamePart);
  const alias = PATH_ALIASES[key];
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
  // /jp/developer → strip → /developer → alias maps correctly
  return getLocalizedPath(pathWithoutLocale, targetLocale);
}
