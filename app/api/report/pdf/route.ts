import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { renderToBuffer } = require('@react-pdf/renderer')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createElement } = require('react')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ReportDocument } = require('@/lib/reportPdf')

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const reportId = new URL(req.url).searchParams.get('reportId')

  const query = supabaseAdmin.from('reports').select('*').eq('user_id', session.id)
  const { data: report, error: rErr } = reportId
    ? await query.eq('id', reportId).single()
    : await query.order('created_at', { ascending: false }).limit(1).single()

  if (rErr || !report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  const { data: user, error: uErr } = await supabaseAdmin
    .from('users')
    .select('name, email, role, plan')
    .eq('id', session.id)
    .single()

  if (uErr || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // renderToBuffer returns a Node Buffer
  const nodeBuffer: Buffer = await renderToBuffer(createElement(ReportDocument, { report, user }))

  const filename = `product-validation-report-${report.id.slice(0, 8)}.pdf`

  return new NextResponse(nodeBuffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(nodeBuffer.byteLength),
      'Cache-Control': 'no-store',
    },
  })
}
