// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import Chat from "./chat";
// import { useAuthStore } from "@/store/Auth";
// import { Search, MoreVertical, MessageSquarePlus, Users, X, ArrowLeft, Check } from "lucide-react";

// const apis = {
//   get: async (url: string) => {
//     // Mock data
//     return {
//       data: [
//         {
//           conversationId: "1",
//           name: "John Doe",
//           userId: "user1",
//           type: "direct",
//         },
//         {
//           conversationId: "2",
//           name: "Jane Smith",
//           userId: "user2",
//           type: "direct",
//         },
//         {
//           conversationId: "3",
//           name: "Family Group",
//           userId: null,
//           type: "group",
//           members: ["user1", "user2"],
//         },
//       ],
//     };
//   },
//   post: async (url: string, data: any) => {
//     console.log("Creating group:", data);
//     return { data: { success: true } };
//   },
// };

// export default function ChatUi() {
//   const [connections, setConnections] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showNewGroupModal, setShowNewGroupModal] = useState(false);
//   const [showAddMembersModal, setShowAddMembersModal] = useState(false);
//   const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
//   const [groupName, setGroupName] = useState("");
//   const currentUserId = "current-user-id";
//   const { user } = useAuthStore();

//   useEffect(() => {
//     const fetchConnections = async () => {
//       const res = await api.get("/connections/accepted");
//       console.log(res.data, "in chat Uiiiiii");
//       setConnections(res.data);
//     };
//     fetchConnections();
//   }, []);

//   const filteredConnections = connections.filter((c) =>
//     c.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };
//   const toggleMemberSelection = (userId: string) => {
//     setSelectedMembers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };
//   const handleCreateGroup = async () => {
//     if (groupName.trim() && selectedMembers.length > 0) {
//       await api.post("/groups/create", {
//         name: groupName,
//         members: selectedMembers,
//       });
//       setShowAddMembersModal(false);
//       setShowNewGroupModal(false);
//       setGroupName("");
//       setSelectedMembers([]);
//       // Refresh connections
//       const res = await api.get("/connections/accepted");
//       const newMockGroup = {
//         conversationId: `new-group-${Date.now()}`,
//         name: groupName,
//         userId: null, // Groups don't have a single user ID
//         type: "group",
//         members: selectedMembers, // ✅ crucial for frontend rendering
//       };
//       const updatedConnections = [...res.data, newMockGroup]; // Add the new group
//       setConnections(updatedConnections);
//       setSelected(newMockGroup);
//     }
//   };
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* LEFT SIDEBAR - Contacts List */}
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-50 p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowNewGroupModal(true)}
//                 className="p-2 hover:bg-gray-200 rounded-full transition"
//                 title="New Group"
//               >
//                 <MessageSquarePlus className="w-5 h-5 text-gray-600" />
//               </button>
//               <button className="p-2 hover:bg-gray-200 rounded-full transition">
//                 <MoreVertical className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search or start new chat"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         {/* Contacts List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredConnections.map((c) => (
//             <div
//               key={c.conversationId}
//               onClick={() => setSelected(c)}
//               className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
//                 selected?.conversationId === c.conversationId
//                   ? "bg-gray-100"
//                   : ""
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {/* Avatar */}
//                 <div
//                   className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
//                     c.type === "group"
//                       ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                       : "bg-gradient-to-br from-green-400 to-green-600"
//                   }`}
//                 >
//                   {c.type === "group" ? (
//                     <Users className="w-6 h-6" />
//                   ) : (
//                     getInitials(c.name)
//                   )}
//                 </div>

//                 {/* Chat Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {c.name}
//                     </h3>
//                   </div>
//                   <p className="text-sm text-gray-600 truncate">
//                     {c.type === "group"
//                       ? `${c.members?.length || 0} members`
//                       : "Click to start chatting"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT SIDE - Chat Window */}
//       <div className="flex-1 flex flex-col">
//         {selected ? (
//           <Chat
//             conversationId={selected.conversationId}
//             currentUserId={user?.id}
//             selectedUser={selected}
//           />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
//                 <svg
//                   className="w-32 h-32 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 Chat Application
//               </h2>
//               <p className="text-gray-600">Select a chat to start messaging</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* New Group Modal - Step 1: Choose to create group */}
//       {showNewGroupModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   New Chat
//                 </h2>
//                 <button
//                   onClick={() => setShowNewGroupModal(false)}
//                   className="p-1 hover:bg-gray-100 rounded-full transition"
//                 >
//                   <X className="w-6 h-6 text-gray-600" />
//                 </button>
//               </div>

