
// import Hero from "@/components/ui/hero";
import { Navbar } from "@/components/ui/navbar";
import NewHero from "@/components/ui/newhero";
import TrustedBy from "@/components/ui/trustedby";
import { EventCatalogue } from "@/components/ui/event-catalogue";
import { EventCard } from "@/components/ui/event-card";
// import { events } from "@/lib/data";
import { Event } from "@/lib/data";
import Link from "next/link";
import { eventService } from "@/services/event-service";

export default async function Home() {
  let events: Event[] = [];
  try {
    events = await eventService.getAll();
  } catch (error) {
    console.error("Failed to load events", error);
    // Fallback to empty list or handle error UI
  }

  return (
    <div className="min-h-screen bg-background font-sans">

      <main className="flex flex-col">
        <Navbar />

        <div className="container mx-auto px-4 mt-8"> 
          {/* <Hero /> */}
          <NewHero />
          
          <EventCatalogue initialEvents={events} />

          <div className="mt-40">
            <TrustedBy />
          </div>
        </div>
      </main>
    </div>
  );
}
