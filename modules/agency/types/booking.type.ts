import { BookingStatus } from "./booking.enum";

export interface Booking {
  id: string;
  customer: string;
  destination: string;
  date: string;
  budget: number;
  status:BookingStatus
}

export interface BookingData {
  id:string;
  customerName:string;
  status:BookingStatus
  email:string;
  phone:string;
  totalPeople:number;
  totalAmount:number;
  destination:string;
}