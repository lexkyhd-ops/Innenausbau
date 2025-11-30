import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lockUntil: number }>()
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (record && now < record.lockUntil) {
    return false // Still locked out
  }

  if (record && now >= record.lockUntil) {
    // Reset after lockout period
    loginAttempts.delete(ip)
  }

  return true
}

function recordFailedLogin(ip: string): void {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record) {
    loginAttempts.set(ip, { count: 1, lockUntil: now + LOCKOUT_DURATION })
  } else {
    const newCount = record.count + 1
    loginAttempts.set(ip, {
      count: newCount,
      lockUntil: newCount >= MAX_LOGIN_ATTEMPTS ? now + LOCKOUT_DURATION : record.lockUntil,
    })
  }
}

function clearLoginAttempts(ip: string): void {
  loginAttempts.delete(ip)
}

function getClientIP(request: NextRequest): string {
  if (process.env.VERCEL) {
    return request.headers.get('x-vercel-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown'
  }
  
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim()).filter(ip => ip)
    return ips[ips.length - 1] || 'unknown'
  }
  
  return request.headers.get('x-real-ip') || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)

    // Check rate limiting
    if (!checkLoginRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    // Require ADMIN_PASSWORD to be set - no fallback
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not set - admin login disabled')
      return NextResponse.json(
        { success: false, error: 'Admin-Login nicht konfiguriert' },
        { status: 503 }
      )
    }

    if (!password || typeof password !== 'string' || password !== adminPassword) {
      recordFailedLogin(ip)
      return NextResponse.json(
        { success: false, error: 'Falsches Passwort' },
        { status: 401 }
      )
    }

    // Clear failed attempts on successful login
    clearLoginAttempts(ip)

    // Create response with success
    const response = NextResponse.json({ success: true })

    // Set admin session cookie with enhanced security
    response.cookies.set('admin-session', 'authenticated', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'strict', // Stricter for admin cookies
      secure: true, // Always require HTTPS
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}