//               <button
//                 onClick={() => {
//                   setShowNewGroupModal(false);
//                   setShowAddMembersModal(true);
//                 }}
//                 className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className="font-semibold text-gray-900">New Group</h3>
//                   <p className="text-sm text-gray-600">Create a group chat</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Members Modal - Step 2: Select members and name group */}
//       {showAddMembersModal && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col md:max-w-md md:mx-auto md:my-8 md:rounded-lg md:shadow-2xl">
//           {/* Header */}
//           <div className="bg-green-600 text-white p-4">
//             <div className="flex items-center gap-4 mb-4">
//               <button
//                 onClick={() => {
//                   setShowAddMembersModal(false);
//                   setSelectedMembers([]);
//                   setGroupName("");
//                 }}
//                 className="p-1 hover:bg-green-700 rounded-full transition"
//               >
//                 <ArrowLeft className="w-6 h-6" />
//               </button>
//               <div>
//                 <h2 className="text-lg font-semibold">New Group</h2>
//                 <p className="text-sm text-green-100">Add members</p>
//               </div>
//             </div>

//             {/* Group Name Input */}
//             <input
//               type="text"
//               placeholder="Group name (required)"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//             />
//           </div>

//           {/* Selected Members Count */}
//           {selectedMembers.length > 0 && (
//             <div className="px-4 py-2 bg-green-50 border-b border-green-100">
//               <p className="text-sm text-green-700 font-medium">
//                 {selectedMembers.length} member
//                 {selectedMembers.length !== 1 ? "s" : ""} selected
//               </p>
//             </div>
//           )}

//           {/* Members List */}
//           <div className="flex-1 overflow-y-auto">
//             {connections
//               .filter((c) => c.type !== "group")
//               .map((c) => (
//                 <div
//                   key={c.userId}
//                   onClick={() => toggleMemberSelection(c.userId)}
//                   className="p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
//                       {getInitials(c.name)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900 truncate">
//                         {c.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 truncate">
//                         Available
//                       </p>
//                     </div>
//                     <div
//                       className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
//                         selectedMembers.includes(c.userId)
//                           ? "bg-green-500 border-green-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {selectedMembers.includes(c.userId) && (
//                         <Check className="w-4 h-4 text-white" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* Create Button */}
//           <div className="p-4 border-t border-gray-200">
//             <button
//               onClick={handleCreateGroup}
//               disabled={!groupName.trim() || selectedMembers.length === 0}
//               className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full font-semibold transition"
//             >
//               Create Group
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//...............
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Chat from "./chat";
import { useAuthStore } from "@/store/Auth";
import {
  Search,
  MoreVertical,
  MessageSquarePlus,
  Users,
  X,
  ArrowLeft,
  Check,
} from "lucide-react";
import { getSocket } from "@/lib/socket";

