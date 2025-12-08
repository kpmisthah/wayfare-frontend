
import PaymentSuccessPage from "@/modules/user/components/booking/payment-success"
import { cookies } from "next/headers";

// import React from 'react';
// import { CheckCircle, ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface SuccessPageProps {
//   searchParams: {
//     booking_id: string;
//     payment_method: 'card' | 'wallet';
//        payment_amount:string
//   };
// }

// export default function SuccessPage({ searchParams }: SuccessPageProps) {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       <div className="text-center bg-white p-8 rounded-xl shadow-md">
//         <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
//           <CheckCircle className="w-12 h-12 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
//         <p className="text-gray-600 mb-6">
//           Booking ID: <span className="font-mono">{searchParams.booking_id}</span>
//         </p>
//         <button
//           onClick={() => router.push('/')}
//           className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }
//.......................
// import React, { useState, useEffect } from 'react';
// import { CheckCircle, XCircle, Download, ArrowRight, RefreshCw, Mail, Copy, Check } from 'lucide-react';
// import { Header } from '@/shared/components/layout/Header';

// export default function PaymentResult() {
//   const [status, setStatus] = useState('success'); 
//   const [copied, setCopied] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   // Sample data
//   const successData = {
//     orderId: 'ORD-2024-89234',
//     amount: '$149.99',
//     paymentMethod: 'Visa ****4242',
//     date: 'Nov 23, 2024, 2:45 PM',
//     email: 'user@example.com'
//   };

//   const failureData = {
//     transactionId: 'TXN-2024-89235',
//     amount: '$149.99',
//     reason: 'Insufficient funds',
//     errorCode: 'CARD_DECLINED'
//   };

//   useEffect(() => {
//     if (status === 'success') {
//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 3000);
//     }
//   }, [status]);

//   const handleCopy = (text:string) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const Confetti = () => (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {[...Array(50)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute animate-bounce"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: '-10px',
//             animation: `fall ${2 + Math.random() * 3}s linear forwards`,
//             animationDelay: `${Math.random() * 0.5}s`
//           }}
//         >
//           <div
//             className="w-2 h-2 rounded-full"
//             style={{
//               backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
//             }}
//           />
//         </div>
//       ))}
//       <style>{`
//         @keyframes fall {
//           to {
//             transform: translateY(100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );

//   return (
//     <>
//       <Header />

//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//       {showConfetti && <Confetti />}

//       {/* Demo Toggle */}
//       <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
//         <div className="text-xs text-slate-600 mb-2">Demo Mode:</div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setStatus('success')}
//             className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
//               status === 'success' 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
//             }`}
//           >
//             Success
//           </button>
//           <button
//             onClick={() => setStatus('failure')}
//             className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
//               status === 'failure' 
//                 ? 'bg-red-500 text-white' 
//                 : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
//             }`}
//           >
//             Failure
//           </button>
//         </div>
//       </div>

//       <div className="max-w-md w-full">

//         {status === 'success' ? (
//           // SUCCESS STATE
//           <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 animate-in">
//             {/* Success Icon */}
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
//                 <CheckCircle className="w-20 h-20 text-green-500 relative animate-scale-in" strokeWidth={2} />
//               </div>
//             </div>

//             {/* Success Message */}
//             <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
//               Payment Successful!
//             </h1>
//             <p className="text-center text-slate-600 mb-8">
//               Your order has been confirmed and is being processed
//             </p>

//             {/* Order Details */}
//             <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-slate-600 text-sm">Booking ID</span>
//                 <div className="flex items-center gap-2">
//                   <span className="font-mono text-sm font-semibold text-slate-900">
//                     {successData.orderId}
//                   </span>
//                   <button
//                     onClick={() => handleCopy(successData.orderId)}
//                     className="p-1 hover:bg-slate-200 rounded transition-colors"
//                     title="Copy order ID"
//                   >
//                     {copied ? (
//                       <Check className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <Copy className="w-4 h-4 text-slate-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="h-px bg-slate-200" />

