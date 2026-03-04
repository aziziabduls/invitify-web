
import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export default function WaitingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Clock className="h-10 w-10" />
        </div>
        
        <h1 className="mb-4 text-3xl font-bold">Payment Confirmation</h1>
        
        <p className="mb-2 text-lg text-muted-foreground">
          Thank you for your payment!
        </p>
        
        <div className="mb-8 max-w-md rounded-lg border bg-card p-6 shadow-sm">
          <p className="mb-4 text-sm text-foreground">
            We have received your payment request. Please allow up to <span className="font-semibold">1 hour</span> for us to confirm your transaction.
          </p>
          <p className="text-sm text-muted-foreground">
            All transaction details and your e-ticket will be sent to your registered email address once confirmed.
          </p>
        </div>

        <Link 
          href="/"
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
}
