import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { STAGES } from '@/lib/questions'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'

const MONTHLY_LIMIT = 5
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function buildAnswersBlock(q: Record<string, string | null>) {
  return STAGES.map(stage => {
    const lines = stage.questions.map(question => {
      const answer = q[question.key as keyof typeof q]
      return `  Q: ${question.text}\n  A: ${answer ?? '(tidak dijawab)'}`
    }).join('\n\n')
    return `Stage ${stage.id} — ${stage.title}:\n${lines}`
  }).join('\n\n')
}

function buildMonthlyPrompt(role: string, answers: string) {
  return `You are a product validation expert analyzing a product idea.

User Info:
- Role: ${role}

Answers across 6 stages:
${answers}

Provide a concise analysis. Respond ONLY with valid JSON, no markdown:
{
  "validation_score": 7,
  "risk1": "Risk title and 2-3 sentence description",
  "risk2": "Risk title and 2-3 sentence description",
  "risk3": "Risk title and 2-3 sentence description",
  "opportunity1": "Opportunity title and 2-3 sentence description",
  "opportunity2": "Opportunity title and 2-3 sentence description",
  "opportunity3": "Opportunity title and 2-3 sentence description",
  "market_size_estimate": "Brief market size estimate with reasoning",
  "action_plan_30_days": "• Week 1: Action\\n• Week 2: Action\\n• Week 3: Action\\n• Week 4: Action\\n• Key milestone: Result",
  "next_step": "1-2 sentences on the single most important next action"
}`
}

