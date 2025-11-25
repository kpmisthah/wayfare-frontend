  //Itheynoooo first

  // "use client";

  // import dayjs from "dayjs";
  // import { useSocket } from "../../hooks/use-socket";
  // import {
  //   Send,
  //   Phone,
  //   Video,
  //   MoreVertical,
  //   Smile,
  //   PhoneOff,
  //   Mic,
  //   MicOff,
  //   VideoOff,
  // } from "lucide-react";
  // import { useCall } from "../../hooks/use-call";
  // import { useCallStore } from "@/store/useCallStore";

  // export default function Chat({
  //   conversationId,
  //   currentUserId,
  //   selectedUser,
  // }: {
  //   conversationId: string;
  //   currentUserId: string | undefined;
  //   selectedUser?: any;
  // }) {
  //   const { messages, text, setText, scrollRef, sendMessage } = useSocket(
  //     conversationId,
  //     currentUserId
  //   );

  //   const getInitials = (name: string) => {
  //     return name
  //       ?.split(" ")
  //       .map((n) => n[0])
  //       .join("")
  //       .toUpperCase()
  //       .slice(0, 2);
  //   };
  //   const { isCallActive, conversationId: activeConvoId,callerId } = useCallStore();
  //   const shouldInitializeCall = isCallActive && activeConvoId === conversationId;
  //   // 🛑 FIX HERE: When the call is active, the 'partner' is the 'caller' from the store
  //   const partnerId = shouldInitializeCall 
  //       ? (currentUserId === callerId ? activeConvoId : callerId) // If I'm the caller, partner is activeConvoId (the other user)
  //       : selectedUser?.userId;
  //       let partnerIdToUse = selectedUser?.userId;
  //       if (shouldInitializeCall) {
  //     // If the current user is the caller, the partner is the selectedUser (the recipient).
  //     if (currentUserId === callerId) {
  //         partnerIdToUse = selectedUser?.userId;
  //     } else {
  //         // If the current user is the recipient, the partner is the caller.
  //         partnerIdToUse = callerId;
  //     }
  //   }
  //   // const call = useCall(currentUserId, partnerId,conversationId);
  //   // {console.log(isCallActive,'isCalllactiveee')}
  //   // {console.log(activeConvoId,'activeconvooooid')}
  //   // {console.log(conversationId,'conversatroinIddddd')}
    
  //   return (
  //     <div className="flex flex-col h-full">
  //       {/* Chat Header */}
  //       <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
  //         <div className="flex items-center gap-3">
  //           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
  //             {getInitials(selectedUser?.name || "U")}
  //           </div>
  //           <div>
  //             <h2 className="font-semibold text-gray-900">
  //               {selectedUser?.name || "User"}
  //             </h2>
  //             <p className="text-xs text-gray-500">Online</p>
  //           </div>
  //         </div>

  //         <div className="flex items-center gap-2">
  //           <button
  //             className="p-2 hover:bg-gray-200 rounded-full transition"
  //             onClick={() => call.startCall("video")}
  //           >
  //             <Video className="w-5 h-5 text-gray-600" />
  //           </button>
  //           <button
  //             className="p-2 hover:bg-gray-200 rounded-full transition"
  //             onClick={() => call.startCall("audio")}
  //           >
  //             <Phone className="w-5 h-5 text-gray-600" />
  //           </button>
  //           <button className="p-2 hover:bg-gray-200 rounded-full transition">
  //             <MoreVertical className="w-5 h-5 text-gray-600" />
  //           </button>
  //         </div>
  //       </div>

  //       {/* Incoming Call Modal */}
  //       {/* {call.receivingCall && !call.callAccepted && (
  //         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
  //           <div className="bg-white p-10 rounded-2xl text-center">
  //             <h2 className="text-2xl font-bold mb-4">
  //               Incoming {call.callerSignal?.callType} Call
  //             </h2>
  //             <p className="text-lg mb-8">from {call.caller}</p>
  //             <div className="flex gap-6 justify-center">
  //               <button
  //                 onClick={call.acceptCall}
  //                 className="px-8 py-4 bg-green-500 text-white rounded-full text-xl"
  //               >
  //                 Accept
  //               </button>
  //               <button
  //                 onClick={call.endCall}
  //                 className="px-8 py-4 bg-red-500 text-white rounded-full text-xl"
  //               >
  //                 Reject
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )} */}
  //       {/* Active Call Screen */}
        
  
        
  //       {/* Messages Area */}
  //       <div
  //         className="flex-1 overflow-y-auto p-4 space-y-2"
  //         style={{
  //           backgroundImage:
  //             'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1d5db" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
  //           backgroundColor: "#f0f2f5",
  //         }}
  //       >
  //         {messages.map((m, i) => {
  //           const mine = m.senderId === currentUserId;
  //           return (
  //             <div
  //               key={i}
  //               className={`flex ${mine ? "justify-end" : "justify-start"}`}
  //             >
  //               <div
  //                 className={`max-w-md px-4 py-2 rounded-lg ${
  //                   mine
  //                     ? "bg-green-500 text-white rounded-br-none"
  //                     : "bg-white text-gray-900 rounded-bl-none shadow-sm"
  //                 }`}
  //               >
  //                 <p className="text-sm break-words">{m.content}</p>
  //                 <div
  //                   className={`text-xs mt-1 ${
  //                     mine ? "text-green-100" : "text-gray-500"
  //                   } text-right`}
  //                 >
  //                   {dayjs(m.createdAt).format("HH:mm")}
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //         <div ref={scrollRef} />
  //       </div>

  //       {/* Message Input */}
  //       <div className="bg-gray-50 p-4 border-t border-gray-200">
  //         <div className="flex items-center gap-2">
  //           <button className="p-2 hover:bg-gray-200 rounded-full transition">
  //             <Smile className="w-6 h-6 text-gray-600" />
  //           </button>

  //           <input
  //             type="text"
  //             value={text}
  //             onChange={(e) => setText(e.target.value)}
  //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  //             placeholder="Type a message"
  //             className="flex-1 px-4 py-3 bg-white rounded-full text-sm focus:outline-none border border-gray-200 focus:border-green-500"
  //           />

  //           <button
  //             onClick={sendMessage}
  //             className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition"
  //           >
  //             <Send className="w-5 h-5 text-white" />
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
// ..................................................

