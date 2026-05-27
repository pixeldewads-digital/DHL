import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('questionnaires')
    .select('*')
    .eq('user_id', session.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: 'Failed to fetch questionnaire' }, { status: 500 })
  }

  return NextResponse.json({ questionnaire: data || null })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Check if user can access paid stages (stages 2-6)
  const isPaid = session.plan === 'monthly' || session.plan === 'lifetime' || session.payment_status === 'paid'

  // Filter fields based on plan
  const allowedFields: Record<string, boolean> = {
    stage1_q1: true, stage1_q2: true, stage1_q3: true,
  }
  if (isPaid) {
    Object.assign(allowedFields, {
      stage2_q1: true, stage2_q2: true, stage2_q3: true,
      stage3_q1: true, stage3_q2: true, stage3_q3: true,
      stage4_q1: true, stage4_q2: true, stage4_q3: true,
      stage5_q1: true, stage5_q2: true, stage5_q3: true,
      stage6_q1: true, stage6_q2: true, stage6_q3: true,
    })
  }

  const filteredData: Record<string, string | null> = {}
  for (const [key, value] of Object.entries(body)) {
    if (allowedFields[key]) {
      filteredData[key] = value as string
    }
  }

  // Check for existing questionnaire
  const { data: existing } = await supabaseAdmin
    .from('questionnaires')
    .select('id')
    .eq('user_id', session.id)
    .eq('report_generated', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  let questionnaire
  if (existing) {
    const { data, error } = await supabaseAdmin
      .from('questionnaires')
      .update({ ...filteredData })
      .eq('id', existing.id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    questionnaire = data
  } else {
    const { data, error } = await supabaseAdmin
      .from('questionnaires')
      .insert({ user_id: session.id, ...filteredData })
      .select()
      .single()
    if (error) return NextResponse.json({ error: 'Create failed' }, { status: 500 })
    questionnaire = data
  }

  return NextResponse.json({ questionnaire })
}
