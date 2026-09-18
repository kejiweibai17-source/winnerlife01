/**
 * One-time seed for seminarConfig in Sanity.
 *
 *   node --env-file=.env.local scripts/seed-seminar-sessions.mjs
 */
import {createClient} from '@sanity/client'

const DEFAULT_SESSIONS = [
  {
    date: '2026-10-10',
    labelZh: '10/10（六）14:00— 新竹｜新竹國賓大飯店',
    labelJa: '10/10（土）14:00— 新竹｜新竹國賓大飯店',
  },
  {
    date: '2026-10-11',
    labelZh: '10/11（日）14:00— 台中｜台中金典酒店',
    labelJa: '10/11（日）14:00— 台中｜台中金典ホテル',
  },
  {
    date: '2026-10-17',
    labelZh: '10/17（六）14:00— 台南｜台南老爺行旅',
    labelJa: '10/17（土）14:00— 台南｜台南老爺行旅',
  },
  {
    date: '2026-10-18',
    labelZh: '10/18（日）14:00— 高雄｜和逸飯店（高雄中山館）',
    labelJa: '10/18（日）14:00— 高雄｜和逸飯店（高雄中山館）',
  },
  {
    date: '2026-10-24',
    labelZh: '10/24（六）14:00— 林口｜亞昕福朋喜來登酒店',
    labelJa: '10/24（土）14:00— 林口｜亞昕福朋喜來登ホテル',
  },
  {
    date: '2026-10-28',
    labelZh: '10/28（三）14:00— 台北｜忠訓地產會議廳',
    labelJa: '10/28（水）14:00— 台北｜忠訓地產会議室',
  },
  {
    date: '2026-10-31',
    labelZh: '10/31（六）14:00— 台北｜茹曦酒店',
    labelJa: '10/31（土）14:00— 台北｜茹曦ホテル',
  },
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
