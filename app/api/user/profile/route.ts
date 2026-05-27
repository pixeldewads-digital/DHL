import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', session.id)
    .single()

  if (error || !user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json({ user })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, role } = await req.json()
  const validRoles = ['creator', 'founder', 'seller']

  const updates: Record<string, string> = {}
  if (name) updates.name = name
  if (role && validRoles.includes(role)) updates.role = role

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .update(updates)
    .eq('id', session.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  return NextResponse.json({ user })
}
