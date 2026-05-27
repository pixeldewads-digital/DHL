import { NextRequest, NextResponse } from 'next/server'
import { addToWaitlist } from '@/lib/db/waitlist'
import { checkRateLimit } from '@/lib/rate-limit'
import { Resend } from 'resend'
import { WaitlistSignupRequest } from '@/lib/types/waitlist'

export const dynamic = 'force-dynamic'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

async function sendConfirmationEmail(email: string, firstName: string, position: number) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://productaiprompts.com'
  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@productaiprompts.com',
      to: email,
      subject: `Kamu #${position} di waitlist Product AI Prompts! 🎉`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #2563eb); border-radius: 12px; padding: 12px 16px;">
              <span style="color: white; font-weight: bold; font-size: 18px;">Product AI Prompts</span>
            </div>
          </div>
          <h1 style="color: #1f2937; text-align: center;">Kamu sudah di waitlist! 🎉</h1>
          <p style="color: #6b7280;">Hi ${firstName},</p>
          <p style="color: #6b7280;">Makasih udah daftar! Kamu sekarang ada di posisi:</p>
          <div style="background: linear-gradient(135deg, #ede9fe, #dbeafe); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
            <div style="color: #7c3aed; font-size: 48px; font-weight: bold;">#${position}</div>
            <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">dalam waitlist</div>
          </div>
          <p style="color: #6b7280;"><strong>Apa yang terjadi selanjutnya?</strong></p>
          <ul style="color: #6b7280; line-height: 2;">
            <li>Kami akan kirim beta invite ke email ini saat slot tersedia</li>
            <li>Early users mendapat <strong>harga spesial</strong> yang dikunci selamanya</li>
            <li>Kamu bisa langsung validasi ide produk begitu dapat akses</li>
          </ul>
          <div style="text-align: center; margin-top: 32px;">
            <a href="${appUrl}" style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Lihat Product AI Prompts
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; text-align: center; margin-top: 32px;">
            Ada pertanyaan? Balas email ini atau hubungi support@productaiprompts.com
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Waitlist confirmation email failed:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, first_name } = body

    if (!email || !first_name) {
      return NextResponse.json({ error: 'Email dan nama wajib diisi' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const rl = await checkRateLimit(`waitlist:signup:${ip}`, 3)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan. Coba lagi nanti.' }, { status: 429 })
    }

    const signupData: WaitlistSignupRequest = {
      email,
      first_name: String(first_name).trim(),
      company_name: body.company_name || undefined,
      role: body.role || undefined,
      current_tool: body.current_tool || undefined,
      pain_level: body.pain_level ? Number(body.pain_level) : undefined,
      referral_source: body.referral_source || undefined,
    }

    const result = await addToWaitlist({ ...signupData, signup_ip: ip === 'unknown' ? undefined : ip })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Gagal mendaftar' }, { status: 500 })
    }

    if (!result.alreadyExists) {
      await sendConfirmationEmail(email, first_name, result.position!)
    }

    return NextResponse.json({
      success: true,
      position: result.position,
      alreadyExists: result.alreadyExists ?? false,
      message: `Kamu #${result.position} di waitlist!`,
    })
  } catch (err) {
    console.error('Waitlist signup error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 })
  }
}
