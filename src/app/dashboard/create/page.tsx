import QRForm from '@/components/QRForm';

export default function CreatePage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Neuen QR-Code erstellen</h1>
      <QRForm
        action="/api/qr"
        method="POST"
        submitLabel="Erstellen"
        successRedirect="/dashboard"
      />
    </div>
  );
}
