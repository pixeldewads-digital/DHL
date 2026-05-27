import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data, error } = await supabaseAdmin
    .from('users')
    .update({
      generations_used_this_month: 0,
      last_generation_reset: new Date().toISOString(),
    })
    .eq('plan', 'monthly')
    .lt('last_generation_reset', thirtyDaysAgo.toISOString())
    .select('id')

  if (error) {
    console.error('Monthly reset error:', error)
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 })
  }

  return NextResponse.json({ reset: data?.length ?? 0, at: new Date().toISOString() })
}
