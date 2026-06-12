export type SiteLocale = "zh" | "jp";

export function stripLocalePrefix(pathname: string): string {
  const path = pathname.replace(/^\/jp(?=\/|$)/, "") || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(path: string, locale: SiteLocale): string {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "/";
  if (locale === "jp") {
    return cleanPath === "/" ? "/jp" : `/jp${cleanPath}`;
  }
  return cleanPath;
}

export function switchLocalePath(pathname: string, targetLocale: SiteLocale): string {
  const pathWithoutLocale = stripLocalePrefix(pathname);
  return getLocalizedPath(pathWithoutLocale, targetLocale);
}
