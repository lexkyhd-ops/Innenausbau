// Maintenance mode state management
// Edge Runtime compatible - only uses environment variables
// For Vercel/production, use MAINTENANCE_MODE environment variable
// For local development, set MAINTENANCE_MODE=true in .env.local

export function getMaintenanceMode(): boolean {
  // Only check environment variable (Edge Runtime compatible)
  return process.env.MAINTENANCE_MODE === 'true'
}

