'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/actions/register';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <main className="max-w-md mx-auto mt-10 p-4">
        <h1 className="text-xl font-bold text-center mb-4">Registrierung erfolgreich</h1>
        <p className="text-center text-gray-600">
          Bitte prüfe dein E-Mail-Postfach und bestätige deine Adresse, bevor du dich anmeldest.
        </p>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-blue-600 hover:underline">
            Zum Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-xl font-bold text-center mb-4">Registrieren</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">E-Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Passwort</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <Button type="submit" className="w-full">
          Registrieren
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Bereits registriert?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Zum Login
        </Link>
      </p>
    </main>
  );
}
