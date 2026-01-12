
"use client";
import React, { useEffect, useState } from "react";
import { Plane, Menu, X, User, ChevronDown, Bell, Check } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { useLogout } from "@/shared/hooks/use-logout";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket";
import { useNotificationStore } from "@/store/useNotificationStore";
import api from "@/lib/api";

type ConnectionRequest = {
  id: string;
  name: string;
  profileImage: string;
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const {
    unreadCount,
    notifications,
    connectionRequests,
    addNotification,
    addConnectionRequest,
  } = useNotificationStore();

  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useAuthStore();
  const { handleLogin, handleSignUp, handleLogout } = useLogout();
  const router = useRouter();


  useEffect(() => {
    if (isAuthenticated) {
      const loadInitial = async () => {
        try {
          const [n, c] = await Promise.all([
            api.get("/notifications?limit=10&offset=0"),
            api.get("/connections"),
          ]);
          useNotificationStore
            .getState()
            .setNotifications(n.data.mappedList || []);
          useNotificationStore.getState().setConnectionRequests(c.data || []);
        } catch (e) { }
      };
      loadInitial();
      const socket = getSocket();

      socket.on("newNotification", (notif: { id: string; title: string; message: string; date: string }) => {
        addNotification({ ...notif, unread: true });
      });

      socket.on(
        "connectionRequest",
        (payload: { connectionId: string; senderId: string; senderName: string; senderProfileImage: string }) => {
          addConnectionRequest({
            id: payload.connectionId,
            name: payload.senderName,
            profileImage: payload.senderProfileImage || `https://i.pravatar.cc/150?u=${payload.senderId}`,
          });
        }
      );

      return () => {
        socket.off("newNotification");
        socket.off("connectionRequest");
      };
    }
  }, [isAuthenticated, addNotification, addConnectionRequest]);

  const handleViewAll = () => {
    setIsNotificationOpen(false);
    router.push("/notifications");
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
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

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/agencies"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Agencies
              </a>
              <a
                href="/connection"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Connect
              </a>
              <a
                href="/plan-trip"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Plan Trip
              </a>
              <a
                href="/chat"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Chat
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell with Badge */}
              {/* {children} */}
              {/* children thaazhe aan undayirunne */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-gray-700 hover:text-blue-600 transition rounded-lg hover:bg-gray-100"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {isNotificationOpen && (
                    <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 top-16 sm:top-auto sm:mt-3 w-auto sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden max-h-[80vh] sm:max-h-[500px]">
                      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>

                      <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
                        {connectionRequests.length > 0 && (
                          <div className="px-4 py-2 bg-indigo-50 border-b">
                            <p className="text-xs font-medium text-indigo-700">
                              Connection Requests
                            </p>
                          </div>
                        )}
                        {connectionRequests.map((req) => (
                          <div
                            key={req.id}
                            className="px-3 sm:px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b"
                          >
                            <img
                              src={req.profileImage}
                              alt={req.name}
                              className="w-9 sm:w-10 h-9 sm:h-10 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{req.name}</p>
                              <p className="text-xs text-gray-500">
                                wants to connect
                              </p>
                            </div>
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          </div>
                        ))}

                        {notifications.length === 0 &&
                          connectionRequests.length === 0 ? (
                          <div className="py-10 sm:py-12 text-center text-gray-500">
                            <Bell className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">No notifications</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notif) => (
                            <div
                              key={notif.id}
                              className={`px-3 sm:px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 ${notif.unread ? "bg-blue-50" : ""
                                }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-sm font-medium text-gray-900 flex-1 min-w-0">
                                  {notif.title}
                                </h4>
                                {notif.unread && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {notif.message}
                              </p>
                              <span className="text-xs text-gray-400">
                                {formatTime(notif.date)}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="px-4 py-3 bg-gray-50 border-t">
                        <button
                          onClick={handleViewAll}
                          className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          View all notifications →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Dropdown */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-200">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="hidden sm:block font-medium">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <button
                    onClick={handleLogin}
                    className="text-blue-600 font-medium hover:text-blue-700 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {["Agencies", "Connect", "Plan Trip", "Chat"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item}
                </a>
              ))}
              {!isAuthenticated && (
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogin();
                    }}
                    className="w-full py-2.5 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignUp();
                    }}
                    className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
