'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle, TrendingUp, Target, Calendar, ArrowRight, RotateCcw, Download, Star } from 'lucide-react'
import Link from 'next/link'

interface Report {
  id: string
  validation_score: number
  risk1: string
  risk2: string
  risk3: string
  opportunity1: string
  opportunity2: string
  opportunity3: string
  market_size_estimate: string
  action_plan_30_days: string
  next_step: string
  generated_at: string
}

interface User {
  name: string | null
  email: string
  role: string
  plan: string
}

function ScoreIndicator({ score }: { score: number }) {
  const color = score >= 8 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'
  const bg = score >= 8 ? 'from-green-500 to-emerald-500' : score >= 5 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500'
  const label = score >= 8 ? 'Strong Idea!' : score >= 5 ? 'Promising' : 'Needs Work'

  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${bg} shadow-lg mb-4`}>
        <div>
          <div className="text-white text-5xl font-bold leading-none">{score}</div>
          <div className="text-white/80 text-xs mt-1">/10</div>
        </div>
      </div>
      <p className={`text-xl font-bold ${color}`}>{label}</p>
    </div>
  )
}

export default function ReportPage() {
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/report').then(r => r.json()),
      fetch('/api/user/profile').then(r => r.json()),
    ]).then(([reportData, userData]) => {
      setReport(reportData.report)
      setUser(userData.user)
    }).catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  async function generateReport() {
    setGenerating(true)
    setError('')
    try {
      const res = await fetch('/api/report/generate', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to generate report')
        return
      }
      setReport(data.report)
    } catch {
      setError('Network error')
    } finally {
      setGenerating(false)
    }
  }

  async function handleRetake() {
    localStorage.removeItem('questionnaire_answers')
    localStorage.removeItem('questionnaire_stage')
    router.push('/questionnaire')
  }

  function handleDownloadPDF() {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    )
  }

  const isPaid = user?.plan === 'monthly' || user?.plan === 'lifetime'

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Report Tersedia Setelah Pembayaran</h1>
          <p className="text-gray-600 mb-8">Upgrade ke plan berbayar untuk mengakses AI report lengkap Anda.</p>
          <Link href="/pricing" className="block w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Lihat Pricing →
          </Link>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Belum Ada Report</h1>
          <p className="text-gray-600 mb-6">Selesaikan questionnaire dulu untuk generate AI report.</p>
          {error && <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm">{error}</div>}
          <div className="space-y-3">
            <button
              onClick={generateReport}
              disabled={generating}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {generating ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Generating...</span></> : <span>Generate Report</span>}
            </button>
            <Link href="/questionnaire" className="block w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-violet-300 transition-colors text-center">
              Isi Questionnaire
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const actionSteps = report.action_plan_30_days.split('\n').filter(s => s.trim())

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-white mb-6 print:shadow-none">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Product Validation Report</p>
              <h1 className="text-2xl font-bold">{user?.name || user?.email?.split('@')[0]}</h1>
              <p className="text-white/80 text-sm mt-1">{user?.email} · {user?.role}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-white/70 text-sm">Generated</p>
              <p className="text-white font-medium">{new Date(report.generated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Validation Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Validation Score</h2>
          <ScoreIndicator score={report.validation_score} />
          <p className="text-gray-600 mt-4 max-w-lg mx-auto">
            Score ini menunjukkan seberapa valid dan viable ide produk Anda berdasarkan analisis AI terhadap semua jawaban Anda.
          </p>
        </div>

        {/* Risks & Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Top 3 Risks</h2>
            </div>
            <div className="space-y-4">
              {[report.risk1, report.risk2, report.risk3].map((risk, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-5">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-bold text-gray-900">Top 3 Opportunities</h2>
            </div>
            <div className="space-y-4">
              {[report.opportunity1, report.opportunity2, report.opportunity3].map((opp, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{opp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Size */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">Market Size Estimate</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{report.market_size_estimate}</p>
        </div>

        {/* 30-Day Action Plan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-5">
            <Calendar className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-bold text-gray-900">30-Day Action Plan</h2>
          </div>
          <div className="space-y-3">
            {actionSteps.map((step, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-violet-600 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{step.replace(/^[•\-*]\s*/, '')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <ArrowRight className="w-5 h-5" />
            <h2 className="text-lg font-bold">Next Critical Step</h2>
          </div>
          <p className="text-white/90 leading-relaxed">{report.next_step}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handleRetake}
            className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:border-violet-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Questionnaire</span>
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:border-violet-300 transition-colors">
            <span>View Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
