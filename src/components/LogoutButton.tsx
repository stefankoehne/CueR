// src/components/LogoutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
    >
      Logout
    </button>
  );
}