// -----//2nd
// "use client";

// import dayjs from "dayjs";
// import { useSocket } from "../../hooks/use-socket";
// import {
//   Send,
//   Phone,
//   Video,
//   MoreVertical,
//   Smile,
//   PhoneOff,
// } from "lucide-react";
// import { useCall } from "../../hooks/use-call";

// export default function Chat({
//   conversationId,
//   currentUserId,
//   selectedUser,
// }: {
//   conversationId: string;
//   currentUserId: string | undefined;
//   selectedUser?: any;
// }) {
//   const { messages, text, setText, scrollRef, sendMessage } = useSocket(
//     conversationId,
//     currentUserId
//   );

//   const getInitials = (name: string) => {
//     return name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const call = useCall(currentUserId, selectedUser?.userId, conversationId);

//   return (
//     <div className="flex flex-col h-full relative">
//       {/* ==================== CHAT HEADER ==================== */}
//       <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between z-10">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold shadow-lg">
//             {getInitials(selectedUser?.name || "U")}
//           </div>
//           <div>
//             <h2 className="font-semibold text-gray-900">
//               {selectedUser?.name || "User"}
//             </h2>
//             <p className="text-xs text-green-600 font-medium">Online</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => call.startCall("video")}
//             className="p-3 hover:bg-gray-200 rounded-full transition transform hover:scale-110"
//           >
//             <Video className="w-6 h-6 text-gray-700" />
//           </button>
//           <button
//             onClick={() => call.startCall("audio")}
//             className="p-3 hover:bg-gray-200 rounded-full transition transform hover:scale-110"
//           >
//             <Phone className="w-6 h-6 text-gray-700" />
//           </button>
//           <button className="p-3 hover:bg-gray-200 rounded-full transition">
//             <MoreVertical className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//       </div>

//       {/* ==================== INCOMING CALL MODAL (HIGHEST PRIORITY) ==================== */}
//       {call.receivingCall && !call.callAccepted && !call.callEnded && (
//         <div className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center">
//           <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md w-full mx-4 animate-pulse">
//             <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
//               {getInitials(selectedUser?.name || "U")}
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Incoming {call.callerSignal?.callType?.toUpperCase()} Call
//             </h2>
//             <p className="text-xl text-gray-600 mb-10">
//               from <span className="font-bold text-gray-800">{selectedUser?.name}</span>
//             </p>
//             <div className="flex gap-8 justify-center">
//               <button
//                 onClick={call.acceptCall}
//                 className="px-12 py-6 bg-green-500 hover:bg-green-600 text-white rounded-full text-2xl font-semibold transition transform hover:scale-110 shadow-lg"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={call.endCall}
//                 className="px-12 py-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-2xl font-semibold transition transform hover:scale-110 shadow-lg"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== ACTIVE VIDEO CALL SCREEN ==================== */}
//       {call.callAccepted && !call.callEnded && (
//         <div className="fixed inset-0 bg-black z-50 flex flex-col">
//           {/* Partner's Video (Full Screen) */}
//           <video
//             ref={call.partnerVideo}
//             autoPlay
//             playsInline
//             className="flex-1 w-full h-full object-cover"
//           />

