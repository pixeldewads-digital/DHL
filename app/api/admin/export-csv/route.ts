import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getWaitlist } from '@/lib/db/waitlist'

export const dynamic = 'force-dynamic'

function isAdmin(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  return adminEmails.includes(email.toLowerCase())
}

export async function GET() {
  const session = await getSession()
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const data = await getWaitlist({ limit: 10000 })

  const headers = [
    'position', 'email', 'first_name', 'role', 'current_tool',
    'pain_level', 'referral_source', 'status', 'created_at',
  ]

  const rows = data.map(row =>
    [
      row.position_in_waitlist,
      row.email,
      row.first_name,
      row.role || '',
      row.current_tool || '',
      row.pain_level ?? '',
      row.referral_source || '',
      row.status,
      row.created_at,
    ]
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  )

  const csv = [headers.join(','), ...rows].join('\n')
  const filename = `waitlist-${new Date().toISOString().split('T')[0]}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
