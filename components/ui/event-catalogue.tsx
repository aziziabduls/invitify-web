"use client";

import { useState } from "react";
import { Event } from "@/lib/data";
import { EventCard } from "@/components/ui/event-card";
import Link from "next/link";

interface EventCatalogueProps {
  initialEvents: Event[];
}

type FilterType = "all" | "free" | "paid";

export function EventCatalogue({ initialEvents }: EventCatalogueProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredEvents = initialEvents.filter((event) => {
    if (filter === "all") return true;
    if (filter === "free") return event.is_free;
    if (filter === "paid") return !event.is_free;
    return true;
  });

  return (
    <div className="container mx-auto px-4 mt-28 mb-0">
      <div className="animate-fade-in-up stagger-1 mb-16 space-y-4 text-center">
        <span className="text-[16px] font-bold tracking-tighter text-muted-foreground">
          The Catalog
        </span>
        <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
          Upcoming Events
        </h2>
      </div>

      {/* Filter Pills */}
      <div className="animate-fade-in-up stagger-2 flex justify-center gap-3 mb-16">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-8 py-3 text-[15px] font-bold tracking-tighter transition-all active:scale-95 ${filter === "all"
            ? "bg-primary text-primary-foreground shadow-layered"
            : "bg-background text-muted-foreground border border-border shadow-soft hover:text-foreground hover:bg-secondary"
            }`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilter("free")}
          className={`rounded-full px-8 py-3 text-[15px] font-bold tracking-tighter transition-all active:scale-95 ${filter === "free"
            ? "bg-primary text-primary-foreground shadow-layered"
            : "bg-background text-muted-foreground border border-border shadow-soft hover:text-foreground hover:bg-secondary"
            }`}
        >
          Free
        </button>
        <button
          onClick={() => setFilter("paid")}
          className={`rounded-full px-8 py-3 text-[15px] font-bold tracking-tighter transition-all active:scale-95 ${filter === "paid"
            ? "bg-primary text-primary-foreground shadow-layered"
            : "bg-background text-muted-foreground border border-border shadow-soft hover:text-foreground hover:bg-secondary"
            }`}
        >
          Paid
        </button>
      </div>

      <div className="animate-fade-in-up stagger-3 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 min-h-[400px]">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCard
                image={event.image}
                name={event.name}
                tagline={event.tagline}
                is_free={event.is_free}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full flex h-60 items-center justify-center rounded-[24px] border-2 border-dashed border-border text-muted-foreground">
            <p className="font-medium">No events found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
