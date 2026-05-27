import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'
import { getWaitlist, updateWaitlistStatus } from '@/lib/db/waitlist'

export const dynamic = 'force-dynamic'

const VALID_STATUSES = ['pending', 'invited', 'converted'] as const
type WaitlistStatus = typeof VALID_STATUSES[number]

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = req.nextUrl
  const data = await getWaitlist({
    status: searchParams.get('status') || undefined,
    role: searchParams.get('role') || undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 200,
    offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
    sortBy: searchParams.get('sortBy') || 'position_in_waitlist',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
  })

  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { ids, status } = await req.json()
  if (!ids?.length || !status) {
    return NextResponse.json({ error: 'ids and status required' }, { status: 400 })
  }
  if (!VALID_STATUSES.includes(status as WaitlistStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    )
  }

  const ok = await updateWaitlistStatus(ids, status as WaitlistStatus)
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Update failed' }, { status: 500 })
}
