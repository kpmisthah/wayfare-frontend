'use client'
import { useEffect, useState } from "react"
import { Booking, BookingData } from "../types/booking.type"
import { fetchBookingByAgency, fetchBookingsByPackage, updateBookingStatus } from "../services/booking.api"
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

export const useViewBookings = (pkgId:string)=>{
  const [booking,setBooking]  = useState<BookingData[]>([])
  try {
    useEffect(()=>{
      const loadBookingDetails = async()=>{
        const data = await fetchBookingsByPackage(pkgId)
        setBooking(data)
      }
      console.log(DataTransfer,'data')
      loadBookingDetails()
  },[pkgId])
  useEffect(()=>{
    console.log(booking,'booking inuseEffect');
    
  },[])
  } catch (error) {
    console.log(error);
  }
  return {
    booking,
    setBooking
  }
}