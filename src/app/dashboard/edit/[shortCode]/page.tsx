import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { QRMode } from '@prisma/client';
import EditForm from './form';

interface EditPageProps {
  params: { shortCode: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const code = await prisma.qRCode.findUnique({
    where: { shortCode: params.shortCode },
  });

  if (!code) {
    return <div className="p-6 text-red-400">QR-Code nicht gefunden.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">QR-Code bearbeiten</h1>
      <EditForm
        shortCode={code.shortCode}
        initialUrl={code.targetUrl}
        initialMode={code.mode}
      />
    </div>
  );
}
