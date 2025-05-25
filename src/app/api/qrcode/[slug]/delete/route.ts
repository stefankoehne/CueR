// src/app/api/qrcode/[slug]/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const qrCode = await db.qRCode.findFirst({
    where: {
      shortCode: params.slug,
      userId: session.user.id,
    },
  });

  if (!qrCode) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db.qRCode.delete({
    where: { id: qrCode.id },
  });

  return NextResponse.json({ success: true });
}
