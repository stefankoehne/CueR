// src/app/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/DashboardClient';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/login');
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Deine QR-Codes</h1>
      <DashboardClient />
    </main>
  );
}
