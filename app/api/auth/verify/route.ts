import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login?error=missing_token', req.url))
    }

    // Find and validate token
    const { data: authToken, error } = await supabaseAdmin
      .from('auth_tokens')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .single()

    if (error || !authToken) {
      return NextResponse.redirect(new URL('/auth/login?error=invalid_token', req.url))
    }

    // Check expiry
    if (new Date(authToken.expires_at) < new Date()) {
      return NextResponse.redirect(new URL('/auth/login?error=expired_token', req.url))
    }

    // Mark token as used
    await supabaseAdmin.from('auth_tokens').update({ used: true }).eq('id', authToken.id)

    // Get user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', authToken.email)
      .single()

    if (userError || !user) {
      return NextResponse.redirect(new URL('/auth/login?error=user_not_found', req.url))
    }

    // Create JWT session
    const sessionToken = await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      plan: user.plan,
      payment_status: user.payment_status,
    })

    const response = NextResponse.redirect(new URL('/questionnaire', req.url))
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.redirect(new URL('/auth/login?error=server_error', req.url))
  }
}
