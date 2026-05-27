import { supabaseAdmin } from '@/lib/supabaseAdmin'

const WINDOW_MS = 60 * 60 * 1000 // 1 hour

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number = WINDOW_MS
): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - windowMs).toISOString()

  // Count requests in window
  const { count } = await supabaseAdmin
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('key', key)
    .gte('created_at', windowStart)

  const used = count ?? 0

  if (used >= limit) {
    return { allowed: false, remaining: 0 }
  }

  // Record this request
  await supabaseAdmin.from('rate_limits').insert({ key })

  // Opportunistically clean up old entries (fire-and-forget)
  const cutoff = new Date(Date.now() - windowMs * 2).toISOString()
  supabaseAdmin.from('rate_limits').delete().eq('key', key).lt('created_at', cutoff).then(() => {})

  return { allowed: true, remaining: limit - used - 1 }
}
