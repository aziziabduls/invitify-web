
// import Hero from "@/components/ui/hero";
import { Navbar } from "@/components/ui/navbar";
import NewHero from "@/components/ui/newhero";
import TrustedBy from "@/components/ui/trustedby";
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
          {/* event list */}
          <div className="container mx-auto px-4 mt-28 mb-0">
            <h2 className="text-6xl font-bold text-center text-primary mb-12 leading-tight tracking-tighter">
              Upcoming Events
            </h2>
            {/* sort event free and paid */}
            <div className="flex justify-center mb-12 ">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground px-4 py-2 rounded-md">
                All Events
              </button>
              <button className="ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground active:bg-secondary/90 active:text-secondary-foreground px-4 py-2 rounded-md">
                Free Events
              </button>
              <button className="ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground active:bg-secondary/90 active:text-secondary-foreground px-4 py-2 rounded-md">
                Paid Events
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <EventCard
                    image={event.image}
                    name={event.name}
                    tagline={event.tagline}
                    is_free={event.is_free}
                  />
                </Link>
              ))}
            </div>
          </div>
          <TrustedBy />
        </div>
      </main>
    </div>
  );
}
