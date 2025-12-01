import { create } from 'zustand';

interface CallState {
  isCallActive: boolean; 
  isIncomingCall: boolean; 
  callerId: string | null;
  conversationId: string | null;
  callType: 'video' | 'audio' | null;
  callerSignalData:any|null
  // Functions to manage the global state
  setIncomingCall: (data: { callerId: string, conversationId: string, callType: 'video' | 'audio',signalData:any }) => void;
  acceptCallUI: (conversationId: string, callerId: string, callType: 'video' | 'audio') => void;
  endCallUI: () => void;
  startCallUI: (conversationId: string, recipientId:string,callerId: string, callType: "video" | "audio") => void;
  resetCallState: () => void;
  recipientId: string | null;
}

export const useCallStore = create<CallState>((set) => ({
  isCallActive: false,
  isIncomingCall: false,
  callerId: null,
  conversationId: null,
  callType: null,
  callerSignalData: null,
  recipientId:  null,
  setIncomingCall: (data) => set({
    isIncomingCall: true,
    callerId: data.callerId,
    conversationId: data.conversationId,
    callType: data.callType,
    callerSignalData: data.signalData,
  }),
  
  acceptCallUI: (conversationId, callerId, callType) => set({
    isCallActive: true,
    isIncomingCall: false,
    callerId: callerId,
    conversationId: conversationId,
    callType: callType,
  }),
startCallUI: (conversationId, callerId,recipientId, callType) =>
    set({
      isCallActive:true,
      isIncomingCall: false,
      callerId,
      recipientId,
      conversationId,
      callType,
      callerSignalData: null, // no signal yet, will come from peer
    }),
  endCallUI: () => set({
    isCallActive: false,
    isIncomingCall: false,
    callerId: null,
    conversationId: null,
    callType: null,
  }),
  
  resetCallState: () => set({
    isCallActive: false,
    isIncomingCall: false,
    callerId: null,
    conversationId: null,
    callType: null,
  }),
  
}));