// src/pages/api/qrcode/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, targetUrl, mode, expiresAt } = req.body;

    if (!userId || !targetUrl || !mode) {
      return res.status(400).json({ error: 'Fehlende Felder' });
    }

    const shortCode = nanoid(8);

    const qrCode = await db.qRCode.create({
      data: {
        userId,
        targetUrl,
        mode,
        shortCode,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return res.status(200).json({ success: true, shortCode: qrCode.shortCode });
  } catch (error) {
    console.error('Fehler beim Erstellen des QR-Codes:', error);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
