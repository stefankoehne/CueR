import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = await db.qRCode.deleteMany({
    where: {
      shortCode: params.slug,
      userId: session.user.id,
    },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
