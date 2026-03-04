// import { events } from "@/lib/data";
import CheckoutView from "@/components/checkout-view";
import { notFound } from "next/navigation";
import { eventService } from "@/services/event-service";

export const dynamic = 'force-dynamic';

// export function generateStaticParams() {
//   return events.map((event) => ({
//     id: event.id.toString(),
//   }));
// }

export default async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let event = null;
  try {
    event = await eventService.getById(id);
  } catch (error) {
    console.error(`Failed to fetch event ${id} for payment`, error);
  }

  if (!event) {
    notFound();
  }

  return <CheckoutView event={event} />;
}
