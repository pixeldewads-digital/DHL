import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function DELETE() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Cancel Stripe subscription if exists
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('stripe_customer_id')
    .eq('id', session.id)
    .single()

  if (user?.stripe_customer_id) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripe_customer_id,
        status: 'active',
      })
      for (const sub of subscriptions.data) {
        await stripe.subscriptions.cancel(sub.id)
      }
    } catch (e) {
      console.error('Stripe cancel error:', e)
    }
  }

  const { error } = await supabaseAdmin.from('users').delete().eq('id', session.id)
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })

  const response = NextResponse.json({ success: true })
  response.cookies.delete('session')
  return response
}
