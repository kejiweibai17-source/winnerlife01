export type SeminarSessionOption = {
  value: string;
  label: string;
  labelJa?: string;
  labelEn?: string;
  date: string;
  enabled?: boolean;
};

export type SessionLocale = "zh" | "jp" | "en";

/** Fallback when CMS has no document yet — keep in sync with form copy. */
export const DEFAULT_SEMINAR_SESSIONS: SeminarSessionOption[] = [
  {
    value: "2026-11-14-taichung",
    date: "2026-11-14",
    label: "11/14（六）14:00— 台中｜林酒店",
    labelJa: "11/14（土）14:00— 台中｜林ホテル",
    labelEn: "Sat, Nov 14, 2:00 PM — Taichung | The Lin Hotel",
  },
  {
    value: "2026-11-20-taipei",
    date: "2026-11-20",
    label: "11/20（五）14:00— 台北｜忠訓地產",
    labelJa: "11/20（金）14:00— 台北｜忠訓地產",
    labelEn: "Fri, Nov 20, 2:00 PM — Taipei | WinnerLife",
  },
];

export const SEMINAR_CONFIG_DOC_ID = "seminarConfig";

export type CmsSeminarSession = {
  _key?: string;
  date: string;
  labelZh: string;
  labelJa: string;
  labelEn?: string;
  enabled?: boolean;
};

function pickLabel(
  locale: SessionLocale,
  zh: string,
  ja?: string,
  en?: string,
): string {
  if (locale === "jp") return ja || zh;
  if (locale === "en") return en || zh;
  return zh;
}

function slugifyLabel(date: string, labelZh: string, index: number): string {
  const cityHint = /台北|台中|高雄|新竹|竹北|林口|台南|桃園/
    .exec(labelZh)?.[0]
    ?.replace("台北", "taipei")
    .replace("台中", "taichung")
    .replace("高雄", "kaohsiung")
    .replace("新竹", "hsinchu")
    .replace("竹北", "zhubei")
    .replace("林口", "linkou")
    .replace("台南", "tainan")
    .replace("桃園", "taoyuan");
  const base = cityHint || `session${index + 1}`;
  return `${date}-${base}`;
}

export function mapCmsSessionsToOptions(
  sessions: CmsSeminarSession[] | null | undefined,
  locale: SessionLocale = "zh",
): SeminarSessionOption[] {
  if (!sessions?.length) return [];

  return sessions
    .filter((s) => s?.enabled !== false && s?.date && s?.labelZh)
    .map((s, index) => ({
      value: slugifyLabel(s.date, s.labelZh, index),
      date: s.date,
      label: pickLabel(locale, s.labelZh, s.labelJa, s.labelEn),
      labelJa: s.labelJa,
      labelEn: s.labelEn,
      enabled: s.enabled !== false,
    }));
}

export function toPublicOptions(
  sessions: SeminarSessionOption[],
  locale: SessionLocale = "zh",
): { value: string; label: string }[] {
  return sessions.map((s) => ({
    value: s.value,
    label: pickLabel(locale, s.label, s.labelJa, s.labelEn),
  }));
}

export function getDefaultSessionOptions(
  locale: SessionLocale = "zh",
): { value: string; label: string }[] {
  return toPublicOptions(DEFAULT_SEMINAR_SESSIONS, locale);
}
