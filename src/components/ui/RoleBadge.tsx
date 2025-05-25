import { UserRole } from '@prisma/client';

export function RoleBadge({ role }: { role: UserRole }) {
  const colors: Record<UserRole, string> = {
    ADMIN: 'bg-red-100 text-red-800',
    PRO: 'bg-green-100 text-green-800',
    STANDARD: 'bg-gray-100 text-gray-800',
  };

  const labels: Record<UserRole, string> = {
    ADMIN: 'Admin',
    PRO: 'Pro',
    STANDARD: 'Standard',
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded font-medium ${colors[role]}`}
      title={`Rolle: ${labels[role]}`}
    >
      {labels[role]}
    </span>
  );
}
