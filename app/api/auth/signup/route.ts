import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { checkRateLimit } from '@/lib/rate-limit'
import { Resend } from 'resend'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, role } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const rl = await checkRateLimit(`auth:signup:${email}`, 5)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const validRoles = ['creator', 'founder', 'seller']
    const userRole = validRoles.includes(role) ? role : 'creator'

    // Upsert user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .upsert({ email, name: name || null, role: userRole }, { onConflict: 'email' })
      .select()
      .single()

    if (userError) {
      console.error('User upsert error:', userError)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Delete old tokens for this email
    await supabaseAdmin.from('auth_tokens').delete().eq('email', email)

    // Save token
    const { error: tokenError } = await supabaseAdmin.from('auth_tokens').insert({
      email,
      token,
      expires_at: expiresAt.toISOString(),
    })

    if (tokenError) {
      console.error('Token insert error:', tokenError)
      return NextResponse.json({ error: 'Failed to create magic link' }, { status: 500 })
    }

    const magicLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`

    // Send email
    try {
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@productaiprompts.com',
        to: email,
        subject: 'Login ke Product AI Prompts',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #7c3aed; margin-bottom: 8px;">Product AI Prompts</h1>
            <p style="color: #6b7280; margin-bottom: 32px;">Klik tombol di bawah untuk login ke akun Anda.</p>
            <a href="${magicLinkUrl}"
               style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Login Sekarang
            </a>
            <p style="color: #9ca3af; margin-top: 24px; font-size: 14px;">Link berlaku 15 menit. Jika Anda tidak meminta ini, abaikan email ini.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      // Don't fail if email fails in dev — return the token for testing
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ success: true, devMagicLink: magicLinkUrl })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
