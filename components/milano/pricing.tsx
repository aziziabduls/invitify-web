"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Experience",
    price: "€299",
    description: "The essential DDD experience. Access to all main stage talks.",
    features: ["All Main Stage Talks", "Social Gathering", "Digital Toolbox", "Certificate"],
    highlight: false,
  },
  {
    name: "Business",
    price: "€599",
    description: "For professionals seeking networking and exclusive insights.",
    features: ["Everything in Experience", "Business Lounge Access", "Network App Priority", "VIP Afterparty"],
    highlight: true,
  },
  {
    name: "Full Pass",
    price: "€899",
    description: "The complete immersion. Workshops and executive breakfast included.",
    features: ["Everything in Business", "All Workshops", "Executive Breakfast", "Lifetime Recordings"],
    highlight: false,
  },
];

export const MilanoPricing = () => {
  return (
    <section className="bg-white py-40">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-black sm:text-8xl">
            Passes
          </h2>
          <p className="mt-4 max-w-lg text-lg text-black/60">
            Choose your journey. From inspiration to deep-dives, we have a pass for every designer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`flex flex-col justify-between border-2 p-12 transition-all hover:-rotate-1 ${
                plan.highlight 
                ? "border-black bg-black text-white" 
                : "border-black/10 bg-[#F8F9FA] text-black"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    {plan.name}
                  </span>
                  {plan.highlight && (
                    <span className="rounded-full bg-[#00F5FF] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-black">
                      Popular
                    </span>
                  )}
                </div>
                
                <div className="mt-8">
                  <span className="text-6xl font-black italic tracking-tighter">{plan.price}</span>
                </div>
                
                <p className={`mt-6 text-sm leading-relaxed ${plan.highlight ? "text-white/60" : "text-black/60"}`}>
                  {plan.description}
                </p>

                <ul className="mt-12 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                      <Check className={`h-4 w-4 ${plan.highlight ? "text-[#00F5FF]" : "text-black"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`mt-16 w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-[0.98] ${
                plan.highlight 
                ? "bg-[#00F5FF] text-black" 
                : "bg-black text-white"
              }`}>
                Select Pass
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
