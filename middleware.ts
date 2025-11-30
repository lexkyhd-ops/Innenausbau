import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Check if maintenance mode is enabled
function isMaintenanceMode(): boolean {
  // Check environment variable first (for Vercel/production)
  if (process.env.MAINTENANCE_MODE === 'true') {
    return true
  }
  
  // Check local file (for development/local)
  try {
    const fs = require('fs')
    const path = require('path')
    const maintenanceFile = path.join(process.cwd(), '.maintenance')
    if (fs.existsSync(maintenanceFile)) {
      return true
    }
  } catch (error) {
    // File system not available, continue
  }
  
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to admin and API routes
  if (
    pathname.startsWith('/api/admin') ||
    pathname.startsWith('/admin') ||
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

