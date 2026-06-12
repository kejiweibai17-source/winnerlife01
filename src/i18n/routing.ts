import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "jp"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});