//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Amount Paid</span>
//                 <span className="font-semibold text-slate-900 text-lg">{successData.amount}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Payment Method</span>
//                 <span className="text-slate-900">{successData.paymentMethod}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Date & Time</span>
//                 <span className="text-slate-900 text-sm">{successData.date}</span>
//               </div>
//             </div>

//             {/* Email Confirmation Notice */}
//             <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm text-blue-900 font-medium">Confirmation email sent</p>
//                 <p className="text-xs text-blue-700 mt-1">
//                   Receipt sent to {successData.email}
//                 </p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group">
//                 View Order Details
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <button className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-4 rounded-lg border-2 border-slate-200 transition-colors flex items-center justify-center gap-2">
//                 <Download className="w-5 h-5" />
//                 Download Receipt
//               </button>

//               <button className="w-full text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors text-sm">
//                 Continue Shopping
//               </button>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-slate-200">
//               <div className="flex items-center gap-2 text-xs text-slate-500">
//                 <div className="w-2 h-2 bg-green-500 rounded-full" />
//                 Secure Payment
//               </div>
//               <div className="w-px h-4 bg-slate-300" />
//               <div className="text-xs text-slate-500">256-bit SSL Encrypted</div>
//             </div>
//           </div>
//         ) : (
//           // FAILURE STATE
//           <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 animate-in">
//             {/* Failure Icon */}
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20" />
//                 <XCircle className="w-20 h-20 text-red-500 relative animate-scale-in" strokeWidth={2} />
//               </div>
//             </div>

//             {/* Failure Message */}
//             <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
//               Payment Failed
//             </h1>
//             <p className="text-center text-slate-600 mb-8">
//               We couldn't process your payment. Please try again.
//             </p>

//             {/* Error Details */}
//             <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Transaction ID</span>
//                 <span className="font-mono text-sm text-slate-900">{failureData.transactionId}</span>
//               </div>

//               <div className="h-px bg-red-200" />

//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Attempted Amount</span>
//                 <span className="font-semibold text-slate-900">{failureData.amount}</span>
//               </div>

//               <div className="flex justify-between items-start">
//                 <span className="text-slate-600 text-sm">Reason</span>
//                 <span className="text-red-700 font-medium text-sm text-right">{failureData.reason}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-slate-600 text-sm">Error Code</span>
//                 <span className="font-mono text-xs text-slate-500">{failureData.errorCode}</span>
//               </div>
//             </div>

//             {/* Common Solutions */}
//             <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
//               <p className="text-sm font-medium text-amber-900 mb-2">Common solutions:</p>
//               <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
//                 <li>Check your card balance and available credit</li>
//                 <li>Verify card details (number, expiry, CVV)</li>
//                 <li>Try a different payment method</li>
//                 <li>Contact your bank if issue persists</li>
//               </ul>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group">
//                 <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
//                 Try Again
//               </button>

//               <button className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-4 rounded-lg border-2 border-slate-200 transition-colors">
//                 Use Different Payment Method
//               </button>

//               <button className="w-full text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors text-sm">
//                 Contact Support
//               </button>
//             </div>

//             {/* Support Info */}
//             <div className="text-center mt-6 pt-6 border-t border-slate-200">
//               <p className="text-xs text-slate-500">
//                 Need help? Contact us at <span className="text-slate-700 font-medium">support@example.com</span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes scale-in {
//           from {
//             transform: scale(0);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//         .animate-in {
//           animation: slide-up 0.5s ease-out;
//         }
//         @keyframes slide-up {
//           from {
//             transform: translateY(20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//     </>
//   );
// }

//..........................
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Success({ searchParams }: any) {
  const cookieStore = await cookies()
  const cookieString = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join(';')
  const { booking_id: bookingId, payment_method } = await searchParams
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}/my-booking`, {
    headers: {
      Cookie: cookieString
    },
    cache: 'no-store',
    credentials: 'include'
  })
  const booking = await res.json()
  console.log(booking, 'fetch from server side componenttttttt')
  return (
    <>
      <PaymentSuccessPage booking={booking} paymentMethod={payment_method} />
    </>
  )
}
