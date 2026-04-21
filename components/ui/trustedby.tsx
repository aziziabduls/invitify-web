
import React from 'react';
import { Target, Boxes, Briefcase, Award, Zap, Globe } from 'lucide-react';

const companies = [
    { name: "Acme Corp", icon: Boxes },
    { name: "Global Tech", icon: Globe },
    { name: "EventMasters", icon: Target },
    { name: "WeddingPro", icon: HeartIcon },
    { name: "CorpStyle", icon: Briefcase },
    { name: "WinnerZone", icon: Award },
];

function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}

export default function TrustedBy() {
    return (
        <section className="py-24 border-t border-border/50">
            <div className="container mx-auto px-4">
                {/* <div className="animate-fade-in-up stagger-1 flex flex-col items-start gap-4 mb-2">
                    <span className="cal-sans text-[16px] font-bold mb-0 tracking-tighter text-muted-foreground">
                        Our Network
                    </span>
                    <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
                        Trusted by Industry Leaders
                    </h2>
                </div>
                 */}

                <div className="animate-fade-in-up stagger-1 mb-16 space-y-4 text-left">
                    <span className="text-[16px] font-bold tracking-tighter text-muted-foreground">
                        Our Network
                    </span>
                    <h2 className="cal-sans text-5xl sm:text-7xl tracking-tighter text-foreground">
                        Trusted by Industry Leaders
                    </h2>
                </div>

                <div className="animate-fade-in-up stagger-2 flex flex-wrap justify-items-stretch gap-x-12 gap-y-12 opacity-30 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0">
                    {companies.map((company, index) => {
                        const Icon = company.icon;
                        return (
                            <div key={index} className="flex items-center gap-5 group cursor-pointer transition-transform hover:scale-105">
                                <div className="bg-background p-4 rounded-2xl shadow-soft border border-border/50 group-hover:shadow-layered transition-all">
                                    <Icon className="h-7 w-7 text-foreground" />
                                </div>
                                <span className="cal-sans text-lg tracking-tight text-foreground/80 group-hover:text-foreground">
                                    {company.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
