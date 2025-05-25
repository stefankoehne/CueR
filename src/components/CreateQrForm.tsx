// src/components/CreateQrForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
}

export default function CreateQrForm({ userId }: Props) {
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState('');
  const [mode, setMode] = useState<'REDIRECT' | 'EMBED'>('REDIRECT');
  const [expiresAt, setExpiresAt] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/qrcode/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        targetUrl,
        mode,
        expiresAt: expiresAt || null,
      }),
    });

    if (res.ok) {
      const { shortCode } = await res.json();
      router.push(`/dashboard`);
    } else {
      alert('Fehler beim Erstellen des QR-Codes.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Ziel-URL</label>
        <input
          type="url"
          required
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Modus</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'REDIRECT' | 'EMBED')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="REDIRECT">Weiterleitung</option>
          <option value="EMBED">Einbetten (iframe)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Ablaufdatum (optional)</label>
        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        QR-Code erstellen
      </button>
    </form>
  );
}
