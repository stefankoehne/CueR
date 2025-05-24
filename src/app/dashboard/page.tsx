import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';

export default async function DashboardPage() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const codes = await prisma.qRCode.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <Link
          href="/dashboard/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Neuen QR-Code erstellen
        </Link>
      </div>

      <table className="w-full table-auto text-sm text-left text-gray-300">
        <thead className="bg-gray-700 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Shortcode</th>
            <th className="px-4 py-2">Ziel-URL</th>
            <th className="px-4 py-2">Modus</th>
            <th className="px-4 py-2">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.shortCode} className="border-b border-gray-700">
              <td className="px-4 py-2 font-mono">{code.shortCode}</td>
              <td className="px-4 py-2 break-all">{code.targetUrl}</td>
              <td className="px-4 py-2">{code.mode}</td>
              <td className="px-4 py-2">
                <DeleteButton shortCode={code.shortCode} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
