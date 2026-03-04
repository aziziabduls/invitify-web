"use client";

import { Event } from "@/lib/data";
import { Calendar, MapPin, Share, Clock, Ticket, Users, FileText, Info, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import TrustedBy from "@/components/ui/trustedby";
import toast from "react-hot-toast";
import { Countdown } from "@/components/ui/countdown";

interface EventDetailViewProps {
  event: Event;
}

export default function EventDetailView({ event }: EventDetailViewProps) {
  const [activeTab, setActiveTab] = useState("tickets");

  const tabs = [
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "brands", label: "Brands", icon: Users },
    { id: "rundown", label: "Rundown", icon: FileText },
    { id: "about", label: "About", icon: Info },
    { id: "photos", label: "Photos", icon: ImageIcon },
  ];

  const handleTicketClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.status !== "active") {
      e.preventDefault();
      toast.error("Event is not active");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-square">
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

        {/* Bottom Section: Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8 overflow-x-auto pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary pb-1 -mb-[17px]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 min-h-[300px]">
            {activeTab === "tickets" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Get your tickets</h3>
                <p className="text-muted-foreground">Select your preferred ticket type below.</p>
                {/* Placeholder for tickets */}
                <div className="rounded-lg border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">General Admission</h4>
                      <p className="text-sm text-muted-foreground">Access to all areas</p>
                    </div>
                    <Link 
                      href={event.status === "active" ? `/events/${event.id}/payment` : "#"}
                      onClick={handleTicketClick}
                      className={`rounded-md px-4 py-2 text-primary-foreground ${
                        event.status === "active" 
                          ? "bg-primary hover:bg-primary/90" 
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {event.status === "active" ? "Get Now" : "Unavailable"}
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "brands" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Participating Brands</h3>
                {event.brands && event.brands.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {event.brands.map((brand) => (
                      <div key={brand.id} className="flex flex-col items-center justify-center rounded-lg border p-4 hover:shadow-sm">
                         {/* Placeholder for brand logo if null */}
                         <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            {brand.icon_url ? (
                              <Image 
                                src={brand.icon_url} 
                                alt={brand.name} 
                                width={64} 
                                height={64} 
                                className="rounded-full object-cover" 
                              />
                            ) : (
                              <Users className="h-8 w-8" />
                            )}
                         </div>
                         <p className="mt-2 text-center text-sm font-medium">{brand.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Brand list coming soon.</p>
                )}
              </div>
            )}
            {activeTab === "rundown" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Event Rundown</h3>
                {event.rundowns && event.rundowns.length > 0 ? (
                  <div className="space-y-4">
                    {event.rundowns
                      .sort((a, b) => new Date(a.rundown_date + 'T' + a.rundown_time).getTime() - new Date(b.rundown_date + 'T' + b.rundown_time).getTime())
                      .map((rundown) => (
                      <div key={rundown.id} className="flex gap-4 rounded-lg border p-4">
                        <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 px-4 py-2 text-primary">
                          <Clock className="mb-1 h-5 w-5" />
                          <span className="text-sm font-bold">{rundown.rundown_time.slice(0, 5)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{rundown.title}</h4>
                          <p className="text-sm text-muted-foreground">{rundown.description}</p>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {new Date(rundown.rundown_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Schedule will be announced shortly.</p>
                )}
              </div>
            )}
            {activeTab === "about" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">About the Event</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              </div>
            )}
            {activeTab === "photos" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                       {/* Placeholder for gallery */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <TrustedBy />
      </main>
    </div>
  );
}
