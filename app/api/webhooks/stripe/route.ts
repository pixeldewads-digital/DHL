import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Resend } from 'resend'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

async function sendWelcomeEmail(email: string, plan: string) {
  const isLifetime = plan === 'lifetime'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://productaiprompts.com'

  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@productaiprompts.com',
      to: email,
      subject: isLifetime
        ? 'Selamat! Lifetime Access Anda sudah aktif 🎉'
        : 'Selamat datang di Product AI Prompts!',
      html: isLifetime
        ? `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #7c3aed;">Selamat bergabung! 🎉</h1>
            <p>Terima kasih telah memilih <strong>Lifetime Access</strong> Product AI Prompts.</p>
            <p>Akun Anda sekarang memiliki akses <strong>unlimited validations</strong> seumur hidup, termasuk:</p>
            <ul>
              <li>Enhanced AI reports (8-10 halaman)</li>
              <li>Competitive analysis (5 competitors)</li>
              <li>Pricing strategy & revenue projections</li>
              <li>Go-to-market brief</li>
              <li>Priority support (12-24h)</li>
            </ul>
            <p style="margin-top: 24px;">
              <a href="${appUrl}/questionnaire"
                 style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Mulai Validasi Sekarang
              </a>
            </p>
            <p style="color: #9ca3af; margin-top: 32px; font-size: 14px;">Ada pertanyaan? Reply email ini atau hubungi kami di support@productaiprompts.com</p>
          </div>
        `
        : `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #7c3aed;">Selamat bergabung!</h1>
            <p>Terima kasih telah berlangganan <strong>Monthly Plan</strong> Product AI Prompts.</p>
            <p>Anda mendapatkan <strong>5 validations per bulan</strong>. Mari mulai validasi ide produk Anda:</p>
            <p style="margin-top: 24px;">
              <a href="${appUrl}/questionnaire"
                 style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Mulai Validasi Sekarang
              </a>
            </p>
            <p style="color: #6b7280; margin-top: 16px; font-size: 14px;">
              Ingin unlimited validations? <a href="${appUrl}/pricing" style="color: #7c3aed;">Upgrade ke Lifetime ($79)</a>
            </p>
            <p style="color: #9ca3af; margin-top: 32px; font-size: 14px;">Ada pertanyaan? Reply email ini atau hubungi kami di support@productaiprompts.com</p>
          </div>
        `,
    })
  } catch (emailError) {
    console.error('Welcome email failed:', emailError)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as Stripe.Checkout.Session
      const userId = checkoutSession.metadata?.user_id
      const plan = checkoutSession.metadata?.plan

      if (!userId || !plan) {
        console.error('Missing metadata in checkout session')
        return NextResponse.json({ received: true })
      }

      const { data: user } = await supabaseAdmin
        .from('users')
        .update({ plan, payment_status: 'paid' })
        .eq('id', userId)
        .select('email')
        .single()

      if (user?.email) {
        await sendWelcomeEmail(user.email, plan)
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabaseAdmin
        .from('users')
        .update({ plan: 'free', payment_status: 'pending' })
        .eq('stripe_customer_id', customerId)
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return NextResponse.json({ received: true })
}
