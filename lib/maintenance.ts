// Simple in-memory store for maintenance mode
// Note: This resets on each deployment/restart
// For persistent storage, consider using a database or external service

let maintenanceMode: boolean = false

export function getMaintenanceMode(): boolean {
  // Check environment variable first (for Vercel/production)
  if (process.env.MAINTENANCE_MODE === 'true') {
    return true
  }
  
  // Check in-memory store
  return maintenanceMode
}

export function setMaintenanceMode(enabled: boolean): void {
  maintenanceMode = enabled
}

// Initialize from environment variable on module load
if (process.env.MAINTENANCE_MODE === 'true') {
  maintenanceMode = true
}

