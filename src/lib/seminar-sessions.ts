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
    value: "2026-10-10-hsinchu",
    date: "2026-10-10",
    label: "10/10（六）14:00— 新竹｜新竹國賓大飯店",
    labelJa: "10/10（土）14:00— 新竹｜新竹國賓大飯店",
    labelEn: "Sat, Oct 10, 2:00 PM — Hsinchu | Ambassador Hotel Hsinchu",
  },
  {
    value: "2026-10-11-taichung",
    date: "2026-10-11",
    label: "10/11（日）14:00— 台中｜台中金典酒店",
    labelJa: "10/11（日）14:00— 台中｜台中金典ホテル",
    labelEn: "Sun, Oct 11, 2:00 PM — Taichung | The Splendor Hotel Taichung",
  },
  {
    value: "2026-10-17-tainan",
    date: "2026-10-17",
    label: "10/17（六）14:00— 台南｜台南老爺行旅",
    labelJa: "10/17（土）14:00— 台南｜台南老爺行旅",
    labelEn: "Sat, Oct 17, 2:00 PM — Tainan | The Place Tainan",
  },
  {
    value: "2026-10-18-kaohsiung",
    date: "2026-10-18",
    label: "10/18（日）14:00— 高雄｜和逸飯店（高雄中山館）",
    labelJa: "10/18（日）14:00— 高雄｜和逸飯店（高雄中山館）",
    labelEn: "Sun, Oct 18, 2:00 PM — Kaohsiung | Hotel COZZI Zhongshan Kaohsiung",
  },
  {
    value: "2026-10-24-linkou",
    date: "2026-10-24",
    label: "10/24（六）14:00— 林口｜亞昕福朋喜來登酒店",
    labelJa: "10/24（土）14:00— 林口｜亞昕福朋喜來登ホテル",
    labelEn: "Sat, Oct 24, 2:00 PM — Linkou | Four Points by Sheraton Linkou",
  },
  {
    value: "2026-10-28-taipei",
    date: "2026-10-28",
    label: "10/28（三）14:00— 台北｜忠訓地產會議廳",
    labelJa: "10/28（水）14:00— 台北｜忠訓地產会議室",
    labelEn: "Wed, Oct 28, 2:00 PM — Taipei | WinnerLife Conference Hall",
  },
  {
    value: "2026-10-31-taipei",
    date: "2026-10-31",
    label: "10/31（六）14:00— 台北｜茹曦酒店",
    labelJa: "10/31（土）14:00— 台北｜茹曦ホテル",
    labelEn: "Sat, Oct 31, 2:00 PM — Taipei | illumé Taipei",
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
