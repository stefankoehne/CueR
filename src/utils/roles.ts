export const roles = ['STANDARD', 'PRO', 'ADMIN'] as const;

export type Role = (typeof roles)[number];

export function canUseEmbed(role: Role) {
  return role === 'PRO' || role === 'ADMIN';
}

export function isAdmin(role: Role) {
  return role === 'ADMIN';
}
