"use client";
import { useEffect, useState } from "react";
import { BookingData } from "../types/booking.type";
import {
  fetchBookingByAgency,
  fetchBookingsByPackage,
  updateBookingStatus,
} from "../services/booking.api";
import { BookingStatus } from "../types/booking.enum";

export const useFetchBookingDetails = () => {
  const [booking, setBooking] = useState<BookingData[]>([]);
  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchBookingByAgency();
      setBooking(data);
    };
    loadBookings();
  }, []);
  return {
    booking,
    setBooking,
  };
};

export const useUpdateBookingStatus = (
  setBooking: React.Dispatch<React.SetStateAction<BookingData[]>>
) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    bookingId?: string;
    newStatus?: BookingStatus;
    booking?: BookingData;
  }>({ isOpen: false });
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message?: string;
  }>({ isOpen: false, message: "" });

  const openConfirmModal = (booking: BookingData, newStatus: BookingStatus) => {
    if (booking.status === newStatus) {
      setErrorModal({
        isOpen: true,
        message: "This booking is already in that status.",
      });
      return;
    }

    if (
      booking.status === BookingStatus.CANCELLED &&
      newStatus === BookingStatus.CONFIRMED
    ) {
      setErrorModal({
        isOpen: true,
        message: "Cannot confirm a booking that has been cancelled.",
      });
      return;
    }

    if (
      booking.status === BookingStatus.COMPLETED ||
      booking.status === BookingStatus.CANCELLED
    ) {
      if (newStatus !== booking.status) {
        setErrorModal({
          isOpen: true,
          message:
            "Cannot change the status of a completed or cancelled booking.",
        });
        return;
      }
    }

    if (newStatus === BookingStatus.COMPLETED) {
      const travelDate = new Date(booking.travelDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      travelDate.setHours(0, 0, 0, 0);

      if (today < travelDate) {
        setErrorModal({
          isOpen: true,
          message:
            "You can only mark a booking as Completed on or after the travel date.",
        });
        return;
      }
    }

    setModal({
      isOpen: true,
      bookingId: booking.id,
      newStatus,
      booking,
    });
  };

  const confirmStatusChange = async () => {
    if (!modal.bookingId || !modal.newStatus) return;

    setLoading(true);
    try {
      await updateBookingStatus(modal.bookingId, modal.newStatus);
      setBooking((prev) =>
        prev.map((b) =>
          b.id === modal.bookingId ? { ...b, status: modal.newStatus! } : b
        )
      );
    } catch (error) {
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
      setModal({ isOpen: false });
    }
  };

  const closeModal = () => setModal({ isOpen: false });
  const closeErrorModal = () => setErrorModal({ isOpen: false });

  return { openConfirmModal, modal, confirmStatusChange, closeModal, loading,closeErrorModal,errorModal };
};

export const useViewBookings = (pkgId: string) => {
  const [booking, setBooking] = useState<BookingData[]>([]);
  try {
    useEffect(() => {
      const loadBookingDetails = async () => {
        const data = await fetchBookingsByPackage(pkgId);
        setBooking(data);
      };
      console.log(DataTransfer, "data");
      loadBookingDetails();
    }, [pkgId]);
    useEffect(() => {
      console.log(booking, "booking inuseEffect");
    }, []);
  } catch (error) {
    console.log(error);
  }
  return {
    booking,
    setBooking,
  };
};
