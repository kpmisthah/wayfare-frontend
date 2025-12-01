"use client";
import { useCall } from "../../hooks/use-call";
import { PhoneOff } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { useCallStore } from "@/store/useCallStore";

export default function CallNotificationManager() {
  const { user } = useAuthStore(); // Get current user
  const { isIncomingCall, callerId, conversationId, callType, endCallUI } =
    useCallStore();
  console.log(isIncomingCall,'incoming call in call notificationUi---------')
  console.log(callerId,'calletId in call notificaition==========');
  console.log(conversationId,'conversationId in call notification===========');
  console.log(callType,'in call notification');
  
  const handleAccept = () => {
    // Just update the store — ActiveCallScreen will auto-accept via its useCall
    useCallStore.getState().acceptCallUI(
      conversationId!,
      callerId!,
      callType!
    );
  };

  const handleReject = () => {
    useCallStore.getState().endCallUI();
  };
  if (!isIncomingCall) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl text-center shadow-2xl animate-pulse">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Incoming Call</h2>
        <p className="text-lg mb-8 text-green-600">
          from User ID: **{callerId}** ({callType})
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={handleAccept}
            className="px-8 py-4 bg-green-500 text-white rounded-full text-xl hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-8 py-4 bg-red-500 text-white rounded-full text-xl hover:bg-red-600 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
