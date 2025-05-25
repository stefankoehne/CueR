import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetUrl, mode, expiresAt } = await req.json();

  const shortCode = nanoid(8);

  const qrCode = await db.qRCode.create({
    data: {
      userId: session.user.id,
      shortCode,
      targetUrl,
      mode,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json({ qrCode });
}
