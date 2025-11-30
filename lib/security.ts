/**
 * Sanitize HTML input to prevent XSS attacks
 * Removes all HTML tags and escapes HTML entities
 */
export function sanitizeHtml(input: string): string {
  if (!input) return ''
  // Remove all HTML tags and escape HTML entities
  return escapeHtml(input.replace(/<[^>]*>/g, ''))
}

/**
 * Sanitize email address - only allow safe characters
 */
export function sanitizeEmail(email: string): string {
  if (!email) return ''
  // Only allow alphanumeric, @, ., _, - characters
  return email.replace(/[^a-zA-Z0-9@._-]/g, '')
}

/**
 * Sanitize phone number - only allow digits, +, -, spaces, parentheses
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return ''
  return phone.replace(/[^0-9+\-() ]/g, '')
}

/**
 * Sanitize service value - only allow alphanumeric and hyphens
 */
export function sanitizeService(service: string): string {
  if (!service) return ''
  return service.replace(/[^a-zA-Z0-9-]/g, '')
}

/**
 * Escape HTML entities for safe display
 */
export function escapeHtml(text: string): string {
  if (!text) return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Input length limits
 */
export const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 20,
  message: 5000,
  service: 50,
} as const

/**
 * Validate input length
 */
export function validateLength(field: keyof typeof MAX_LENGTHS, value: string): boolean {
  return value.length <= MAX_LENGTHS[field]
}

