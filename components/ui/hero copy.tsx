
import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pause, MessageCircle } from 'lucide-react';
import { Navbar } from './navbar';

export default function Hero() {
    return (
        <div className="relative min-h-[90vh] w-full bg-white dark:bg-black overflow-hidden font-sans transition-colors duration-300">
            {/* <Navbar /> */}

            {/* Container for the specific distributed layout */}
            <div className="container mx-auto px-4 py-8 h-full relative flex flex-col justify-between min-h-[90vh]">

                {/* TOP ROW */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full h-fit relative z-20">

                    {/* Top Left: Status */}
                    <div className="flex flex-col gap-2 mt-20 mb-8 md:mb-0">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Adventure begins in:</span>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full w-fit">
                            <CheckCircle2 size={16} className="fill-green-600 text-white dark:fill-green-400 dark:text-black" />
                            <span className="font-semibold text-sm">Completed</span>
                        </div>
                    </div>

                    {/* Top Right: Info Card */}
                    <div className='flex flex-col'>
                        <div className="bg-white dark:bg-zinc-900 mt-10 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-zinc-800 max-w-sm relative z-20 transition-colors">
                            <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-lg mb-2">Your Gateway to Epic Adventures Awaits!</h3>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                                Get free access to Indonesia's biggest outing showcase: hundreds of destinations, expert event organizers, and exclusive travel deals all in one place.
                            </p>
                            <button className="text-black dark:text-white font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Get Your Free Ticket <ArrowRight size={16} />
                            </button>
                        </div>
                        {/* Carousel Controls */}
                        <div className="flex gap-1 self-end mt-2">
                            <button className="h-10 w-10 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900 transition-all">
                                <ChevronLeft size={18} className="text-gray-600 dark:text-zinc-400" />
                            </button>
                            <button className="h-10 w-10 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900 transition-all">
                                <ChevronRight size={18} className="text-gray-600 dark:text-zinc-400" />
                            </button>
                            <button className="h-10 w-10 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900 transition-all">
                                <Pause size={16} className="text-gray-600 dark:text-zinc-400" />
                            </button>
                        </div>
                    </div>
                </div>


                {/* MIDDLE / MAIN VISUAL AREA */}
                {/* Responsive Image Positioning: Relative on mobile (in flow), Absolute on desktop (centered) */}
                {/* <div className="relative md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-4xl opacity-100 pointer-events-none z-10 my-8 md:my-0">

                    <div className="relative aspect-square w-full md:w-[100%] md:-ml-[0%]">
                        <Image
                            src="/travel_landmarks_globe_3d_trnsprnt.png"
                            alt="Global Landmarks and Airplane"
                            fill
                            className="object-contain bg-transparent "
                            priority
                        />
                    </div>
                </div> */}

                {/* BOTTOM ROW */}
                <div className="flex flex-col md:flex-row justify-between items-end w-full mt-auto relative z-20">

                    {/* Bottom Left: Headline & Actions */}
                    <div className="max-w-xl flex flex-col gap-6 w-full md:w-auto">
                        <button className="w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                            Space is still available for exhibitors <ArrowRight size={14} />
                        </button>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black dark:text-white leading-tight tracking-tight transition-colors">
                            Explore Hundred<br />
                            of Adventures<br />
                            at <span className="text-[#3b82f6]">IOE 2025</span>
                        </h1>

                        <p className="text-gray-600 dark:text-zinc-400 text-lg max-w-md transition-colors">
                            Connect with top event organizers, discover amazing destinations, grab exclusive travel deals, and find everything you need for your next unforgettable outing.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center pt-2 w-full">
                            <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors flex-1 sm:flex-none justify-center">
                                Get free ticket
                            </button>
                            <button className="px-8 py-4 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex-1 sm:flex-none justify-center">
                                I want to exhibit
                            </button>
                        </div>
                    </div>

                    {/* Bottom Right: Event Info */}
                    <div className="flex flex-col items-end gap-8 mt-12 md:mt-0 w-full md:w-auto">


                        <div className="text-right flex flex-col items-end w-full">
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter transition-colors">14-16</span>
                                <span className="bg-[#3b82f6] text-white text-4xl md:text-6xl font-black px-4 py-1 rounded-lg transform -rotate-2 mt-[-10px] z-10">
                                    NOV
                                </span>
                                <span className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter -mt-4 transition-colors">2025</span>
                            </div>
                            <div className="mt-4 text-gray-900 dark:text-zinc-200 font-bold max-w-[200px] text-right transition-colors">
                                Jakarta International Convention Center (JICC) Senayan Hall A
                            </div>
                        </div>
                    </div>

                </div>

                {/* Floating WhatsApp */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button className="bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                        <MessageCircle size={28} className="text-white fill-white" />
                    </button>
                </div>

            </div>
        </div>
    );
}
