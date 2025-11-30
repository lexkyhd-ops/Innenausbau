// Maintenance mode state management
// Uses file-based storage for local development
// For Vercel/production, use MAINTENANCE_MODE environment variable

import { existsSync } from 'fs'
import path from 'path'

export function getMaintenanceMode(): boolean {
  // Check environment variable first (for Vercel/production)
  // This is the primary method for production
  if (process.env.MAINTENANCE_MODE === 'true') {
    return true
  }
  
  // Check local file (for development/local)
  try {
    const maintenanceFile = path.join(process.cwd(), '.maintenance')
    if (existsSync(maintenanceFile)) {
      return true
    }
  } catch (error) {
    // File system not available, continue
  }
  
  return false
}

export function setMaintenanceMode(enabled: boolean): Promise<void> {
  // This function is mainly for local development
  // On Vercel, use environment variables instead
  return new Promise(async (resolve) => {
    try {
      const fs = require('fs').promises
      const maintenanceFile = path.join(process.cwd(), '.maintenance')
      
      if (enabled) {
        await fs.writeFile(maintenanceFile, JSON.stringify({ enabled: true, timestamp: new Date().toISOString() }), 'utf-8')
      } else {
        if (existsSync(maintenanceFile)) {
          await fs.unlink(maintenanceFile)
        }
      }
    } catch (error) {
      // File operations might fail on Vercel, but that's okay
      console.log('File-based maintenance mode not available (this is normal on Vercel)')
    }
    resolve()
  })
}

