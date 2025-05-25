'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-100 border-b border-gray-300 p-4 flex justify-between items-center">
      <div>
        <Link href="/dashboard" className="text-lg font-bold text-gray-800">
          CueR Dashboard
        </Link>
      </div>
      <div className="space-x-4">
        {status === 'loading' ? (
          <span>Lädt...</span>
        ) : session?.user ? (
          <>
            <Link href="/code/new" className="text-blue-600 hover:underline">
              Neuer QR-Code
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
