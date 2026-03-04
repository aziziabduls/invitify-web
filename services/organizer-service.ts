
import { APP_CONFIG } from "@/config/app-config";
import { Event } from "@/lib/data";

interface ApiEvent {
  id: number;
  user_id: number;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  image_url: string | null;
  start_date: string;
  end_date: string;
  timezone: string;
  location: string;
  location_url: string | null;
  is_free: boolean;
  price: string;
  currency: string;
  max_participants: number;
  is_shared_album_enabled: boolean;
  about: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ApiEventData {
  event: ApiEvent;
  rundowns: any[];
  brands: any[];
  promo_codes: any[];
}

export interface Organizer {
  id: number;
  name: string;
  domain: string;
  scope: string;
  category: string;
  format: string;
  created_at: string;
}

interface OrganizerResponse {
  organizer: Organizer;
  events: ApiEventData[];
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop";

const mapApiEventToEvent = (data: ApiEventData): Event => {
  const { event } = data;
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = `${startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

  return {
    id: event.id,
    name: event.name,
    tagline: event.tagline || "",
    image: event.image_url || DEFAULT_IMAGE,
    date: dateStr,
    time: timeStr,
    location: event.location,
    locationDetail: event.location_url || "",
    description: event.about || "",
    startDate: event.start_date,
    price: parseFloat(event.price),
    currency: event.currency,
    is_free: event.is_free,
    status: event.status,
    rundowns: data.rundowns,
    brands: data.brands,
    promo_codes: data.promo_codes,
  };
};

export const organizerService = {
  getByDomain: async (domain: string): Promise<{ organizer: Organizer; events: Event[] }> => {
    const response = await fetch(`${APP_CONFIG.apiUrl}/client/organizers/${domain}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Organizer not found: ${domain}`);
    }
    const data: OrganizerResponse = await response.json();
    return {
      organizer: data.organizer,
      events: data.events.map(mapApiEventToEvent),
    };
  },

  getFeaturedEvent: async (domain: string): Promise<Event> => {
    const response = await fetch(`${APP_CONFIG.apiUrl}/client/${domain}/featured`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Featured event not found for: ${domain}`);
    }
    const data: ApiEventData = await response.json();
    return mapApiEventToEvent(data);
  },
};
