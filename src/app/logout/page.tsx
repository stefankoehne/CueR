'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-xl font-semibold text-center">Abmeldung...</h1>
      <p className="text-center text-gray-500 mt-2">
        Du wirst abgemeldet und zur Startseite weitergeleitet.
      </p>
    </main>
  );
}
