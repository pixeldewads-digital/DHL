import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

const MONTHLY_LIMIT = 5

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('plan, generation_count, generations_used_this_month, last_generation_reset')
    .eq('id', session.id)
    .single()

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const isLifetime = user.plan === 'lifetime'
  const isMonthly = user.plan === 'monthly'

  if (isLifetime) {
    return NextResponse.json({
      canGenerate: true,
      used: user.generation_count || 0,
      limit: null,
      isLifetime: true,
      resetsAt: null,
      daysUntilReset: null,
    })
  }

  if (!isMonthly) {
    return NextResponse.json({
      canGenerate: false,
      used: 0,
      limit: MONTHLY_LIMIT,
      isLifetime: false,
      resetsAt: null,
      daysUntilReset: null,
    })
  }

  // Check if monthly reset is needed
  const lastReset = user.last_generation_reset
    ? new Date(user.last_generation_reset)
    : new Date(0)
  const now = new Date()
  const daysSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24)

  let used = user.generations_used_this_month || 0
  if (daysSinceReset >= 30) {
    // Auto-reset
    await supabaseAdmin
      .from('users')
      .update({ generations_used_this_month: 0, last_generation_reset: now.toISOString() })
      .eq('id', session.id)
    used = 0
  }

  const resetDate = new Date(lastReset)
  resetDate.setDate(resetDate.getDate() + 30)
  const daysUntilReset = Math.max(0, Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

  return NextResponse.json({
    canGenerate: used < MONTHLY_LIMIT,
    used,
    limit: MONTHLY_LIMIT,
    isLifetime: false,
    resetsAt: resetDate.toISOString(),
    daysUntilReset,
  })
}
