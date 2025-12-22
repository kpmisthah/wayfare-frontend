"use client";

import React, { useEffect, useState } from "react";
import { fetchPackagesById } from "../services/agency-packages.api";
import { Package } from "../types/package.type";
import { useSearchParams } from "next/navigation";
import { bookPackage } from "@/modules/agency/services/booking.api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
export const useBooking = (id: string) => {
  const [packages, setPackages] = useState<Package | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const travelers = searchParams.get("travelers");

  useEffect(() => {
    const fetchPackages = async () => {
      const result = await fetchPackagesById(id);
      setPackages(result);
    };
    fetchPackages();
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent,
    paymentType: "card" | "wallet"
  ) => {
    e.preventDefault();
    if (!packages) return;
    setLoading(true);
    try {
      if (packages) {
        const numTravelers = Number(travelers) || 1;
        let data = {
          packageId: packages.id,
          travelDate: startDate,
          peopleCount: numTravelers,
          totalAmount: Number(packages?.price) * numTravelers,
          paymentType,
        };
        const result = await bookPackage(data);
        if (paymentType == "card") {
          // setClientSecret(result.clientSecret);
          setBookingId(result.bookingId);
          window.location.href = result.checkoutUrl;
        }
        if (paymentType == "wallet") {
          router.push(
            "/booking/success?booking_id=" +
            result.booking.id +
            "&payment_method=wallet"
          );
        }
        return result;
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message ?? "Something went wrong";
      if (errorMessage === "Insufficient balance") {
        setPaymentStatus("insufficient_balance");
      } else {
        setPaymentStatus("wallet_failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    handleSubmit,
    startDate,
    travelers,
    clientSecret,
    bookingId,
    paymentStatus,
    loading
  };
};
