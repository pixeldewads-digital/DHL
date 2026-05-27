'use client'

import { useEffect, useState } from 'react'
import { WaitlistSignup } from '@/lib/types/waitlist'
import { ChevronUp, ChevronDown } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  invited: 'bg-blue-100 text-blue-700',
  converted: 'bg-green-100 text-green-700',
}

type SortKey = 'position_in_waitlist' | 'first_name' | 'email' | 'pain_level' | 'created_at'

export function WaitlistTable() {
  const [data, setData] = useState<WaitlistSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortKey>('position_in_waitlist')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    load()
  }, [sortBy, sortOrder, roleFilter, statusFilter])

  async function load() {
    setLoading(true)
    const params = new URLSearchParams({
      sortBy,
      sortOrder,
      ...(roleFilter && { role: roleFilter }),
      ...(statusFilter && { status: statusFilter }),
    })
    const res = await fetch(`/api/admin/waitlist?${params}`)
    const json = await res.json()
    setData(Array.isArray(json) ? json : [])
    setSelected(new Set())
    setLoading(false)
  }

  function toggleSort(col: SortKey) {
    if (sortBy === col) setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))
    else { setSortBy(col); setSortOrder('asc') }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortBy !== col) return <ChevronUp className="w-3 h-3 opacity-30" />
    return sortOrder === 'asc'
      ? <ChevronUp className="w-3 h-3 text-violet-600" />
      : <ChevronDown className="w-3 h-3 text-violet-600" />
  }

  async function bulkUpdateStatus(status: 'invited' | 'converted') {
    if (!selected.size) return
    setSaving(true)
    await fetch('/api/admin/waitlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selected), status }),
    })
    setSaving(false)
    load()
  }

  function toggleRow(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(prev =>
      prev.size === data.length ? new Set() : new Set(data.map(r => r.id))
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Filters + bulk actions */}
      <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Semua Role</option>
          <option value="Creator">Creator</option>
          <option value="Founder">Founder</option>
          <option value="Online Seller">Online Seller</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="invited">Invited</option>
          <option value="converted">Converted</option>
        </select>

        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">{selected.size} selected</span>
            <button
              onClick={() => bulkUpdateStatus('invited')}
              disabled={saving}
              className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Mark Invited
            </button>
            <button
              onClick={() => bulkUpdateStatus('converted')}
              disabled={saving}
              className="text-sm px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Mark Converted
            </button>
          </div>
        )}

        <span className="text-xs text-gray-400 ml-auto">{data.length} entries</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="pl-4 pr-2 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAll}
                  className="accent-violet-600"
                />
              </th>
              {([
                ['position_in_waitlist', '#'],
                ['first_name', 'Nama'],
                ['email', 'Email'],
                ['role', 'Role'],
                ['current_tool', 'Tool'],
                ['pain_level', 'Pain'],
                ['referral_source', 'Source'],
                ['status', 'Status'],
                ['created_at', 'Tanggal'],
              ] as [SortKey | string, string][]).map(([col, label]) => (
                <th
                  key={col}
                  className="px-3 py-3 text-left font-semibold text-gray-600 cursor-pointer hover:text-gray-900 whitespace-nowrap"
                  onClick={() => toggleSort(col as SortKey)}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    <SortIcon col={col as SortKey} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={10} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={10} className="text-center py-8 text-gray-400">Belum ada data</td></tr>
            ) : data.map(row => (
              <tr key={row.id} className={`hover:bg-gray-50 transition-colors ${selected.has(row.id) ? 'bg-violet-50' : ''}`}>
                <td className="pl-4 pr-2 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="accent-violet-600"
                  />
                </td>
                <td className="px-3 py-2.5 font-semibold text-violet-600">#{row.position_in_waitlist}</td>
                <td className="px-3 py-2.5 font-medium text-gray-900">{row.first_name}</td>
                <td className="px-3 py-2.5 text-gray-500">{row.email}</td>
                <td className="px-3 py-2.5">{row.role || <span className="text-gray-300">—</span>}</td>
                <td className="px-3 py-2.5">{row.current_tool || <span className="text-gray-300">—</span>}</td>
                <td className="px-3 py-2.5 text-center">
                  {row.pain_level != null ? (
                    <span className={`font-semibold ${row.pain_level >= 8 ? 'text-red-600' : row.pain_level >= 5 ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {row.pain_level}
                    </span>
                  ) : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-2.5">{row.referral_source || <span className="text-gray-300">—</span>}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">
                  {new Date(row.created_at).toLocaleDateString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
