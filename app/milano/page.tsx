import { MilanoNavbar } from "@/components/milano/navbar";
import { MilanoHero } from "@/components/milano/hero";
import { MilanoSpeakers } from "@/components/milano/speaker-list";
import { MilanoPricing } from "@/components/milano/pricing";
import { MilanoFooter } from "@/components/milano/footer";

export const metadata = {
  title: "Milano Clone | Digital Design Days Reimagined",
  description: "A high-fidelity clone of Digital Design Days Milano, built with Next.js 16 and Tailwind v4.",
};

export default function MilanoPage() {
  const milanoEvent = {
    id: 999,
    name: "Digital Design Days",
    tagline: "Join the most influential gathering of digital design leaders.",
    image: "https://milano.ddd.live/logo.png",
    date: "21-22-23 MAY 2025",
    time: "All Day",
    location: "Superstudio Village Milan",
    locationDetail: "Via Tortona, 27",
    description: "Three days of inspiration in the heart of Milan.",
    startDate: "2025-05-21T10:00:00",
  };

  return (
    <main className="bg-[#0E0E1E] min-h-screen selection:bg-[#00F5FF] selection:text-black">
      <MilanoNavbar event={milanoEvent} />
      <MilanoHero event={milanoEvent} />
      <MilanoSpeakers />
      <MilanoPricing />
      <MilanoFooter />
    </main>
  );
}
