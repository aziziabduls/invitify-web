
"use client";

import Link from "next/link";
import { Clock, QrCode } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Suspense } from "react";

function WaitingContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const participantId = searchParams.get("participantId");
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  // Construct QR data
  const qrData = JSON.stringify({
    eventId,
    participantId,
    email,
    type: "attendance_check"
  });

  return (
    <main className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Clock className="h-10 w-10" />
      </div>

      <h1 className="mb-4 text-3xl font-bold">Payment Confirmation</h1>

      <p className="mb-2 text-lg text-muted-foreground">
        Thank you for your payment, {name}!
      </p>

      <div className="mb-8 w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <p className="mb-6 text-sm text-foreground">
          We have received your payment request. Please allow up to <span className="font-semibold">1 hour</span> for us to confirm your transaction.
        </p>

        <div className="mb-6 flex flex-col items-center justify-center space-y-4 rounded-lg bg-muted p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <QrCode className="h-4 w-4" />
            <span>Booth Attendance QR</span>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-inner">
            <QRCodeSVG
              value={qrData}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Show this QR code at the booth to confirm your attendance.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          All transaction details and your e-ticket will be sent to <b>{email}</b> once confirmed.
        </p>
      </div>

      <Link
        href="/"
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default function WaitingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Suspense fallback={
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
          <div className="animate-pulse">Loading...</div>
        </main>
      }>
        <WaitingContent />
      </Suspense>
    </div>
  );
}