function buildLifetimePrompt(role: string, answers: string) {
  return `You are a senior product strategist and market research expert with deep experience helping founders validate product ideas.

User Info:
- Role: ${role}

Answers across 6 stages:
${answers}

Provide a COMPREHENSIVE, detailed analysis. Respond ONLY with valid JSON, no markdown:
{
  "validation_score": 7,
  "risk1": "Detailed risk title and full paragraph description",
  "risk1_severity": "critical",
  "risk1_mitigation": "Detailed 3-5 sentence mitigation strategy with specific tactics and examples from similar products",
  "risk2": "...",
  "risk2_severity": "high",
  "risk2_mitigation": "...",
  "risk3": "...",
  "risk3_severity": "medium",
  "risk3_mitigation": "...",
  "opportunity1": "Opportunity title and full paragraph description",
  "opportunity1_tactics": "3-5 specific, actionable tactics to exploit this opportunity with timeline",
  "opportunity2": "...",
  "opportunity2_tactics": "...",
  "opportunity3": "...",
  "opportunity3_tactics": "...",
  "market_size_estimate": "TAM: $X billion. SAM: $X million (reason). SOM: $X million (realistic 3yr target). Growth: X% CAGR. Comparable: [3 comparable markets with sizes]",
  "competitive_analysis": {
    "competitors": [
      {"name": "Competitor 1", "pricing": "$X/mo", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "market_position": "Description"},
      {"name": "Competitor 2", "pricing": "$X/mo", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "market_position": "Description"},
      {"name": "Competitor 3", "pricing": "$X/mo", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "market_position": "Description"},
      {"name": "Competitor 4", "pricing": "$X/mo", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "market_position": "Description"},
      {"name": "Competitor 5", "pricing": "$X/mo", "strengths": ["s1", "s2"], "weaknesses": ["w1", "w2"], "market_position": "Description"}
    ],
    "competitive_positioning": "Where this product fits and its differentiation strategy"
  },
  "pricing_strategy": {
    "recommended_model": "subscription",
    "recommended_price": "$X/month",
    "justification": "Why this price point based on value delivered and competitor pricing",
    "comparison": "How this compares to alternatives",
    "revenue_projection": "At X customers: $Y MRR. At X00 customers: $YY MRR"
  },
  "go_to_market_brief": {
    "target_customer": "Detailed ICP: job title, company size, pain level, budget, where they hang out",
    "key_messaging": "Core value proposition in 1-2 sentences",
    "launch_channels": "Top 3-4 channels with rationale and expected results",
    "first_90_days": "Month 1: [milestones]. Month 2: [milestones]. Month 3: [milestones]"
  },
  "action_plan_30_days": "• Week 1: [3 specific tasks]\\n• Week 2: [3 specific tasks]\\n• Week 3: [3 specific tasks]\\n• Week 4: [3 specific tasks]\\n• Key milestone: [measurable outcome]",
  "next_step": "Detailed 2-3 sentence explanation of the single most critical next action, why it matters, and how to know if it succeeded"
}`
}

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', session.id)
    .single()

  const isMonthly = user?.plan === 'monthly'
  const isLifetime = user?.plan === 'lifetime'
  const isPaid = isMonthly || isLifetime

  if (!isPaid) return NextResponse.json({ error: 'Payment required' }, { status: 403 })

  // --- Generation limit check (monthly only) ---
  if (isMonthly) {
    const lastReset = user.last_generation_reset ? new Date(user.last_generation_reset) : new Date(0)
    const daysSinceReset = (Date.now() - lastReset.getTime()) / (1000 * 60 * 60 * 24)

    let used = user.generations_used_this_month || 0
    if (daysSinceReset >= 30) {
      // Auto-reset before checking
      await supabaseAdmin
        .from('users')
        .update({ generations_used_this_month: 0, last_generation_reset: new Date().toISOString() })
        .eq('id', session.id)
      used = 0
    }

    if (used >= MONTHLY_LIMIT) {
      return NextResponse.json(
        { error: 'monthly_limit_reached', limit: MONTHLY_LIMIT, used },
        { status: 403 }
      )
    }
  }

  // --- Get latest questionnaire ---
  const { data: questionnaire, error: qError } = await supabaseAdmin
    .from('questionnaires')
    .select('*')
    .eq('user_id', session.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (qError || !questionnaire) {
    return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 })
  }

  const requiredFields = [
    'stage1_q1', 'stage1_q2', 'stage1_q3',
    'stage2_q1', 'stage2_q2', 'stage2_q3',
    'stage3_q1', 'stage3_q2', 'stage3_q3',
    'stage4_q1', 'stage4_q2', 'stage4_q3',
    'stage5_q1', 'stage5_q2', 'stage5_q3',
    'stage6_q1', 'stage6_q2', 'stage6_q3',
  ]
  const missing = requiredFields.filter(f => !questionnaire[f as keyof typeof questionnaire])
  if (missing.length > 0) {
    return NextResponse.json({ error: 'Please complete all questions first' }, { status: 400 })
  }

  const answersBlock = buildAnswersBlock(questionnaire)
  const prompt = isLifetime
    ? buildLifetimePrompt(user.role, answersBlock)
    : buildMonthlyPrompt(user.role, answersBlock)
  const maxTokens = isLifetime ? 4000 : 1500

  let analysisData: Record<string, unknown>
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    })
    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')
    analysisData = JSON.parse(content.text)
  } catch (aiError) {
    console.error('AI error:', aiError)
    return NextResponse.json({ error: 'Failed to generate AI analysis' }, { status: 500 })
  }

  // --- Save report ---
  const { data: report, error: reportError } = await supabaseAdmin
    .from('reports')
    .insert({
      user_id: session.id,
      questionnaire_id: questionnaire.id,
      ...analysisData,
      // Serialize JSONB fields
      competitive_analysis: analysisData.competitive_analysis
        ? JSON.stringify(analysisData.competitive_analysis)
        : null,
      pricing_strategy: analysisData.pricing_strategy
        ? JSON.stringify(analysisData.pricing_strategy)
        : null,
      go_to_market_brief: analysisData.go_to_market_brief
        ? JSON.stringify(analysisData.go_to_market_brief)
        : null,
    })
    .select()
    .single()

  if (reportError) {
    console.error('Report save error:', reportError)
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }

  // --- Update usage counters ---
  await supabaseAdmin
    .from('users')
    .update({
      generation_count: (user.generation_count || 0) + 1,
      generations_used_this_month: isMonthly ? (user.generations_used_this_month || 0) + 1 : user.generations_used_this_month,
    })
    .eq('id', session.id)

  await supabaseAdmin
    .from('questionnaires')
    .update({ report_generated: true })
    .eq('id', questionnaire.id)

  return NextResponse.json({ report })
}
