'use client'
import { useEffect, useState } from "react"
import { Booking } from "../types/booking.type"
import { fetchBookingByAgency, updateBookingStatus } from "../services/booking.api"
import { BookingStatus } from "../types/booking.enum"

export const useFetchBookingDetails = ()=>{
    const [booking,setBooking] = useState<Booking[]>([])
    useEffect(()=>{
        const loadBookings = async ()=>{
            const data = await fetchBookingByAgency()
            setBooking(data)
        }
        loadBookings()
    },[])
    return{
        booking,
        setBooking
    }
}

export const useUpdateBookingStatus = (setBooking: React.Dispatch<React.SetStateAction<Booking[]>>) => {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (id: string, status: BookingStatus) => {
    setLoading(true);
    try {
      await updateBookingStatus(id, status);
      setBooking((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } finally {
      setLoading(false);
    }
  };

  return { changeStatus, loading };
};