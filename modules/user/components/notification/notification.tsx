"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  X,
  Loader2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { NotificationStatus } from "../../types/notification.enum";
import { useNotificationStore } from "@/store/useNotificationStore";

type Connection = {
  id: string;
  name: string;
  type: string;
  status: string;
  profileImage: string;
};
export const Notification = () => {
  // const [notifications, setNotifications] = useState<notifcations[]>([]);
  // const [requests, setRequests] = useState<Connection[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    notifications,
    connectionRequests: requests,
    unreadCount,
    setNotifications,
    setConnectionRequests,
    markAsRead,
    markAllAsRead,
    removeConnectionRequest,
  } = useNotificationStore();
  const fetchData = async () => {
    try {
      setLoading(true);
      const [notifRes, connRes] = await Promise.all([
        api.get("/notifications?limit=50&offset=0"),
        api.get("/connections"),
      ]);
      setNotifications(notifRes.data.mappedList || []);
      setConnectionRequests(connRes.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const socket = getSocket();

    //   "connectionRequest",
    //   (payload: { senderId: string; senderName: string }) => {
    //     setRequests((prev) => [
    //       ...prev.filter((r) => r.id !== payload.senderId),
    //       {
    //         id: payload.senderId,
    //         name: payload.senderName,
    //         type: NotificationStatus.CONNECTION_REQUEST,
    //         status: "PENDING",
    //         profileImage: `https://i.pravatar.cc/150?u=${payload.senderId}`,
    //       },
    //     ]);
    //   }
    // );

    // socket.on("connectionAccepted", (payload: { accepterName: string }) => {
    //   const newNotif:notifcations = {
    //     id: `acc-${Date.now()}`,
    //     title: "Connection Accepted",
    //     message: `${payload.accepterName} accepted your request`,
    //     unread: true,
    //     date: new Date().toISOString(),
    //   };
    //   setNotifications((p) => [newNotif, ...p]);
    // });

    // socket.on("newNotification", (notif: any) => {
    //   setNotifications((prev) => [
    //     { ...notif, unread: true },
    //     ...prev.filter((n) => n.id !== notif.id),
    //   ]);
    // });
    socket.on("newNotification", (notif: any) => {
      useNotificationStore
        .getState()
        .addNotification({ ...notif, unread: true });
    });
    socket.on(
      "connectionRequest",
      (payload: { senderId: string; senderName: string }) => {
        useNotificationStore.getState().addConnectionRequest({
          id: payload.senderId,
          name: payload.senderName,
          type: NotificationStatus.CONNECTION_REQUEST,
          status: "PENDING",
          profileImage: `https://i.pravatar.cc/150?u=${payload.senderId}`,
        });
      }
    );
    return () => {
      socket.off("connectionRequest");
      socket.off("newNotification");
    };
  }, []);

  const handleAccept = async (id: string) => {
    await api.patch(`/connections/${id}/accept`);
    removeConnectionRequest(id);
  };


  const handleReject = async (connectionId: string) => {
    try {
      await api.patch(`/connections/${connectionId}/reject`);
      removeConnectionRequest(connectionId); // Badge -1 automatically!
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to reject");
    }
  };

  const toggleRead = async (id: string, current: boolean) => {
    if (!current) return;
    await api.patch(`/notifications/${id}/read`);
    markAsRead(id);
  };
  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => n.unread).map((n) => n.id);
    if (unreadIds.length === 0) return;

    try {
      await Promise.all(
        unreadIds.map((id) => api.patch(`/notifications/${id}/read`))
      );
      markAllAsRead(); 
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const m = 60_000;
    const h = m * 60;
    const d24 = h * 24;

    if (diff < h) return `${Math.floor(diff / m)}m ago`;
    if (diff < d24) return `${Math.floor(diff / h)}h ago`;
    if (diff < d24 * 7) return `${Math.floor(diff / d24)}d ago`;
    return d.toLocaleDateString();
  };

  const filtered =
    filter === "unread" ? notifications.filter((n) => n.unread) : notifications;

  const NotificationBellBadge = () => (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full w-5 h-0.5 min-w-[20px] h-5 animate-pulse">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="sticky top-0 bg-white border-b z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">{unreadCount} unread</p>
                )}
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="flex gap-6 border-b">
            <button
              onClick={() => setFilter("all")}
              className={`pb-3 px-1 font-medium border-b-2 transition ${
                filter === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`pb-3 px-1 font-medium border-b-2 transition ${
                filter === "unread"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p>Loading…</p>
          </div>
        ) : (
          <div className="space-y-8">
            {requests.length > 0 && filter === "all" && (
              <section>
                <h2 className="text-lg font-semibold mb-4">
                  Connection Requests ({requests.length})
                </h2>
                <div className="space-y-4">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-xl border-2 border-indigo-200 p-5 flex items-center gap-4 hover:shadow-lg transition"
                    >
                      <img
                        src={req.profileImage}
                        alt={req.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-indigo-100"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{req.name}</p>
                        <p className="text-sm text-gray-500">
                          wants to connect
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg text-sm flex items-center gap-2"
                        >
                          <X className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* NOTIFICATIONS LIST */}
            <section className="space-y-4">
              {filtered.length === 0 && requests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                filtered.map((notif) => (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-xl border p-5 transition-all hover:shadow-md ${
                      notif.unread
                        ? "border-blue-300 bg-blue-50/40"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center">
                        {notif.title.includes("Accepted") ? (
                          <CheckCheck className="w-6 h-6 text-green-600" />
                        ) : (
                          <Bell className="w-6 h-6 text-indigo-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold flex items-center gap-2">
                              {notif.title}
                              {notif.unread && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatTime(notif.date)}
                            </p>
                          </div>

                          {/* Toggle read / unread */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRead(notif.id, notif.unread);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            {notif.unread ? (
                              <CheckCircle2 className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
