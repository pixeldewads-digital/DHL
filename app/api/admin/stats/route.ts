import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'
import { getWaitlistStats } from '@/lib/db/waitlist'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession()
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const stats = await getWaitlistStats()
  if (!stats) {
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
  return NextResponse.json(stats)
}
