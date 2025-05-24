import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Nicht autorisiert', { status: 403 });
  }

  const code = await prisma.qrCode.findUnique({
    where: { shortCode: params.shortCode },
  });

  if (!code) {
    return new NextResponse('Nicht gefunden', { status: 404 });
  }

  return NextResponse.json(code);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Nicht autorisiert', { status: 403 });
  }

  const body = await req.json();

  const updated = await prisma.qrCode.update({
    where: { shortCode: params.shortCode },
    data: {
      targetUrl: body.targetUrl,
      mode: body.mode,
    },
  });

  return NextResponse.json(updated);
}
