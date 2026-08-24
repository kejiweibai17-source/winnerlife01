import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId} from '@/sanity/env'
import {
  SEMINAR_CONFIG_DOC_ID,
  type CmsSeminarSession,
  DEFAULT_SEMINAR_SESSIONS,
  getDefaultSessionOptions,
  mapCmsSessionsToOptions,
  type SeminarSessionOption,
} from '@/lib/seminar-sessions'

const seminarQuery = `*[_id == $id][0]{ sessions[]{ date, labelZh, labelJa, enabled } }`

function getReadClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) return null
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}

export async function fetchSeminarSessionsFromCms(): Promise<CmsSeminarSession[] | null> {
  try {
    const doc = await getReadClient().fetch<{sessions?: CmsSeminarSession[]} | null>(
      seminarQuery,
      {id: SEMINAR_CONFIG_DOC_ID},
      {next: {revalidate: 30, tags: ['seminar-sessions']}},
    )
    return doc?.sessions?.length ? doc.sessions : null
  } catch {
    return null
  }
}

export async function getSeminarSessionOptions(
  locale: 'zh' | 'jp' = 'zh',
): Promise<{value: string; label: string}[]> {
  const cms = await fetchSeminarSessionsFromCms()
  if (cms?.length) {
    return mapCmsSessionsToOptions(cms, locale).map(({value, label}) => ({value, label}))
  }
  return getDefaultSessionOptions(locale)
}

export async function getSeminarSessionsForAdmin(): Promise<CmsSeminarSession[]> {
  const cms = await fetchSeminarSessionsFromCms()
  if (cms?.length) return cms
  return DEFAULT_SEMINAR_SESSIONS.map((s) => ({
    date: s.date,
    labelZh: s.label,
    labelJa: s.labelJa || s.label,
    enabled: true,
  }))
}

export async function saveSeminarSessions(
  sessions: CmsSeminarSession[],
): Promise<{ok: true} | {ok: false; error: string}> {
  const client = getWriteClient()
  if (!client) {
    return {
      ok: false,
      error: '尚未設定 SANITY_API_WRITE_TOKEN，無法儲存。請先在 .env.local 加入寫入權杖。',
    }
  }

  const cleaned = sessions
    .filter((s) => s.date && s.labelZh?.trim())
    .map((s) => ({
      _type: 'session' as const,
      _key: s._key || `${s.date}-${Math.random().toString(36).slice(2, 9)}`,
      date: s.date,
      labelZh: s.labelZh.trim(),
      labelJa: (s.labelJa || s.labelZh).trim(),
      enabled: s.enabled !== false,
    }))

  try {
    await client.createOrReplace({
      _id: SEMINAR_CONFIG_DOC_ID,
      _type: 'seminarConfig',
      title: '說明會場次設定',
      sessions: cleaned,
    })
    return {ok: true}
  } catch (err) {
    const message = err instanceof Error ? err.message : '儲存失敗'
    return {ok: false, error: message}
  }
}

export function sessionsToEditorRows(
  sessions: SeminarSessionOption[],
): CmsSeminarSession[] {
  return sessions.map((s) => ({
    date: s.date,
    labelZh: s.label,
    labelJa: s.labelJa || s.label,
    enabled: s.enabled !== false,
  }))
}
