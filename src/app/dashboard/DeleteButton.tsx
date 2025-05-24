'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ shortCode }: { shortCode: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm('Möchtest du diesen QR-Code wirklich löschen?')) return;

    startTransition(async () => {
      await fetch(`/api/code/${shortCode}`, { method: 'DELETE' });
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-red-400 hover:text-red-600 text-sm"
    >
      {pending ? 'Lösche…' : 'Löschen'}
    </button>
  );
}
