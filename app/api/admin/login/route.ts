import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Falsches Passwort' },
        { status: 401 }
      )
    }

    // Create response with success
    const response = NextResponse.json({ success: true })

    // Set admin session cookie
    response.cookies.set('admin-session', 'authenticated', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
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

