import crypto from 'crypto'

// Simple CSRF token generation and verification
// For production, consider using a library like 'csrf' or 'csurf'

const CSRF_SECRET_LENGTH = 32
const CSRF_TOKEN_LENGTH = 32

/**
 * Generate a CSRF secret (stored in cookie)
 */
export function generateCsrfSecret(): string {
  return crypto.randomBytes(CSRF_SECRET_LENGTH).toString('hex')
}

/**
 * Generate a CSRF token from secret
 */
export function generateCsrfToken(secret: string): string {
  return crypto
    .createHash('sha256')
    .update(secret + process.env.CSRF_SECRET_SALT || 'default-salt-change-in-production')
    .digest('hex')
    .substring(0, CSRF_TOKEN_LENGTH)
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(secret: string, token: string): boolean {
  if (!secret || !token) return false
  
  try {
    const expectedToken = generateCsrfToken(secret)
    
    // Use timing-safe comparison to prevent timing attacks
    if (token.length !== expectedToken.length) {
      return false
    }
    
    let result = 0
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i)
    }
    
    return result === 0
  } catch (error) {
    return false
  }
}

