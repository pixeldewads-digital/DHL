import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'
import Link from 'next/link'
import { LayoutDashboard, Users, Download } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session || !isAdmin(session.email)) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-6 px-4 shrink-0">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
        </div>
        <nav className="space-y-1 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/waitlist"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
          >
            <Users className="w-4 h-4" />
            Waitlist
          </Link>
          <a
            href="/api/admin/export-csv"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </a>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 truncate">{session.email}</p>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
