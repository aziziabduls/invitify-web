"use client";

import { motion } from "framer-motion";
import { Rundown } from "@/lib/data";

interface MilanoRundownProps {
  rundowns: Rundown[];
  eventName: string;
}

export const MilanoRundown = ({ rundowns, eventName }: MilanoRundownProps) => {
  // If no rundowns, provide a fallback message
  if (!rundowns || rundowns.length === 0) {
    return (
      <section className="bg-background py-40">
        <div className="container mx-auto px-6">
          <div className="mb-20 flex items-end justify-between border-b border-border/50 pb-8">
            <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
              Rundown
            </h2>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              {eventName}
            </span>
          </div>
          <p className="text-muted-foreground font-bold uppercase tracking-widest">Schedule to be announced soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="program" className="bg-background py-40">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex items-end justify-between border-b border-border/50 pb-8">
          <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
            Rundown
          </h2>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground md:block">
            {eventName} • Full Schedule
          </span>
        </div>

        <div className="flex flex-col">
          {rundowns.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative flex cursor-pointer flex-col justify-between border-b border-border/50 py-12 transition-colors hover:bg-foreground/5 md:flex-row md:items-center"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00F5FF]">
                  {item.rundown_time}
                </span>
                <h4 className="text-4xl font-black italic uppercase tracking-tighter text-foreground transition-all group-hover:translate-x-4 sm:text-5xl cal-sans">
                  {item.title}
                </h4>
              </div>
              
              <div className="mt-4 flex flex-col items-start gap-4 md:mt-0 md:items-end">
                <p className="max-w-md text-sm font-bold uppercase tracking-widest text-muted-foreground md:text-right">
                  {item.description}
                </p>
                <div className="h-px w-0 bg-[#00F5FF] transition-all duration-500 group-hover:w-20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
