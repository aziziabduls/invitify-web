"use client";

import { motion } from "framer-motion";
import { Event } from "@/lib/data";

interface MilanoAboutSectionProps {
  event: Event;
}

export const MilanoAboutSection = ({ event }: MilanoAboutSectionProps) => {
  return (
    <section id="experience" className="bg-background py-40 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex items-end justify-between border-b border-border/50 pb-8">
          <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
            Experience
          </h2>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground md:block">
            The Vision • {event.name}
          </span>
        </div>

        <div className="max-w-4xl">
          {/* <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black italic uppercase tracking-tighter text-white sm:text-7xl cal-sans"
          >
            The <span className="text-[#00F5FF]">Concept</span>.
          </motion.h3> */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-12 text-xl font-medium leading-relaxed text-muted-foreground"
          >
            {event.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
