export interface Rundown {
  id: number;
  event_id: number;
  rundown_date: string;
  rundown_time: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface Brand {
  id: number;
  event_id: number;
  name: string;
  icon_url: string | null;
  created_at: string;
}

export interface PromoCode {
  id: number;
  event_id: number;
  code: string;
  type: "percentage" | "fixed";
  value: string;
  usage_limit: number;
  created_at: string;
}

export interface Event {
  id: number;
  name: string;
  tagline: string;
  image: string;
  date: string;
  time: string;
  location: string;
  locationDetail: string;
  description: string;
  startDate: string; // For countdown
  price?: number;
  currency?: string;
  is_free?: boolean;
  status?: string;
  rundowns?: Rundown[];
  brands?: Brand[];
  promo_codes?: PromoCode[];
}

export const events: Event[] = [
  {
    id: 1,
    name: "Indonesia Outing Expo 2025",
    tagline: "The First & Largest Outing Exhibition",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    date: "Fri-Sun, Nov 14-16, 2025",
    time: "10 AM - 09 PM",
    location: "Jakarta Convention Center (JCC)",
    locationDetail: "Exhibition Hall A & B",
    description: "Discover the best solutions for your corporate outing, gathering, and team building needs. Connect with over 100 top vendors and venues.",
    startDate: "2025-11-14T10:00:00",
  },
  {
    id: 2,
    name: "Summer Music Festival",
    tagline: "Beats under the sun",
    // image: "https://images.unsplash.com/photo-1459749411177-8c29142afdd3?w=800&auto=format&fit=crop&q=60",
    image: "https://images.unsplash.com/photo-1675972418297-29d4e440d63b?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Sat-Sun, Jul 15-16, 2024",
    time: "12 PM - 11 PM",
    location: "Golden Gate Park, San Francisco",
    locationDetail: "Main Meadow",
    description: "Experience the ultimate summer vibes with live performances from your favorite artists.",
    startDate: "2024-07-15T12:00:00",
  },
  {
    id: 3,
    name: "Art Gallery Opening",
    tagline: "Modern perspectives",
    // image: "https://images.unsplash.com/photo-1518998053901-5348d3969105?w=800&auto=format&fit=crop&q=60",
    image: "https://images.unsplash.com/photo-1765153885305-85e56c2efe92?q=80&w=2350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Fri, Oct 20, 2024",
    time: "06 PM - 10 PM",
    location: "SFMOMA, San Francisco",
    locationDetail: "Floor 3, Gallery 4",
    description: "Discover modern perspectives at the opening of our newest exhibition.",
    startDate: "2024-10-20T18:00:00",
  },
  {
    id: 4,
    name: "Startup Pitch Night",
    tagline: "Where ideas take flight",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
    date: "Tue, Aug 05, 2024",
    time: "05 PM - 09 PM",
    location: "The Battery, San Francisco",
    locationDetail: "Penthouse",
    description: "Watch aspiring entrepreneurs pitch their groundbreaking ideas to a panel of investors.",
    startDate: "2024-08-05T17:00:00",
  },
  {
    id: 5,
    name: "Community Charity Run",
    tagline: "Running for a cause",
    // image: "https://images.unsplash.com/photo-1452626038306-3a2a4a57cf32?w=800&auto=format&fit=crop&q=60",
    image: "https://images.unsplash.com/photo-1766066015219-b10a97dbb781?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Sun, Nov 10, 2024",
    time: "07 AM - 12 PM",
    location: "Embarcadero, San Francisco",
    locationDetail: "Pier 1 Start Line",
    description: "Run for a cause and help us raise funds for local community programs.",
    startDate: "2024-11-10T07:00:00",
  },
];
