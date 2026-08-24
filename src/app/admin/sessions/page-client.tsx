'use client'

import {useCallback, useEffect, useState} from 'react'
import type {CmsSeminarSession} from '@/lib/seminar-sessions'

const STORAGE_KEY = 'seminar-admin-password'

type Row = CmsSeminarSession & {id: string}

function newId() {
  return Math.random().toString(36).slice(2, 10)
}

function toRows(sessions: CmsSeminarSession[]): Row[] {
  return sessions.map((s) => ({
    id: s._key || newId(),
    date: s.date || '',
    labelZh: s.labelZh || '',
    labelJa: s.labelJa || '',
    enabled: s.enabled !== false,
  }))
}

export default function SeminarSessionsAdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [setup, setSetup] = useState<{
    hasPassword: boolean
    hasWriteToken: boolean
  } | null>(null)

  useEffect(() => {
    void fetch('/api/seminar-sessions?setup=1')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSetup(data)
      })
      .catch(() => {})
  }, [])

  const load = useCallback(async (pwd: string) => {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const res = await fetch('/api/seminar-sessions?admin=1', {
        headers: {'x-admin-password': pwd},
        cache: 'no-store',
      })
      if (res.status === 503) {
        setError('尚未設定管理密碼（ADMIN_SESSIONS_PASSWORD），請先請工程師設定。')
        return
      }
      if (res.status === 401) {
        setAuthed(false)
        setError('密碼錯誤')
        sessionStorage.removeItem(STORAGE_KEY)
        return
      }
      if (!res.ok) {
        setError('載入失敗，請稍後再試')
        return
      }
      const data = await res.json()
      setRows(toRows(data.sessions || []))
      setAuthed(true)
      sessionStorage.setItem(STORAGE_KEY, pwd)
    } catch {
      setError('無法連線，請稍後再試')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      setPassword(saved)
      void load(saved)
    }
  }, [load])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    await load(password.trim())
  }

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? {...r, ...patch} : r)))
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        id: newId(),
        date: '',
        labelZh: '',
        labelJa: '',
        enabled: true,
      },
    ])
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function moveRow(id: string, dir: -1 | 1) {
    setRows((prev) => {
      const i = prev.findIndex((r) => r.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setMessage('')
    const pwd = sessionStorage.getItem(STORAGE_KEY) || password
    const sessions: CmsSeminarSession[] = rows.map((r) => ({
      _key: r.id,
      date: r.date,
      labelZh: r.labelZh.trim(),
      labelJa: r.labelJa.trim() || r.labelZh.trim(),
      enabled: r.enabled !== false,
    }))

    try {
      const res = await fetch('/api/seminar-sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': pwd,
        },
        body: JSON.stringify({sessions}),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '儲存失敗')
        return
      }
      setMessage('已儲存。網站約 30 秒內會更新場次。')
    } catch {
      setError('儲存失敗，請稍後再試')
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setAuthed(false)
    setPassword('')
    setRows([])
    setMessage('')
    setError('')
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-4 py-16 font-sans text-gray-800">
        <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
          <h1 className="m-0 text-xl font-medium tracking-wide text-[#0d417b]">
            說明會場次編輯
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            僅供內部使用。請輸入管理密碼後編輯報名表單場次。
          </p>
          {setup && !setup.hasPassword && (
            <p className="mt-4 rounded bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
              系統尚未設定管理密碼。請在主機環境變數加入{' '}
              <code className="rounded bg-white px-1">ADMIN_SESSIONS_PASSWORD</code>
              ，以及寫入權杖{' '}
              <code className="rounded bg-white px-1">SANITY_API_WRITE_TOKEN</code>
              。
            </p>
          )}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-gray-600">管理密碼</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d417b]"
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p className="m-0 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#0d417b] px-4 py-2.5 text-sm text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? '驗證中…' : '進入編輯'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-4 py-10 font-sans text-gray-800 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="m-0 text-2xl font-medium tracking-wide text-[#0d417b]">
              說明會場次
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">
              修改後按「儲存」即可更新聯絡表單與說明會報名選項。過期場次請刪除；暫不開放可關閉「顯示」。
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            登出
          </button>
        </div>

        {(error || message) && (
          <p
            className={`mt-4 rounded px-4 py-3 text-sm ${
              error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
            }`}
            role="status"
          >
            {error || message}
          </p>
        )}

        {setup && !setup.hasWriteToken && (
          <p className="mt-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            提醒：尚未設定{' '}
            <code className="rounded bg-white px-1">SANITY_API_WRITE_TOKEN</code>
            ，本頁可預覽／編輯，但「儲存」會失敗。可改開{' '}
            <a href="/studio" className="underline underline-offset-2">
              /studio
            </a>{' '}
            → 左側「說明會場次」直接改（需登入 Sanity）。
          </p>
        )}

        <div className="mt-6 space-y-4">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-5"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs tracking-wider text-gray-400">
                  場次 {index + 1}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveRow(row.id, -1)}
                    disabled={index === 0}
                    className="rounded border border-gray-200 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    上移
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRow(row.id, 1)}
                    disabled={index === rows.length - 1}
                    className="rounded border border-gray-200 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    下移
                  </button>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={row.enabled !== false}
                      onChange={(e) =>
                        updateRow(row.id, {enabled: e.target.checked})
                      }
                    />
                    顯示
                  </label>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    刪除
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_1fr]">
                <label className="block text-sm">
                  <span className="mb-1 block text-gray-600">日期</span>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => updateRow(row.id, {date: e.target.value})}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0d417b]"
                    required
                  />
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-gray-600">
                      顯示文字（中文）
                    </span>
                    <input
                      type="text"
                      value={row.labelZh}
                      onChange={(e) =>
                        updateRow(row.id, {labelZh: e.target.value})
                      }
                      placeholder="例：9/18（五）— 台北場"
                      className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0d417b]"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-gray-600">
                      顯示文字（日文）
                    </span>
                    <input
                      type="text"
                      value={row.labelJa}
                      onChange={(e) =>
                        updateRow(row.id, {labelJa: e.target.value})
                      }
                      placeholder="例：9/18（金）— 台北会場"
                      className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0d417b]"
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addRow}
            className="rounded border border-[#0d417b] bg-white px-4 py-2.5 text-sm text-[#0d417b] hover:bg-[#0d417b]/5"
          >
            ＋ 新增場次
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || rows.length === 0}
            className="rounded bg-[#0d417b] px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? '儲存中…' : '儲存變更'}
          </button>
        </div>

        <p className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          <strong className="font-medium">給客戶的用法：</strong>
          開啟本頁 → 輸入密碼 → 改日期／顯示文字 → 按「儲存變更」。
          文字範例：<code className="rounded bg-white px-1">9/18（五）— 台北場</code>
          。若儲存失敗，請管理員在主機環境變數設定{' '}
          <code className="rounded bg-white px-1">SANITY_API_WRITE_TOKEN</code>
          ；或改用{' '}
          <a href="/studio" className="underline underline-offset-2">
            /studio
          </a>{' '}
          （左側點「說明會場次」）編輯。
        </p>
      </div>
    </main>
  )
}
