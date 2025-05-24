'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditFormProps {
  shortCode: string;
  initialUrl: string;
  initialMode: 'redirect' | 'embed';
}

export default function EditForm({
  shortCode,
  initialUrl,
  initialMode,
}: EditFormProps) {
  const [url, setUrl] = useState(initialUrl);
  const [mode, setMode] = useState<'redirect' | 'embed'>(initialMode);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/code/${shortCode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl: url, mode }),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Ziel-URL</label>
        <input
          type="url"
          className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Modus</label>
        <select
          className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'redirect' | 'embed')}
        >
          <option value="redirect">Weiterleiten</option>
          <option value="embed">Einbetten</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        {saving ? 'Speichern...' : 'Änderungen speichern'}
      </button>

      {saved && (
        <div className="text-green-400 mt-3">
          ✅ Änderungen gespeichert. Weiterleitung zum Dashboard…
        </div>
      )}
    </form>
  );
}
