export interface DashboardStats {
    totalPackages: number;
    activeBookings: number;
    totalRevenue: number;
    happyCustomers: number;
}

export interface RecentBooking {
    id: string;
    customerName: string;
    destination: string;
    date: string; // JSON date
    totalCost: number;
    status: string;
}

export interface RecentReview {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    packageName: string;
    date: string;
}

export interface AgencyDashboardData {
    stats: DashboardStats;
    recentBookings: RecentBooking[];
    recentReviews: RecentReview[];
}
