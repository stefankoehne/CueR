'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type QRFormProps = {
  action: string;
  method: 'POST' | 'PUT';
  defaultUrl?: string;
  defaultMode?: 'redirect' | 'embed';
  submitLabel?: string;
  successRedirect?: string;
};

export default function QRForm({
  action,
  method,
  defaultUrl = '',
  defaultMode = 'redirect',
  submitLabel = 'Speichern',
  successRedirect = '/dashboard',
}: QRFormProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [mode, setMode] = useState<'redirect' | 'embed'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(action, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, mode }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Fehler beim Speichern');
      }

      router.push(successRedirect);
    } catch (err: any) {
      setError(err.message || 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Ziel-URL</label>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 bg-gray-800 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Modus</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'redirect' | 'embed')}
          className="mt-1 w-full rounded border px-3 py-2 bg-gray-800 text-white"
        >
          <option value="redirect">Weiterleitung</option>
          <option value="embed">Einbettung</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Speichern …' : submitLabel}
      </button>
    </form>
  );
}
