"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Moon, Menu, X, ChevronDown, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"

const resources = [
    {
        title: "Guidebook",
        href: "/resources/guidebook",
        description: "Everything you need to know about the expo.",
    },
    {
        title: "Sponsorship",
        href: "/resources/sponsorship",
        description: "Partner with us for the 2026 event.",
    },
    {
        title: "Media Kit",
        href: "/resources/media-kit",
        description: "Assets and guidelines for press and partners.",
    },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
            <div className="mx-auto flex py-2 max-w-full items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 z-50 relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00A3FF]">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                        >
                            <path
                                d="M16 8C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16C17.1046 16 18 15.1046 18 14V10C18 8.89543 17.1046 8 16 8Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M8 8C6.89543 8 6 8.89543 6 10V14C6 15.1046 6.89543 16 8 16C9.10457 16 10 15.1046 10 14V10C10 8.89543 9.10457 8 8 8Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M10 12H14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">
                            Invitify
                        </span>
                        <span className="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">
                            Event Expo
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <Link
                                href="/"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/brands"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Brands
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/rundown"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Rundown
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/programs"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Programs
                            </Link>
                        </li>
                        <li>
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="h-auto bg-transparent px-4 py-2 text-[15px] font-medium text-zinc-500 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 data-[state=open]:text-zinc-900 dark:data-[state=open]:text-zinc-100">
                                            Resources
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-[240px] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
                                                {resources.map((item) => (
                                                    <li key={item.title}>
                                                        <Link
                                                            href={item.href}
                                                            className="block rounded-md px-2 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </li>
                        <li>
                            <Link
                                href="/partners"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Partners
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/news"
                                className="px-4 py-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                News
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* <Link
                    // new tab window to localhost:3001
                        href="http://localhost:3001"
                        target="_blank"
                        className="hidden sm:inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-[15px] font-bold text-zinc-900 transition-all hover:bg-zinc-50 dark:bg-black dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
                    >
                        Create Event
                    </Link> */}
                    <Link
                        href="http://localhost:3001"
                        target="_blank"
                        className="hidden sm:inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-[15px] font-bold text-white transition-all hover:bg-zinc-800 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Create Event
                    </Link>

                    {/* <Link
                        href="/ticket"
                        className="hidden sm:inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-[15px] font-bold text-white transition-all hover:bg-zinc-800 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Get Ticket
                    </Link> */}

                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-half-2"><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /></svg>
                    </button>

                    <button
                        className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors z-50 relative"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-[20px] w-[20px]" /> : <Menu className="h-[20px] w-[20px]" />}
                    </button>

                    {/* Change Language (Desktop) */}
                    {/* <button
                        className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Change Language"
                    >
                        <Globe className="h-[20px] w-[20px]" />
                    </button> */}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-black z-40 flex flex-col pt-24 px-6 overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                    <nav className="flex flex-col gap-4">
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Home</Link>
                        <Link href="/brands" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Brands</Link>
                        <Link href="/rundown" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Rundown</Link>
                        <Link href="/programs" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Programs</Link>
                        <div className="py-2 border-b border-zinc-100 dark:border-zinc-800">
                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Resources</div>
                            <div className="pl-4 flex flex-col gap-2">
                                {resources.map(item => (
                                    <Link key={item.title} href={item.href} onClick={() => setIsOpen(false)} className="text-lg text-zinc-600 dark:text-zinc-400 block py-1">
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/partners" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Partners</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">Contact</Link>
                        <Link href="/news" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 py-2 border-b border-zinc-100 dark:border-zinc-800">News</Link>
                    </nav>
                    <div className="mt-8 flex flex-col gap-4 pb-8">
                        <Link
                            href="/book"
                            onClick={() => setIsOpen(false)}
                            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-lg font-bold text-zinc-900 transition-all hover:bg-zinc-50 dark:bg-black dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
                        >
                            Book Space
                        </Link>
                        <Link
                            href="/ticket"
                            onClick={() => setIsOpen(false)}
                            className="flex h-12 items-center justify-center rounded-full bg-black px-6 text-lg font-bold text-white transition-all hover:bg-zinc-800 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            Get Ticket
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
