export interface DashboardCards {
  totalUsers: number;
  totalBookings: number;
  totalAgencies: number;
  totalRevenue: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  bookings: number;
}

export interface BookingStatusDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  cards: DashboardCards;
  charts: {
    revenueOverview: RevenueDataPoint[];
    bookingStatusOverview: BookingStatusDataPoint[];
  };
}

export interface ChartProps {
  revenueData: RevenueDataPoint[];
  bookingStatusData: BookingStatusDataPoint[];
}

export interface RecentBooking {
  id: string;
  customerName: string;
  agencyName: string;
  destination: string;
  amount: number;
  status: string;
  createdAt: string;
}
