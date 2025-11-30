import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getMaintenanceMode } from '@/lib/maintenance'

// Check if maintenance mode is enabled
function isMaintenanceMode(): boolean {
  return getMaintenanceMode()
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to maintenance and API routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Check if maintenance mode is active
  if (isMaintenanceMode()) {
    // Check if user has admin session cookie
    const adminSession = request.cookies.get('admin-session')
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      // Redirect to maintenance page
      if (pathname !== '/maintenance') {
        return NextResponse.redirect(new URL('/maintenance', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

