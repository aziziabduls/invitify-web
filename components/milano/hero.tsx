"use client";

import { motion } from "framer-motion";
import { Event } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface MilanoHeroProps {
  event: Event;
}

export const MilanoHero = ({ event }: MilanoHeroProps) => {
  // Split name into up to 3 parts for the stacked effect
  const nameParts = event.name.split(" ");
  const displayParts = [
    nameParts[0] || "",
    nameParts.slice(1, nameParts.length - 1).join(" ") || nameParts[1] || "",
    nameParts[nameParts.length - 1] && nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""
  ].filter(p => p !== "");

  // If only one part, reuse it for the stroke effect
  const part1 = displayParts[0] || event.name;
  const part2 = displayParts[1] || event.name;
  const part3 = displayParts[2] || "";

  const formattedDate = new Date(event.startDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0E0E1E] pt-40 pb-20 dark">
      {/* Mesh Gradient Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-[#00F5FF]/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-[#BC13FE]/10 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        {/* Marquee Header */}
        <div className="mb-12 overflow-hidden border-y border-white/10 py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="mx-8 text-[12px] font-black uppercase tracking-[0.4em] text-[#00F5FF]">
                {formattedDate} • {event.location.toUpperCase()} • DISCOVER AMAZING EVENTS •
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-start gap-8 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full"
          >


            <h1 className="leading-[0.85] text-white font-cal text-center lg:text-left">
              <span className="block text-7xl font-black italic tracking-tighter uppercase sm:text-9xl lg:text-[8rem]">
                {part1}
              </span>
              <span className="block text-7xl font-black italic tracking-tighter uppercase sm:text-9xl lg:text-[8rem] text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>
                {part2}
              </span>
              {part3 && (
                <span className="block text-7xl font-black italic tracking-tighter uppercase sm:text-9xl lg:text-[8rem]">
                  {part3}
                </span>
              )}
            </h1>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {/* Rounded Image Behind Title */}
            {/* <div className="absolute left-1/2 top-1/2 -z-10 h-full w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[80px] opacity-40 blur-[2px]">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-[#0E0E1E]/40" />
            </div> */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold mb-0 uppercase tracking-tighter text-white">The Event</h3>
              <p className="max-w-xs text-md leading-relaxed text-white/50 line-clamp-3">
                {event.tagline || event.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold mb-0 uppercase tracking-tighter text-white">Location</h3>

              <p className="max-w-xs text-md leading-relaxed text-white/50">
                {event.location}<br />
                {event.locationDetail && (
                  <Link href={event.locationDetail} target="_blank" className="flex items-center gap-2">
                    <span className="opacity-60">Open in Maps</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M17 7 7 17" /></svg>
                  </Link>
                )}
              </p>


            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-end justify-start lg:justify-end"
            >
              <div className="text-[120px] font-black italic leading-none tracking-tighter text-white/5">
                &apos;{new Date(event.startDate).getFullYear().toString().slice(-2)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section >
  );
};
