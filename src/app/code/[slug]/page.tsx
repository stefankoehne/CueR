import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/db';

interface PageProps {
  params: { slug: string };
}

export default async function CodePage({ params }: PageProps) {
  const qrCode = await db.qRCode.findUnique({
    where: { shortCode: params.slug },
  });

  if (!qrCode) return notFound();

  if (qrCode.expiresAt && new Date(qrCode.expiresAt) < new Date()) {
    return notFound();
  }

  if (qrCode.mode === 'EMBED') {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <iframe
          src={qrCode.targetUrl}
          className="w-full h-full border-none"
          title="Embedded content"
        />
      </div>
    );
  }

  return redirect(qrCode.targetUrl);
}
