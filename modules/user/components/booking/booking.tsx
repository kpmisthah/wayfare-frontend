'use client'
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, CreditCard, Shield, Phone, Mail, ArrowLeft, CheckCircle, Wallet } from 'lucide-react';
import { useBooking } from '../../hooks/use-booking';
import { Header } from '@/shared/components/layout/Header';
import CancellationPolicy from './cancellation-policy';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './checkout-form';
import { useWallet } from '../../hooks/use-wallet';
import { useRouter } from 'next/navigation';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
console.log(stripePromise,'stripe promiseeee')
interface BookingProps {
    id: string
}


const BookingPage: React.FC<BookingProps> = ({ id }) => {
  const router = useRouter()
    const {
      packages,
      handleSubmit,
      startDate,
      travelers,
      clientSecret
    } = useBooking(id);
    const{wallet,isProcessing,payWithWallet} = useWallet() 
  
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    
    const getNumericPrice = (priceString: string) => {
  
      return parseInt('0');
    };
    
    const packagePrice = getNumericPrice(packages?.price || '0');
    const hasWalletBalance = wallet.balance >= packagePrice;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
              <p className="text-gray-600">Review details and confirm your trip</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Package</span>
                  <span className="font-medium">{packages?.title}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </span>
                  <span className="font-medium">{packages?.destination}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Travel Date
                  </span>
                  <span className="font-medium">{startDate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="font-medium">{packages?.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Travelers
                  </span>
                  <span className="font-medium">{travelers}</span>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <CancellationPolicy />
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package Price</span>
                  <span className="font-semibold">{packages?.price}</span>
                </div>
              </div>

              {/* Wallet Balance Display */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Wallet Balance</span>
                  </div>
                  <span className="text-sm font-medium">₹{wallet.balance.toLocaleString()}</span>
                </div>
                {!hasWalletBalance && (
                  <p className="text-xs text-red-500 mt-1">
                    Insufficient balance for this booking
                  </p>
                )}
              </div>

              {/* Payment Method Selection - Always Show */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Choose Payment Method</h3>
                  
                  {/* Card Payment Option */}
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-3 text-blue-600"
                    />
                    <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </label>
                  
                  {/* Wallet Payment Option */}
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    !hasWalletBalance ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      disabled={!hasWalletBalance}
                      className="mr-3 text-blue-600"
                    />
                    <Wallet className="w-4 h-4 mr-2 text-blue-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Pay with Wallet</span>
                      <div className="text-xs text-gray-500">
                        Balance: ₹{wallet.balance.toLocaleString()}
                      </div>
                    </div>
                    {!hasWalletBalance && (
                      <span className="text-xs text-red-500">Insufficient</span>
                    )}
                  </label>
                </div>
                
                {/* Payment Action Based on Selection */}
                {paymentMethod === 'wallet' ? (
                  // Wallet Payment Button
                  <button
                    onClick={(e)=>handleSubmit(e,'wallet')}
                    disabled={!hasWalletBalance || isProcessing}
                    className={`w-full py-3 rounded font-medium transition-colors ${
                      !hasWalletBalance 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isProcessing
                          ? 'bg-blue-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Pay ₹{packages?.price.toLocaleString()} with Wallet
                      </div>
                    )}
                  </button>
                ) : (
                  // Card Payment Section
                  <div className="space-y-4">
                    {!clientSecret ? (
                      <button
                        onClick={(e)=>handleSubmit(e,'card')}
                        className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Confirm Booking
                        </div>
                      </button>
                    ) : (
                      <Elements stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret} />
                      </Elements>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Status Messages */}
              {paymentStatus && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  paymentStatus === 'wallet_success' 
                    ? 'bg-green-100 text-green-800'
                    : paymentStatus === 'insufficient_balance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {paymentStatus === 'wallet_success' && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Payment successful with wallet!
                    </div>
                  )}
                  {paymentStatus === 'insufficient_balance' && (
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Insufficient wallet balance. Please choose card payment or add money to your wallet.
                    </div>
                  )}
                  {paymentStatus === 'wallet_failed' && (
                    <div>Wallet payment failed. Please try again or use card payment.</div>
                  )}
                </div>
              )}

              {/* Security Features */}
              <div className="space-y-2 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>24/7 customer support</span>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  By completing your booking, you agree to our
                  <span className="text-blue-600 hover:underline cursor-pointer"> Terms of Service</span> and
                  <span className="text-blue-600 hover:underline cursor-pointer"> Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;