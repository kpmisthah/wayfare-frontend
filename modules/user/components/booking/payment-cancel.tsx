"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  Wallet,
  Mail,
  Phone,
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";
import { Header } from "@/shared/components/layout/Header";
import Link from "next/link";
interface PaymentFailureProps {
  bookingId:string
}

const PaymentFailurePage: React.FC<PaymentFailureProps> = ({bookingId}) => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <Header />

      {/* Dot Background */}
      <div className="absolute inset-0 bg-[url('/svg/dot-grid.svg')] opacity-[0.04] pointer-events-none" />

      {/* Glow (Red Theme) */}
      <div className="absolute w-[350px] h-[350px] bg-red-400/25 rounded-full blur-[130px] -top-24 -left-24"></div>
      <div className="absolute w-[350px] h-[350px] bg-rose-500/25 rounded-full blur-[130px] bottom-0 right-0"></div>

      {/* Failure Section */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-flex items-center justify-center w-20 sm:w-24 h-20 sm:h-24 bg-white/10 backdrop-blur-lg rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <XCircle className="w-12 sm:w-14 h-12 sm:h-14 text-red-500 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
        >
          Payment Failed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base sm:text-lg text-black/80"
        >
          We couldn’t process your payment.
        </motion.p>

        {/* Reason Box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 mx-auto p-4 bg-white/40 backdrop-blur-md rounded-xl border border-black/10 shadow w-fit"
        >
          <p className="text-sm text-black/60">Reason</p>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
              href={`/booking/retry-payment/${bookingId}`}
              className="inline-flex items-center justify-center gap-3 bg-red-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
            <RefreshCcw className="w-5 h-5" />
            Retry Payment
            </Link>

        </div>
      </div>

      {/* Support Section */}
      <div className="max-w-lg mx-auto px-6 pb-16">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Need Help?</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Call Us</p>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600 break-all">
                  support@wayfare.com
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700 font-medium">
              24/7 Customer Support
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <button className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
