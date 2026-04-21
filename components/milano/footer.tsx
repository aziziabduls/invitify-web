"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export const MilanoFooter = () => {
  return (
    <footer className="bg-background pt-40 pb-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 border-b border-border/50 pb-20">
          <div>
            <h2 className="max-w-md text-6xl font-black italic uppercase tracking-tighter text-foreground sm:text-8xl">
              Don&apos;t <span className="text-[#00F5FF]">miss</span> anything.
            </h2>
            <p className="mt-8 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
              Subscribe to our newsletter to receive updates on speakers, program, and exclusive ticket drops.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-12">
            <div className="group relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL"
                className="w-full border-b-2 border-border/50 bg-transparent py-4 text-2xl font-black italic uppercase tracking-tighter text-foreground outline-none transition-colors focus:border-[#00F5FF]"
              />
              <button className="absolute right-0 bottom-4 text-foreground hover:text-[#00F5FF] transition-all group-hover:translate-x-2">
                <ArrowRight className="h-8 w-8" />
              </button>
            </div>

            <div className="flex items-center gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a>
          </div>
          <p>© 2025 Digital Design Days. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
