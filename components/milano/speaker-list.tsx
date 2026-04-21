"use client";

import { motion } from "framer-motion";

const speakers = [
  { name: "Jessica Walsh", role: "Founder, &Walsh", tag: "Creative Direction" },
  { name: "Tobias van Schneider", role: "Co-founder, Semplice", tag: "Product Design" },
  { name: "Malika Favre", role: "Artist & Illustrator", tag: "Visual Art" },
  { name: "Eddie Opara", role: "Partner, Pentagram", tag: "Identity" },
  { name: "Gavin Strange", role: "Creative Director, Aardman", tag: "Animation" },
];

export const MilanoSpeakers = () => {
  return (
    <section className="bg-[#0E0E1E] py-40">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex items-end justify-between border-b border-white/10 pb-8">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white sm:text-8xl">
            Speakers
          </h2>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 md:block">
            Founders / Directors / Artists
          </span>
        </div>

        <div className="flex flex-col">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative flex cursor-pointer flex-col justify-between border-b border-white/5 py-12 transition-colors hover:bg-white/2 md:flex-row md:items-center"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00F5FF]">
                  {speaker.tag}
                </span>
                <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white transition-all group-hover:translate-x-4 sm:text-6xl">
                  {speaker.name}
                </h4>
              </div>
              
              <div className="mt-4 flex flex-col items-start gap-4 md:mt-0 md:items-end">
                <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                  {speaker.role}
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
