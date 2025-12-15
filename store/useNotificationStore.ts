// src/store/notificationStore.ts
import { create } from 'zustand';
import { notifcations } from '../modules/user/types/notification.type';

type ConnectionRequest = {
  id: string;
  name: string;
  profileImage?: string;
  type?: string;
  status?: string;
};

type NotificationStore = {
  notifications: notifcations[];
  connectionRequests: ConnectionRequest[];
  unreadCount: number;

  setNotifications: (nots: notifcations[]) => void;
  addNotification: (notif: notifcations) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;

  setConnectionRequests: (reqs: ConnectionRequest[]) => void;
  addConnectionRequest: (req: ConnectionRequest) => void;
  removeConnectionRequest: (id: string) => void;

  reset: () => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  connectionRequests: [],
  unreadCount: 0,

  setNotifications: (nots) =>
    set({
      notifications: nots,
      unreadCount: nots.filter((n) => n.unread).length + get().connectionRequests.length,
    }),

  addNotification: (notif) =>
    set((state) => {
      const exists = state.notifications.some((n) => n.id === notif.id);
      if (exists) return state;

      const updated = [notif, ...state.notifications].slice(0, 100); // limit
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => n.unread).length + state.connectionRequests.length,
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => n.unread).length + state.connectionRequests.length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, unread: false })),
      unreadCount: state.connectionRequests.length,
    })),

  setConnectionRequests: (reqs) =>
    set({
      connectionRequests: reqs,
      unreadCount: get().notifications.filter((n) => n.unread).length + reqs.length,
    }),

  addConnectionRequest: (req) =>
    set((state) => {
      const exists = state.connectionRequests.some((r) => r.id === req.id);
      if (exists) return state;

      return {
        connectionRequests: [...state.connectionRequests.filter((r) => r.id !== req.id), req],
        unreadCount: state.notifications.filter((n) => n.unread).length + state.connectionRequests.length + 1,
      };
    }),

  removeConnectionRequest: (id) =>
    set((state) => ({
      connectionRequests: state.connectionRequests.filter((r) => r.id !== id),
      unreadCount: state.notifications.filter((n) => n.unread).length + (state.connectionRequests.length - 1),
    })),

  reset: () => set({ notifications: [], connectionRequests: [], unreadCount: 0 }),
}));