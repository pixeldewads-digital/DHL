import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: report } = await supabaseAdmin
    .from('reports')
    .select('id, share_token')
    .eq('user_id', session.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!report) return NextResponse.json({ error: 'No report found' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://productaiprompts.com'

  // Return existing token or generate a new one
  if (report.share_token) {
    const shareUrl = `${appUrl}/report/share/${report.share_token}`
    return NextResponse.json({ shareUrl, token: report.share_token })
  }

  const token = crypto.randomBytes(20).toString('hex')

  const { error } = await supabaseAdmin
    .from('reports')
    .update({ share_token: token })
    .eq('id', report.id)

  if (error) {
    console.error('Share token save error:', error)
    return NextResponse.json({ error: 'Failed to create share link' }, { status: 500 })
  }

  const shareUrl = `${appUrl}/report/share/${token}`
  return NextResponse.json({ shareUrl, token })
}
