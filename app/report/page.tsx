'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Loader2, AlertTriangle, TrendingUp, Target, Calendar, ArrowRight,
  RotateCcw, Download, Star, Lock, Users, DollarSign, Map,
} from 'lucide-react'


import Link from 'next/link'
import { Report, CompetitiveAnalysis, PricingStrategy, GoToMarketBrief, ActionPlan, MarketSizeEstimate } from '@/types'

interface User {
  name: string | null
  email: string
  role: string
  plan: string
  generation_count: number
}

function ScoreIndicator({ score }: { score: number }) {
  const bg = score >= 8 ? 'from-green-500 to-emerald-500' : score >= 5 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500'
  const label = score >= 8 ? 'Strong Idea!' : score >= 5 ? 'Promising' : 'Needs Work'
  const color = score >= 8 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'
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

function LockedFeature({ title, bullets, plan }: { title: string; bullets: string[]; plan: string }) {
  if (plan === 'lifetime') return null
  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6">
      <div className="text-center">
        <Lock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <h3 className="font-bold text-gray-700 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">Available in Lifetime plan only</p>
        <ul className="text-left text-gray-500 text-sm space-y-1 mb-4 max-w-xs mx-auto">
          {bullets.map((b, i) => <li key={i} className="flex items-start space-x-1.5"><span className="text-gray-400 mt-0.5">·</span><span>{b}</span></li>)}
        </ul>
        <Link
          href="/pricing"
          className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <span>Upgrade to Lifetime · $79</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

function parseJson<T>(value: string | T | null | undefined): T | null {
  if (!value) return null
  if (typeof value === 'string') {
    try { return JSON.parse(value) as T } catch { return null }
  }
  return value as T
}

function renderActionPlan(value: string | ActionPlan | null) {
  if (!value) return []
  if (typeof value === 'string') return value.split('\n').filter(s => s.trim())
  const plan = value as ActionPlan
  const lines: string[] = []
  if (plan.week1) lines.push(`Week 1: ${plan.week1.join(', ')}`)
  if (plan.week2) lines.push(`Week 2: ${plan.week2.join(', ')}`)
  if (plan.week3) lines.push(`Week 3: ${plan.week3.join(', ')}`)
  if (plan.week4) lines.push(`Week 4: ${plan.week4.join(', ')}`)
  if (plan.milestones) lines.push(`Milestone: ${plan.milestones}`)
  return lines
}

function renderMarketSize(value: string | MarketSizeEstimate | null) {
  if (!value) return ''
  if (typeof value === 'string') return value
  const m = value as MarketSizeEstimate
  return [
    m.tam && `TAM: ${m.tam}`,
    m.sam && `SAM: ${m.sam}`,
    m.som && `SOM: ${m.som}`,
    m.growth_rate && `Growth: ${m.growth_rate}`,
    m.comparable_markets && `Comparable: ${m.comparable_markets}`,
  ].filter(Boolean).join('\n')
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
        if (data.error === 'monthly_limit_reached') {
          setError('Monthly limit reached. Upgrade to Lifetime for unlimited validations.')
        } else {
          setError(data.error || 'Failed to generate report')
        }
        return
      }
      setReport(data.report)
    } catch {
      setError('Network error')
    } finally {
      setGenerating(false)
    }
  }

  const [downloading, setDownloading] = useState(false)

  async function handleDownloadPdf() {
    if (!report) return
    setDownloading(true)
    try {
      const res = await fetch('/api/report/pdf')
      if (!res.ok) throw new Error('PDF generation failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `product-validation-report.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Failed to generate PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  function handleRetake() {
    localStorage.removeItem('questionnaire_answers')
    localStorage.removeItem('questionnaire_stage')
    router.push('/questionnaire')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-violet-600" /></div>
  }

  const isPaid = user?.plan === 'monthly' || user?.plan === 'lifetime'
  const isLifetime = user?.plan === 'lifetime'

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <Star className="w-12 h-12 text-violet-400 mx-auto mb-5" />
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
          <Target className="w-12 h-12 text-violet-400 mx-auto mb-5" />
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

  const actionSteps = renderActionPlan(report.action_plan_30_days)
  const marketSizeText = renderMarketSize(report.market_size_estimate)
  const competitiveData = parseJson<CompetitiveAnalysis>(report.competitive_analysis)
  const pricingData = parseJson<PricingStrategy>(report.pricing_strategy)
  const gtmData = parseJson<GoToMarketBrief>(report.go_to_market_brief)
  const plan = user?.plan ?? 'monthly'

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-white mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">
                Product Validation Report · {isLifetime ? '✦ Lifetime Enhanced' : 'Monthly Basic'}
              </p>
              <h1 className="text-2xl font-bold">{user?.name || user?.email?.split('@')[0]}</h1>
              <p className="text-white/80 text-sm mt-1">{user?.email} · {user?.role}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-white/70 text-sm">Generated</p>
              <p className="text-white font-medium">
                {new Date(report.generated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              {user?.generation_count && (
                <p className="text-white/50 text-xs mt-0.5">Total reports: {user.generation_count}</p>
              )}
            </div>
          </div>
        </div>

        {/* Validation Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Validation Score</h2>
          <ScoreIndicator score={report.validation_score} />
          <p className="text-gray-600 mt-4 max-w-lg mx-auto text-sm">
            Score ini menunjukkan seberapa valid dan viable ide produk Anda berdasarkan analisis AI terhadap semua jawaban Anda.
          </p>
        </div>

        {/* Risks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">Top 3 Risks</h2>
          </div>
          <div className="space-y-5">
            {([
              { risk: report.risk1, mitigation: report.risk1_mitigation },
              { risk: report.risk2, mitigation: report.risk2_mitigation },
              { risk: report.risk3, mitigation: report.risk3_mitigation },
            ]).map(({ risk, mitigation }, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{risk}</p>
                  {mitigation && (
                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Mitigation Strategy</p>
                      <p className="text-blue-800 text-sm leading-relaxed">{mitigation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!isLifetime && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <LockedFeature
                title="Detailed Mitigation Strategies"
                bullets={['Specific tactics for each risk', 'Examples from similar products', 'Step-by-step mitigation plan']}
                plan={plan}
              />
            </div>
          )}
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-5">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-bold text-gray-900">Top 3 Opportunities</h2>
          </div>
          <div className="space-y-5">
            {([
              { opp: report.opportunity1, tactics: report.opportunity1_tactics },
              { opp: report.opportunity2, tactics: report.opportunity2_tactics },
              { opp: report.opportunity3, tactics: report.opportunity3_tactics },
            ]).map(({ opp, tactics }, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{opp}</p>
                  {tactics && (
                    <div className="mt-2 bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-700 mb-1">Specific Tactics</p>
                      <p className="text-green-800 text-sm leading-relaxed">{tactics}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!isLifetime && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <LockedFeature
                title="Actionable Tactics for Each Opportunity"
                bullets={['3-5 specific tactics per opportunity', 'Timeline to execute', 'Expected impact']}
                plan={plan}
              />
            </div>
          )}
        </div>

        {/* Market Size */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">Market Size Estimate</h2>
          </div>
          <div className="space-y-1.5">
            {marketSizeText.split('\n').map((line, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed">{line}</p>
            ))}
          </div>
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
                <p className="text-gray-700 text-sm leading-relaxed">{step.replace(/^[•\-*]\s*/, '')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <ArrowRight className="w-5 h-5" />
            <h2 className="text-lg font-bold">Next Critical Step</h2>
          </div>
          <p className="text-white/90 leading-relaxed text-sm">{report.next_step}</p>
        </div>

        {/* Competitive Analysis — Lifetime only */}
        {isLifetime && competitiveData ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-5">
              <Users className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">Competitive Analysis</h2>
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Lifetime</span>
            </div>
            <div className="space-y-4 mb-4">
              {competitiveData.competitors?.map((comp, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{comp.name}</h3>
                    <span className="text-sm text-gray-500 font-medium">{comp.pricing}</span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{comp.market_position}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">Strengths</p>
                      <ul className="space-y-0.5">{comp.strengths?.map((s, j) => <li key={j} className="text-xs text-gray-600">+ {s}</li>)}</ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 mb-1">Weaknesses</p>
                      <ul className="space-y-0.5">{comp.weaknesses?.map((w, j) => <li key={j} className="text-xs text-gray-600">- {w}</li>)}</ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {competitiveData.competitive_positioning && (
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-indigo-700 mb-1">Your Positioning</p>
                <p className="text-indigo-800 text-sm">{competitiveData.competitive_positioning}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <LockedFeature
              title="Competitive Analysis"
              bullets={['5 direct competitors identified', 'Pricing comparison', 'Strengths vs weaknesses matrix', 'Market positioning strategy']}
              plan={plan}
            />
          </div>
        )}

        {/* Pricing Strategy — Lifetime only */}
        {isLifetime && pricingData ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-5">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-bold text-gray-900">Pricing Strategy</h2>
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Lifetime</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-700 mb-1">Recommended Model</p>
                <p className="text-green-900 font-bold text-lg">{pricingData.recommended_price}</p>
                <p className="text-green-700 text-sm capitalize">{pricingData.recommended_model}</p>
              </div>
              <div className="space-y-3">
                {pricingData.justification && <div><p className="text-xs font-semibold text-gray-500 mb-1">Justification</p><p className="text-gray-700 text-sm">{pricingData.justification}</p></div>}
                {pricingData.revenue_projection && <div><p className="text-xs font-semibold text-gray-500 mb-1">Revenue Projection</p><p className="text-gray-700 text-sm">{pricingData.revenue_projection}</p></div>}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <LockedFeature
              title="Pricing Strategy"
              bullets={['Recommended pricing model', 'Price point with justification', 'Competitor pricing comparison', 'Revenue projections']}
              plan={plan}
            />
          </div>
        )}

        {/* Go-to-Market — Lifetime only */}
        {isLifetime && gtmData ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-5">
              <Map className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">Go-to-Market Brief</h2>
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Lifetime</span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Target Customer', value: gtmData.target_customer },
                { label: 'Key Messaging', value: gtmData.key_messaging },
                { label: 'Launch Channels', value: gtmData.launch_channels },
                { label: 'First 90 Days', value: gtmData.first_90_days },
              ].map(({ label, value }) => value ? (
                <div key={label}>
                  <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
                </div>
              ) : null)}
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <LockedFeature
              title="Go-to-Market Brief"
              bullets={['Detailed ICP (ideal customer profile)', 'Core value proposition', 'Top launch channels with tactics', 'First 90-day milestone plan']}
              plan={plan}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {downloading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Generating PDF...</span></>
            ) : (
              <><Download className="w-4 h-4" /><span>Download PDF</span></>
            )}
          </button>
          <button
            onClick={handleRetake}
            className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:border-violet-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Validation</span>
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:border-violet-300 transition-colors">
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
