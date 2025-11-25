"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  ChevronLeft,
  UserPlus,
  X,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// Mock notifications data - replace with real API data
const mockNotifications = [
  {
    id: 1,
    title: "Connection Request",
    message: "Sarah Johnson wants to connect with you",
    time: "2 hours ago",
    date: "2025-11-04T12:00:00",
    unread: true,
    type: "connection_request",
    userData: {
      name: "Sarah Johnson",
      profileImage: "https://i.pravatar.cc/150?img=1",
      location: "New York, USA",
    },
  },
  {
    id: 2,
    title: "Connection Request",
    message: "Michael Chen wants to connect with you",
    time: "4 hours ago",
    date: "2025-11-04T10:00:00",
    unread: true,
    type: "connection_request",
    userData: {
      name: "Michael Chen",
      profileImage: "https://i.pravatar.cc/150?img=12",
      location: "Singapore",
    },
  },
  {
    id: 3,
    title: "Trip Approved",
    message:
      "Your trip to Paris has been approved! You can now proceed with booking your flights and accommodations.",
    time: "5 hours ago",
    date: "2025-11-04T09:00:00",
    unread: true,
    type: "success",
  },
  {
    id: 4,
    title: "New Message",
    message:
      "You have a new message from your travel agency regarding your upcoming trip to Tokyo.",
    time: "8 hours ago",
    date: "2025-11-04T06:00:00",
    unread: false,
    type: "message",
  },
  {
    id: 5,
    title: "Payment Confirmed",
    message:
      "Your payment of $1,250 has been successfully processed for your London trip package.",
    time: "1 day ago",
    date: "2025-11-03T14:30:00",
    unread: false,
    type: "payment",
  },
  {
    id: 6,
    title: "Connection Request",
    message: "Emma Davis wants to connect with you",
    time: "2 days ago",
    date: "2025-11-02T10:00:00",
    unread: false,
    type: "connection_request",
    userData: {
      name: "Emma Davis",
      profileImage: "https://i.pravatar.cc/150?img=5",
      location: "London, UK",
    },
  },
  {
    id: 7,
    title: "Booking Reminder",
    message:
      "Don't forget to complete your booking for the Dubai trip. The offer expires in 3 days.",
    time: "2 days ago",
    date: "2025-11-02T10:00:00",
    unread: false,
    type: "reminder",
  },
  {
    id: 8,
    title: "New Destination Added",
    message:
      "Check out our newly added destination: Bali, Indonesia. Amazing packages starting from $899.",
    time: "3 days ago",
    date: "2025-11-01T16:45:00",
    unread: false,
    type: "info",
  },
  {
    id: 9,
    title: "Review Request",
    message:
      "How was your recent trip to Barcelona? Please share your experience with us.",
    time: "4 days ago",
    date: "2025-10-31T11:20:00",
    unread: false,
    type: "review",
  },
  {
    id: 10,
    title: "Special Offer",
    message:
      "Exclusive 20% off on all European destinations this weekend only!",
    time: "5 days ago",
    date: "2025-10-30T08:00:00",
    unread: false,
    type: "offer",
  },
];
type Connection = {
  id: string;
  name: string;
  type: string;
  status: string;
  profileImage: string;
};
export const Notification = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [requests, setRequests] = useState<Connection[]>([]);
  const router = useRouter();
  const fetchRequests = async () => {
    const res = await api.get("/connections");
    setRequests(res.data);
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    try {
      const res = await api.patch(`/connections/${id}/${action}`);
      const { conversationId } = res.data;
      // if (conversationId) router.push(`/chat/${conversationId}`);
      // alert(`Request ${action}ed ✅`);
      alert(`Request ${action}ed ✅`);
      fetchRequests(); // refresh UI
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => n.unread) : notifications;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleAcceptConnection = (id: number, userName: string) => {
    // Add your API call here to accept the connection
    console.log(`Accepted connection request from ${userName}`);
    // Remove the notification after accepting
    deleteNotification(id);
    // You can also show a success toast/message here
  };

  const handleRejectConnection = (id: number, userName: string) => {
    // Add your API call here to reject the connection
    console.log(`Rejected connection request from ${userName}`);
    // Remove the notification after rejecting
    deleteNotification(id);
    // You can also show a message here
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-10 h-10 rounded-full flex items-center justify-center";
    switch (type) {
      case "connection_request":
        return (
          <div className={`${iconClass} bg-indigo-100`}>
            <UserPlus className="w-5 h-5 text-indigo-600" />
          </div>
        );
      case "success":
        return (
          <div className={`${iconClass} bg-green-100`}>
            <CheckCheck className="w-5 h-5 text-green-600" />
          </div>
        );
      case "message":
        return (
          <div className={`${iconClass} bg-blue-100`}>
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
        );
      case "payment":
        return (
          <div className={`${iconClass} bg-purple-100`}>
            <Check className="w-5 h-5 text-purple-600" />
          </div>
        );
      case "reminder":
        return (
          <div className={`${iconClass} bg-orange-100`}>
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
        );
      case "offer":
        return (
          <div className={`${iconClass} bg-pink-100`}>
            <Bell className="w-5 h-5 text-pink-600" />
          </div>
        );
      default:
        return (
          <div className={`${iconClass} bg-gray-100`}>
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    You have {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Mark all as read</span>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 mt-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "unread"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${
                  notification
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon or Profile Image */}
                    {notification.type === "connection_request"}?
                    <img
                      src={notification.profileImage}
                      alt={notification.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                    />
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {notification.title}
                          {notification.unread && (
                            <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </h3>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div> */}

                      {/* Connection Request Details */}
                      {notification.type === "connection_request" && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {notification.name}
                          </p>
                          {/* <p className="text-xs text-gray-500 mb-3">
                            {notification.userData.location}
                          </p> */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleAction(notification.id, "accept")
                              }
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                            >
                              <Check className="w-4 h-4" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() =>
                                handleAction(notification.id, "reject")
                              }
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                            >
                              <X className="w-4 h-4" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Actions - Only show for non-connection requests */}
                      {/* {notification.type !== "connection_request" && (
                        <div className="flex items-center space-x-4">
                          {notification.unread && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Mark as read</span>
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="flex items-center space-x-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-sm text-gray-500">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
