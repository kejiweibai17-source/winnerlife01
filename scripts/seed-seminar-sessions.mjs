/**
 * One-time seed for seminarConfig in Sanity.
 *
 *   node --env-file=.env.local scripts/seed-seminar-sessions.mjs
 */
import {createClient} from '@sanity/client'

const DEFAULT_SESSIONS = [
  {date: '2026-09-04', labelZh: '9/04（五）— 台北場', labelJa: '9/04（金）— 台北会場'},
  {
    date: '2026-09-05',
    labelZh: '9/05（六）14:00— 新竹Le Phare 共享空間',
    labelJa: '9/05（土）14:00— 新竹Le Phare 共有空間',
  },
  {
    date: '2026-09-06',
    labelZh: '9/06（日）14:00— 林口喜來登 2F',
    labelJa: '9/06（日）14:00— 林口シェラトン 2F',
  },
  {date: '2026-09-12', labelZh: '9/12（六）— 台北場', labelJa: '9/12（土）— 台北会場'},
  {date: '2026-09-18', labelZh: '9/18（五）— 台北場', labelJa: '9/18（金）— 台北会場'},
  {date: '2026-09-19', labelZh: '9/19（六）— 台北場', labelJa: '9/19（土）— 台北会場'},
  {date: '2026-09-20', labelZh: '9/20（日）— 台中場', labelJa: '9/20（日）— 台中会場'},
  {date: '2026-09-30', labelZh: '9/30（三）— 台北場', labelJa: '9/30（水）— 台北会場'},
]

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-19',
  token,
  useCdn: false,
})

const sessions = DEFAULT_SESSIONS.map((s, i) => ({
  _type: 'session',
  _key: `seed${i}-${s.date}`,
  date: s.date,
  labelZh: s.labelZh,
  labelJa: s.labelJa,
  enabled: true,
}))

await client.createOrReplace({
  _id: 'seminarConfig',
  _type: 'seminarConfig',
  title: '說明會場次設定',
  sessions,
})

console.log(`Seeded ${sessions.length} sessions → seminarConfig`)
