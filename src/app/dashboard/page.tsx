import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import QRTable from '@/components/QRTable';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/login');
  }

  const qrCodes = await db.qRCode.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Deine QR-Codes</h1>
      <QRTable qrCodes={qrCodes} />
    </main>
  );
}
