'use client'

import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SuccessPageProps {
  searchParams: {
    booking_id: string;
    payment_method: 'card' | 'wallet';
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Booking ID: <span className="font-mono">{searchParams.booking_id}</span>
        </p>
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
