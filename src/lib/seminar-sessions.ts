export type SeminarSessionOption = {
  value: string;
  label: string;
  labelJa?: string;
  date: string;
  enabled?: boolean;
};

/** Fallback when CMS has no document yet — keep in sync with initial Studio seed. */
export const DEFAULT_SEMINAR_SESSIONS: SeminarSessionOption[] = [
  {
    value: "2026-08-26-taipei",
    date: "2026-08-26",
    label: "8/26（三）— 台北場",
    labelJa: "8/26（水）— 台北会場",
  },
  {
    value: "2026-08-27-taipei",
    date: "2026-08-27",
    label: "8/27（四）— 台北場",
    labelJa: "8/27（木）— 台北会場",
  },
  {
    value: "2026-08-28-taipei",
    date: "2026-08-28",
    label: "8/28（五）— 台北場",
    labelJa: "8/28（金）— 台北会場",
  },
  {
    value: "2026-08-30-kaohsiung-xinyi",
    date: "2026-08-30",
    label: "8/30（日）14:00— 高雄TCCC高雄信義館",
    labelJa: "8/30（日）14:00— 高雄TCCC（高雄信義館）",
  },
  {
    value: "2026-09-04-taipei",
    date: "2026-09-04",
    label: "9/04（五）— 台北場",
    labelJa: "9/04（金）— 台北会場",
  },
  {
    value: "2026-09-05-hsinchu",
    date: "2026-09-05",
    label: "9/05（六）14:00— 新竹Le Phare 共享空間",
    labelJa: "9/05（土）14:00— 新竹Le Phare 共有空間",
  },
  {
    value: "2026-09-06-linkou",
    date: "2026-09-06",
    label: "9/06（日）14:00— 林口喜來登 2F",
    labelJa: "9/06（日）14:00— 林口シェラトン 2F",
  },
  {
    value: "2026-09-18-taipei",
    date: "2026-09-18",
    label: "9/18（五）— 台北場",
    labelJa: "9/18（金）— 台北会場",
  },
  {
    value: "2026-09-19-taipei",
    date: "2026-09-19",
    label: "9/19（六）— 台北場",
    labelJa: "9/19（土）— 台北会場",
  },
  {
    value: "2026-09-30-taipei",
    date: "2026-09-30",
    label: "9/30（三）— 台北場",
    labelJa: "9/30（水）— 台北会場",
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
  const cityHint = /台北|台中|高雄|新竹|林口|台南|桃園/
    .exec(labelZh)?.[0]
    ?.replace("台北", "taipei")
    .replace("台中", "taichung")
    .replace("高雄", "kaohsiung")
    .replace("新竹", "hsinchu")
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
