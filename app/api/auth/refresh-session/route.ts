import { NextResponse } from 'next/server'
import { getSession, createSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

// Re-issues the session cookie with fresh data from DB.
// Call this after payment so the JWT reflects the updated plan.
export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, email, name, role, plan, payment_status')
    .eq('id', session.id)
    .single()

  if (error || !user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const newToken = await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    plan: user.plan,
    payment_status: user.payment_status,
  })

  const response = NextResponse.json({ success: true, plan: user.plan })
  response.cookies.set('session', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
