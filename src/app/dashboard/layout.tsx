// src/app/dashboard/layout.tsx
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css'; // falls du Styles brauchst

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard – CueR',
  description: 'Verwalte deine QR-Codes',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
