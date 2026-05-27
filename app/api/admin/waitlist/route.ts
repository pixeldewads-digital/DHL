import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getWaitlist, updateWaitlistStatus } from '@/lib/db/waitlist'

export const dynamic = 'force-dynamic'

function isAdmin(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  return adminEmails.includes(email.toLowerCase())
}

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

  const ok = await updateWaitlistStatus(ids, status)
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Update failed' }, { status: 500 })
}
