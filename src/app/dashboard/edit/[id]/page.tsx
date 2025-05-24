import { notFound } from 'next/navigation';
import QRForm from '@/components/QRForm';
import prisma from '@/lib/prisma';

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const qrCode = await prisma.qRCode.findUnique({
    where: { id: params.id },
  });

  if (!qrCode) return notFound();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">QR-Code bearbeiten</h1>
      <QRForm
        action={`/api/qr/${qrCode.id}`}
        method="PUT"
        defaultValues={{
          label: qrCode.label,
          targetUrl: qrCode.targetUrl,
          mode: qrCode.mode,
        }}
        submitLabel="Änderungen speichern"
        successRedirect="/dashboard"
      />
    </div>
  );
}
