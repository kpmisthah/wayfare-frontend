import React from 'react';
import {
  Package,
  CalendarDays,
  DollarSign,
  MapPin,
  Clock,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useAgencyDashboard } from '../../hooks/use-dashboard';

export const Dashboard = () => {
  const { data, loading, error } = useAgencyDashboard();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
      Error: {error}
    </div>;
  }

  const stats = [
    {
      label: 'Total Packages',
      value: data?.stats?.totalPackages?.toString() || '0',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Active Bookings',
      value: data?.stats?.activeBookings?.toString() || '0',
      icon: CalendarDays,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${(data?.stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your agency.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {!data?.recentBookings || data.recentBookings.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No recent bookings</div>
                ) : (
                  data.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.customerName}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.destination}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(booking.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-3">
                        <div>
                          <p className="font-bold text-gray-900">₹{booking.totalCost.toLocaleString()}</p>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}