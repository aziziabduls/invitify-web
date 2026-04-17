"use client";

import { Event } from "@/lib/data";
import { ArrowLeft, Calendar, CreditCard, MapPin, QrCode, Smartphone, Building2, Wallet, X, Copy, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

interface CheckoutViewProps {
  event: Event;
}

type PaymentMethodType = "bank" | "qris" | "ewallet";

interface PaymentMethod {
  id: string;
  name: string;
  logo?: string; // We can use text or placeholders if no logos
  type: PaymentMethodType;
}

const paymentMethods: PaymentMethod[] = [
  // QRIS
  { id: "qris", name: "QRIS", type: "qris" },
];

export default function CheckoutView({ event }: CheckoutViewProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedPayment, setSelectedPayment] = useState<string>("qris");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [copied, setCopied] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const originalPrice = event.price || 0;
  // If free event, service fee is 0. Otherwise use 5000 or any logic you prefer.
  const serviceFee = originalPrice > 0 ? 5000 : 0;

  const finalPrice = Math.max(0, originalPrice + serviceFee - appliedDiscount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscount = () => {
    if (!discountCode) return;

    if (originalPrice <= 0) {
      setDiscountError("Discount not applicable for free events");
      return;
    }

    const promo = (event.promo_codes ?? []).find(
      (p) => p.code.toUpperCase() === discountCode.toUpperCase()
    );

    if (!promo) {
      setAppliedDiscount(0);
      setDiscountError("Invalid discount code");
      return;
    }

    const promoValue = parseFloat(promo.value);
    const discountAmount =
      promo.type === "percentage"
        ? (originalPrice * promoValue) / 100
        : promoValue;

    setAppliedDiscount(Math.min(discountAmount, originalPrice));
    setDiscountError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    // Show recap popup
    setShowRecap(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    // Construct transaction data
    const transactionData = {
      eventId: event.id,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      paymentMethod: selectedPayment,
      pricing: {
        originalPrice: originalPrice,
        serviceFee: serviceFee,
        discountCode: appliedDiscount > 0 ? discountCode : null,
        discountAmount: appliedDiscount,
        finalPrice: finalPrice,
      },
      status: "pending_confirmation"
    };

    // Log the JSON data as requested
    console.log("Transaction Data:", JSON.stringify(transactionData, null, 2));

    try {
      // Send data to backend
      const response = await apiClient.post('/client/participants', transactionData);
      const participantId = response.data?.id || response.data?.participant?.id;
      const paymentUrl = response.data?.payment_url;

      setIsProcessing(false);
      setShowRecap(false);

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      // Redirect to waiting page with info for QR code
      const params = new URLSearchParams({
        eventId: event.id.toString(),
        name: formData.name,
        email: formData.email,
        ...(participantId && { participantId: participantId.toString() })
      });
      router.push(`/checkout/waiting?${params.toString()}`);
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
      alert("Failed to process payment. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentDetails = () => {
    const method = paymentMethods.find(p => p.id === selectedPayment);
    if (!method) return null;

    switch (method.type) {
      case "bank":
        // Generate a dummy VA number based on phone or random
        const vaNumber = `8800${formData.phone || "123456789"}`;
        return (
          <div className="rounded-md bg-muted p-4">
            <p className="mb-2 text-sm text-muted-foreground">Virtual Account Number</p>
            <div className="flex items-center justify-between rounded border bg-background p-2">
              <span className="font-mono text-lg font-bold">{vaNumber}</span>
              <button
                onClick={() => copyToClipboard(vaNumber)}
                className="ml-2 rounded p-1 hover:bg-muted"
                title="Copy VA Number"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Please transfer the exact amount to this Virtual Account number.
            </p>
          </div>
        );
      case "qris":
        return (
          <div></div>
          // <div className="flex flex-col items-center justify-center rounded-md bg-muted p-4">
          //   <p className="mb-4 text-sm font-medium">Scan QR Code to Pay</p>
          //   <div className="relative h-48 w-48 bg-white p-2">
          //     <div className="h-full w-full bg-black">
          //       <div className="h-full w-full border-4 border-white bg-black p-2">
          //         <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-1">
          //           {[...Array(16)].map((_, i) => (
          //             <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
          //           ))}
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <p className="mt-4 text-xs text-muted-foreground">
          //     Valid for all QRIS supported apps.
          //   </p>
          // </div >
        );
      case "ewallet":
        return (
          <div className="rounded-md bg-muted p-4 text-center">
            <Smartphone className="mx-auto mb-2 h-8 w-8 text-primary" />
            <p className="mb-2 font-medium">Confirm Payment in App</p>
            <p className="text-sm text-muted-foreground">
              Please open your <span className="font-bold text-foreground">{method.name}</span> app to confirm the payment request we just sent to <b>{formData.phone}</b>.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Make sure your phone number is registered with {method.name}.
            </p>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-18">
        <Link
          href={`/events/${event.id}`}
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Event
        </Link>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-4 lg:order-2">
            <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="mb-6 flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="line-clamp-2 font-medium">{event.name}</h3>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {event.date}
                  </div>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="mb-4 border-t pt-4">
                <div className="flex justify-between py-1 text-sm">
                  <span>General Admission x 1</span>
                  <span className="font-medium">
                    {originalPrice > 0
                      ? `Rp ${originalPrice.toLocaleString('id-ID')}`
                      : "Free"}
                  </span>
                </div>
                {serviceFee > 0 && (
                  <div className="flex justify-between py-1 text-sm text-muted-foreground">
                    <span>Service Fee</span>
                    <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between py-1 text-sm text-green-600">
                    <span>Discount</span>
                    <span>-Rp {appliedDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              {/* Discount Code Input */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    className="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80"
                  >
                    Apply
                  </button>
                </div>
                {discountError && <p className="mt-1 text-xs text-red-500">{discountError}</p>}
                {appliedDiscount > 0 && <p className="mt-1 text-xs text-green-500">Code applied successfully!</p>}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">Rp {finalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-8 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Details */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 border-b pb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Contact Details</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      autoComplete="name"
                      className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="08123456789"
                      autoComplete="phone"
                      className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      autoComplete="email"
                      className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">E-ticket will be sent to this email address.</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 border-b pb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-6">
                  {/* Bank Transfer */}
                  {paymentMethods.filter(p => p.type === 'bank').length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center font-medium text-muted-foreground">
                        <Building2 className="mr-2 h-4 w-4" />
                        Virtual Account (Bank Transfer)
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {paymentMethods.filter(p => p.type === 'bank').map((method) => (
                          <label
                            key={method.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5 ${selectedPayment === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                {selectedPayment === method.id && <div className="h-2 w-2 rounded-full bg-primary" />}
                              </div>
                              <span className="font-medium">{method.name}</span>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="hidden"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QRIS */}
                  <div>
                    <h3 className="mb-3 flex items-center font-medium text-muted-foreground">
                      <QrCode className="mr-2 h-4 w-4" />
                      QRIS
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-1">
                      {paymentMethods.filter(p => p.type === 'qris').map((method) => (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5 ${selectedPayment === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                              {selectedPayment === method.id && <div className="h-2 w-2 rounded-full bg-primary" />}
                            </div>
                            <span className="font-medium">{method.name}</span>
                          </div>
                          <Image src="/globe.svg" alt="QRIS" width={24} height={24} className="opacity-50" />
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* E-Wallets */}
                  {paymentMethods.filter(p => p.type === 'ewallet').length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center font-medium text-muted-foreground">
                        <Wallet className="mr-2 h-4 w-4" />
                        E-Wallet
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {paymentMethods.filter(p => p.type === 'ewallet').map((method) => (
                          <label
                            key={method.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5 ${selectedPayment === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                {selectedPayment === method.id && <div className="h-2 w-2 rounded-full bg-primary" />}
                              </div>
                              <span className="font-medium">{method.name}</span>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="hidden"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-50"
              >
                {isProcessing
                  ? "Processing..."
                  : finalPrice > 0
                    ? `Pay Now • Rp ${finalPrice.toLocaleString('id-ID')}`
                    : "Register for Free"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {showRecap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Transaction Recap</h3>
              <button
                onClick={() => setShowRecap(false)}
                className="rounded-full p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium text-right line-clamp-1">{event.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Total Payment</span>
                  <span className="font-bold text-primary">
                    {finalPrice > 0 ? `Rp ${finalPrice.toLocaleString('id-ID')}` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">
                    {paymentMethods.find(p => p.id === selectedPayment)?.name}
                  </span>
                </div>
              </div>

              {/* Payment Specific Instructions */}
              <div className="mb-6">
                {getPaymentDetails()}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRecap(false)}
                  className="flex-1 rounded-lg border py-2.5 font-medium hover:bg-muted"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="flex-1 rounded-lg bg-primary py-2.5 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
