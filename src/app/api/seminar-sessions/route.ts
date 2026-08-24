import {NextResponse} from 'next/server'
import {
  getSeminarSessionOptions,
  getSeminarSessionsForAdmin,
  saveSeminarSessions,
} from '@/lib/seminar-sessions-server'
import type {CmsSeminarSession} from '@/lib/seminar-sessions'

export const dynamic = 'force-dynamic'

function checkAdminAuth(request: Request): boolean {
  const password = process.env.ADMIN_SESSIONS_PASSWORD
  if (!password) return false
  const header = request.headers.get('x-admin-password') || ''
  return header === password
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const locale = searchParams.get('locale') === 'jp' ? 'jp' : 'zh'
  const admin = searchParams.get('admin') === '1'
  const setup = searchParams.get('setup') === '1'

  if (setup) {
    return NextResponse.json({
      hasPassword: Boolean(process.env.ADMIN_SESSIONS_PASSWORD),
      hasWriteToken: Boolean(process.env.SANITY_API_WRITE_TOKEN),
    })
  }

  if (admin) {
    if (!process.env.ADMIN_SESSIONS_PASSWORD) {
      return NextResponse.json(
        {error: 'admin_password_not_configured'},
        {status: 503},
      )
    }
    if (!checkAdminAuth(request)) {
      return NextResponse.json({error: 'unauthorized'}, {status: 401})
    }
    const sessions = await getSeminarSessionsForAdmin()
    return NextResponse.json({sessions})
  }

  const sessions = await getSeminarSessionOptions(locale)
  return NextResponse.json({sessions})
}

export async function PUT(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({error: 'unauthorized'}, {status: 401})
  }

  let body: {sessions?: CmsSeminarSession[]}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({error: 'invalid_json'}, {status: 400})
  }

  if (!Array.isArray(body.sessions)) {
    return NextResponse.json({error: 'sessions_required'}, {status: 400})
  }

  const result = await saveSeminarSessions(body.sessions)
  if (!result.ok) {
    return NextResponse.json({error: result.error}, {status: 500})
  }

  return NextResponse.json({ok: true})
}
