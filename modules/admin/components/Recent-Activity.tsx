import { useRecentBookings } from "../hooks/use-recent-bookings";
import StatusBadge from "./StatusBadge";
import { DashboardLoader } from "@/shared/components/ui/DashboardLoader";

const RecentActivity = () => {
  const { bookings, loading } = useRecentBookings()
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        {loading ? (
          <DashboardLoader message="Loading recent bookings..." size="md" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Booking ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Agency
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Destination
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.agencyName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.destination}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      ₹{booking.amount}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentActivity;
