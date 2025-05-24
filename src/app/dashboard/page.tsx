import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const codes = await db.qrCode.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Willkommen, {session.user.name}</h1>
      <Link
        href="/dashboard/create"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4"
      >
        ➕ Neuen QR-Code erstellen
      </Link>

      <div className="space-y-4">
        {codes.map((code) => (
          <div key={code.id} className="p-4 bg-gray-800 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">Code: /code={code.code}</p>
              <p className="text-sm text-gray-300 break-all">Ziel: {code.targetUrl}</p>
            </div>
            <Link
              href={`/dashboard/edit/${code.id}`}
              className="text-sm text-blue-400 hover:underline"
            >
              ✏️ Bearbeiten
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
