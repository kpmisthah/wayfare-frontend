import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard.service";
import {
  BookingStatusDataPoint,
  DashboardCards,
  RevenueDataPoint,
} from "../types/dahsboard.type";

export const useDashBoard = () => {
  const [cards, setCards] = useState<DashboardCards | null>(null);
  const [revenue, setRevenue] = useState<RevenueDataPoint[] | null>(null);
  const [statusOverview, setStatusOverview] = useState<
    BookingStatusDataPoint[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
        setLoading(true)
      try {
        const result = await getDashboard();
        setCards(result.cards);
        setRevenue(result.charts.revenueOverview);
        setStatusOverview(result.charts.bookingStatusOverview);
      } catch (error) {
        
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, []);
  return{
    cards,
    revenue,
    statusOverview,
    loading
  }
};

export const useRecentBookings = ()=>{
  
}
