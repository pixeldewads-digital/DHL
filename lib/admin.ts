// Shared admin-check. All /admin routes and the admin layout import from here.
// Returns true only when ADMIN_EMAILS is configured AND email is in the list.
export function isAdmin(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS || ''
  if (!raw.trim()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[admin] ADMIN_EMAILS env var is not set — /admin is inaccessible')
    }
    return false
  }
  const adminEmails = raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  return adminEmails.includes(email.toLowerCase())
}
