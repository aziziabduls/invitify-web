import { Navbar } from "@/components/ui/navbar";
import NewHero from "@/components/ui/newhero";
import { EventCard } from "@/components/ui/event-card";
import { organizerService } from "@/services/organizer-service";
import Link from "next/link";

interface PageProps {
  params: Promise<{ domain: string }>;
}

export default async function OrganizerPage({ params }: PageProps) {
  const { domain } = await params;

  let organizer, events;
  let fetchError: string | null = null;

  try {
    const result = await organizerService.getByDomain(domain);
    organizer = result.organizer;
    events = result.events;
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Unknown error";
    console.error(`[domain page] Failed to load organizer "${domain}":`, fetchError);
  }

  if (fetchError || !organizer || !events) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <main className="flex flex-col">
          <Navbar />
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4 text-center px-4">
            <p className="text-6xl font-black tracking-tighter">404</p>
            <p className="text-xl font-semibold text-gray-700 dark:text-zinc-300">
              Organizer &quot;{domain}&quot; not found
            </p>
            <p className="text-sm text-gray-400 dark:text-zinc-500 max-w-sm">
              {fetchError ?? "No data returned from the server."}
            </p>
            <Link href="/" className="mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="flex flex-col">
        <Navbar />

        <div className="container mx-auto px-4 mt-8">
          <NewHero domain={domain} />

          <div className="container mx-auto px-4 mt-28 mb-24">
            <h2 className="text-6xl font-bold text-center text-primary mb-4 leading-tight tracking-tighter">
              {organizer.name}
            </h2>
            <p className="text-center text-gray-500 dark:text-zinc-400 mb-12 text-lg">
              {organizer.category} · {organizer.scope} · {organizer.format}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <EventCard
                    image={event.image}
                    name={event.name}
                    tagline={event.tagline}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
