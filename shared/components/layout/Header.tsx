"use client"
import React, { useState } from "react";
import {
  Plane,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  Bell,
} from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { useLogout } from "@/shared/hooks/use-logout";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  console.log(user, 'in header');
  const { handleLogin, handleSignUp, handleLogout } = useLogout();
  const router = useRouter()
  // Mock notifications - replace with real data
  const notifications = [
    {
      id: 1,
      title: "Trip Approved",
      message: "Your trip to Paris has been approved!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from your travel agency",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payment Confirmed",
      message: "Your payment has been successfully processed",
      time: "1 day ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
    const handleViewAllNotifications = () => {
    setIsNotificationOpen(false); // 
    router.push('/notifications'); 
  };
  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Wayfare</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Your journey begins here
                </p>
              </div>
            </a>

            <nav className="hidden md:flex space-x-8">
              <a
                href="/agencies"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Agencies
              </a>
              <a
                href="/connection"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Connect
              </a>
              <a
                href="/plan-trip"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Plan Trip
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
                />
              </div>

              {/* Notification Icon */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-xs text-blue-600 font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                notification.unread ? "bg-blue-50" : ""
                              }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </h4>
                                {notification.unread && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-1">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400">
                                {notification.time}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No notifications</p>
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-3 border-t border-gray-200">
                        <button 
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium w-full text-center"
                        onClick={handleViewAllNotifications}
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {user?.profileImage ? (
                        <img
                          src={user?.profileImage}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <a
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span>View Profile</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSignUp}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={handleLogin}
                    className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                  >
                    Log In
                  </button>
                </div>
              )}

              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Agencies
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Connect
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Plan Trip
            </a>

            {/* Mobile Authentication Section */}
            {isAuthenticated ? (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>View Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 font-medium w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleSignUp}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleLogin}
                  className="w-full text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium py-2"
                >
                  Log In
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};