//           {/* My Video (Picture-in-Picture) */}
//           <video
//             ref={call.myVideo}
//             autoPlay
//             muted
//             playsInline
//             className="absolute bottom-28 right-6 w-72 h-52 rounded-2xl border-4 border-white shadow-2xl object-cover z-10"
//           />

//           {/* Control Bar */}
//           <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
//             <div className="flex justify-center items-center gap-10">
//               {/* Mic Toggle */}
//               <button
//                 onClick={() => {
//                   if (call.stream?.getAudioTracks()[0]) {
//                     const enabled = call.stream.getAudioTracks()[0].enabled;
//                     call.stream.getAudioTracks()[0].enabled = !enabled;
//                   }
//                 }}
//                 className={`p-6 rounded-full transition-all transform hover:scale-110 ${
//                   call.stream?.getAudioTracks()[0]?.enabled === false
//                     ? "bg-red-600"
//                     : "bg-white/20 backdrop-blur-md border border-white/30"
//                 }`}
//               >
//                 {call.stream?.getAudioTracks()[0]?.enabled === false ? (
//                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
//                     <path d="M17.91 11c-.49 0-.9.36-.98.85A6.006 6.006 0 0113 17.06V19h-2v-1.94a6.006 6.006 0 01-3.98-5.27c-.08-.49-.49-.85-.98-.85-.61 0-1.1.49-1.1 1.1 0 3.05 1.69 5.7 4.18 7.08V21h-2v2h8v-2h-2v-1.88c2.49-1.38 4.18-4.03 4.18-7.08 0-.61-.49-1.1-1.1-1.1z" />
//                     <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="4" />
//                   </svg>
//                 ) : (
//                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
//                     <path d="M17.91 11c-.49 0-.9.36-.98.85A6.006 6.006 0 0113 17.06V19h-2v-1.94a6.006 6.006 0 01-3.98-5.27c-.08-.49-.49-.85-.98-.85-.61 0-1.1.49-1.1 1.1 0 3.05 1.69 5.7 4.18 7.08V21h-2v2h8v-2h-2v-1.88c2.49-1.38 4.18-4.03 4.18-7.08 0-.61-.49-1.1-1.1-1.1z" />
//                   </svg>
//                 )}
//               </button>

//               {/* Camera Toggle */}
//               <button
//                 onClick={() => {
//                   if (call.stream?.getVideoTracks()[0]) {
//                     const enabled = call.stream.getVideoTracks()[0].enabled;
//                     call.stream.getVideoTracks()[0].enabled = !enabled;
//                   }
//                 }}
//                 className={`p-6 rounded-full transition-all transform hover:scale-110 ${
//                   call.stream?.getVideoTracks()[0]?.enabled === false
//                     ? "bg-red-600"
//                     : "bg-white/20 backdrop-blur-md border border-white/30"
//                 }`}
//               >
//                 {call.stream?.getVideoTracks()[0]?.enabled === false ? (
//                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//                     <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="4" />
//                   </svg>
//                 ) : (
//                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//                   </svg>
//                 )}
//               </button>

//               {/* End Call */}
//               <button
//                 onClick={call.endCall}
//                 className="p-8 bg-red-600 hover:bg-red-700 rounded-full transition transform hover:scale-110 shadow-2xl"
//               >
//                 <PhoneOff className="w-12 h-12 text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== MESSAGES AREA ==================== */}
//       <div
//         className="flex-1 overflow-y-auto p-6 space-y-4"
//         style={{
//           backgroundImage:
//             'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239fa7b7\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//           backgroundColor: "#e5ddd5",
//         }}
//       >
//         {messages.map((m, i) => {
//           const mine = m.senderId === currentUserId;
//           return (
//             <div
//               key={i}
//               className={`flex ${mine ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md ${
//                   mine
//                     ? "bg-green-500 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <p className="text-sm break-words">{m.content}</p>
//                 <div
//                   className={`text-xs mt-1 ${
//                     mine ? "text-green-100" : "text-gray-500"
//                   } text-right`}
//                 >
//                   {dayjs(m.createdAt).format("HH:mm")}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={scrollRef} />
//       </div>

//       {/* ==================== MESSAGE INPUT ==================== */}
//       <div className="bg-gray-100 p-4 border-t border-gray-300">
//         <div className="flex items-center gap-3">
//           <button className="p-3 hover:bg-gray-200 rounded-full transition">
//             <Smile className="w-6 h-6 text-gray-600" />
//           </button>

