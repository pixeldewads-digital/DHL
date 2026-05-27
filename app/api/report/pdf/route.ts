import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
// pdfkit is CommonJS — require() avoids ESM issues in Next.js API routes
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit')

export const dynamic = 'force-dynamic'

// ── Colours ───────────────────────────────────────────────────────────────────
const C = {
  violet:  '#6d28d9',
  blue:    '#2563eb',
  white:   '#ffffff',
  dark:    '#111827',
  gray:    '#6b7280',
  light:   '#f9fafb',
  border:  '#e5e7eb',
  red:     '#dc2626',
  redBg:   '#fee2e2',
  green:   '#16a34a',
  greenBg: '#dcfce7',
  blueBg:  '#eff6ff',
  blueAcc: '#1d4ed8',
  amber:   '#d97706',
}

// ── Helper: collect doc output into a Buffer ──────────────────────────────────
function docToBuffer(doc: typeof PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })
}

// ── Helper: parse JSON fields that may already be objects ─────────────────────
function parseField<T>(v: unknown): T | null {
  if (!v) return null
  if (typeof v === 'string') { try { return JSON.parse(v) as T } catch { return null } }
  return v as T
}

// ── Helper: get action plan lines ─────────────────────────────────────────────
function actionLines(v: unknown): string[] {
  if (!v) return []
  if (typeof v === 'string') return v.split('\n').filter(Boolean)
  const p = v as Record<string, unknown>
  const lines: string[] = []
  const fmt = (x: unknown) => Array.isArray(x) ? x.join(', ') : String(x ?? '')
  if (p.week1) lines.push(`Week 1: ${fmt(p.week1)}`)
  if (p.week2) lines.push(`Week 2: ${fmt(p.week2)}`)
  if (p.week3) lines.push(`Week 3: ${fmt(p.week3)}`)
  if (p.week4) lines.push(`Week 4: ${fmt(p.week4)}`)
  if (p.milestones) lines.push(`Milestone: ${p.milestones}`)
  return lines
}

// ── Helper: market size text ──────────────────────────────────────────────────
function marketSizeText(v: unknown): string {
  if (!v) return ''
  if (typeof v === 'string') return v
  const m = v as Record<string, string>
  return [
    m.tam && `TAM: ${m.tam}`,
    m.sam && `SAM: ${m.sam}`,
    m.som && `SOM: ${m.som}`,
    m.growth_rate && `Growth: ${m.growth_rate}`,
    m.comparable_markets && `Comparable: ${m.comparable_markets}`,
  ].filter(Boolean).join('\n')
}

// ── Section helpers ───────────────────────────────────────────────────────────

function sectionHeader(
  doc: typeof PDFDocument,
  title: string,
  dotColor: string,
  lifetime = false,
) {
  const y = doc.y
  doc.rect(doc.page.margins.left, y, doc.page.width - doc.page.margins.left - doc.page.margins.right, 26)
    .fillColor('#f9fafb').fill()
  doc.circle(doc.page.margins.left + 14, y + 13, 5).fillColor(dotColor).fill()
  doc.fillColor(C.dark).font('Helvetica-Bold').fontSize(10)
    .text(title, doc.page.margins.left + 26, y + 8, { lineBreak: false })
  if (lifetime) {
    const tw = doc.widthOfString(title)
    doc.roundedRect(doc.page.margins.left + 30 + tw, y + 7, 52, 13, 6)
      .fillColor('#ede9fe').fill()
    doc.fillColor(C.violet).fontSize(7).font('Helvetica-Bold')
      .text('LIFETIME', doc.page.margins.left + 34 + tw, y + 10, { lineBreak: false })
  }
  doc.moveDown(0.3)
}

function bordered(doc: typeof PDFDocument, callback: () => void) {
  const startY = doc.y
  const left = doc.page.margins.left
  const width = doc.page.width - left - doc.page.margins.right
  callback()
  const endY = doc.y + 6
  doc.roundedRect(left, startY - 4, width, endY - startY + 4, 6)
    .strokeColor(C.border).lineWidth(0.5).stroke()
  doc.y = endY + 8
}

