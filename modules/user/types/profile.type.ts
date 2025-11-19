import { BookingStatus } from "@/modules/agency/types/booking.enum";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface UserProfile {
  preference:Preference[]
}
export interface Preference {
  id:string;
  name:string
}

export interface Trip {
  id: string;
  destination: string;
  // startDate: string;
  // endDate: string;
  bookingStatus: BookingStatus;
  agencyName: string;
  price: number;
  photo: string;
  rating?: number;
  highlights: string;
  bookingDate:string,
  // cancellationDeadline:string,
  travellers:number,
  travelDate:string
}

export interface Connection {
  id: string;
  name: string;
  avatar?: string;
  destination: string;
  travelDate: string;
  status: "pending" | "accepted" | "active";
  mutualConnections: number;
  isOnline?: boolean;
}

export interface Booking {
  id: string;
  tripName: string;
  agency: string;
  bookingDate: string;
  travelDate: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
}
export interface Prop {
 
  isEditingBanner: boolean;
  bannerUpload: string;
  // handleSaveBanner: () => void;
  setIsEditingBanner: Dispatch<SetStateAction<boolean>>;
  setBannerUpload: Dispatch<SetStateAction<string>>;
  fileInputRef: RefObject<HTMLInputElement|null>;
  avatarInputRef: RefObject<HTMLInputElement|null>;
}

export type ProfileTab = "overview" | "trips" | "shortTrips" | "connections" | "wallet" | "settings";