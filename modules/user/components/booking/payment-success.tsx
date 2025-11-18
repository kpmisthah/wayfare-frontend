'use client'
import React from 'react';
import { CheckCircle, Calendar, MapPin, Users, Clock, CreditCard, Wallet, Download, Mail, Phone, ArrowLeft, Share2, Star } from 'lucide-react';
import { Header } from '@/shared/components/layout/Header';

interface PaymentSuccessProps {
  bookingData?: {
    bookingId: string;
    packageTitle: string;
    destination: string;
    startDate: string;
    duration: string;
    travelers: number;
    totalAmount: string;
    paymentMethod: 'card' | 'wallet';
    transactionId: string;
    customerEmail: string;
  };
}

const PaymentSuccessPage: React.FC<PaymentSuccessProps> = ({ 
  bookingData = {
    bookingId: "WF-2025-001234",
    packageTitle: "Amazing Goa Adventure",
    destination: "Goa",
    startDate: "2025-09-23",
    duration: "5 Days / 4 Nights",
    travelers: 2,
    totalAmount: "₹25,000",
    paymentMethod: "wallet",
    transactionId: "TXN-2025-567890",
    customerEmail: "customer@example.com"
  }
}) => {
  const handleDownloadTicket = () => {
    // Implementation for downloading ticket
    console.log('Downloading ticket...');
  };

  const handleShareBooking = () => {
    // Implementation for sharing booking
    console.log('Sharing booking...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-100 text-lg">Your booking has been confirmed</p>
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg inline-block">
              <p className="text-sm text-green-100">Booking ID</p>
              <p className="text-xl font-semibold">{bookingData.bookingId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {bookingData.packageTitle}
                    </h3>
                    <p className="text-gray-600 mb-2">{bookingData.destination}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{bookingData.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{bookingData.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{bookingData.travelers} Travelers</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                    <div className="flex items-center gap-2">
                      {bookingData.paymentMethod === 'card' ? (
                        <>
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Credit/Debit Card</span>
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Wallet Payment</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Transaction ID</h4>
                    <p className="text-gray-700 font-mono text-sm">{bookingData.transactionId}</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Total Amount</h4>
                    <p className="text-2xl font-bold text-green-600">{bookingData.totalAmount}</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Confirmation Email</h4>
                    <p className="text-gray-700">{bookingData.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={handleDownloadTicket}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download E-Ticket
                </button>
                <button 
                  onClick={handleShareBooking}
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share Booking
                </button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Confirmation Email</h3>
                    <p className="text-gray-600 text-sm">You'll receive a detailed confirmation email with your itinerary within 5 minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Travel Documents</h3>
                    <p className="text-gray-600 text-sm">Download your e-tickets and keep them handy for your trip.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Pre-Travel Support</h3>
                    <p className="text-gray-600 text-sm">Our team will contact you 48 hours before departure with final details.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Support Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Call Us</p>
                      <p className="text-sm text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">support@wayfare.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">24/7 Customer Support</p>
                  <p className="text-xs text-blue-600 mt-1">We're here to help you at every step of your journey.</p>
                </div>
              </div>

              {/* Rating Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
                <p className="text-gray-600 text-sm mb-4">How was your booking experience with us?</p>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" 
                    />
                  ))}
                </div>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Submit Rating
                </button>
              </div>

              {/* Continue Exploring */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-2">Continue Exploring</h2>
                <p className="text-blue-100 text-sm mb-4">Discover more amazing destinations for your next adventure.</p>
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Browse Packages
                </button>
              </div>

              {/* Back to Home */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;