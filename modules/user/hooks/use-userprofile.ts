"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  UserProfile,
  Trip,
  Connection,
  Booking,
  Preference,
} from "../types/profile.type";


import {
  bookingCancel,
  changePassword,
  getUserBooking,
  getUserProfile,
  updateProfile,
  updateProfileImage,
  uploadUserProfileImage,
} from "../services/userProfile.api";
import { getAcceptedConnections } from "../services/connection.api";

import { useAuthStore } from "@/store/Auth";
import { toast } from "sonner";
import { getPasswordError } from "@/shared/utils/password-validation";
import { BookingStatus } from "@/modules/agency/types/booking.enum";

export const useUserProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bannerUpload, setBannerUpload] = useState("");
  const [avatarUpload, setAvatarUpload] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedTripForCancel, setSelectedTripForCancel] =
    useState<Trip | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTrips, setTotalTrips] = useState(0);
  const limit = 10;
  const [refreshWallet, setRefereshWallet] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoadingConnections, setIsLoadingConnections] = useState(false);

  // Trip search and filter states
  const [tripSearch, setTripSearch] = useState('');
  const [tripStatus, setTripStatus] = useState('all');

  const { setUpdateUser, user, setAuthUser } = useAuthStore();

  // Load trips with search and filter
  const loadUserTrips = async (resetPage = false) => {
    setIsLoadingTrips(true);
    try {
      const currentPage = resetPage ? 1 : page;
      if (resetPage) setPage(1);

      const response = await getUserBooking(currentPage, limit, tripSearch, tripStatus);
      if (response) {
        // Replace trips when searching/filtering, append when loading more
        if (resetPage || currentPage === 1) {
          setTrips(response.data || []);
        } else {
          // Deduplicate trips by ID
          setTrips((prev) => {
            const existingIds = new Set(prev.map((t) => t.id));
            const newTrips = response.data.filter((t: Trip) => !existingIds.has(t.id));
            return [...prev, ...newTrips];
          });
        }
        setTotalPages(response.totalPages);
        setTotalTrips(response.total || 0);
      }
    } catch (error) {
      console.error('Failed to load trips:', error);
      toast.error('Failed to load trips');
    } finally {
      setIsLoadingTrips(false);
    }
  };

  // Load accepted connections
  const loadConnections = async () => {
    setIsLoadingConnections(true);
    try {
      const data = await getAcceptedConnections();
      setConnections(data || []);
    } catch (error) {
      console.error('Failed to load connections:', error);
      // Don't show error toast as it's not critical
    } finally {
      setIsLoadingConnections(false);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    loadUserTrips(true);
  }, [tripSearch, tripStatus]);

  // Load more when page changes (but not on initial)
  useEffect(() => {
    if (page > 1) {
      loadUserTrips(false);
    }
  }, [page]);

  // Load connections on mount
  useEffect(() => {
    loadConnections();
  }, []);


  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      tripName: "Bali Paradise Package",
      agency: "Paradise Tours",
      bookingDate: "2024-07-01",
      travelDate: "2024-08-15",
      status: "confirmed",
      amount: 1200,
      paymentStatus: "paid",
    },
  ]);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const data = await getUserProfile();
        setAuthUser(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadProfile();
  }, [setAuthUser]);

  const handlePasswordChange = async () => {
    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password strength using centralized utility
    const passwordError = getPasswordError(passwordForm.newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // Call API to change password
    setIsChangingPassword(true);
    try {
      await changePassword({
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setShowPasswordChange(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Toast is shown by the API function
    } catch (error) {
      console.error('Password change failed:', error);
      toast.error('Failed to change password. Please check your current password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingBanner(true);
      const { imageUrl } = await uploadUserProfileImage(file, "banner");

      setUpdateUser({ bannerImage: imageUrl });

      setIsEditingBanner(false);
    } catch (error) {
      console.error("Error uploading banner:", error);
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      const { imageUrl } = await uploadUserProfileImage(file, "profile");
      setUpdateUser({ profileImage: imageUrl });
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUpdateUser({ [id]: value });
  };
  const handleSaveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSavingProfile(true);
    try {
      const { name, email, phone, location } = user;
      const update = await updateProfile({ name, email, phone, location });
      setUpdateUser(update);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "upcoming":
      case "confirmed":
      case "active":
        return "default";
      case "completed":
      case "paid":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  };

  const cancelBooking = async (id: string) => {

    try {
      await bookingCancel(id);
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id == id ? { ...trip, bookingStatus: BookingStatus.CANCELLED } : trip
        )
      )
      setCancelDialogOpen(false)
      setSelectedTripForCancel(null)
      setRefereshWallet(prev => !prev)
    } catch (error) {
    }
  };

  const handleCancelClick = (trip: Trip) => {
    setSelectedTripForCancel(trip);
    setCancelDialogOpen(true);
  };

  const loadMore = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }
  return {
    isEditingProfile,
    setBannerUpload,
    setIsEditingProfile,
    isEditingBanner,
    setIsEditingBanner,
    bannerUpload,
    showOnboarding,
    setShowOnboarding,
    avatarUpload,
    setAvatarUpload,
    fileInputRef,
    avatarInputRef,
    // handleSaveBanner,
    handleBannerUpload,
    handleAvatarUpload,
    // userProfile,
    trips,
    connections,
    activeTab,
    bookings,
    passwordForm,
    setPasswordForm,
    setShowPasswordChange,
    setActiveTab,
    // setUserProfile,
    showPasswordChange,
    handleSaveProfile,
    handlePasswordChange,
    // handlePreferenceToggle,
    getStatusVariant,
    preferences,
    handleChange,
    cancelBooking,
    cancelDialogOpen,
    handleCancelClick,
    selectedTripForCancel,
    setCancelDialogOpen,
    loadMore,
    page,
    totalPages,
    refreshWallet,
    userProfile: user,
    isUploadingAvatar,
    isUploadingBanner,
    isLoadingTrips,
    isLoadingProfile,
    isChangingPassword,
    isSavingProfile,
    isLoadingConnections,
    // Trip search/filter
    tripSearch,
    setTripSearch,
    tripStatus,
    setTripStatus,
    totalTrips,
  };
};
