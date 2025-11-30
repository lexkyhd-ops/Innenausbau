import { NextRequest, NextResponse } from 'next/server'
import { generateCsrfToken } from '@/lib/csrf'

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    if (!secret || typeof secret !== 'string') {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 400 }
      )
    }

    const token = generateCsrfToken(secret)

    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

