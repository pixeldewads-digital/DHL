import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Resend } from 'resend'
import { Report, CompetitiveAnalysis, PricingStrategy, GoToMarketBrief } from '@/types'

export const dynamic = 'force-dynamic'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

function parseJson<T>(value: unknown): T | null {
  if (!value) return null
  if (typeof value === 'string') { try { return JSON.parse(value) as T } catch { return null } }
  return value as T
}

function scoreColor(score: number) {
  return score >= 8 ? '#16a34a' : score >= 5 ? '#d97706' : '#dc2626'
}

function scoreLabel(score: number) {
  return score >= 8 ? 'Strong Idea!' : score >= 5 ? 'Promising' : 'Needs Work'
}

function buildReportHtml(report: Report, userName: string, plan: string): string {
  const isLifetime = plan === 'lifetime'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://productaiprompts.com'
  const competitive = parseJson<CompetitiveAnalysis>(report.competitive_analysis)
  const pricing = parseJson<PricingStrategy>(report.pricing_strategy)
  const gtm = parseJson<GoToMarketBrief>(report.go_to_market_brief)

  const actionSteps = typeof report.action_plan_30_days === 'string'
    ? report.action_plan_30_days.split('\n').filter(s => s.trim())
    : []

  const marketSize = typeof report.market_size_estimate === 'string'
    ? report.market_size_estimate
    : ''

  const sectionStyle = 'background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:16px;'
  const labelStyle = 'font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;'
  const bodyStyle = 'font-size:14px;color:#374151;line-height:1.6;margin:0;'
  const badgeStyle = (color: string) => `display:inline-block;background:${color};color:white;border-radius:50%;width:20px;height:20px;text-align:center;line-height:20px;font-size:11px;font-weight:bold;margin-right:8px;flex-shrink:0;`

  const riskRows = [
    [report.risk1, report.risk1_mitigation],
    [report.risk2, report.risk2_mitigation],
    [report.risk3, report.risk3_mitigation],
  ].filter(([r]) => r).map(([r, m], i) => `
    <div style="display:flex;align-items:flex-start;margin-bottom:12px;">
      <span style="${badgeStyle('#ef4444')}">${i + 1}</span>
      <div>
        <p style="${bodyStyle}">${r}</p>
        ${isLifetime && m ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px;margin-top:8px;"><p style="font-size:11px;font-weight:600;color:#1d4ed8;margin:0 0 4px;">Mitigation</p><p style="${bodyStyle};color:#1e40af;">${m}</p></div>` : ''}
      </div>
    </div>
  `).join('')

  const oppRows = [
    [report.opportunity1, report.opportunity1_tactics],
    [report.opportunity2, report.opportunity2_tactics],
    [report.opportunity3, report.opportunity3_tactics],
  ].filter(([o]) => o).map(([o, t], i) => `
    <div style="display:flex;align-items:flex-start;margin-bottom:12px;">
      <span style="${badgeStyle('#16a34a')}">${i + 1}</span>
      <div>
        <p style="${bodyStyle}">${o}</p>
        ${isLifetime && t ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;margin-top:8px;"><p style="font-size:11px;font-weight:600;color:#15803d;margin:0 0 4px;">Tactics</p><p style="${bodyStyle};color:#166534;">${t}</p></div>` : ''}
      </div>
    </div>
  `).join('')

  const competitiveHtml = isLifetime && competitive?.competitors ? `
    <div style="${sectionStyle}">
      <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">🏆 Competitive Analysis <span style="font-size:11px;background:#ede9fe;color:#7c3aed;padding:2px 8px;border-radius:999px;margin-left:8px;">Lifetime</span></h2>
      ${competitive.competitors.map(c => `
        <div style="border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <strong style="color:#111827;">${c.name}</strong>
            <span style="color:#6b7280;font-size:13px;">${c.pricing}</span>
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0 0 8px;">${c.market_position || ''}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><p style="font-size:11px;color:#15803d;font-weight:600;margin:0 0 2px;">Strengths</p>${(c.strengths || []).map(s => `<p style="font-size:12px;color:#374151;margin:0;">+ ${s}</p>`).join('')}</div>
            <div><p style="font-size:11px;color:#dc2626;font-weight:600;margin:0 0 2px;">Weaknesses</p>${(c.weaknesses || []).map(w => `<p style="font-size:12px;color:#374151;margin:0;">- ${w}</p>`).join('')}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : ''

  const pricingHtml = isLifetime && pricing ? `
    <div style="${sectionStyle}">
      <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">💰 Pricing Strategy <span style="font-size:11px;background:#ede9fe;color:#7c3aed;padding:2px 8px;border-radius:999px;margin-left:8px;">Lifetime</span></h2>
      <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin-bottom:12px;">
        <p style="${labelStyle}">Recommended Price</p>
        <p style="font-size:22px;font-weight:700;color:#166534;margin:0;">${pricing.recommended_price}</p>
        <p style="font-size:13px;color:#16a34a;margin:4px 0 0;">${pricing.recommended_model}</p>
      </div>
      ${pricing.justification ? `<p style="${labelStyle}">Justification</p><p style="${bodyStyle};margin-bottom:12px;">${pricing.justification}</p>` : ''}
      ${pricing.revenue_projection ? `<p style="${labelStyle}">Revenue Projection</p><p style="${bodyStyle}">${pricing.revenue_projection}</p>` : ''}
    </div>
  ` : ''

  const gtmHtml = isLifetime && gtm ? `
    <div style="${sectionStyle}">
      <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">🗺 Go-to-Market Brief <span style="font-size:11px;background:#ede9fe;color:#7c3aed;padding:2px 8px;border-radius:999px;margin-left:8px;">Lifetime</span></h2>
      ${[['Target Customer', gtm.target_customer], ['Key Messaging', gtm.key_messaging], ['Launch Channels', gtm.launch_channels], ['First 90 Days', gtm.first_90_days]].filter(([, v]) => v).map(([l, v]) => `<p style="${labelStyle}">${l}</p><p style="${bodyStyle};margin-bottom:12px;">${v}</p>`).join('')}
    </div>
  ` : ''

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:24px 16px;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);border-radius:16px;padding:32px;margin-bottom:16px;text-align:center;">
          <h1 style="color:white;font-size:22px;font-weight:700;margin:0 0 4px;">Product Validation Report</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">${userName} · ${plan === 'lifetime' ? '✦ Lifetime Enhanced' : 'Monthly Basic'}</p>
          <div style="margin-top:20px;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50%;width:80px;height:80px;line-height:80px;text-align:center;">
              <span style="color:white;font-size:36px;font-weight:700;">${report.validation_score}</span>
            </div>
            <p style="color:${scoreColor(report.validation_score)};background:white;display:inline-block;padding:4px 12px;border-radius:999px;font-weight:700;font-size:14px;margin:8px 0 0;">${scoreLabel(report.validation_score)}</p>
          </div>
        </div>

        <!-- Risks -->
        <div style="${sectionStyle}">
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">⚠️ Top 3 Risks</h2>
          ${riskRows}
        </div>

        <!-- Opportunities -->
        <div style="${sectionStyle}">
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">📈 Top 3 Opportunities</h2>
          ${oppRows}
        </div>

        <!-- Market Size -->
        <div style="${sectionStyle}">
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 12px;">🎯 Market Size Estimate</h2>
          <p style="${bodyStyle}">${marketSize.replace(/\n/g, '<br>')}</p>
        </div>

        <!-- Action Plan -->
        <div style="${sectionStyle}">
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 16px;">📅 30-Day Action Plan</h2>
          ${actionSteps.map((s, i) => `
            <div style="display:flex;align-items:flex-start;margin-bottom:10px;">
              <span style="${badgeStyle('#7c3aed')}">${i + 1}</span>
              <p style="${bodyStyle}">${s.replace(/^[•\-*]\s*/, '')}</p>
            </div>
          `).join('')}
        </div>

        <!-- Next Step -->
        <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);border-radius:12px;padding:20px;margin-bottom:16px;">
          <h2 style="color:white;font-size:16px;font-weight:700;margin:0 0 8px;">➡️ Next Critical Step</h2>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;line-height:1.6;margin:0;">${report.next_step}</p>
        </div>

        ${competitiveHtml}
        ${pricingHtml}
        ${gtmHtml}

        <!-- CTA -->
        <div style="text-align:center;margin-top:24px;padding:24px;background:white;border-radius:12px;border:1px solid #e5e7eb;">
          <p style="color:#6b7280;font-size:13px;margin:0 0 16px;">Ingin validasi ide lainnya?</p>
          <a href="${appUrl}/questionnaire" style="background:linear-gradient(135deg,#7c3aed,#2563eb);color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Buat Validasi Baru</a>
          <p style="color:#9ca3af;font-size:11px;margin:16px 0 0;">Product AI Prompts · <a href="${appUrl}" style="color:#7c3aed;">productaiprompts.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('plan, name, email')
    .eq('id', session.id)
    .single()

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { data: report } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('user_id', session.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!report) return NextResponse.json({ error: 'No report found' }, { status: 404 })

  const userName = user.name || user.email.split('@')[0]
  const html = buildReportHtml(report as Report, userName, user.plan)

  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@productaiprompts.com',
      to: user.email,
      subject: `Laporan Validasi Produk Anda — Score ${report.validation_score}/10`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Report email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
