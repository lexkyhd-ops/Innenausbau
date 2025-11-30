import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
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
    // Check environment variable
    const envMaintenance = process.env.MAINTENANCE_MODE === 'true'
    
    // Check in-memory store
    const memoryMaintenance = getMaintenanceMode()
    
    // Check file
    const maintenanceFile = path.join(process.cwd(), '.maintenance')
    const fileMaintenance = existsSync(maintenanceFile)

    return NextResponse.json({
      enabled: envMaintenance || memoryMaintenance || fileMaintenance,
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
    
    // Set in-memory store (works on Vercel and locally)
    setMaintenanceMode(enabled)
    
    // Also try to update file for local development (optional)
    try {
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
    } catch (fileError) {
      // File operations might fail on Vercel, but that's okay - we use in-memory store
      console.log('File-based maintenance mode not available (this is normal on Vercel)')
    }

    return NextResponse.json({
      success: true,
      enabled,
      message: enabled ? 'Wartungsmodus aktiviert' : 'Wartungsmodus deaktiviert',
      note: process.env.VERCEL ? 'Hinweis: Der Status wird nach einem Neustart zurückgesetzt. Für persistente Einstellungen verwenden Sie die Environment-Variable MAINTENANCE_MODE.' : undefined,
    })
  } catch (error) {
    console.error('Error toggling maintenance mode:', error)
    return NextResponse.json(
      { error: 'Fehler beim Ändern des Wartungsmodus', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

