import { getWaitlistStats } from '@/lib/db/waitlist'
import { StatsCard } from '@/app/admin/components/StatsCard'
import { WaitlistTable } from '@/app/admin/components/WaitlistTable'

export const dynamic = 'force-dynamic'

function BreakdownTable({ data }: { data: Record<string, number> }) {
  const sorted = Object.entries(data).sort(([, a], [, b]) => b - a)
  const total = sorted.reduce((s, [, v]) => s + v, 0)
  return (
    <div className="space-y-2">
      {sorted.map(([key, count]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-sm text-gray-600 w-32 truncate">{key}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-2">
            <div
              className="bg-violet-500 h-2 rounded-full"
              style={{ width: `${Math.round((count / total) * 100)}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700 w-6 text-right">{count}</span>
        </div>
      ))}
    </div>
  )
}

export default async function AdminPage() {
  const stats = await getWaitlistStats()

  if (!stats) {
    return <p className="text-red-500">Gagal memuat statistik.</p>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Waitlist Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview pendaftar early access</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard label="Total Signups" value={stats.total} color="violet" />
        <StatsCard label="Pending" value={stats.byStatus.pending} color="yellow" />
        <StatsCard label="Invited" value={stats.byStatus.invited} color="blue" />
        <StatsCard label="Converted" value={stats.byStatus.converted} color="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          label="Avg Pain Level"
          value={stats.avgPainLevel}
          color="gray"
          suffix="/ 10"
        />
        <StatsCard
          label="Conversion Rate"
          value={stats.total > 0 ? Math.round((stats.byStatus.converted / stats.total) * 100) : 0}
          color="green"
          suffix="%"
        />
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">By Role</h3>
          <BreakdownTable data={stats.byRole} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">By Current Tool</h3>
          <BreakdownTable data={stats.byCurrentTool} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">By Referral Source</h3>
          <BreakdownTable data={stats.byReferral} />
        </div>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Daftar Pendaftar</h2>
        <WaitlistTable />
      </div>
    </div>
  )
}
