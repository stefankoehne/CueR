import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

type Props = {
  params: {
    shortCode: string;
  };
};

export default async function QRCodeResolverPage({ params }: Props) {
  const shortCode = params.shortCode;

  const qrCode = await prisma.qRCode.findUnique({
    where: { shortCode },
  });

  if (!qrCode) {
    notFound();
  }

  if (qrCode.mode === 'redirect') {
    redirect(qrCode.targetUrl);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Eingebettete Seite</h1>
      <p className="text-sm mb-4">Shortcode: <code>{qrCode.shortCode}</code></p>
      <div className="w-full max-w-4xl aspect-video rounded overflow-hidden border border-zinc-700">
        <iframe
          src={qrCode.targetUrl}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
}
