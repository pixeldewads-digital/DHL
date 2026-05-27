import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan } = await req.json()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  // Get or create Stripe customer
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', session.id)
    .single()

  let customerId = user?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.email,
      metadata: { user_id: session.id },
    })
    customerId = customer.id

    await supabaseAdmin
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', session.id)
  }

  const isLifetime = plan === 'lifetime'

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: isLifetime ? 'payment' : 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: isLifetime ? 'Product AI Prompts - Lifetime Access' : 'Product AI Prompts - Monthly',
            description: isLifetime
              ? 'One-time payment for lifetime access'
              : 'Monthly subscription with full access',
          },
          ...(isLifetime
            ? { unit_amount: 7900 }
            : { unit_amount: 1000, recurring: { interval: 'month' } }),
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: session.id,
      plan,
    },
    success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/payment/cancel`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
