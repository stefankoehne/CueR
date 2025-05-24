import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  const { targetUrl, mode } = await req.json();

  if (!targetUrl || !mode || !['redirect', 'embed'].includes(mode)) {
    return NextResponse.json({ error: 'Ungültige Eingabedaten' }, { status: 400 });
  }

  const shortCode = generateShortCode();

  try {
    const qrCode = await prisma.qRCode.create({
      data: {
        shortCode,
        targetUrl,
        mode,
      },
    });

    return NextResponse.json({ shortCode: qrCode.shortCode });
  } catch (err) {
    console.error('Fehler beim Erstellen des QR-Codes:', err);
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}

function generateShortCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
