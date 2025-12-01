import { useEffect, useState } from "react";
import { getRecentBookings } from "../services/dashboard.service";
import { RecentBooking } from "../types/dahsboard.type";

export const useRecentBookings = () => {
  const [bookings, setBookings] = useState<RecentBooking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const response = await getRecentBookings();
        setBookings(response);
      } catch (err) {
        console.error("Error fetching recent bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return { bookings, loading };
};
