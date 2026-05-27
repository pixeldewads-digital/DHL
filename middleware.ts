import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const protectedRoutes = ['/questionnaire', '/report', '/dashboard', '/settings']
const authRoutes = ['/auth/signup', '/auth/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('session')?.value

  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))
  const isAuthRoute = authRoutes.some(r => pathname.startsWith(r))

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signup', req.url))
    }
    const session = await verifySession(token)
    if (!session) {
      const response = NextResponse.redirect(new URL('/auth/signup', req.url))
      response.cookies.delete('session')
      return response
    }
  }

  if (isAuthRoute && token) {
    const session = await verifySession(token)
    if (session) {
      return NextResponse.redirect(new URL('/questionnaire', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
