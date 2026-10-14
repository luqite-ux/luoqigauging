import { NextResponse, type NextRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from './lib/service-status'

const SESSION_COOKIE = 'hq_admin_session'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
  if (!isPublic && pathname.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    return NextResponse.redirect(url)
  }
  if (!isServiceGuardExcludedPath(pathname) && !(await isWebsiteServiceAvailable())) {
    return NextResponse.rewrite(new URL('/service-expired', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
