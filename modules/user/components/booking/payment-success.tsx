"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  Wallet,
  Download,
  Mail,
  Phone,
  ArrowLeft,
  Share2,
  Loader2,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import { motion } from "framer-motion";
import { verifyPayment } from "../../services/verify-payment.api";
import { PAYMENTSTATUS } from "../../types/payment.type";
import PaymentFailurePage from "./payment-cancel";
import { PaymentSuccessProps } from "../../types/payment.type";
import { useRouter } from "next/navigation";

const PaymentSuccessPage: React.FC<PaymentSuccessProps> = ({ booking, paymentMethod }) => {
  const handleDownloadTicket = () => console.log("Downloading ticket...");
  const handleShareBooking = () => console.log("Sharing booking...");
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const isPollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter()
  useEffect(() => {
    if (isPollingRef.current) return;
    isPollingRef.current = true;

    const pollPayment = async (interval = 1500, maxAttempts = 10, attempts = 0) => {
      try {
        console.log('Polling payment status, attempt:', attempts + 1);
        const data = await verifyPayment(booking.id);
        console.log('Payment verification response:', data, 'attempt:', attempts + 1);

        if (!data || !data.status) {
          console.log('No data or status in response, retrying...');
          if (attempts < maxAttempts) {
            timeoutRef.current = setTimeout(() => pollPayment(interval, maxAttempts, attempts + 1), interval);
          } else {
            setStatus('success');
          }
          return;
        }

        if (data.status === PAYMENTSTATUS.SUCCEEDED) {
          console.log('Payment SUCCEEDED!');
          setStatus('success');
          return;
        } else if (data.status === PAYMENTSTATUS.FAILED) {
          console.log('Payment FAILED!');
          setStatus('failed');

          return;
        } else if (data.status === PAYMENTSTATUS.PENDING) {
          console.log('Payment still PENDING, attempt:', attempts + 1);
          if (attempts < maxAttempts) {
            timeoutRef.current = setTimeout(() => pollPayment(interval, maxAttempts, attempts + 1), interval);
          } else {
            console.log('Max attempts reached, showing success as fallback');
            setStatus('success');
          }
        } else {
          console.log('Unknown status:', data.status);
          if (attempts < maxAttempts) {
            timeoutRef.current = setTimeout(() => pollPayment(interval, maxAttempts, attempts + 1), interval);
          } else {
            setStatus('success');
          }
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(() => pollPayment(interval, maxAttempts, attempts + 1), interval);
        } else {
          setStatus('success');
        }
      }
    };

    // Start polling
    pollPayment();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [booking.id]);

  if (status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Confirming Your Payment...</h1>
          <p className="text-gray-600 mt-2">This usually takes a few seconds</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <PaymentFailurePage bookingId={booking.id} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Sparkle background */}
      <div className="absolute inset-0 bg-[url('/svg/dot-grid.svg')] opacity-[0.04] pointer-events-none" />

      {/* Glow circles */}
      <div className="absolute w-[350px] h-[350px] bg-green-400/25 rounded-full blur-[130px] -top-24 -left-24"></div>
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/25 rounded-full blur-[130px] bottom-0 right-0"></div>

      {/* Success Section */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-flex items-center justify-center w-20 sm:w-24 h-20 sm:h-24 bg-white/10 backdrop-blur-lg rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <CheckCircle className="w-12 sm:w-14 h-12 sm:h-14 text-green-400 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
        >
          Payment Successful
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base sm:text-lg text-black/80"
        >
          Your booking has been confirmed. Thank you for choosing us!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 mx-auto p-4 bg-white/40 backdrop-blur-md rounded-xl border border-black/10 shadow w-fit"
        >
          <p className="text-sm text-black/60">Booking ID</p>
          <p className="text-xl sm:text-2xl font-bold tracking-wider text-black">
            {booking.bookingCode}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Booking & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-sm border p-5 sm:p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Booking Details
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-14 sm:w-16 h-14 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                      {booking.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {booking.destination}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.startDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {booking.travelers} Travelers
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-1">
                    <h4 className="font-medium text-gray-900">
                      Payment Method
                    </h4>
                    <div className="flex items-center gap-2">
                      {paymentMethod === "card" ? (
                        <CreditCard className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Wallet className="w-5 h-5 text-blue-600" />
                      )}
                      <span className="text-gray-700">
                        {paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : "Wallet Payment"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900">Total Amount</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {booking.totalAmount}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900">
                      Confirmation Email
                    </h4>
                    <p className="text-gray-700 break-all">
                      {booking.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm border p-5 sm:p-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                What's Next?
              </h2>
              {[
                {
                  title: "Confirmation Email",
                  desc: "You'll receive a detailed confirmation email with your itinerary within 5 minutes.",
                },
                {
                  title: "Travel Documents",
                  desc: "Download your e-tickets and keep them handy for your trip.",
                },
                {
                  title: "Pre-Travel Support",
                  desc: "Our team will contact you 48 hours before departure with final details.",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support */}
            <div className="bg-white rounded-xl shadow-sm border p-5 sm:p-6 space-y-5">
              <h2 className="text-lg sm:text-xl font-semibold">Need Help?</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+91 9048525783</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600 break-all">
                      kpmisthah6@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  24/7 Customer Support
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  We're here to help you at every step of your journey.
                </p>
              </div>
            </div>
            {/* Back to Home */}
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={()=>router.push('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
