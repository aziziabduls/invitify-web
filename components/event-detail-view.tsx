"use client";

import { Event } from "@/lib/data";
import { Calendar, MapPin, Share, Clock, Ticket, Users, FileText, Info, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MilanoNavbar } from "@/components/milano/navbar";
import { MilanoRundown } from "@/components/milano/rundown";
import { MilanoTicketSection } from "@/components/milano/ticket-section";
import { MilanoBrandSection } from "@/components/milano/brand-section";
import { MilanoAboutSection } from "@/components/milano/about-section";
import TrustedBy from "@/components/ui/trustedby";
import toast from "react-hot-toast";
import { Countdown } from "@/components/ui/countdown";
import { EventCatalogue } from "./ui/event-catalogue";


interface EventDetailViewProps {
  event: Event;
  allEvents: Event[];
}

export default function EventDetailView({ event, allEvents }: EventDetailViewProps) {
  const events = allEvents;

  const handleTicketClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.status !== "active") {
      e.preventDefault();
      toast.error("Event is not active");
    }
  };



  return (
    <div className="min-h-screen bg-background font-sans">
      <MilanoNavbar event={event} transparentTop={false} />
      <main className="container mx-auto px-4 py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-square">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                The event starts in{' '}
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full w-fit mt-1">
                  <CheckCircle2 size={16} className="fill-green-600 text-white dark:fill-green-400 dark:text-black" />
                  <Countdown targetDate={event.startDate} />
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
                <Share className="h-4 w-4" />
                Share
              </button>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              {event.name}
            </h1>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{event.date}</h3>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{event.location}</h3>
                  {event.locationDetail && (
                    <Link href={event.locationDetail} target="_blank" className="text-blue-600 dark:text-blue-400">
                      <p>Open in Maps</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections: Unified Milano Experience */}
        <div className="mt-20">
          <MilanoRundown 
            rundowns={event.rundowns || []} 
            eventName={event.name} 
          />
          <MilanoTicketSection event={event} />
          <MilanoBrandSection event={event} />
          <MilanoAboutSection event={event} />
        </div>

        <div className="mt-20">
          <EventCatalogue initialEvents={events} />
          <TrustedBy />
        </div>
      </main>
    </div>
  );
}
