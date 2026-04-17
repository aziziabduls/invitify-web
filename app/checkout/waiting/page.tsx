
"use client";

import Link from "next/link";
import { Clock, QrCode } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Suspense, useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

function WaitingContent() {
  const searchParams = useSearchParams();

  const getCleanParam = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split('?')[0] : "";
  };

  const referenceId = getCleanParam("referenceId");
  let eventId = getCleanParam("eventId");
  let participantId = getCleanParam("participantId");
  const [status, setStatus] = useState<string>("pending");
  const [customerName, setCustomerName] = useState<string>(getCleanParam("name") || "Guest");
  const [customerEmail, setCustomerEmail] = useState<string>(getCleanParam("email") || "");

  // Parse referenceId if provided (e.g., from payment callback)
  if (referenceId && referenceId.startsWith("P-")) {
    const parts = referenceId.split("-");
    if (parts.length >= 3) {
      if (!eventId) eventId = parts[1];
      if (!participantId) participantId = parts[2];
    }
  }

  useEffect(() => {
    if (!referenceId) return;

    const checkStatus = async () => {
      try {
        const response = await apiClient.post('/api/payment/status', { orderId: referenceId });

        // Update name and email from backend if they were missing (coming from redirect)
        if (response.data.customer_name) setCustomerName(response.data.customer_name);
        if (response.data.customer_email) setCustomerEmail(response.data.customer_email);

        if (response.data.payment_status === 'PAID' || response.data.transaction_status === 'SUCCESS') {
          setStatus("paid");
        }
      } catch (err) {
        console.error("Status check failed:", err);
      }
    };

    const interval = setInterval(checkStatus, 5000);
    checkStatus();
    return () => clearInterval(interval);
  }, [referenceId]);

  // Construct QR data
  const qrData = JSON.stringify({
    eventId,
    participantId,
    email: customerEmail,
    type: "attendance_check"
  });

  return (
    <main className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-colors ${status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
        {status === 'paid' ? (
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <Clock className="h-10 w-10" />
        )}
      </div>

      <h1 className="mb-4 text-3xl font-bold">
        {status === 'paid' ? "Payment Successful!" : "Payment Confirmation"}
      </h1>

      <p className="mb-2 text-lg text-muted-foreground">
        {status === 'paid' ? `Registration confirmed for ${customerName}!` : `Thank you for your payment, ${customerName}!`}
      </p>

      <div className="mb-8 w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <p className="mb-6 text-sm text-foreground">
          {status === 'paid'
            ? "Your payment has been verified. You're all set! See you at the event."
            : "We have received your payment request. Please allow up to 1 hour for us to confirm your transaction."}
        </p>

        {/* <div className="mb-6 flex flex-col items-center justify-center space-y-4 rounded-lg bg-muted p-6">
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
        </div> */}

        <p className="text-sm text-muted-foreground">
          All transaction details and your e-ticket {status === 'paid' ? 'have been' : 'will be'} sent to <b>{customerEmail}</b>.
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
