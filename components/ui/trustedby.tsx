
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
        <section className="py-12  border-y border-border/50">
            <div className="container mx-auto px-4">
                <p className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl text-black dark:text-white transition-colors line-clamp-3 text-center mb-14">
                    Trusted by Industry Leaders
                </p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-12 md:gap-x-16 grayscale opacity-70 hover:opacity-100 transition-opacity duration-300">
                    {companies.map((company, index) => {
                        const Icon = company.icon;
                        return (
                            <div key={index} className="flex items-center gap-2 group cursor-pointer">
                                <div className="bg-background p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                                    <Icon className="h-6 w-6 text-foreground" />
                                </div>
                                <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
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
