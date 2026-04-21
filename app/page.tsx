import { MilanoNavbar } from "@/components/milano/navbar";
import { MilanoHero } from "@/components/milano/hero";
import { MilanoRundown } from "@/components/milano/rundown";
import { MilanoTicketSection } from "@/components/milano/ticket-section";
import { MilanoBrandSection } from "@/components/milano/brand-section";
import { MilanoAboutSection } from "@/components/milano/about-section";
import { MilanoFooter } from "@/components/milano/footer";
import { EventCatalogue } from "@/components/ui/event-catalogue";
import TrustedBy from "@/components/ui/trustedby";
import { eventService } from "@/services/event-service";
import { Event } from "@/lib/data";

export const metadata = {
  title: "Invitify | Digital Event Experiences",
  description: "Discover and join the world's most innovative digital design events.",
};

export default async function Home() {
  let events: Event[] = [];
  try {
    events = await eventService.getAll();
  } catch (error) {
    console.error("Failed to load events", error);
  }

  const featuredEvent = events.length > 0 
    ? events[Math.floor(Math.random() * events.length)] 
    : null;

  return (
    <main className="bg-background min-h-screen selection:bg-[#00F5FF] selection:text-black scroll-smooth">
      <MilanoNavbar event={featuredEvent || undefined} />
      
      {/* Hero & Event Content - Dark Theme Sections */}
      {featuredEvent && <MilanoHero event={featuredEvent} />}
      {featuredEvent && (
        <>
          <MilanoRundown 
            rundowns={featuredEvent.rundowns || []} 
            eventName={featuredEvent.name} 
          />
          <MilanoTicketSection event={featuredEvent} />
          <MilanoBrandSection event={featuredEvent} />
          <MilanoAboutSection event={featuredEvent} />
        </>
      )}

      {/* Event Catalogue & Trusted By - Harmonized with System Theme */}
      <div className="bg-background">
        <section className="py-20">
          <EventCatalogue initialEvents={events} />
        </section>
        
        <section className="border-t border-border/50 py-20">
          <TrustedBy />
        </section>
      </div>

      <MilanoFooter />
    </main>
  );
}