//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
//             placeholder="Type a message..."
//             className="flex-1 px-5 py-3 bg-white rounded-full text-sm focus:outline-none border border-gray-300 focus:border-green-500 shadow-inner"
//           />

//           <button
//             onClick={sendMessage}
//             className="p-4 bg-green-500 hover:bg-green-600 rounded-full transition transform hover:scale-110 shadow-lg"
//           >
//             <Send className="w-6 h-6 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
//..................................................
// "use client";

// import dayjs from "dayjs";
// import { useSocket } from "../../hooks/use-socket";
// import {
//   Send,
//   Phone,
//   Video,
//   MoreVertical,
//   Smile,
//   PhoneOff,
//   Mic,
//   MicOff,
//   VideoOff,
// } from "lucide-react";
// import { useCall } from "../../hooks/use-call";
// import { useCallStore } from "@/store/useCallStore";
// import { useEffect } from "react"; // ← Add this import

// export default function Chat({
//   conversationId,
//   currentUserId,
//   selectedUser,
// }: {
//   conversationId: string;
//   currentUserId: string | undefined;
//   selectedUser?: any;
// }) {
//   const { messages, text, setText, scrollRef, sendMessage } = useSocket(
//     conversationId,
//     currentUserId
//   );

//   const getInitials = (name: string) => {
//     return name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // === GLOBAL CALL STATE ===
//   const { 
//     isCallActive, 
//     conversationId: activeConvoId, 
//     callerId,
//     isIncomingCall,
//     callerSignalData,
//     callType: incomingCallType
//   } = useCallStore();

//   const isThisChatActiveInCall = isCallActive && activeConvoId === conversationId;

//   // === DETERMINE PARTNER ID CORRECTLY ===
//   let partnerIdToUse = selectedUser?.userId;

//   if (isThisChatActiveInCall) {
//     partnerIdToUse = currentUserId === callerId 
//       ? selectedUser?.userId  // I'm the caller → partner is selectedUser
//       : callerId;             // I'm the receiver → partner is the caller
//   }

//   // === CREATE THE CALL HOOK (only one instance!) ===
//   const call = useCall(currentUserId, partnerIdToUse, conversationId);

//   // === AUTO-ACCEPT INCOMING CALL IF IT MATCHES THIS CHAT ===
//   useEffect(() => {
//     if (
//       isIncomingCall &&
//       conversationId === useCallStore.getState().conversationId && // matches this chat
//       callerSignalData &&
//       incomingCallType &&
//       !call.callAccepted // not already accepted
//     ) {
//       console.log("Auto-accepting incoming call in this chat:", conversationId);
//       call.acceptCall(); // This triggers WebRTC + shows video UI
//     }
//   }, [isIncomingCall, conversationId, callerSignalData, incomingCallType, call]);

//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Header */}
//       <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
//             {getInitials(selectedUser?.name || "U")}
//           </div>
//           <div>
//             <h2 className="font-semibold text-gray-900">
//               {selectedUser?.name || "User"}
//             </h2>
//             <p className="text-xs text-gray-500">Online</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             className="p-2 hover:bg-gray-200 rounded-full transition"
//             onClick={() => call.startCall("video")}
//             disabled={isCallActive}
//           >
//             <Video className="w-5 h-5 text-gray-600" />
//           </button>
//           <button
//             className="p-2 hover:bg-gray-200 rounded-full transition"
//             onClick={() => call.startCall("audio")}
//             disabled={isCallActive}
//           >
//             <Phone className="w-5 h-5 text-gray-600" />
//           </button>
//           <button className="p-2 hover:bg-gray-200 rounded-full transition">
//             <MoreVertical className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* === FULL SCREEN VIDEO CALL UI === */}
//       {isThisChatActiveInCall && (
//         <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
//           <div className="flex-1 relative">
//             <video
//               ref={call.partnerVideo}
//               autoPlay
//               playsInline
//               className="w-full h-full object-cover"
//             />
//             <video
//               ref={call.myVideo}
//               autoPlay
//               muted
//               playsInline
//               className="absolute bottom-8 right-8 w-64 h-48 rounded-lg border-4 border-blue-500 shadow-2xl"
//             />
//           </div>

//           <div className="p-8 flex justify-center gap-8 bg-black">
//             <button
//               onClick={call.toggleMic}
//               className={`p-6 rounded-full transition ${
//                 call.isMicMuted ? "bg-gray-700" : "bg-white"
//               }`}
//             >
//               {call.isMicMuted ? (
//                 <MicOff className="w-8 h-8 text-red-500" />
//               ) : (
//                 <Mic className="w-8 h-8 text-green-600" />
//               )}
//             </button>

