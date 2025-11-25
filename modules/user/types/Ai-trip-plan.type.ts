export interface Hotel {
  hotelName: string;
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
  rating: string;
  timeToTravel: string;
  bestTimeToVisit: string;
}

export interface DayPlan {
  day: string;
  plan: Place[];
}

export interface TravelItineraryProps {
  id?:string
  destination: string;
  duration: string;
  budget: string;
  travelerType: string;
  hotels: Hotel[];
  itinerary: DayPlan[];
}

export interface Travellers {
  id:string,
  destination:string,
  startDate:string,
  name:string,
  profileImage:string,
  location:string
}