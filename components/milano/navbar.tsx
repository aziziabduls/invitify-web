"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/lib/data";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface MilanoNavbarProps {
  event?: Event;
  transparentTop?: boolean;
  isCheckout?: boolean;
}

export const MilanoNavbar = ({ event, transparentTop = true, isCheckout = false }: MilanoNavbarProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ticketLabel = event?.is_free ? "Get Ticket For Free" : "Buy Tickets";
  const ticketHref = event ? `/events/${event.id}/payment` : "#tickets";

  const showThemed = !transparentTop || isScrolled;

  const navClasses = showThemed
    ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-4"
    : "bg-transparent border-b border-transparent py-6";

  const textClasses = showThemed
    ? "text-foreground"
    : "text-white";

  const mutedTextClasses = showThemed
    ? "text-muted-foreground"
    : "text-white/60";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${navClasses}`}
    >
      <div className="flex items-center gap-12">
        <Link href="/" className={`text-2xl font-bold tracking-tighter cal-sans transition-colors ${textClasses}`}>
          Invitify<span className="text-[#00F5FF]">.</span>
        </Link>

        {!isCheckout && (
          <div className={`hidden md:flex items-center gap-8 text-[15px] font-normal tracking-tighter transition-colors ${textClasses}`}>
            <Link href="#program" className="hover:text-[#00F5FF] transition-colors">Rundown</Link>
            <Link href="#tickets" className="hover:text-[#00F5FF] transition-colors">Tickets</Link>
            <Link href="#partners" className="hover:text-[#00F5FF] transition-colors">Partners</Link>
            <Link href="#experience" className="hover:text-[#00F5FF] transition-colors">Experience</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`rounded-full border p-3 transition-all hover:bg-secondary active:scale-95 ${showThemed ? 'border-border/50 text-foreground' : 'border-white/20 text-white'}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} className="font-bold" /> : <Moon size={14} className="font-bold" />}
          </button>
        )}

        {!isCheckout && (
          <Link
            href={ticketHref}
            className={`rounded-full px-8 py-3 text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${showThemed
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-white text-black hover:bg-[#00F5FF]'
              }`}
          >
            {ticketLabel}
          </Link>
        )}
      </div>
    </motion.nav>
  );
};