//             <button
//               onClick={call.toggleVideo}
//               disabled={incomingCallType === "audio" && call.isVideoOff}
//               className={`p-6 rounded-full transition ${
//                 call.isVideoOff ? "bg-gray-700" : "bg-white"
//               }`}
//             >
//               {call.isVideoOff ? (
//                 <VideoOff className="w-8 h-8 text-red-500" />
//               ) : (
//                 <Video className="w-8 h-8 text-blue-600" />
//               )}
//             </button>

//             <button
//               onClick={call.endCall}
//               className="p-6 bg-red-600 hover:bg-red-700 rounded-full transition"
//             >
//               <PhoneOff className="w-10 h-10 text-white" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Messages Area */}
//       <div
//         className="flex-1 overflow-y-auto p-4 space-y-2"
//         style={{
//           backgroundImage:
//             'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1d5db" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
//           backgroundColor: "#f0f2f5",
//         }}
//       >
//         {messages.map((m, i) => {
//           const mine = m.senderId === currentUserId;
//           return (
//             <div
//               key={i}
//               className={`flex ${mine ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-md px-4 py-2 rounded-lg ${
//                   mine
//                     ? "bg-green-500 text-white rounded-br-none"
//                     : "bg-white text-gray-900 rounded-bl-none shadow-sm"
//                 }`}
//               >
//                 <p className="text-sm break-words">{m.content}</p>
//                 <div
//                   className={`text-xs mt-1 ${
//                     mine ? "text-green-100" : "text-gray-500"
//                   } text-right`}
//                 >
//                   {dayjs(m.createdAt).format("HH:mm")}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={scrollRef} />
//       </div>

//       {/* Message Input */}
//       <div className="bg-gray-50 p-4 border-t border-gray-200">
//         <div className="flex items-center gap-2">
//           <button className="p-2 hover:bg-gray-200 rounded-full transition">
//             <Smile className="w-6 h-6 text-gray-600" />
//           </button>

//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type a message"
//             className="flex-1 px-4 py-3 bg-white rounded-full text-sm focus:outline-none border border-gray-200 focus:border-green-500"
//             disabled={isThisChatActiveInCall} // disable typing during call
//           />

//           <button
//             onClick={sendMessage}
//             className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition"
//             disabled={isThisChatActiveInCall}
//           >
//             <Send className="w-5 h-5 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
///.....................
"use client";

import dayjs from "dayjs";
import { useSocket } from "../../hooks/use-socket";
import { Send, Phone, Video, MoreVertical, Smile } from "lucide-react";
import { useCallStore } from "@/store/useCallStore";

export default function Chat({
  conversationId,
  currentUserId,
  selectedUser,
}: {
  conversationId: string;
  currentUserId: string | undefined;
  selectedUser?: any;
}) {
  const { messages, text, setText, scrollRef, sendMessage } = useSocket(
    conversationId,
    currentUserId
  );

  const { isCallActive } = useCallStore();

  const getInitials = (name: string) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleStartCall = (type: "video" | "audio") => {
    const recipientId = selectedUser?.userId; // GET THE ACTUAL PARTNER'S USER ID
    console.log(recipientId,'reciepientIdd')
    if (!recipientId || !currentUserId) return;
    useCallStore.getState().startCallUI(conversationId,recipientId,currentUserId,type);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
            {getInitials(selectedUser?.name || "U")}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {selectedUser?.name || "User"}
            </h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-ar-2">
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition"
            onClick={() => handleStartCall("video")}
            disabled={isCallActive}
          >
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition"
            onClick={() => handleStartCall("audio")}
            disabled={isCallActive}
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{
        backgroundImage: 'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1d5db" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        backgroundColor: "#f0f2f5",
      }}>
        {messages.map((m, i) => {
          const mine = m.senderId === currentUserId;
          return (
            <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md px-4 py-2 rounded-lg ${mine ? "bg-green-500 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none shadow-sm"}`}>
                <p className="text-sm break-words">{m.content}</p>
                <div className={`text-xs mt-1 ${mine ? "text-green-100" : "text-gray-500"} text-right`}>
                  {dayjs(m.createdAt).format("HH:mm")}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-full transition">
            <Smile className="w-6 h-6 text-gray-600" />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message"
            className="flex-1 px-4 py-3 bg-white rounded-full text-sm focus:outline-none border border-gray-200 focus:border-green-500"
            disabled={isCallActive}
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition"
            disabled={isCallActive}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
//final ocde