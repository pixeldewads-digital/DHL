import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Must be paid
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', session.id)
    .single()

  const isPaid = user?.plan === 'monthly' || user?.plan === 'lifetime' || user?.payment_status === 'paid'
  if (!isPaid) return NextResponse.json({ error: 'Payment required' }, { status: 403 })

  // Get latest questionnaire
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

  // Check all 18 answers are filled
  const requiredFields = [
    'stage1_q1','stage1_q2','stage1_q3',
    'stage2_q1','stage2_q2','stage2_q3',
    'stage3_q1','stage3_q2','stage3_q3',
    'stage4_q1','stage4_q2','stage4_q3',
    'stage5_q1','stage5_q2','stage5_q3',
    'stage6_q1','stage6_q2','stage6_q3',
  ]
  const missing = requiredFields.filter(f => !questionnaire[f as keyof typeof questionnaire])
  if (missing.length > 0) {
    return NextResponse.json({ error: 'Please complete all questions first' }, { status: 400 })
  }

  const prompt = `You are a product validation expert analyzing a product idea.

User Info:
- Role: ${user.role}

Answers across 6 stages:
Stage 1 - Idea & Validation:
  Q1: ${questionnaire.stage1_q1}
  Q2: ${questionnaire.stage1_q2}
  Q3: ${questionnaire.stage1_q3}

Stage 2 - Idea Generation:
  Q1: ${questionnaire.stage2_q1}
  Q2: ${questionnaire.stage2_q2}
  Q3: ${questionnaire.stage2_q3}

Stage 3 - Problem Definition:
  Q1: ${questionnaire.stage3_q1}
  Q2: ${questionnaire.stage3_q2}
  Q3: ${questionnaire.stage3_q3}

Stage 4 - Market & User Validation:
  Q1: ${questionnaire.stage4_q1}
  Q2: ${questionnaire.stage4_q2}
  Q3: ${questionnaire.stage4_q3}

Stage 5 - Business & Feasibility:
  Q1: ${questionnaire.stage5_q1}
  Q2: ${questionnaire.stage5_q2}
  Q3: ${questionnaire.stage5_q3}

Stage 6 - Brand & Positioning:
  Q1: ${questionnaire.stage6_q1}
  Q2: ${questionnaire.stage6_q2}
  Q3: ${questionnaire.stage6_q3}

Analyze this product idea thoroughly and provide:
1. Validation score (1-10)
2. Top 3 risks ranked by severity
3. Top 3 opportunities
4. Market size estimate
5. 30-day action plan (5 actionable bullet points)
6. Next critical step to validate

Respond ONLY with valid JSON, no markdown, no explanation. Use this exact structure:
{
  "validation_score": 7,
  "risk1": "...",
  "risk2": "...",
  "risk3": "...",
  "opportunity1": "...",
  "opportunity2": "...",
  "opportunity3": "...",
  "market_size_estimate": "...",
  "action_plan_30_days": "• Step 1\\n• Step 2\\n• Step 3\\n• Step 4\\n• Step 5",
  "next_step": "..."
}`

  let analysisData
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')
    analysisData = JSON.parse(content.text)
  } catch (aiError) {
    console.error('AI error:', aiError)
    return NextResponse.json({ error: 'Failed to generate AI analysis' }, { status: 500 })
  }

  // Save report
  const { data: report, error: reportError } = await supabaseAdmin
    .from('reports')
    .insert({
      user_id: session.id,
      questionnaire_id: questionnaire.id,
      ...analysisData,
    })
    .select()
    .single()

  if (reportError) {
    console.error('Report save error:', reportError)
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }

  // Mark questionnaire as report generated
  await supabaseAdmin
    .from('questionnaires')
    .update({ report_generated: true })
    .eq('id', questionnaire.id)

  return NextResponse.json({ report })
}
