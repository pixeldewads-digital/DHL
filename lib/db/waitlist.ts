import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { WaitlistSignup, WaitlistSignupRequest, WaitlistStats } from '@/lib/types/waitlist'

export async function addToWaitlist(data: WaitlistSignupRequest & { signup_ip?: string }): Promise<{
  success: boolean
  position?: number
  alreadyExists?: boolean
  error?: string
}> {
  const email = data.email.toLowerCase()

  const { data: existing } = await supabaseAdmin
    .from('waitlist_signups')
    .select('id, position_in_waitlist')
    .eq('email', email)
    .single()

  if (existing) {
    return { success: true, position: existing.position_in_waitlist, alreadyExists: true }
  }

  const { count } = await supabaseAdmin
    .from('waitlist_signups')
    .select('*', { count: 'exact', head: true })

  const position = (count ?? 0) + 1

  const { error } = await supabaseAdmin.from('waitlist_signups').insert([
    {
      ...data,
      email,
      position_in_waitlist: position,
      status: 'pending',
    },
  ])

  if (error) {
    console.error('Waitlist insert error:', error)
    return { success: false, error: error.message }
  }

  return { success: true, position }
}

export async function getWaitlistCount(): Promise<number> {
  const { count } = await supabaseAdmin
    .from('waitlist_signups')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function getWaitlist(opts?: {
  status?: string
  role?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}): Promise<WaitlistSignup[]> {
  let query = supabaseAdmin
    .from('waitlist_signups')
    .select('*')
    .order(opts?.sortBy || 'position_in_waitlist', { ascending: opts?.sortOrder !== 'desc' })

  if (opts?.status) query = query.eq('status', opts.status)
  if (opts?.role) query = query.eq('role', opts.role)
  if (opts?.limit) query = query.limit(opts.limit)
  if (opts?.offset != null && opts?.limit)
    query = query.range(opts.offset, opts.offset + opts.limit - 1)

  const { data, error } = await query
  if (error) { console.error('Waitlist fetch error:', error); return [] }
  return (data ?? []) as WaitlistSignup[]
}

export async function getWaitlistStats(): Promise<WaitlistStats | null> {
  const { data: all, error } = await supabaseAdmin
    .from('waitlist_signups')
    .select('role, current_tool, referral_source, status, pain_level')

  if (error || !all) return null

  const tally = <T extends string>(key: string) =>
    (all as Record<string, unknown>[]).reduce<Record<string, number>>((acc, row) => {
      const val = (row[key] as string) || 'Unknown'
      acc[val] = (acc[val] ?? 0) + 1
      return acc
    }, {})

  const painLevels = (all as { pain_level?: number }[])
    .map(r => r.pain_level)
    .filter((v): v is number => v != null)

  return {
    total: all.length,
    byRole: tally('role'),
    byCurrentTool: tally('current_tool'),
    byReferral: tally('referral_source'),
    byStatus: {
      pending: all.filter(r => (r as { status: string }).status === 'pending').length,
      invited: all.filter(r => (r as { status: string }).status === 'invited').length,
      converted: all.filter(r => (r as { status: string }).status === 'converted').length,
    },
    avgPainLevel: painLevels.length
      ? Math.round((painLevels.reduce((s, v) => s + v, 0) / painLevels.length) * 10) / 10
      : 0,
  }
}

export async function updateWaitlistStatus(
  ids: string[],
  status: 'pending' | 'invited' | 'converted'
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('waitlist_signups')
    .update({ status, ...(status === 'invited' ? { invited_at: new Date().toISOString() } : {}) })
    .in('id', ids)
  if (error) { console.error('Status update error:', error); return false }
  return true
}
