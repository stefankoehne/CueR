// src/app/layout.tsx
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers'; // ← nicht vergessen!
import { authOptions } from '@/lib/auth';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CueR',
  description: 'QR-Code-Verwaltung',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const pathname = headers().get('x-next-pathname') || '';
  const showNavbar = !pathname.startsWith('/code/');

  return (
    <html lang="de">
      <body className={inter.className}>
        <SessionWrapper session={session}>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
