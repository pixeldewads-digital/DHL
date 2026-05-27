import { supabaseAdmin } from '@/lib/supabaseAdmin'

const WINDOW_MS = 60 * 60 * 1000 // 1 hour

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number = WINDOW_MS
): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - windowMs).toISOString()

  // Insert first, then count — the insert acts as a pessimistic "consume one slot"
  // before we know if it's allowed. If the count after insert exceeds the limit we
  // delete the row we just added and deny the request. This eliminates the TOCTOU
  // race of count-then-insert while staying compatible with plain Supabase RPC.
  const { error: insertError } = await supabaseAdmin
    .from('rate_limits')
    .insert({ key })

  if (insertError) {
    // If the insert itself fails for an unexpected reason, fail open rather than
    // silently blocking all requests (availability > strict rate enforcement).
    console.error('Rate limit insert error:', insertError)
    return { allowed: true, remaining: limit }
  }

  const { count } = await supabaseAdmin
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('key', key)
    .gte('created_at', windowStart)

  const used = count ?? 1

  if (used > limit) {
    // Remove the row we just inserted — this request is denied.
    await supabaseAdmin
      .from('rate_limits')
      .delete()
      .eq('key', key)
      .order('created_at', { ascending: false })
      .limit(1)
    return { allowed: false, remaining: 0 }
  }

  // Opportunistically clean up old entries (fire-and-forget)
  const cutoff = new Date(Date.now() - windowMs * 2).toISOString()
  supabaseAdmin.from('rate_limits').delete().eq('key', key).lt('created_at', cutoff).then(() => {})

  return { allowed: true, remaining: limit - used }
}
