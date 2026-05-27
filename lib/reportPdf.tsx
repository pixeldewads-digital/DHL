/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck — react-pdf has strict children types that conflict with dynamic data
import {
  Document, Page, Text, View, StyleSheet,
} from '@react-pdf/renderer'

// Use built-in Helvetica — no external font fetch needed on serverless
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#111827',
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    backgroundColor: '#ffffff',
  },

  // ── Header ────────────────────────────────────────────────────
  header: {
    backgroundColor: '#6d28d9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: { flex: 1 },
  headerLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 8, marginBottom: 4 },
  headerName: { color: '#ffffff', fontSize: 16, fontFamily: 'Helvetica-Bold' },
  headerEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 9, marginTop: 2 },
  headerRight: { alignItems: 'flex-end' },
  headerDate: { color: 'rgba(255,255,255,0.8)', fontSize: 9 },
  planBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#ffffff',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 6,
  },

  // ── Score ─────────────────────────────────────────────────────
  scoreBox: {
    backgroundColor: '#f5f3ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBig: { fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#6d28d9' },
  scoreSlash: { fontSize: 20, color: '#9ca3af', marginTop: 8 },
  scoreTen: { fontSize: 14, color: '#9ca3af', marginTop: 12 },
  scoreLabel: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#6d28d9', marginLeft: 12 },
  scoreDesc: { fontSize: 9, color: '#6b7280', marginLeft: 12, marginTop: 2, maxWidth: 380 },

  // ── Sections ──────────────────────────────────────────────────
  section: {
    marginBottom: 14,
    borderRadius: 8,
    border: '1 solid #e5e7eb',
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#111827' },
  lifetimeBadge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#6d28d9',
    backgroundColor: '#ede9fe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  sectionBody: { padding: 12 },

  // ── Items ─────────────────────────────────────────────────────
  itemRow: { flexDirection: 'row', marginBottom: 10 },
  itemBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  itemBulletText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  itemContent: { flex: 1 },
  itemText: { fontSize: 9, color: '#374151', lineHeight: 1.5 },
  mitigationBox: {
    backgroundColor: '#eff6ff',
    borderLeft: '2 solid #3b82f6',
    padding: 8,
    marginTop: 5,
    borderRadius: 3,
  },
  mitigationLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#1d4ed8', marginBottom: 3 },
  mitigationText: { fontSize: 8, color: '#1e40af', lineHeight: 1.5 },
  tacticsBox: {
    backgroundColor: '#f0fdf4',
    borderLeft: '2 solid #22c55e',
    padding: 8,
    marginTop: 5,
    borderRadius: 3,
  },
  tacticsLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#15803d', marginBottom: 3 },
  tacticsText: { fontSize: 8, color: '#166534', lineHeight: 1.5 },

  // ── Plain text ────────────────────────────────────────────────
  bodyText: { fontSize: 9, color: '#374151', lineHeight: 1.6 },
  actionLine: { flexDirection: 'row', marginBottom: 5 },
  bullet: { fontSize: 9, color: '#6d28d9', marginRight: 6, marginTop: 1 },

  // ── Competitor table ──────────────────────────────────────────
  competitorCard: {
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  competitorHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  competitorName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827' },
  competitorPrice: { fontSize: 9, color: '#6b7280' },
  competitorPosition: { fontSize: 8, color: '#6b7280', marginBottom: 5 },
  strengthsRow: { flexDirection: 'row' },
  halfCol: { flex: 1, marginRight: 5 },
  tagLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', marginBottom: 3 },
  tagItem: { fontSize: 8, color: '#374151', marginBottom: 2 },

  // ── Pricing ────────────────────────────────────────────────────
  pricingBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  pricingPrice: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#15803d' },
  pricingModel: { fontSize: 9, color: '#166534', marginBottom: 8 },
  pricingRow: { marginBottom: 5 },
  pricingKey: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#6b7280', marginBottom: 2 },
  pricingVal: { fontSize: 9, color: '#374151', lineHeight: 1.5 },

  // ── Next step ──────────────────────────────────────────────────
  nextStepBox: {
    backgroundColor: '#6d28d9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  nextStepLabel: { fontSize: 8, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  nextStepText: { fontSize: 10, color: '#ffffff', lineHeight: 1.6 },

  // ── Footer ────────────────────────────────────────────────────
  footer: { marginTop: 24, borderTop: '1 solid #e5e7eb', paddingTop: 12 },
  footerText: { fontSize: 8, color: '#9ca3af', textAlign: 'center' },
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreLabel(n: number) {
  if (n >= 8) return 'Strong Idea!'
  if (n >= 5) return 'Promising'
  return 'Needs Work'
}

function parseJsonField<T>(v: string | T | null | undefined): T | null {
  if (!v) return null
  if (typeof v === 'string') { try { return JSON.parse(v) } catch { return null } }
  return v as T
}

function splitLines(v: unknown): string[] {
  if (!v) return []
  if (typeof v === 'string') return v.split('\n').filter(Boolean)
  const p = v as Record<string, unknown>
  const lines: string[] = []
  if (p.week1) lines.push(`Week 1: ${Array.isArray(p.week1) ? p.week1.join(', ') : p.week1}`)
  if (p.week2) lines.push(`Week 2: ${Array.isArray(p.week2) ? p.week2.join(', ') : p.week2}`)
  if (p.week3) lines.push(`Week 3: ${Array.isArray(p.week3) ? p.week3.join(', ') : p.week3}`)
  if (p.week4) lines.push(`Week 4: ${Array.isArray(p.week4) ? p.week4.join(', ') : p.week4}`)
  if (p.milestones) lines.push(`Milestone: ${p.milestones}`)
  return lines
}

function formatMarketSize(v: unknown): string {
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

// ── Reusable sub-components ───────────────────────────────────────────────────

function SectionHeader({
  title, dotColor, lifetime = false,
}: { title: string; dotColor: string; lifetime?: boolean }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: dotColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
      {lifetime && <Text style={styles.lifetimeBadge}>LIFETIME</Text>}
    </View>
  )
}

// ── Main document ─────────────────────────────────────────────────────────────

interface ReportDocProps {
  report: Record<string, unknown>
  user: { name: string | null; email: string; role: string; plan: string }
}

export function ReportDocument({ report, user }: ReportDocProps) {
  const isLifetime = user.plan === 'lifetime'
  const score = Number(report.validation_score) || 0
  const actionLines = splitLines(report.action_plan_30_days)
  const marketText = formatMarketSize(report.market_size_estimate)
  const competitive = parseJsonField<Record<string, unknown>>(report.competitive_analysis as string)
  const pricing = parseJsonField<Record<string, unknown>>(report.pricing_strategy as string)
  const gtm = parseJsonField<Record<string, unknown>>(report.go_to_market_brief as string)

  const generatedAt = report.generated_at
    ? new Date(report.generated_at as string).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const risks = [
    { text: report.risk1, mitigation: report.risk1_mitigation },
    { text: report.risk2, mitigation: report.risk2_mitigation },
    { text: report.risk3, mitigation: report.risk3_mitigation },
  ] as { text: string; mitigation: string | null }[]

  const opps = [
    { text: report.opportunity1, tactics: report.opportunity1_tactics },
    { text: report.opportunity2, tactics: report.opportunity2_tactics },
    { text: report.opportunity3, tactics: report.opportunity3_tactics },
  ] as { text: string; tactics: string | null }[]

  const competitors = (competitive?.competitors as Record<string, unknown>[] | undefined) ?? []

  return (
    <Document title="Product Validation Report" author="Product AI Prompts">
      <Page size="A4" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerLabel}>Product Validation Report</Text>
            <Text style={styles.headerName}>{user.name || user.email.split('@')[0]}</Text>
            <Text style={styles.headerEmail}>{user.email} · {user.role}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerDate}>{generatedAt}</Text>
            <Text style={styles.planBadge}>{isLifetime ? '✦ Lifetime Enhanced' : 'Monthly Basic'}</Text>
          </View>
        </View>

        {/* ── Score ── */}
        <View style={styles.scoreBox}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.scoreBig}>{score}</Text>
            <Text style={styles.scoreSlash}>/</Text>
            <Text style={styles.scoreTen}>10</Text>
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.scoreLabel}>{scoreLabel(score)}</Text>
            <Text style={styles.scoreDesc}>
              Validation score berdasarkan analisis AI terhadap semua jawaban Anda di 6 stage questionnaire.
            </Text>
          </View>
        </View>

        {/* ── Risks ── */}
        <View style={styles.section}>
          <SectionHeader title="Top 3 Risks" dotColor="#f97316" />
          <View style={styles.sectionBody}>
            {risks.map((r, i) => r.text ? (
              <View key={i} style={styles.itemRow}>
                <View style={[styles.itemBullet, { backgroundColor: '#fee2e2' }]}>
                  <Text style={[styles.itemBulletText, { color: '#dc2626' }]}>{i + 1}</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{String(r.text)}</Text>
                  {r.mitigation && (
                    <View style={styles.mitigationBox}>
                      <Text style={styles.mitigationLabel}>Mitigation Strategy</Text>
                      <Text style={styles.mitigationText}>{String(r.mitigation)}</Text>
                    </View>
                  )}
                </View>
              </View>
            ) : null)}
          </View>
        </View>

        {/* ── Opportunities ── */}
        <View style={styles.section}>
          <SectionHeader title="Top 3 Opportunities" dotColor="#22c55e" />
          <View style={styles.sectionBody}>
            {opps.map((o, i) => o.text ? (
              <View key={i} style={styles.itemRow}>
                <View style={[styles.itemBullet, { backgroundColor: '#dcfce7' }]}>
                  <Text style={[styles.itemBulletText, { color: '#16a34a' }]}>{i + 1}</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{String(o.text)}</Text>
                  {o.tactics && (
                    <View style={styles.tacticsBox}>
                      <Text style={styles.tacticsLabel}>Specific Tactics</Text>
                      <Text style={styles.tacticsText}>{String(o.tactics)}</Text>
                    </View>
                  )}
                </View>
              </View>
            ) : null)}
          </View>
        </View>

        {/* ── Market Size ── */}
        {marketText ? (
          <View style={styles.section}>
            <SectionHeader title="Market Size Estimate" dotColor="#3b82f6" />
            <View style={styles.sectionBody}>
              {marketText.split('\n').map((line, i) => (
                <Text key={i} style={[styles.bodyText, { marginBottom: 3 }]}>{line}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* ── 30-Day Action Plan ── */}
        {actionLines.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="30-Day Action Plan" dotColor="#8b5cf6" />
            <View style={styles.sectionBody}>
              {actionLines.map((line, i) => (
                <View key={i} style={styles.actionLine}>
                  <Text style={styles.bullet}>›</Text>
                  <Text style={styles.bodyText}>{line.replace(/^[•\-*]\s*/, '')}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Next Step ── */}
        {report.next_step && (
          <View style={styles.nextStepBox}>
            <Text style={styles.nextStepLabel}>NEXT CRITICAL STEP</Text>
            <Text style={styles.nextStepText}>{String(report.next_step)}</Text>
          </View>
        )}

        {/* ── Competitive Analysis (Lifetime) ── */}
        {isLifetime && competitive && competitors.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Competitive Analysis" dotColor="#6366f1" lifetime />
            <View style={styles.sectionBody}>
              {competitors.slice(0, 5).map((c, i) => (
                <View key={i} style={styles.competitorCard}>
                  <View style={styles.competitorHeader}>
                    <Text style={styles.competitorName}>{String(c.name ?? '')}</Text>
                    <Text style={styles.competitorPrice}>{String(c.pricing ?? '')}</Text>
                  </View>
                  <Text style={styles.competitorPosition}>{String(c.market_position ?? '')}</Text>
                  <View style={styles.strengthsRow}>
                    <View style={styles.halfCol}>
                      <Text style={[styles.tagLabel, { color: '#16a34a' }]}>Strengths</Text>
                      {(c.strengths as string[] ?? []).map((s, j) => (
                        <Text key={j} style={styles.tagItem}>+ {s}</Text>
                      ))}
                    </View>
                    <View style={styles.halfCol}>
                      <Text style={[styles.tagLabel, { color: '#dc2626' }]}>Weaknesses</Text>
                      {(c.weaknesses as string[] ?? []).map((w, j) => (
                        <Text key={j} style={styles.tagItem}>- {w}</Text>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
              {competitive.competitive_positioning && (
                <View style={[styles.mitigationBox, { marginTop: 4 }]}>
                  <Text style={styles.mitigationLabel}>Your Positioning</Text>
                  <Text style={styles.mitigationText}>{String(competitive.competitive_positioning)}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* ── Pricing Strategy (Lifetime) ── */}
        {isLifetime && pricing && (
          <View style={styles.section}>
            <SectionHeader title="Pricing Strategy" dotColor="#10b981" lifetime />
            <View style={styles.sectionBody}>
              <View style={styles.pricingBox}>
                <Text style={styles.pricingPrice}>{String(pricing.recommended_price ?? '')}</Text>
                <Text style={styles.pricingModel}>{String(pricing.recommended_model ?? '')}</Text>
              </View>
              {([
                ['Justification', pricing.justification],
                ['Competitor Comparison', pricing.comparison],
                ['Revenue Projection', pricing.revenue_projection],
              ] as [string, unknown][]).map(([key, val]) => val ? (
                <View key={key} style={styles.pricingRow}>
                  <Text style={styles.pricingKey}>{key}</Text>
                  <Text style={styles.pricingVal}>{String(val)}</Text>
                </View>
              ) : null)}
            </View>
          </View>
        )}

        {/* ── GTM Brief (Lifetime) ── */}
        {isLifetime && gtm && (
          <View style={styles.section}>
            <SectionHeader title="Go-to-Market Brief" dotColor="#0ea5e9" lifetime />
            <View style={styles.sectionBody}>
              {([
                ['Target Customer', gtm.target_customer],
                ['Key Messaging', gtm.key_messaging],
                ['Launch Channels', gtm.launch_channels],
                ['First 90 Days', gtm.first_90_days],
              ] as [string, unknown][]).map(([key, val]) => val ? (
                <View key={key} style={styles.pricingRow}>
                  <Text style={styles.pricingKey}>{key}</Text>
                  <Text style={styles.pricingVal}>{String(val)}</Text>
                </View>
              ) : null)}
            </View>
          </View>
        )}

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Product AI Prompts · productaiprompts.com · {generatedAt}
          </Text>
        </View>

      </Page>
    </Document>
  )
}