export default function ChatUi() {
  const [connections, setConnections] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const { user } = useAuthStore();

  // Fetch accepted connections + groups
    useEffect(() => {
    const socket = getSocket();

    const handleGroupCreated = (group: any) => {
      console.log("New group received via socket!", group.name);
      // socket.emit("joinRoom", { groupId: group.groupId });
      setConnections((prev) => {
        // Prevent duplicates
        const exists = prev.some(
          (g) =>
            g.groupId === group.groupId || g.conversationId === group.groupId
        );
        if (exists) return prev;
        return [...prev, group];
      });

      // Auto-select the group if YOU created it
      if (group.creatorId === user?.id) {
        setSelected(group);
      }
    };

    socket.on("groupCreated", handleGroupCreated);

    // Cleanup
    return () => {
      socket.off("groupCreated", handleGroupCreated);
    }
  }, [user?.id]);
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await api.get("/messages/chats");
        console.log(res.data,'=============result of chating in feecthcing')
        setConnections(res.data || []);
      } catch (err) {
        console.error("Failed to load connections", err);
      }
    };
    fetchConnections();
  }, []);

  const filteredConnections = connections.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleMemberSelection = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // REAL GROUP CREATION
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0 || !user?.id) return;

    try {
      const res = await api.post("/messages/group/create", {
        name: groupName,
        memberIds: selectedMembers, // matches backend GroupChatDto
      });
      // THIS IS THE MISSING PART — ADD IT BACK!!!
      const createdGroup = res.data; // your backend already returns full group with type: 'group'

      setConnections((prev) => {
        const exists = prev.some((g) => g.groupId === createdGroup.groupId)
        if (exists) return prev;
        return [...prev, createdGroup];
      });

      setSelected(createdGroup); // ← CRITICAL: select the REAL new group
      // const createdGroup = res.data;

      // const newGroup = {
      //   groupId: createdGroup.groupId,           // This is the room ID
      //   conversationId: null,
      //   name: createdGroup.name || groupName,
      //   type: "group" as const,
      //   members: [...selectedMembers, user.id],  // include yourself
      //   // optional: avatar, createdAt, etc.
      // };

      // // Add to sidebar
      // setConnections(prev => [...prev, newGroup]);
      // setSelected(newGroup);

      // Reset & close
      setShowAddMembersModal(false);
      setShowNewGroupModal(false);
      setGroupName("");
      setSelectedMembers([]);
    } catch (error: any) {
      console.error("Create group failed:", error);
      alert(error.response?.data?.message || "Failed to create group");
    }
  };

  // Determine which ID to use as chat room
  const getChatId = (chat: any) => {
    return chat.groupId || chat.conversationId;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewGroupModal(true)}
                className="p-2 hover:bg-gray-200 rounded-full transition"
                title="New Group"
              >
                <MessageSquarePlus className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-full transition">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConnections.map((c) => {
            const chatId = getChatId(c);
            const isSelected = selected && getChatId(selected) === chatId;

            return (
              <div
                key={chatId}
                onClick={() => {
                  console.log("SELECTED:", c);
                  setSelected(c);
                }}
                className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
                  isSelected ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                      c.type === "group"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600"
                        : "bg-gradient-to-br from-green-400 to-green-600"
                    }`}
                  >
                    {c.type === "group" ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      getInitials(c.name)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {c.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {c.type === "group"
                        ? `${c.members?.length || 0} members`
                        : "Tap to chat"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE - Chat Window */}
      <div className="flex-1 flex flex-col hidden md:flex">
        {selected ? (
          <Chat
            chatId={getChatId(selected)} // groupId or conversationId
            currentUserId={user?.id}
            selectedUser={selected} // full object for header
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Chat Application
              </h2>
              <p className="text-gray-600">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Group Modal */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">New Chat</h2>
                <button onClick={() => setShowNewGroupModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={() => {
                  setShowNewGroupModal(false);
                  setShowAddMembersModal(true);
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">New Group</h3>
                  <p className="text-sm text-gray-600">Create a group chat</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Members Modal */}
      {showAddMembersModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:max-w-md md:mx-auto md:my-8 md:rounded-lg md:shadow-2xl">
          <div className="bg-green-600 text-white p-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => {
                  setShowAddMembersModal(false);
                  setSelectedMembers([]);
                  setGroupName("");
                }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-semibold">New Group</h2>
                <p className="text-sm opacity-90">Add members</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg"
            />
          </div>

          {selectedMembers.length > 0 && (
            <div className="px-4 py-2 bg-green-50">
              <p className="text-sm text-green-700 font-medium">
                {selectedMembers.length} selected
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {connections
              .filter((c) => c.type !== "group" && c.userId)
              .map((c) => (
                <div
                  key={c.userId}
                  onClick={() => toggleMemberSelection(c.userId)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(c.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{c.name}</h3>
                    </div>
                    {selectedMembers.includes(c.userId) && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedMembers.length === 0}
              className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-full font-semibold"
            >
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
