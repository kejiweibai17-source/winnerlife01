import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "jp", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});
