
import {
  Users,
  Building2,
  Calendar,
  DollarSign,
} from "lucide-react";

import StatCard from "./statCard";
import Chart from "./Chart";
import RecentActivity from "./Recent-Activity";
import { useDashBoard } from "../hooks/use-dashboard";


const AdminDashboard = () => {

  const {cards,revenue,statusOverview,loading} = useDashBoard()
   if (loading) return <p>Loading dashboard...</p>;
  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={cards?.totalUsers ?? 0}
            icon={Users}
            // change={12.5}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Agencies"
            value={cards?.totalAgencies ?? 0}
            icon={Building2}
            // change={8.2}
            color="bg-purple-500"
          />
          <StatCard
            title="Total Bookings"
            value={cards?.totalBookings ?? 0}
            icon={Calendar}
            // change={15.3}
            color="bg-green-500"
          />
          <StatCard
            title="Total Revenue"
            value={`${((cards?.totalRevenue ?? 0) / 100000).toFixed(1)}L`}
            icon={DollarSign}
            // change={22.1}
            color="bg-yellow-500"
          />
        </div>
        {/* Charts */}
        <Chart 
        revenueData={revenue ?? []}
        bookingStatusData={statusOverview ?? []}
        />
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </>
  );

};

export default AdminDashboard;
