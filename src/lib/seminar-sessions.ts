export type SeminarSessionOption = {
  value: string;
  label: string;
  labelJa?: string;
  date: string;
  enabled?: boolean;
};

/** Fallback when CMS has no document yet — keep in sync with form copy. */
export const DEFAULT_SEMINAR_SESSIONS: SeminarSessionOption[] = [
  {
    value: "2026-09-13-taipei",
    date: "2026-09-13",
    label: "9/13（日）14:00— 台北場",
    labelJa: "9/13（日）14:00— 台北会場",
  },
  {
    value: "2026-09-18-taipei",
    date: "2026-09-18",
    label: "9/18（五）14:00— 台北場",
    labelJa: "9/18（金）14:00— 台北会場",
  },
  {
    value: "2026-09-19-kaohsiung",
    date: "2026-09-19",
    label: "9/19（六）14:00— 高雄場",
    labelJa: "9/19（土）14:00— 高雄会場",
  },
  {
    value: "2026-09-20-taichung",
    date: "2026-09-20",
    label: "9/20（日）14:00— 台中場",
    labelJa: "9/20（日）14:00— 台中会場",
  },
  {
    value: "2026-09-30-taipei",
    date: "2026-09-30",
    label: "9/30（三）14:00— 台北場",
    labelJa: "9/30（水）14:00— 台北会場",
  },
];

export const SEMINAR_CONFIG_DOC_ID = "seminarConfig";

export type CmsSeminarSession = {
  _key?: string;
  date: string;
  labelZh: string;
  labelJa: string;
  enabled?: boolean;
};

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
  locale: "zh" | "jp" = "zh",
): SeminarSessionOption[] {
  if (!sessions?.length) return [];

  return sessions
    .filter((s) => s?.enabled !== false && s?.date && s?.labelZh)
    .map((s, index) => ({
      value: slugifyLabel(s.date, s.labelZh, index),
      date: s.date,
      label: locale === "jp" ? s.labelJa || s.labelZh : s.labelZh,
      labelJa: s.labelJa,
      enabled: s.enabled !== false,
    }));
}

export function toPublicOptions(
  sessions: SeminarSessionOption[],
  locale: "zh" | "jp" = "zh",
): { value: string; label: string }[] {
  return sessions.map((s) => ({
    value: s.value,
    label: locale === "jp" ? s.labelJa || s.label : s.label,
  }));
}

export function getDefaultSessionOptions(
  locale: "zh" | "jp" = "zh",
): { value: string; label: string }[] {
  return toPublicOptions(DEFAULT_SEMINAR_SESSIONS, locale);
}
