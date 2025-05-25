import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import EditQrForm from '@/components/EditQrForm';

interface EditPageProps {
  params: { slug: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const session = await auth();

  if (!session?.user?.id) return notFound();

  const qrCode = await db.qRCode.findFirst({
    where: {
      shortCode: params.slug,
      userId: session.user.id,
    },
  });

  if (!qrCode) return notFound();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">QR-Code bearbeiten</h1>
      <EditQrForm initialData={qrCode} />
    </main>
  );
}
