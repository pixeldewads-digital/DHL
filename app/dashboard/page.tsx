'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, FileText, BarChart2, Plus, Star, ArrowRight, Calendar } from 'lucide-react'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  plan: string
  payment_status: string
  created_at: string
}

interface Report {
  id: string
  validation_score: number
  generated_at: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/user/profile').then(r => r.json()),
      fetch('/api/reports').then(r => r.json()),
    ]).then(([userData, reportsData]) => {
      setUser(userData.user)
      setReports(reportsData.reports || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    )
  }

  const isPaid = user?.plan === 'monthly' || user?.plan === 'lifetime'
  const planLabel = user?.plan === 'lifetime' ? 'Lifetime' : user?.plan === 'monthly' ? 'Monthly' : 'Free'
  const planColor = isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* User card */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold">{user?.name || 'Welcome!'}</h2>
              <p className="text-white/80 text-sm">{user?.email}</p>
              <p className="text-white/70 text-sm capitalize mt-0.5">{user?.role}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${isPaid ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80'}`}>
                {planLabel}
              </span>
              {!isPaid && (
                <div className="mt-2">
                  <Link href="/pricing" className="text-white/80 text-xs hover:text-white underline">
                    Upgrade →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Reports', value: reports.length, icon: <FileText className="w-5 h-5 text-violet-600" /> },
            { label: 'Avg Score', value: reports.length ? Math.round(reports.reduce((s, r) => s + r.validation_score, 0) / reports.length) + '/10' : '–', icon: <BarChart2 className="w-5 h-5 text-blue-600" /> },
            { label: 'Plan', value: planLabel, icon: <Star className="w-5 h-5 text-yellow-500" /> },
            { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).getFullYear() : '–', icon: <Calendar className="w-5 h-5 text-green-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center space-x-2 mb-2">{stat.icon}<span className="text-gray-500 text-xs">{stat.label}</span></div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link href="/questionnaire" className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl p-5 text-white flex items-center justify-between hover:opacity-90 transition-opacity">
            <div>
              <h3 className="font-bold text-lg">New Validation</h3>
              <p className="text-white/80 text-sm">Mulai validasi ide baru</p>
            </div>
            <Plus className="w-6 h-6" />
          </Link>
          {reports.length > 0 && (
            <Link href="/report" className="bg-white rounded-xl border-2 border-gray-200 p-5 flex items-center justify-between hover:border-violet-300 transition-colors">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Latest Report</h3>
                <p className="text-gray-500 text-sm">Lihat report terakhir Anda</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </Link>
          )}
        </div>

        {/* Reports history */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Report History</h2>
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada report. Mulai validasi pertama Anda!</p>
              <Link href="/questionnaire" className="inline-block mt-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 text-sm">
                Mulai Sekarang →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report, i) => {
                const scoreColor = report.validation_score >= 8 ? 'text-green-600 bg-green-50' : report.validation_score >= 5 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'
                return (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-violet-200 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${scoreColor}`}>
                        {report.validation_score}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Report #{reports.length - i}</p>
                        <p className="text-gray-500 text-sm">{new Date(report.generated_at).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <Link href="/report" className="text-violet-600 hover:text-violet-700 text-sm font-medium">
                      Lihat →
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
