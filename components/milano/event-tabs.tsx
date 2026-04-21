"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Users, FileText, Info, Image as ImageIcon, Clock, Check } from "lucide-react";
import { Event, Rundown, Brand } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface MilanoEventTabsProps {
  event: Event;
}

export const MilanoEventTabs = ({ event }: MilanoEventTabsProps) => {
  const [activeTab, setActiveTab] = useState("rundown");

  const tabs = [
    { id: "rundown", label: "Rundown", icon: FileText },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "brands", label: "Brands", icon: Users },
    { id: "about", label: "About", icon: Info },
    // { id: "photos", label: "Photos", icon: ImageIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "rundown":
        return (
          <div className="flex flex-col">
            {event.rundowns && event.rundowns.length > 0 ? (
              event.rundowns
                .sort((a, b) => new Date(a.rundown_date + 'T' + a.rundown_time).getTime() - new Date(b.rundown_date + 'T' + b.rundown_time).getTime())
                .map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col justify-between border-b border-white/5 py-12 md:flex-row md:items-center"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00F5FF]">
                        {item.rundown_time}
                      </span>
                      <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white sm:text-5xl">
                        {item.title}
                      </h4>
                    </div>
                    <div className="mt-4 flex flex-col items-start gap-4 md:mt-0 md:items-end text-right">
                      <p className="max-w-md text-sm font-bold uppercase tracking-widest text-white/40">
                        {item.description}
                      </p>
                      <div className="h-px w-0 bg-[#00F5FF] transition-all duration-500 group-hover:w-20" />
                    </div>
                  </motion.div>
                ))
            ) : (
              <p className="py-20 text-center text-xl font-bold uppercase italic text-white/20">Schedule to be announced</p>
            )}
          </div>
        );

      case "tickets":
        return (
          <div className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group border-2 border-white/10 p-12 transition-all hover:border-[#00F5FF]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00F5FF]">Pass</span>
                <span className="text-4xl font-black italic text-white">{event.is_free ? "FREE" : `${event.currency || "$"}${event.price}`}</span>
              </div>
              <h3 className="mt-8 text-6xl font-black italic uppercase tracking-tighter text-white">General Pass</h3>
              <ul className="mt-12 space-y-4">
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60">
                  <Check className="h-4 w-4 text-[#00F5FF]" /> Full access to {event.name}
                </li>
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60">
                  <Check className="h-4 w-4 text-[#00F5FF]" /> Networking opportunities
                </li>
              </ul>
              <Link
                href={event.status === "active" ? `/events/${event.id}/payment` : "#"}
                className={`mt-16 block w-full py-6 text-center text-[12px] font-black uppercase tracking-[0.4em] transition-all ${
                  event.status === "active" ? "bg-[#00F5FF] text-black hover:scale-[1.02]" : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {event.status === "active" ? "Get Ticket Now" : "Sold Out"}
              </Link>
            </motion.div>
          </div>
        );

      case "brands":
        return (
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
            {event.brands && event.brands.length > 0 ? (
              event.brands.map((brand, index) => (
                <motion.div
                  key={brand.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center justify-center border border-white/5 bg-white/2 p-8 transition-all hover:bg-white/5"
                >
                  <div className="relative h-20 w-20 grayscale transition-all hover:grayscale-0">
                    <Image
                      src={brand.icon_url || "https://placeholder.com/150"}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-white/40">
                    {brand.name}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full py-20 text-center text-xl font-bold uppercase italic text-white/20">Partners to be announced</p>
            )}
          </div>
        );

      case "about":
        return (
          <div className="max-w-4xl py-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black italic uppercase tracking-tighter text-white sm:text-7xl"
            >
              The <span className="text-[#00F5FF]">Concept</span>.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-12 text-xl font-medium leading-relaxed text-white/60"
            >
              {event.description}
            </motion.p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[#0E0E1E] py-40">
      <div className="container mx-auto px-6">
        {/* Tab Navigation */}
        <div className="mb-12 flex flex-wrap gap-8 border-b border-white/10 pb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all ${
                  activeTab === tab.id ? "text-[#00F5FF]" : "text-white/30 hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full transition-all ${activeTab === tab.id ? "bg-[#00F5FF] scale-100" : "bg-transparent scale-0"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
