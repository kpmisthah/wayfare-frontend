"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
type Connection = {
  id: string;
  senderId: string;
  sender: { name: string; email: string };
  status: string;
};

export default function ConnectionsRequest() {
  const [requests, setRequests] = useState<Connection[]>([]);
  const router = useRouter()
  const fetchRequests = async () => {
    const res = await api.get("/connections"); 
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    try {
      const res = await api.patch(`/connections/${id}/${action}`);
      const {conversationId} = res.data
      if(conversationId) router.push(`/chat/${conversationId}`)
      alert(`Request ${action}ed ✅`);
      fetchRequests(); 
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Connection Requests 💌</h1>

      {requests.length === 0 && <p>No pending requests right now.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {requests.map((req) => (
          <div key={req.id} className="p-4 bg-white shadow rounded-2xl">
            <h3 className="text-lg font-medium">{req.sender.name}</h3>
            <p className="text-sm text-gray-500">{req.sender.email}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleAction(req.id, "accept")}
                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(req.id, "reject")}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
