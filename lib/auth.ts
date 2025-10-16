// Super Admin authentication - ONLY ONE ADMIN
export const SUPER_ADMIN_EMAILS = [
  'kasiotisg@gmail.com',
];

export function isSuperAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  // Trim and lowercase for case-insensitive comparison
  const normalizedEmail = email.trim().toLowerCase();
  return SUPER_ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === normalizedEmail);
}

