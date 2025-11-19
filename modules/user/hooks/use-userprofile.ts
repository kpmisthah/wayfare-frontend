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
  getUserBooking,
  getUserProfile,
  updateProfile,
  updateProfileImage,
  uploadUserProfileImage,
} from "../services/userProfile.api";
import { useAuthStore } from "@/store/Auth";
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
  const[page,setPage] = useState(1)
  const[totalPages,setTotalPages] = useState(1)
  const limit = 1
  const[refreshWallet,setRefereshWallet] = useState(false)
  const { setUpdateUser, user, setAuthUser } = useAuthStore();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await getUserBooking(page,limit);
        console.log(response, "response in loadUserProfile");
        setTrips((prev)=>[...prev,...response.data]);
        setTotalPages(response.totalPages)
      } catch (error) {
        console.log(error);
      }
    };
    loadUserProfile();
  }, [page]);


  const [connections] = useState<Connection[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9f8c2b8?w=50&h=50&fit=crop&crop=face",
      destination: "Bali, Indonesia",
      travelDate: "2024-08-15",
      status: "active",
      mutualConnections: 3,
      isOnline: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      destination: "Tokyo, Japan",
      travelDate: "2024-09-20",
      status: "pending",
      mutualConnections: 1,
      isOnline: false,
    },
  ]);

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
      try {
        const data = await getUserProfile();
        console.log(data, "fetch details from backend");
        setAuthUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProfile();
  }, []);

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    console.log("Password change requested");
    setShowPasswordChange(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("Password changed successfully!");
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { bannerUrl } = await uploadUserProfileImage(file, "banner");
      console.log(bannerUrl);

      const updateBanner = await updateProfileImage(bannerUrl);
      // console.log(updateProfile,'upodate porfile from front endzl');

      setUpdateUser({ bannerImage: bannerUrl });
      console.log(user, "from store");

      setIsEditingBanner(false);
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { imageUrl } = await uploadUserProfileImage(file, "profile");
      console.log("Upload Image From URL", imageUrl);
      let updateProfile = await updateProfileImage(imageUrl);
      console.log(updateProfile, "inn hooks/use-userProfile");
      setUpdateUser({ profileImage: imageUrl });
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUpdateUser({ [id]: value });
  };
  const handleSaveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditingProfile(false);
    if (!user) return;
    const { name, email, phone, location } = user;
    const update = await updateProfile({ name, email, phone, location });
    setUpdateUser(update);
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

  const cancelBooking = (id: string) => {
    console.log(id, "from use-user-profile booking id");

    try {
      bookingCancel(id);
      setTrips((prev)=>
        prev.map((trip)=>
          trip.id == id?{...trip,bookingStatus:BookingStatus.CANCELLED}:trip
        )
      )
      setCancelDialogOpen(false)
      setSelectedTripForCancel(null)
      setRefereshWallet(prev=>!prev)
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = (trip: Trip) => {
    setSelectedTripForCancel(trip);
    setCancelDialogOpen(true);
  };

  const loadMore = ()=>{
    if(page<totalPages) setPage(prev=>prev+1)
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
    refreshWallet
  };
};
