// src/app/dashboard/create/page.tsx
import { auth } from '@/lib/auth';
import CreateQrForm from '@/components/CreateQrForm';
import { redirect } from 'next/navigation';

export default async function CreatePage() {
  const session = await auth();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">QR-Code erstellen</h1>
      <CreateQrForm userId={session.user.id} />
    </main>
  );
}
