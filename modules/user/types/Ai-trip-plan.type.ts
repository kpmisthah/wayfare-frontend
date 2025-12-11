export interface Hotel {
  hotelName: string;
  name?: string;
  hotelAddress: string;
  price: string;
  hotelImageUrl: string;
  geoCoordinates: {
    latitude: string;
    longitude: string;
  };
  rating: string;
  description: string;
}

export interface Place {
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
  geoCoordinates: {
    latitude: string;
    longitude: string;
  };
  ticketPricing: string;
  ticketPrice?: string;
  rating: string;
  timeToTravel: string;
  bestTimeToVisit: string;
  icon?: string;
  time?: string;
  timeToVisit?: string;
  timeToSpend?: string;
  activity?: string;
}

export interface DayPlan {
  day: string;
  title?: string;
  plan: Place[];
}

export interface TravelItineraryProps {
  id?: string;
  destination: string;
  duration: string;
  budget: string;
  travelerType: string;
  hotels: Hotel[];
  itinerary: DayPlan[];
  thumbnail?: string;
}

export type ConnectionStatus = 'NONE' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Travellers {
  id: string;
  destination: string;
  startDate: string;
  name: string;
  profileImage: string;
  location: string;
  connectionStatus?: ConnectionStatus;
}