"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Event } from "@/lib/data";
import Link from "next/link";

interface MilanoTicketSectionProps {
  event: Event;
}

export const MilanoTicketSection = ({ event }: MilanoTicketSectionProps) => {
  return (
    <section id="tickets" className="bg-background py-40 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex items-end justify-between border-b border-border/50 pb-8">
          <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
            Tickets
          </h2>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground md:block">
            Secure your spot • {event.name}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group border-2 border-border/50 p-12 transition-all hover:border-[#00F5FF] bg-card text-card-foreground"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Pass</span>
              <span className="text-4xl font-black italic text-foreground cal-sans">
                {event.is_free ? "FREE" : `${event.currency || "$"}${Number(event.price).toLocaleString()}`}
              </span>
            </div>
            <h3 className="mt-8 text-6xl font-black italic uppercase tracking-tighter text-foreground cal-sans">General Pass</h3>
            <ul className="mt-12 space-y-4">
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest ">
                <Check className="h-4 w-4 text-[#00F5FF]" /> Full access to {event.name}
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest ">
                <Check className="h-4 w-4 text-[#00F5FF]" /> Networking opportunities
              </li>
            </ul>
            <Link
              href={event.status === "active" ? `/events/${event.id}/payment` : "#"}
              className={`mt-16 block w-full py-6 text-center text-[12px] font-black uppercase tracking-[0.4em] transition-all ${event.status === "active" ? "bg-[#00F5FF] text-black hover:scale-[1.02]" : "bg-muted  cursor-not-allowed"
                }`}
            >
              {event.status === "active" ? "Get Ticket Now" : "Sold Out"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
