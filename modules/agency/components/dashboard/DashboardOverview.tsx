import React from 'react';
import {  
  Package, 
  CalendarDays, 
  Star,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Mail,
  MoreHorizontal,
  ArrowRight,
  Eye
} from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  destination: string;
  date: string;
  totalCost: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const bookings: Booking[] = [
  {
    id: 'BK001',
    customerName: 'Rajesh Kumar',
    destination: 'Delhi - Agra - Jaipur',
    date: '2024-02-15',
    totalCost: 45000,
    status: 'Confirmed'
  },
  {
    id: 'BK002',
    customerName: 'Priya Sharma',
    destination: 'Kochi - Alleppey',
    date: '2024-02-20',
    totalCost: 32000,
    status: 'Pending'
  },
  {
    id: 'BK003',
    customerName: 'Amit Patel',
    destination: 'North & South Goa',
    date: '2024-02-25',
    totalCost: 28000,
    status: 'Confirmed'
  }
];

interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  packageName: string;
  date: string;
}

const feedbacks: Feedback[] = [
  {
    id: 'FB001',
    customerName: 'Rajesh Kumar',
    rating: 5,
    comment: 'Amazing experience! The itinerary was perfect.',
    packageName: 'Golden Triangle Adventure',
    date: '2024-01-20'
  },
  {
    id: 'FB002',
    customerName: 'Priya Sharma',
    rating: 4,
    comment: 'Good trip but could improve hotel quality.',
    packageName: 'Kerala Backwaters',
    date: '2024-01-18'
  }
];

export const Dashboard = ()=> {
  const stats = [
    { 
      label: 'Total Packages', 
      value: '24', 
      icon: Package, 
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      label: 'Active Bookings', 
      value: '156', 
      icon: CalendarDays, 
      color: 'from-green-500 to-green-600',
      change: '+8%',
      changeType: 'positive'
    },
    { 
      label: 'Total Revenue', 
      value: '₹12.5L', 
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600',
      change: '+23%',
      changeType: 'positive'
    },
    { 
      label: 'Happy Customers', 
      value: '89', 
      icon: Users, 
      color: 'from-orange-500 to-orange-600',
      change: '+15%',
      changeType: 'positive'
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
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors duration-200">
              <Clock className="w-4 h-4 inline mr-2" />
              Last 30 days
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
              <Eye className="w-4 h-4 inline mr-2" />
              View Reports
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Bookings - Takes 2 columns */}
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {bookings.map((booking) => (
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
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="xl:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Feedback</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {feedback.customerName.charAt(0)}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{feedback.customerName}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                    <p className="text-xs text-gray-500">{feedback.packageName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}