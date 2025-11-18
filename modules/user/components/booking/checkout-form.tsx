"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
interface Props {
  clientSecret: string;
}

export const CheckoutForm: React.FC<Props> = ({ clientSecret }) => {
  {console.log(clientSecret,'clientt secrettttt')}
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  console.log(stripe,'stripeeeeee')
  console.log(elements,'elemetntsss')
  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setPaymentStatus(null);
    
    const cardElement = elements.getElement(CardElement);
    console.log(cardElement,'cardElementtt')
    if (!cardElement) return;

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        console.error(error);
        setPaymentStatus("failed");
      } else if (paymentIntent?.status === "succeeded") {
        setPaymentStatus("succeeded");
        router.push(`/booking/success?booking_id=${paymentIntent.id}&payment_method=card`);
      }
    } catch (err) {
      console.error(err);
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
      invalid: {
        color: '#EF4444',
      },
    },
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-4 border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            !stripe || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Pay Now
            </>
          )}
        </button>
      </form>

      {/* Payment Status */}
      {paymentStatus && (
        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
          paymentStatus === "succeeded" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {paymentStatus === "succeeded" ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Payment successful!
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              Payment failed! Please try again.
            </>
          )}
        </div>
      )}

      {/* Card Security Info */}
      <div className="text-xs text-gray-500 text-center">
        <p>Your payment information is secure and encrypted</p>
      </div>
    </div>
  );
};