function bulletedText(
  doc: typeof PDFDocument,
  num: number,
  text: string,
  numBg: string,
  numColor: string,
) {
  const left = doc.page.margins.left + 10
  const contentX = left + 26
  const contentW = doc.page.width - doc.page.margins.right - contentX

  // Circle bullet
  doc.circle(left + 10, doc.y + 7, 9).fillColor(numBg).fill()
  doc.fillColor(numColor).font('Helvetica-Bold').fontSize(8)
    .text(String(num), left + 6, doc.y + 3, { lineBreak: false, width: 18, align: 'center' })

  const textY = doc.y
  doc.fillColor(C.dark).font('Helvetica').fontSize(9)
    .text(text, contentX, textY, { width: contentW })
  doc.moveDown(0.4)
}

// ── Main PDF generator ────────────────────────────────────────────────────────

async function generateReportPdf(
  report: Record<string, unknown>,
  user: { name: string | null; email: string; role: string; plan: string },
): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margin: 48, bufferPages: true })
  const bufferPromise = docToBuffer(doc)

  const isLifetime = user.plan === 'lifetime'
  const W = doc.page.width - 96  // usable width
  const L = doc.page.margins.left

  const generatedAt = report.generated_at
    ? new Date(report.generated_at as string).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  const score = Number(report.validation_score) || 0
  const scoreLabel = score >= 8 ? 'Strong Idea!' : score >= 5 ? 'Promising' : 'Needs Work'
  const displayName = user.name || user.email.split('@')[0]

  // ── HEADER BANNER ─────────────────────────────────────────────────────────
  doc.rect(L, doc.y, W, 70).fillColor(C.violet).fill()
  doc.fillColor('rgba(255,255,255,0.08)').rect(L, doc.y - 70, W, 70).fill()

  doc.fillColor('rgba(255,255,255,0.6)').font('Helvetica').fontSize(8)
    .text('Product Validation Report', L + 12, doc.y - 68, { lineBreak: false })
  doc.fillColor(C.white).font('Helvetica-Bold').fontSize(16)
    .text(displayName, L + 12, doc.y - 56, { lineBreak: false })
  doc.fillColor('rgba(255,255,255,0.75)').font('Helvetica').fontSize(8.5)
    .text(`${user.email}  ·  ${user.role}`, L + 12, doc.y - 36, { lineBreak: false })

  // Plan badge
  const badgeW = isLifetime ? 120 : 90
  doc.roundedRect(L + W - badgeW - 12, doc.y - 56, badgeW, 18, 9)
    .fillColor('rgba(255,255,255,0.2)').fill()
  doc.fillColor(C.white).font('Helvetica-Bold').fontSize(8)
    .text(
      isLifetime ? '✦ Lifetime Enhanced' : 'Monthly Basic',
      L + W - badgeW - 8, doc.y - 52,
      { lineBreak: false },
    )

  doc.fillColor('rgba(255,255,255,0.6)').font('Helvetica').fontSize(8)
    .text(generatedAt, L + W - 90, doc.y - 30, { lineBreak: false })

  doc.y += 14
  doc.moveDown(0.8)

  // ── SCORE BOX ─────────────────────────────────────────────────────────────
  const scoreBoxY = doc.y
  doc.roundedRect(L, scoreBoxY, W, 62, 8).fillColor('#f5f3ff').fill()

  // Big score number
  doc.fillColor(C.violet).font('Helvetica-Bold').fontSize(40)
    .text(String(score), L + 16, scoreBoxY + 10, { lineBreak: false })
  doc.fillColor(C.gray).font('Helvetica').fontSize(16)
    .text('/10', L + 16 + doc.widthOfString(String(score), { fontSize: 40 }) + 3, scoreBoxY + 22, { lineBreak: false })

  // Label
  doc.fillColor(C.violet).font('Helvetica-Bold').fontSize(14)
    .text(scoreLabel, L + 80, scoreBoxY + 12, { lineBreak: false })
  doc.fillColor(C.gray).font('Helvetica').fontSize(8.5)
    .text(
      'Score ini menunjukkan seberapa valid dan viable ide produk Anda berdasarkan analisis AI.',
      L + 80, scoreBoxY + 30,
      { width: W - 90 },
    )

  doc.y = scoreBoxY + 72
  doc.moveDown(0.5)

  // ── RISKS ─────────────────────────────────────────────────────────────────
  const risks = [
    { text: report.risk1, mitigation: report.risk1_mitigation },
    { text: report.risk2, mitigation: report.risk2_mitigation },
    { text: report.risk3, mitigation: report.risk3_mitigation },
  ].filter(r => r.text)

  if (risks.length) {
    bordered(doc, () => {
      sectionHeader(doc, 'Top 3 Risks', '#f97316')
      doc.x = L + 10
      for (let i = 0; i < risks.length; i++) {
        bulletedText(doc, i + 1, String(risks[i].text), C.redBg, C.red)
        if (risks[i].mitigation) {
          const mx = L + 46
          const startY2 = doc.y
          doc.roundedRect(mx, startY2, W - 46, 0, 3)
          doc.fillColor(C.blueBg)
          doc.font('Helvetica-Bold').fontSize(7.5).fillColor(C.blueAcc)
            .text('Mitigation Strategy', mx + 8, startY2 + 5, { lineBreak: false })
          doc.fillColor('#1e40af').font('Helvetica').fontSize(8)
            .text(String(risks[i].mitigation), mx + 8, startY2 + 17, { width: W - 62 })
          const endY2 = doc.y + 5
          doc.roundedRect(mx, startY2, W - 46, endY2 - startY2, 4)
            .fillColor(C.blueBg).fill().strokeColor('#bfdbfe').lineWidth(0.5).stroke()
          doc.fillColor(C.blueAcc).font('Helvetica-Bold').fontSize(7.5)
            .text('Mitigation Strategy', mx + 8, startY2 + 5, { lineBreak: false })
          doc.fillColor('#1e40af').font('Helvetica').fontSize(8)
            .text(String(risks[i].mitigation), mx + 8, startY2 + 17, { width: W - 62 })
          doc.y = endY2 + 8
          doc.moveDown(0.3)
        }
      }
    })
  }

  // ── OPPORTUNITIES ─────────────────────────────────────────────────────────
  const opps = [
    { text: report.opportunity1, tactics: report.opportunity1_tactics },
    { text: report.opportunity2, tactics: report.opportunity2_tactics },
    { text: report.opportunity3, tactics: report.opportunity3_tactics },
  ].filter(o => o.text)

  if (opps.length) {
    bordered(doc, () => {
      sectionHeader(doc, 'Top 3 Opportunities', '#22c55e')
      doc.x = L + 10
      for (let i = 0; i < opps.length; i++) {
        bulletedText(doc, i + 1, String(opps[i].text), C.greenBg, C.green)
        if (opps[i].tactics) {
          const tx = L + 46
          const startY3 = doc.y
          doc.fillColor('#f0fdf4').font('Helvetica-Bold').fontSize(7.5)
            .fillColor('#15803d').text('Specific Tactics', tx + 8, startY3 + 5, { lineBreak: false })
          doc.fillColor('#166534').font('Helvetica').fontSize(8)
            .text(String(opps[i].tactics), tx + 8, startY3 + 17, { width: W - 62 })
          const endY3 = doc.y + 5
          doc.roundedRect(tx, startY3, W - 46, endY3 - startY3, 4)
            .fillColor('#f0fdf4').fill().strokeColor('#bbf7d0').lineWidth(0.5).stroke()
          doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(7.5)
            .text('Specific Tactics', tx + 8, startY3 + 5, { lineBreak: false })
          doc.fillColor('#166534').font('Helvetica').fontSize(8)
            .text(String(opps[i].tactics), tx + 8, startY3 + 17, { width: W - 62 })
          doc.y = endY3 + 8
          doc.moveDown(0.3)
        }
      }
    })
  }

  // ── MARKET SIZE ───────────────────────────────────────────────────────────
  const mkt = marketSizeText(report.market_size_estimate)
  if (mkt) {
    bordered(doc, () => {
      sectionHeader(doc, 'Market Size Estimate', '#3b82f6')
      doc.x = L + 10
      mkt.split('\n').forEach(line => {
        doc.fillColor(C.dark).font('Helvetica').fontSize(9).text(line, { width: W - 20 })
        doc.moveDown(0.2)
      })
    })
  }

  // ── 30-DAY ACTION PLAN ────────────────────────────────────────────────────
  const actions = actionLines(report.action_plan_30_days)
  if (actions.length) {
    bordered(doc, () => {
      sectionHeader(doc, '30-Day Action Plan', '#8b5cf6')
      doc.x = L + 10
      actions.forEach((line, i) => {
        const clean = line.replace(/^[•\-*]\s*/, '')
        doc.fillColor(C.violet).font('Helvetica-Bold').fontSize(9)
          .text(`${i + 1}.`, L + 10, doc.y, { lineBreak: false, width: 18 })
        doc.fillColor(C.dark).font('Helvetica').fontSize(9)
          .text(clean, L + 28, doc.y, { width: W - 38 })
        doc.moveDown(0.3)
      })
    })
  }

  // ── NEXT STEP ─────────────────────────────────────────────────────────────
  if (report.next_step) {
    doc.roundedRect(L, doc.y, W, 0, 8).fillColor(C.violet)
    const nsY = doc.y
    doc.fillColor('rgba(255,255,255,0.65)').font('Helvetica-Bold').fontSize(7.5)
      .text('NEXT CRITICAL STEP', L + 14, nsY + 10, { lineBreak: false })
    doc.fillColor(C.white).font('Helvetica').fontSize(9.5)
      .text(String(report.next_step), L + 14, nsY + 24, { width: W - 28 })
    const nsEndY = doc.y + 10
    doc.roundedRect(L, nsY, W, nsEndY - nsY, 8).fillColor(C.violet).fill()
    doc.fillColor('rgba(255,255,255,0.65)').font('Helvetica-Bold').fontSize(7.5)
      .text('NEXT CRITICAL STEP', L + 14, nsY + 10, { lineBreak: false })
    doc.fillColor(C.white).font('Helvetica').fontSize(9.5)
      .text(String(report.next_step), L + 14, nsY + 24, { width: W - 28 })
    doc.y = nsEndY + 14
  }

  // ── COMPETITIVE ANALYSIS (LIFETIME) ───────────────────────────────────────
  if (isLifetime) {
    const ca = parseField<Record<string, unknown>>(report.competitive_analysis)
    const competitors = (ca?.competitors as Record<string, unknown>[] | undefined) ?? []

    if (competitors.length) {
      bordered(doc, () => {
        sectionHeader(doc, 'Competitive Analysis', '#6366f1', true)
        competitors.slice(0, 5).forEach(c => {
          const cY = doc.y
          doc.roundedRect(L + 10, cY, W - 20, 0, 5).strokeColor(C.border).lineWidth(0.5)
          doc.fillColor(C.dark).font('Helvetica-Bold').fontSize(9.5)
            .text(String(c.name ?? ''), L + 18, cY + 8, { lineBreak: false })
          doc.fillColor(C.gray).font('Helvetica').fontSize(8.5)
            .text(String(c.pricing ?? ''), L + W - 70, cY + 8, { lineBreak: false })
          if (c.market_position) {
            doc.fillColor(C.gray).font('Helvetica').fontSize(8)
              .text(String(c.market_position), L + 18, doc.y + 2, { width: W - 36 })
          }

          const halfw = (W - 36) / 2
          const strY = doc.y + 4
          doc.fillColor(C.green).font('Helvetica-Bold').fontSize(7.5)
            .text('Strengths', L + 18, strY)
          const strList = c.strengths as string[] ?? []
          strList.forEach(s => {
            doc.fillColor(C.dark).font('Helvetica').fontSize(8).text(`+ ${s}`, L + 18, doc.y, { width: halfw })
          })

          const wkY = strY
          doc.fillColor(C.red).font('Helvetica-Bold').fontSize(7.5)
            .text('Weaknesses', L + 18 + halfw, wkY)
          const wkList = c.weaknesses as string[] ?? []
          wkList.forEach(w => {
            doc.fillColor(C.dark).font('Helvetica').fontSize(8).text(`- ${w}`, L + 18 + halfw, doc.y, { width: halfw })
          })

          const cEnd = doc.y + 8
          doc.roundedRect(L + 10, cY, W - 20, cEnd - cY, 5)
            .strokeColor(C.border).lineWidth(0.5).stroke()
          doc.y = cEnd + 6
        })

        if (ca?.competitive_positioning) {
          const pY = doc.y
          doc.fillColor(C.blueAcc).font('Helvetica-Bold').fontSize(7.5)
            .text('Your Positioning', L + 18, pY + 8, { lineBreak: false })
          doc.fillColor('#1e40af').font('Helvetica').fontSize(8.5)
            .text(String(ca.competitive_positioning), L + 18, doc.y + 4, { width: W - 36 })
          const pEnd = doc.y + 8
          doc.roundedRect(L + 10, pY, W - 20, pEnd - pY, 5)
            .fillColor(C.blueBg).fill().strokeColor('#bfdbfe').lineWidth(0.5).stroke()
          doc.fillColor(C.blueAcc).font('Helvetica-Bold').fontSize(7.5)
            .text('Your Positioning', L + 18, pY + 8, { lineBreak: false })
          doc.fillColor('#1e40af').font('Helvetica').fontSize(8.5)
            .text(String(ca.competitive_positioning), L + 18, doc.y + 4, { width: W - 36 })
          doc.y = pEnd + 6
        }
      })
    }

    // ── PRICING STRATEGY ──────────────────────────────────────────────────
    const ps = parseField<Record<string, unknown>>(report.pricing_strategy)
    if (ps) {
      bordered(doc, () => {
        sectionHeader(doc, 'Pricing Strategy', '#10b981', true)
        const psBoxY = doc.y
        doc.roundedRect(L + 10, psBoxY, W - 20, 44, 6).fillColor('#f0fdf4').fill()
        doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(18)
          .text(String(ps.recommended_price ?? ''), L + 18, psBoxY + 8, { lineBreak: false })
        doc.fillColor('#166534').font('Helvetica').fontSize(8.5)
          .text(String(ps.recommended_model ?? ''), L + 18, psBoxY + 30, { lineBreak: false })
        doc.y = psBoxY + 50;

        ([
          ['Justification', ps.justification],
          ['Competitor Comparison', ps.comparison],
          ['Revenue Projection', ps.revenue_projection],
        ] as [string, unknown][]).forEach(([k, v]) => {
          if (!v) return
          doc.fillColor(C.gray).font('Helvetica-Bold').fontSize(7.5).text(k, L + 18, doc.y + 4)
          doc.fillColor(C.dark).font('Helvetica').fontSize(8.5)
            .text(String(v), L + 18, doc.y + 2, { width: W - 36 })
          doc.moveDown(0.3)
        })
      })
    }

    // ── GO-TO-MARKET ──────────────────────────────────────────────────────
    const gtm = parseField<Record<string, unknown>>(report.go_to_market_brief)
    if (gtm) {
      bordered(doc, () => {
        sectionHeader(doc, 'Go-to-Market Brief', '#0ea5e9', true)
        ;([
          ['Target Customer', gtm.target_customer],
          ['Key Messaging', gtm.key_messaging],
          ['Launch Channels', gtm.launch_channels],
          ['First 90 Days', gtm.first_90_days],
        ] as [string, unknown][]).forEach(([k, v]) => {
          if (!v) return
          doc.fillColor(C.gray).font('Helvetica-Bold').fontSize(7.5).text(k, L + 18, doc.y + 4)
          doc.fillColor(C.dark).font('Helvetica').fontSize(8.5)
            .text(String(v), L + 18, doc.y + 2, { width: W - 36 })
          doc.moveDown(0.3)
        })
      })
    }
  }

  // ── FOOTER on every page ──────────────────────────────────────────────────
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    const footerY = doc.page.height - doc.page.margins.bottom + 10
    doc.moveTo(L, footerY).lineTo(L + W, footerY).strokeColor(C.border).lineWidth(0.5).stroke()
    doc.fillColor(C.gray).font('Helvetica').fontSize(7.5)
      .text(
        `Product AI Prompts · productaiprompts.com · ${generatedAt}`,
        L, footerY + 6,
        { align: 'center', width: W },
      )
    doc.fillColor(C.gray)
      .text(`Page ${i - range.start + 1} / ${range.count}`, L, footerY + 6, { align: 'right', width: W })
  }

  doc.end()
  return bufferPromise
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const reportId = new URL(req.url).searchParams.get('reportId')

  const query = supabaseAdmin.from('reports').select('*').eq('user_id', session.id)
  const { data: report, error: rErr } = reportId
    ? await query.eq('id', reportId).single()
    : await query.order('created_at', { ascending: false }).limit(1).single()

  if (rErr || !report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  const { data: user, error: uErr } = await supabaseAdmin
    .from('users').select('name, email, role, plan').eq('id', session.id).single()

  if (uErr || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const pdfBuffer = await generateReportPdf(report as Record<string, unknown>, user)
    const filename = `product-validation-report-${report.id.slice(0, 8)}.pdf`

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
