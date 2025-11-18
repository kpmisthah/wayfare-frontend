import { BookingStatus } from "./booking.enum";

export interface Booking {
  id: string;
  customer: string;
  destination: string;
  date: string;
  budget: number;
  status:BookingStatus
}