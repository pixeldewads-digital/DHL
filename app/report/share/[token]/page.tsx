import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Report, CompetitiveAnalysis, PricingStrategy, GoToMarketBrief } from '@/types'

function parseJson<T>(value: unknown): T | null {
  if (!value) return null
  if (typeof value === 'string') { try { return JSON.parse(value) as T } catch { return null } }
  return value as T
}

function ScoreRing({ score }: { score: number }) {
  const bg = score >= 8 ? 'from-green-500 to-emerald-500' : score >= 5 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500'
  const label = score >= 8 ? 'Strong Idea!' : score >= 5 ? 'Promising' : 'Needs Work'
  const color = score >= 8 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-600'
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br ${bg} shadow-lg mb-3`}>
        <div>
          <div className="text-white text-4xl font-bold leading-none">{score}</div>
          <div className="text-white/80 text-xs mt-0.5">/10</div>
        </div>
      </div>
      <p className={`text-lg font-bold ${color}`}>{label}</p>
    </div>
  )
}

export default async function SharedReportPage({ params }: { params: { token: string } }) {
  const { data: report } = await supabaseAdmin
    .from('reports')
    .select('*, users(name, email, role, plan)')
    .eq('share_token', params.token)
    .single()

  if (!report) notFound()

  const user = report.users as { name: string | null; email: string; role: string; plan: string } | null
  const userName = user?.name || user?.email?.split('@')[0] || 'User'
  const isLifetime = user?.plan === 'lifetime'

  const r = report as unknown as Report
  const competitive = parseJson<CompetitiveAnalysis>(r.competitive_analysis)
  const pricing = parseJson<PricingStrategy>(r.pricing_strategy)
  const gtm = parseJson<GoToMarketBrief>(r.go_to_market_brief)

  const actionSteps = typeof r.action_plan_30_days === 'string'
    ? r.action_plan_30_days.split('\n').filter((s: string) => s.trim())
    : []

  const marketSizeText = typeof r.market_size_estimate === 'string' ? r.market_size_estimate : ''

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://productaiprompts.com'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Shared badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span>🔗</span>
            Shared Report — Read Only
          </span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-white mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">
                Product Validation Report · {isLifetime ? '✦ Lifetime Enhanced' : 'Monthly Basic'}
              </p>
              <h1 className="text-2xl font-bold">{userName}</h1>
              {user?.role && <p className="text-white/80 text-sm mt-1 capitalize">{user.role}</p>}
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-white/70 text-sm">Generated</p>
              <p className="text-white font-medium">
                {new Date(r.generated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Validation Score</h2>
          <ScoreRing score={r.validation_score} />
        </div>

        {/* Risks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">⚠️ Top 3 Risks</h2>
          <div className="space-y-4">
            {[
              [r.risk1, r.risk1_mitigation],
              [r.risk2, r.risk2_mitigation],
              [r.risk3, r.risk3_mitigation],
            ].filter(([risk]) => risk).map(([risk, mitigation], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{risk as string}</p>
                  {mitigation && (
                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Mitigation Strategy</p>
                      <p className="text-blue-800 text-sm leading-relaxed">{mitigation as string}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">📈 Top 3 Opportunities</h2>
          <div className="space-y-4">
            {[
              [r.opportunity1, r.opportunity1_tactics],
              [r.opportunity2, r.opportunity2_tactics],
              [r.opportunity3, r.opportunity3_tactics],
            ].filter(([opp]) => opp).map(([opp, tactics], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{opp as string}</p>
                  {tactics && (
                    <div className="mt-2 bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-700 mb-1">Tactics</p>
                      <p className="text-green-800 text-sm leading-relaxed">{tactics as string}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Size */}
        {marketSizeText && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 Market Size Estimate</h2>
            {marketSizeText.split('\n').map((line, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed">{line}</p>
            ))}
          </div>
        )}

        {/* 30-Day Action Plan */}
        {actionSteps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">📅 30-Day Action Plan</h2>
            <div className="space-y-3">
              {actionSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-violet-600 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{step.replace(/^[•\-*]\s*/, '')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Step */}
        {r.next_step && (
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-lg font-bold mb-3">➡️ Next Critical Step</h2>
            <p className="text-white/90 leading-relaxed text-sm">{r.next_step}</p>
          </div>
        )}

        {/* Lifetime sections */}
        {isLifetime && competitive?.competitors && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              🏆 Competitive Analysis
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold ml-2">Lifetime</span>
            </h2>
            <div className="space-y-4 mb-4">
              {competitive.competitors.map((comp, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{comp.name}</h3>
                    <span className="text-sm text-gray-500">{comp.pricing}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">{comp.market_position}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">Strengths</p>
                      {comp.strengths?.map((s, j) => <p key={j} className="text-xs text-gray-600">+ {s}</p>)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 mb-1">Weaknesses</p>
                      {comp.weaknesses?.map((w, j) => <p key={j} className="text-xs text-gray-600">- {w}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {competitive.competitive_positioning && (
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-indigo-700 mb-1">Positioning</p>
                <p className="text-indigo-800 text-sm">{competitive.competitive_positioning}</p>
              </div>
            )}
          </div>
        )}

        {isLifetime && pricing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              💰 Pricing Strategy
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold ml-2">Lifetime</span>
            </h2>
            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-green-700 mb-1">Recommended Price</p>
              <p className="text-2xl font-bold text-green-900">{pricing.recommended_price}</p>
              <p className="text-sm text-green-700 capitalize">{pricing.recommended_model}</p>
            </div>
            {pricing.justification && <><p className="text-xs font-semibold text-gray-500 mb-1">Justification</p><p className="text-gray-700 text-sm mb-3">{pricing.justification}</p></>}
            {pricing.revenue_projection && <><p className="text-xs font-semibold text-gray-500 mb-1">Revenue Projection</p><p className="text-gray-700 text-sm">{pricing.revenue_projection}</p></>}
          </div>
        )}

        {isLifetime && gtm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              🗺 Go-to-Market Brief
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold ml-2">Lifetime</span>
            </h2>
            <div className="space-y-4">
              {[['Target Customer', gtm.target_customer], ['Key Messaging', gtm.key_messaging], ['Launch Channels', gtm.launch_channels], ['First 90 Days', gtm.first_90_days]].filter(([, v]) => v).map(([l, v]) => (
                <div key={l}><p className="text-xs font-semibold text-gray-500 mb-1">{l}</p><p className="text-gray-700 text-sm leading-relaxed">{v}</p></div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center mt-4">
          <p className="text-gray-600 mb-2">Ingin validasi ide produk Anda sendiri?</p>
          <p className="text-gray-500 text-sm mb-6">Jawab 18 pertanyaan. Dapatkan AI report dengan validation score, risks, dan action plan.</p>
          <Link
            href={`${appUrl}/auth/signup`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Coba Gratis — Product AI Prompts
          </Link>
        </div>
      </div>
    </div>
  )
}
