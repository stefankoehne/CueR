'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { RoleBadge } from './ui/RoleBadge';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-lg font-bold text-gray-800">
        CueR
      </Link>
      <nav className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-sm text-gray-700">
              Eingeloggt als {session.user.name}
            </span>
            {session.user.role && <RoleBadge role={session.user.role} />}
            <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600 hover:underline text-sm">
              Login
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline text-sm">
              Registrieren
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
