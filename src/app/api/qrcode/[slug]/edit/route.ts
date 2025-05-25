// src/app/api/qrcode/[slug]/edit/route.ts
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { slug } = params;

  const existing = await db.qRCode.findUnique({
    where: {
      shortCode: slug,
      userId: session.user.id,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "QR-Code nicht gefunden" }, { status: 404 });
  }

  const data = await req.json();

  try {
    await db.qRCode.update({
      where: { id: existing.id },
      data: {
        targetUrl: data.targetUrl,
        mode: data.mode,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update error", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
