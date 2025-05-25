// src/components/EditQrForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRMode, type QRCode } from "@prisma/client";

type Props = {
  qrCode: QRCode;
};

export default function EditQrForm({ qrCode }: Props) {
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState(qrCode.targetUrl);
  const [mode, setMode] = useState<QRMode>(qrCode.mode);
  const [expiresAt, setExpiresAt] = useState(
    qrCode.expiresAt ? new Date(qrCode.expiresAt).toISOString().split("T")[0] : ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`/api/qrcode/${qrCode.shortCode}/edit`, {
      method: "POST",
      body: JSON.stringify({
        targetUrl,
        mode,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Fehler beim Speichern.");
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-semibold">Ziel-URL</label>
        <input
          type="url"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Modus</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as QRMode)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="REDIRECT">Redirect</option>
          <option value="EMBED">Embed</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Ablaufdatum</label>
        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Speichern
      </button>
    </form>
  );
}
