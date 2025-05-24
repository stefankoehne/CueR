'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';

export default function CreateQRCodePage() {
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState('');
  const [mode, setMode] = useState<'redirect' | 'embed'>('redirect');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl, mode }),
    });

    if (res.ok) {
      const data = await res.json();
      setShortCode(data.shortCode);
      setError('');
    } else {
      const err = await res.text();
      setError(err || 'Fehler beim Erstellen des QR-Codes');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-zinc-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">QR-Code erstellen</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="url"
          className="p-2 rounded bg-zinc-700 text-white"
          placeholder="Ziel-URL"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
        />

        <select
          className="p-2 rounded bg-zinc-700 text-white"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'redirect' | 'embed')}
        >
          <option value="redirect">Weiterleitung</option>
          <option value="embed">Einbetten</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          QR-Code generieren
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {shortCode && (
        <div className="mt-6 text-center">
          <p className="text-white mb-2">QR-Code für: <code>/code/{shortCode}</code></p>
          <QRCode
            value={`${window.location.origin}/code/${shortCode}`}
            size={256}
            bgColor="#1e1e1e"
            fgColor="#ffffff"
          />
        </div>
      )}
    </div>
  );
}
