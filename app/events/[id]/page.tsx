// import { events } from "@/lib/data";
import EventDetailView from "@/components/event-detail-view";
import { notFound } from "next/navigation";
import { eventService } from "@/services/event-service";

import { Event } from "@/lib/data";

export const dynamic = 'force-dynamic';

// Since we are using an API service, we might not want to use generateStaticParams 
// unless we fetch all IDs from the API during build time.
// For now, I will comment it out or leave it to fetch from API if needed for SSG.
// But with 'force-dynamic', generateStaticParams is not strictly needed for runtime pages.

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("events/[id] params:", { id });
  
  let event = null;
  let allEvents: Event[] = [];
  try {
    const [eventData, allEventsData] = await Promise.all([
      eventService.getById(id),
      eventService.getAll()
    ]);
    event = eventData;
    allEvents = allEventsData;
  } catch (error) {
    console.error(`Failed to fetch event data for ${id}`, error);
  }

  if (!event) {
    notFound();
  }

  return <EventDetailView event={event} allEvents={allEvents} />;
}
