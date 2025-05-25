import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetUrl, mode, expiresAt } = await req.json();

  const updated = await db.qRCode.updateMany({
    where: {
      shortCode: params.slug,
      userId: session.user.id,
    },
    data: {
      targetUrl,
      mode,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
