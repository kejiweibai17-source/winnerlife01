import type {Metadata} from 'next'
import SeminarSessionsAdminPage from './page-client'

export const metadata: Metadata = {
  title: '說明會場次編輯',
  robots: {index: false, follow: false},
}

export default function AdminSessionsPage() {
  return <SeminarSessionsAdminPage />
}
