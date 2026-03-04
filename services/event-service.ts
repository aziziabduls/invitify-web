
import { apiClient } from "@/lib/api-client";
import { Event } from "@/lib/data";

// Define the API response types for better type safety
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

interface ApiResponse {
  event: ApiEvent;
  rundowns: any[];
  brands: any[];
  promo_codes: any[];
}

// Mapper function to transform API data to the frontend Event model
const mapApiEventToEvent = (data: ApiResponse): Event => {
  const { event } = data;
  
  // Format date and time
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  
  const dateStr = startDate.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const timeStr = `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  return {
    id: event.id,
    name: event.name,
    tagline: event.tagline || "",
    image: event.image_url || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop", // Default placeholder
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

export const eventService = {
  getAll: async (): Promise<Event[]> => {
    try {
      const response = await apiClient.get<ApiResponse[]>("/client/events");
      // Map the array of ApiResponse to array of Event
      return response.data.map(mapApiEventToEvent);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      throw error;
    }
  },

  getById: async (id: number | string): Promise<Event> => {
    try {
      const response = await apiClient.get<ApiResponse>(`/client/events/${id}`);
      return mapApiEventToEvent(response.data);
    } catch (error) {
      console.error(`Failed to fetch event with id ${id}:`, error);
      throw error;
    }
  },
};

