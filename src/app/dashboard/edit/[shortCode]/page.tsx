import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import QRForm from '@/components/QRForm';

export default async function EditQRPage({ params }: { params: { shortCode: string } }) {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const qrCode = await prisma.qrCode.findUnique({
    where: { shortCode: params.shortCode },
  });

  if (!qrCode) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">QR-Code bearbeiten</h1>
      <QRForm
        action={`/api/code/${qrCode.shortCode}`}
        method="PUT"
        defaultUrl={qrCode.targetUrl}
        defaultMode={qrCode.mode}
        submitLabel="Änderungen speichern"
        successRedirect="/dashboard"
      />
    </div>
  );
}
