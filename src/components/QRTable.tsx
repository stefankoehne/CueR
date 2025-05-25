// src/components/QRTable.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QRCode } from '@prisma/client';

type Props = {
  qrcodes: QRCode[];
};

export default function QRTable({ qrcodes }: Props) {
  const router = useRouter();

  const handleDelete = async (shortCode: string) => {
    if (!confirm('Möchtest du diesen QR-Code wirklich löschen?')) return;

    const res = await fetch(`/api/qrcode/${shortCode}/delete`, {
      method: 'POST',
    });

    if (res.ok) {
      window.location.reload(); // erzwingt vollständiges Neuladen
    } else {
      alert('Löschen fehlgeschlagen.');
    }
  };

  if (!Array.isArray(qrcodes)) {
    return <p>Keine QR-Codes verfügbar.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Shortcode</th>
            <th className="px-4 py-2 border-b">Ziel-URL</th>
            <th className="px-4 py-2 border-b">Modus</th>
            <th className="px-4 py-2 border-b">Ablaufdatum</th>
            <th className="px-4 py-2 border-b">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {qrcodes.map((qr) => (
            <tr key={qr.id}>
              <td className="px-4 py-2 border-b">
                <a
                  href={`/code/${qr.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {qr.shortCode}
                </a>
              </td>
              <td className="px-4 py-2 border-b break-all">{qr.targetUrl}</td>
              <td className="px-4 py-2 border-b">{qr.mode}</td>
              <td className="px-4 py-2 border-b">
                {qr.expiresAt
                  ? new Date(qr.expiresAt).toLocaleDateString()
                  : 'Unbegrenzt'}
              </td>
              <td className="px-4 py-2 border-b space-x-2">
                <Link
                  href={`/dashboard/edit/${qr.shortCode}`}
                  className="text-blue-600 hover:underline"
                >
                  Bearbeiten
                </Link>
                <button
                  onClick={() => handleDelete(qr.shortCode)}
                  className="text-red-600 hover:underline"
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
