// src/app/code/[slug]/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.className} m-0 p-0 overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
