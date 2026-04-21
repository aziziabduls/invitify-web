"use client";

import { motion } from "framer-motion";
import { Event } from "@/lib/data";
import Image from "next/image";

interface MilanoBrandSectionProps {
  event: Event;
}

export const MilanoBrandSection = ({ event }: MilanoBrandSectionProps) => {
  if (!event.brands || event.brands.length === 0) return null;

  return (
    <section id="partners" className="bg-background py-40 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex items-end justify-between border-b border-border/50 pb-8">
          <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
            Partners
          </h2>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground md:block">
            Powering {event.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {event.brands.map((brand, index) => (
            <motion.div
              key={brand.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center border border-border/50 bg-card p-8 transition-all hover:bg-muted/50"
            >
              <div className="relative h-20 w-20 grayscale transition-all hover:grayscale-0 dark:brightness-200">
                <Image
                  src={brand.icon_url || "https://placeholder.com/150"}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
