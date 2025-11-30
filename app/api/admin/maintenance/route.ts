import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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
    // Check environment variable
    const envMaintenance = process.env.MAINTENANCE_MODE === 'true'
    
    // Check file
    const maintenanceFile = path.join(process.cwd(), '.maintenance')
    const fileMaintenance = existsSync(maintenanceFile)

    return NextResponse.json({
      enabled: envMaintenance || fileMaintenance,
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
    const maintenanceFile = path.join(process.cwd(), '.maintenance')

    if (enabled) {
      // Enable maintenance mode by creating file
      await writeFile(maintenanceFile, JSON.stringify({ enabled: true, timestamp: new Date().toISOString() }), 'utf-8')
    } else {
      // Disable maintenance mode by deleting file
      if (existsSync(maintenanceFile)) {
        await unlink(maintenanceFile)
      }
    }

    return NextResponse.json({
      success: true,
      enabled,
      message: enabled ? 'Wartungsmodus aktiviert' : 'Wartungsmodus deaktiviert',
    })
  } catch (error) {
    console.error('Error toggling maintenance mode:', error)
    return NextResponse.json(
      { error: 'Fehler beim Ändern des Wartungsmodus' },
      { status: 500 }
    )
  }
}

