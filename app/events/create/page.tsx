"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Calendar, Clock, MapPin, Upload, Image as ImageIcon, Type, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    date: "",
    time: "",
    location: "",
    locationDetail: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert("Event created successfully! (This is a demo)");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Create New Event</h1>
          <p className="mt-2 text-muted-foreground">
            Fill in the details below to register a new event on Invitify.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 flex items-center text-xl font-semibold">
              <Type className="mr-2 h-5 w-5 text-primary" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Event Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Tech Conference 2024"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tagline" className="text-sm font-medium">Tagline</label>
                <input
                  id="tagline"
                  name="tagline"
                  type="text"
                  required
                  placeholder="e.g. Innovating the Future"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Tell us more about the event..."
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 flex items-center text-xl font-semibold">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Date & Time
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Event Date</label>
                <input
                  id="date"
                  name="date"
                  type="text"
                  required
                  placeholder="e.g. Thu-Fri, Sep 12-13, 2024"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <input
                  id="time"
                  name="time"
                  type="text"
                  required
                  placeholder="e.g. 09 AM - 06 PM"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 flex items-center text-xl font-semibold">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Location
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Venue Name</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Moscone Center, San Francisco"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="locationDetail" className="text-sm font-medium">Detail Location</label>
                <input
                  id="locationDetail"
                  name="locationDetail"
                  type="text"
                  required
                  placeholder="e.g. Hall A & B"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.locationDetail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 flex items-center text-xl font-semibold">
              <ImageIcon className="mr-2 h-5 w-5 text-primary" />
              Media
            </h2>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  id="image"
                  name="image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                For this demo, please provide a valid image URL (e.g. from Unsplash).
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
