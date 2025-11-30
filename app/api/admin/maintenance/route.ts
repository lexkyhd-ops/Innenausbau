import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import path from 'path'
import { getMaintenanceMode, setMaintenanceMode } from '@/lib/maintenance'

// Check if user is authenticated as admin
function isAuthenticated(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin-session')
  return adminSession?.value === 'authenticated'
}

// Get maintenance status
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const enabled = getMaintenanceMode()

    return NextResponse.json({
      enabled,
    })
  } catch (error) {
    console.error('Error checking maintenance status:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen des Status' },
      { status: 500 }
    )
  }
}

// Toggle maintenance mode
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { enabled } = await request.json()
    
    // On Vercel, we can't modify files, so we need to use environment variables
    const isVercel = process.env.VERCEL === '1'
    
    if (isVercel) {
      // On Vercel, inform user that they need to set environment variable
      return NextResponse.json({
        success: false,
        enabled: getMaintenanceMode(),
        message: 'Auf Vercel muss der Wartungsmodus über Environment-Variablen gesteuert werden.',
        instructions: {
          enable: 'Setzen Sie MAINTENANCE_MODE=true in den Vercel Environment Variables',
          disable: 'Entfernen Sie MAINTENANCE_MODE oder setzen Sie MAINTENANCE_MODE=false',
          note: 'Nach dem Ändern der Environment-Variable ist ein neuer Deploy erforderlich.',
        },
      })
    }

    // Local development: use file-based approach
    await setMaintenanceMode(enabled)

    return NextResponse.json({
      success: true,
      enabled,
      message: enabled ? 'Wartungsmodus aktiviert' : 'Wartungsmodus deaktiviert',
    })
  } catch (error) {
    console.error('Error toggling maintenance mode:', error)
    return NextResponse.json(
      { error: 'Fehler beim Ändern des Wartungsmodus', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

