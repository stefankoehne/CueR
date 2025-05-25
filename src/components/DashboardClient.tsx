'use client';

import { useEffect, useState } from 'react';
import { QRCode } from '@prisma/client';
import QRTable from './QRTable';

export default function DashboardClient() {
  const [qrcodes, setQRCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const data = await res.json();
        setQRCodes(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Lade...</p>;

  return <QRTable qrcodes={qrcodes} />;
}
